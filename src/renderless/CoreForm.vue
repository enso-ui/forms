<script>
import Errors from '@enso-ui/laravel-validation';

export default {
    name: 'CoreForm',

    props: {
        disableState: {
            type: Boolean,
            default: false,
        },
        errorHandler: {
            type: Function,
            default: error => {
                throw error;
            },
        },
        i18n: {
            type: Function,
            default: key => key,
        },
        locale: {
            type: String,
            default: 'en',
        },
        params: {
            type: Object,
            default: null,
        },
        path: {
            type: String,
            required: true,
        },
        template: {
            type: Object,
            default: null,
        },
    },

    data: () => ({
        errors: new Errors(),
        original: null,
        state: {
            loading: false,
            data: null,
        },
    }),

    computed: {
        flatten() {
            return this.state.data && this.state.data.sections
                .reduce((fields, section) => fields
                    .concat(section.fields), []);
        },
        formData() {
            return this.state.data && this.flatten
                .reduce((object, field) => {
                    if (this.postable(field)) {
                        object[field.name] = field.value;
                    }

                    return object;
                }, {});
        },
        submitData() {
            return this.formData && Object.keys(this.formData)
                .reduce((data, key) => {
                    if (key.includes('.')) {
                        this.transformNested(data, key);
                    } else {
                        data[key] = this.formData[key];
                    }

                    return data;
                }, {});
        },
        submitPath() {
            return this.state.data && this.state.data.method === 'post'
                ? this.state.data.actions.store.path
                : this.state.data.actions.update.path;
        },
    },

    watch: {
        path: 'fetch',
    },

    provide() {
        return {
            create: this.create,
            customFields: this.customFields,
            customSections: this.customSections,
            destroy: this.destroy,
            dirty: this.dirty,
            errorCount: this.errorCount,
            errorHandler: this.errorHandler,
            errors: this.errors,
            fieldBindings: this.fieldBindings,
            fieldType: this.fieldType,
            focusError: this.focusError,
            i18n: this.i18n,
            locale: this.locale,
            params: this.params,
            sectionCustomFields: this.sectionCustomFields,
            sections: this.sections,
            show: this.show,
            state: this.state,
            submit: this.submit,
            tabbed: this.tabbed,
            tabs: this.tabs,
            undo: this.undo,
            visibleSection: this.visibleSection,
        };
    },

    created() {
        this.init();
    },

    methods: {
        create() {
            this.$emit('create');

            this.$router.push({
                name: this.state.data.actions.create.route,
                params: this.state.data.routeParams,
            });
        },
        customFields() {
            return this.state.data.sections
                .reduce((fields, section) => fields.concat(section.fields
                    .filter(field => field.meta.custom)), []);
        },
        customSections() {
            return this.state.data.sections
                .filter(({ columns }) => columns === 'slot');
        },
        dirty() {
            return !this.disableState && this.original
                && JSON.stringify(this.formData) !== this.original;
        },
        destroy() {
            this.modal = false;
            this.state.loading = true;

            axios.delete(this.state.data.actions.destroy.path)
                .then(({ data }) => {
                    this.$emit('destroy', data);

                    if (data.redirect) {
                        this.$router.push({
                            name: data.redirect,
                            params: this.state.data.routeParams,
                        });
                    }
                }).catch(this.errorHandler)
                .finally(() => (this.state.loading = false));
        },
        errorCount(tab) {
            return this.sections(tab).reduce((fields, section) => {
                fields.push(...section.fields);
                return fields;
            }, []).filter(({ name }) => this.errors.has(name)).length;
        },
        init() {
            if (this.template) {
                this.state.data = this.template;
                this.$emit('ready', { form: this });
            } else {
                this.fetch();
            }
        },
        fetch() {
            this.state.loading = true;

            return axios.get(this.path, { params: this.params })
                .then(({ data }) => {
                    this.state.data = data.form;
                    this.setOriginal();
                    this.$emit('ready', { form: this });
                    this.$emit('loaded', data);
                }).catch(error => {
                    this.$emit('template-fetch-error');
                    this.errorHandler(error);
                }).finally(() => (this.state.loading = false));
        },
        field(field) {
            return this.flatten.find(item => item.name === field);
        },
        fieldBindings(field) {
            return {
                errors: this.errors,
                field,
                i18n: this.i18n,
                locale: this.locale,
            };
        },
        fieldType(field) {
            switch (field.meta.type) {
            case 'input':
                switch (field.meta.content) {
                case 'text': case 'number': case 'email': case 'password': case 'encrypt':
                    return 'input-field';
                case 'checkbox':
                    return 'switch-field';
                case 'money':
                    return 'money-field';
                default:
                    throw new Error(`Misconfigured field "${field.name}"`);
                }
            case 'select':
                return 'select-field';
            case 'textarea':
                return 'textarea-field';
            case 'datepicker':
                return 'date-field';
            case 'timepicker':
                return 'time-field';
            case 'wysiwyg':
                return 'wysiwyg-field';
            default:
                throw new Error(`Misconfigured field "${field.name}"`);
            }
        },
        fill(data) {
            Object.keys(data).forEach(key => (this.field(key).value = data[key]));
        },
        focusError() {
            const firstError = this.$el.querySelector('.help.is-danger');

            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        },
        param(param) {
            return this.state.data.params[param];
        },
        postable(field) {
            return field.meta.content !== 'encrypt'
                || field.value !== field.meta.initialValue;
        },
        routeParam(param) {
            return this.state.data.routeParams[param];
        },
        sectionCustomFields(section) {
            return section.fields
                .filter(field => !field.meta.hidden && field.meta.custom);
        },
        sections(tab) {
            return this.state.data.sections
                .filter(section => section.tab === tab);
        },
        setOriginal() {
            this.original = JSON.stringify(this.formData);
        },
        show() {
            const { show } = this.state.data.actions;

            this.$emit('show');

            this.$router.push({
                name: show.route,
                params: this.state.data.routeParams,
            });
        },
        submit() {
            this.state.loading = true;
            const params = { ...this.submitData, _params: this.params };
            this.$emit('submitting');

            axios[this.state.data.method](this.submitPath, params)
                .then(({ data }) => {
                    this.$emit('submit', data);
                    this.$emit('submitted');
                    this.setOriginal();

                    if (data.redirect) {
                        this.$nextTick(() => this.$router.push({
                            name: data.redirect,
                            params: { ...data.param, ...this.state.data.routeParams },
                        }));
                    }
                }).catch(error => {
                    this.$emit('error', error);
                    const { status, data } = error.response;

                    if (status === 422) {
                        this.errors.set(data.errors);
                        this.$nextTick(this.focusError);
                    } else {
                        this.errorHandler(error);
                    }
                }).finally(() => (this.state.loading = false));
        },
        tabs() {
            if (!this.state.data.tabs) {
                return [];
            }

            const reducer = (tabs, section) => {
                if (!tabs.includes(section.tab) && !section.hidden) {
                    tabs.push(section.tab);
                }

                return tabs;
            };

            return this.state.data.sections.reduce(reducer, []);
        },
        transformNested(data, key) {
            const segments = key.split('.');
            let node = data;

            do {
                const attribute = segments.shift();

                if (!(attribute in node)) {
                    node[attribute] = segments.length === 0
                        ? this.formData[key]
                        : {};
                }

                node = node[attribute];
            } while (segments.length > 0);
        },
        undo() {
            this.fill(JSON.parse(this.original));
            this.$emit('undo');
        },
        hideField(fieldName, forceUpdate = true) {
            this.field(fieldName).meta.hidden = true;

            if (forceUpdate) {
                this.$forceUpdate();
            }
        },
        showField(fieldName, forceUpdate = true) {
            this.field(fieldName).meta.hidden = false;

            if (forceUpdate) {
                this.$forceUpdate();
            }
        },
        hideSection(section, forceUpdate = true) {
            section.hidden = true;

            if (forceUpdate) {
                this.$forceUpdate();
            }
        },
        showSection(section, forceUpdate = true) {
            section.hidden = false;

            if (forceUpdate) {
                this.$forceUpdate();
            }
        },
        visibleSection(section) {
            return !section?.meta?.hidden && this.hasVisibleFields(section);
        },
        hasVisibleFields(section) {
            return section.slot || section.fields
                .some(field => !field.meta.hidden);
        },
        hideTab(tab) {
            this.sections(tab).forEach(section => (this.hideSection(section, false)));
            this.$forceUpdate();
        },
        showTab(tab) {
            this.sections(tab).forEach(section => (this.showSection(section, false)));
            this.$forceUpdate();
        },
    },

    render() {
        return this.$slots.default;
    },
};
</script>

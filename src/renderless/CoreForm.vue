<script>
import Errors from '../classes/Errors';

export default {
    name: 'CoreForm',

    inject: ['errorHandler'],

    props: {
        disableState: {
            type: Boolean,
            default: false,
        },
        errorHandler: {
            type: Function,
            default: (error) => {
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
        template: {
            type: Object,
            default: null,
        },
        params: {
            type: Object,
            default: null,
        },
        path: {
            type: String,
            required: true,
        },
    },

    data: () => ({
        errors: new Errors(),
        state: {
            loading: false,
            data: null,
        },
        original: null,
    }),

    computed: {
        formData() {
            return this.state.data && this.flatten
                .reduce((object, field) => {
                    object[field.name] = field.value;
                    return object;
                }, {});
        },
        flatten() {
            return this.state.data && this.state.data.sections
                .reduce((fields, section) => fields
                    .concat(section.fields), []);
        },
        submitPath() {
            return this.state.data && this.state.data.method === 'post'
                ? this.state.data.actions.store.path
                : this.state.data.actions.update.path;
        },
    },

    provide() {
        return {
            columnSize: this.columnSize,
            create: this.create,
            customFields: this.customFields,
            customSections: this.customSections,
            dirty: this.dirty,
            undo: this.undo,
            destroy: this.destroy,
            errors: this.errors,
            errorCount: this.errorCount,
            fieldBindings: this.fieldBindings,
            fieldType: this.fieldType,
            focusError: this.focusError,
            hasVisibleFields: this.hasVisibleFields,
            i18n: this.i18n,
            locale: this.locale,
            params: this.params,
            sections: this.sections,
            show: this.show,
            state: this.state,
            sectionFields: this.sectionFields,
            sectionCustomFields: this.sectionCustomFields,
            submit: this.submit,
            tabbed: this.tabbed,
            tabs: this.tabs,
        };
    },

    created() {
        this.init();
    },

    methods: {
        init() {
            if (this.template) {
                this.state.data = this.template;
                this.$emit('ready', { form: this });

                return;
            }

            this.fetch();
        },
        fetch() {
            this.state.loading = true;

            axios.get(this.path, { params: this.params })
                .then(({ data }) => {
                    this.state.data = data.form;
                    this.setOriginal();
                    this.state.loading = false;
                    this.$emit('ready', { form: this });
                    this.$emit('loaded', data);
                }).catch((error) => {
                    this.state.loading = false;
                    this.errorHandler(error);
                });
        },
        show() {
            const { show } = this.state.data.actions;

            this.$emit('show');

            this.$router.push({
                name: show.route,
                params: this.state.data.routeParams,
            });
        },
        create() {
            this.$emit('create');

            this.$router.push({
                name: this.state.data.actions.create.route,
                params: this.state.data.routeParams,
            });
        },
        submit() {
            this.state.loading = true;

            axios[this.state.data.method](
                this.submitPath, { ...this.formData, _params: this.params },
            ).then(({ data }) => {
                this.state.loading = false;

                if (data.message) {
                    this.$toastr.success(data.message);
                }

                this.$emit('submit', data);

                this.setOriginal();

                if (data.redirect) {
                    this.$router.push({
                        name: data.redirect,
                        params: { ...data.param, ...this.state.data.routeParams },
                    });
                }
            }).catch((error) => {
                this.$emit('error', error);
                const { status, data } = error.response;
                this.state.loading = false;

                if (status === 422) {
                    this.errors.set(data.errors);
                    this.$nextTick(this.focusError);
                    return;
                }

                this.errorHandler(error);
            });
        },
        destroy() {
            this.modal = false;
            this.state.loading = true;

            axios.delete(this.state.data.actions.destroy.path)
                .then(({ data }) => {
                    this.state.loading = false;

                    if (data.message) {
                        this.$toastr.success(data.message);
                    }

                    this.$emit('destroy');

                    if (data.redirect) {
                        this.$router.push({
                            name: data.redirect,
                            params: this.state.data.routeParams,
                        });
                    }
                }).catch((error) => {
                    this.state.loading = false;
                    this.errorHandler(error);
                });
        },
        customFields() {
            return this.state.data.sections
                .reduce((fields, section) => fields
                    .concat(section.fields.filter(field => field.meta.custom)), []);
        },
        customSections() {
            return this.state.data.sections
                .filter(({ columns }) => columns === 'slot');
        },
        tabs() {
            return this.state.data.tabs
                ? this.state.data.sections.reduce((tabs, section) => {
                    if (!tabs.includes(section.tab) && this.hasVisibleFields(section)) {
                        tabs.push(section.tab);
                    }
                    return tabs;
                }, [])
                : [];
        },
        columnSize(columns) {
            return `is-${parseInt(12 / columns, 10)}`;
        },
        sectionFields(section) {
            return section.fields.filter(field => !field.meta.hidden);
        },
        sectionCustomFields(section) {
            return section.fields.filter(field => !field.meta.hidden && field.meta.custom);
        },
        errorCount(tab) {
            return this.sections(tab).reduce((fields, section) => {
                fields.push(...section.fields);
                return fields;
            }, []).filter(({ name }) => this.errors.has(name)).length;
        },
        sections(tab) {
            return this.state.data.sections
                .filter(section => section.tab === tab);
        },
        field(field) {
            return this.flatten
                .find(item => item.name === field);
        },
        param(param) {
            return this.state.data.params[param];
        },
        routeParam(param) {
            return this.state.data.routeParams[param];
        },
        hasVisibleFields(section) {
            return section.fields
                .some(field => !field.meta.hidden);
        },
        focusError() {
            this.$el.querySelector('.help.is-danger')
                .scrollIntoView({ behavior: 'smooth', block: 'center' });
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
                case 'text': case 'number': case 'email': case 'password':
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
                throw new Error(`Misconfigured field "${this.field.name}"`);
            }
        },
        fill(data) {
            Object.keys(data).forEach(key => (this.field(key).value = data[key]));
        },
        setOriginal() {
            this.original = JSON.stringify(this.formData);
        },
        undo() {
            this.fill(JSON.parse(this.original));
            this.$emit('undo');
        },
        dirty() {
            return !this.disableState && this.original
                && JSON.stringify(this.formData) !== this.original;
        },
        hideTab(tab) {
            this.sections(tab).forEach(({ fields }) => fields
                .forEach(({ name }) => (this.field(name).meta.hidden = true)));
            this.$forceUpdate();
        },
        showTab(tab) {
            this.sections(tab).forEach(({ fields }) => fields
                .forEach(({ name }) => (this.field(name).meta.hidden = false)));
            this.$forceUpdate();
        },
    },

    render() {
        return this.$slots.default;
    },
};
</script>

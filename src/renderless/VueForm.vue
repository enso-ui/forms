<script>
import Errors from '../classes/Errors';

export default {
    props: {
        data: {
            type: Object,
            required: true,
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
    }),

    computed: {
        customFields() {
            return this.data.sections
                .reduce((fields, section) => fields
                    .concat(section.fields.filter(field => field.meta.custom)), []);
        },
        formData() {
            return this.data.sections
                .reduce((fields, section) => fields
                    .concat(section.fields), [])
                .reduce((object, field) => {
                    object[field.name] = field.value;
                    return object;
                }, { _params: this.params });
        },
        flatten() {
            return this.data.sections
                .reduce((fields, section) => fields
                    .concat(section.fields), []);
        },
        tabs() {
            return this.data.tabs
                ? this.data.sections.reduce((tabs, { tab }) => {
                    if (!tabs.includes(tab)) {
                        tabs.push(tab);
                    }
                    return tabs;
                }, [])
                : [];
        },
        submitPath() {
            return this.data.method === 'post'
                ? this.data.actions.store.path
                : this.data.actions.update.path;
        },
    },

    provide() {
        return {
            data: this.data,
            errors: this.errors,
            errorCount: this.errorCount,
            fieldBindings: this.fieldBindings,
            sections: this.sections,
            columnSize: this.columnSize,
            sectionFields: this.sectionFields,
            tabbed: this.tabbed,
            tabs: this.tabs,
            locale: this.locale,
            i18n: this.i18n,
            hasVisibleFields: this.hasVisibleFields,
            customFields: this.customFields,
            params: this.params,
            focusError: this.focusError,
            submit: this.submit,
            show: this.show,
            create: this.create,
            destroy: this.destroy,
            fieldType: this.fieldType,
        };
    },

    mounted() {
        this.$emit('ready');
    },

    methods: {
        fetch() {
            axios.get(this.path, { params: this.params })
                .then(({ data }) => {
                    this.data = data.form;
                    this.$emit('loaded', data.form);
                }).catch(error => this.errorHandler(error));
        },
        show() {
            const { show } = this.data.actions;

            this.$emit('show');

            this.$router.push({
                name: show.route,
                params: this.data.routeParams,
            });
        },
        create() {
            this.$emit('create');

            this.$router.push({
                name: this.data.actions.create.route,
                params: this.data.routeParams,
            });
        },
        submit() {
            this.loading = true;

            axios[this.data.method](this.submitPath, this.formData)
                .then(({ data }) => {
                    this.loading = false;
                    this.$toastr.success(data.message);
                    this.$emit('submit');

                    if (data.redirect) {
                        this.$router.push({
                            name: data.redirect,
                            params: { ...data.param, ...this.data.routeParams },
                        });
                    }
                }).catch((error) => {
                    const { status, data } = error.response;
                    this.loading = false;

                    if (status === 422) {
                        this.errors.set(data.errors);
                        this.$nextTick(this.focusError);
                        return;
                    }

                    this.handleError(error);
                });
        },
        destroy() {
            this.modal = false;
            this.loading = true;

            axios.delete(this.data.actions.destroy.path)
                .then(({ data }) => {
                    this.loading = false;
                    this.$toastr.success(data.message);
                    this.$emit('destroy');

                    if (data.redirect) {
                        this.$router.push({
                            name: data.redirect,
                            params: this.data.routeParams,
                        });
                    }
                }).catch((error) => {
                    this.loading = false;
                    this.handleError(error);
                });
        },
        columnSize(columns) {
            return `is-${parseInt(12 / columns, 10)}`;
        },
        sectionFields(section) {
            return section.fields.filter(field => !field.meta.hidden);
        },
        errorCount(tab) {
            return this.sections(tab).reduce((fields, section) => {
                fields.push(...section.fields);
                return fields;
            }, []).filter(({ name }) => this.errors.has(name)).length;
        },
        sections(tab) {
            return this.data.sections
                .filter(section => section.tab === tab);
        },
        field(field) {
            return this.flatten()
                .find(item => item.name === field);
        },
        param(param) {
            return this.data.params[param];
        },
        routeParam(param) {
            return this.data.routeParams[param];
        },
        hasVisibleFields(section) {
            return section.fields
                .some(field => !field.meta.hidden);
        },
        focusError() {
            this.$el.querySelector('.help.is-danger')
                .scrollIntoView({ behavior: 'smooth' });
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
    },

    render() {
        return this.$slots.default;
    },
};
</script>

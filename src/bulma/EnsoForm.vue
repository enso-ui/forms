<template>
    <vue-form :error-handler="errorHandler"
        :i18n="i18n"
        :locale="lang"
        :path="path"
        v-bind="$attrs"
        v-on="$listeners"
        @ready="init"
        ref="form">
        <template v-for="field in customFields"
            v-slot:[field.name]="props">
            <slot :name="field.name"
                v-bind="props"/>
        </template>
        <template v-for="section in customSections"
            v-slot:[section.slot]="props">
            <slot :name="section.slot"
                v-bind="props"/>
        </template>
        <template v-slot:actions>
            <slot name="actions"/>
        </template>
    </vue-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import VueForm from './VueForm.vue';

export default {
    name: 'EnsoForm',

    components: { VueForm },

    inject: ['errorHandler', 'i18n'],

    props: {
        path: {
            type: String,
            default() {
                return route(this.$route.name, this.$route.params, false);
            },
        },
    },

    data: () => ({
        ready: false,
    }),

    computed: {
        ...mapGetters('preferences', ['lang']),
        ...mapGetters('bookmarks', ['state']),
        customFields() {
            return this.ready
                ? this.$refs.form.customFields
                : [];
        },
        customSections() {
            return this.ready
                ? this.$refs.form.customSections
                : [];
        },
        data() {
            return this.ready
                ? this.$refs.form.data
                : [];
        },
        formData() {
            return this.ready
                ? this.$refs.form.formData
                : [];
        },
        dirty() {
            return this.ready
                ? this.$refs.form.dirty
                : false;
        },
        errors() {
            return this.ready
                ? this.$refs.form.errors
                : null;
        },
    },

    watch: {
        formData: {
            handler(formData) {
                if (this.dirty) {
                    this.updateState({ bookmark: this.$route, data: formData });
                    return;
                }

                this.updateState({ bookmark: this.$route });
            },
            deep: true,
        },
        dirty(dirty) {
            if (!dirty) {
                this.updateState({ bookmark: this.$route });
            }
        },
    },

    methods: {
        ...mapMutations('bookmarks', ['updateState']),
        init() {
            this.ready = true;
            const state = this.state(this.$route);

            if (state) {
                this.fill(state);
            }
        },
        fetch() {
            return this.ready
                && this.$refs.form.fetch();
        },
        submit() {
            return this.ready
                && this.$refs.form.submit();
        },
        field(field) {
            return this.ready
                && this.$refs.form.field(field);
        },
        param(param) {
            return this.ready
                && this.$refs.form.param(param);
        },
        routeParam(param) {
            return this.ready
                && this.$refs.form.routeParam(param);
        },
        fill(state) {
            return this.ready
                ? this.$refs.form.fill(state)
                : null;
        },
    },
};
</script>

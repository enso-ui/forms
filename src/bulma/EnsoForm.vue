<template>
    <vue-form :error-handler="errorHandler"
        :i18n="i18n"
        :locale="lang"
        :path="path"
        :disable-state="disableState"
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
        disableState: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        ready: false,
    }),

    computed: {
        ...mapGetters('preferences', ['lang', 'bookmarks']),
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
                if (this.disableState || !this.bookmarks) {
                    return;
                }

                if (!this.dirty) {
                    this.updateState({ bookmark: this.$route });
                    return;
                }

                this.updateState({
                    bookmark: this.$route,
                    data: JSON.parse(JSON.stringify(formData)),
                });
            },
            deep: true,
        },
        dirty(dirty) {
            if (!this.disableState && !dirty && this.bookmarks) {
                this.updateState({ bookmark: this.$route });
            }
        },
    },

    methods: {
        ...mapMutations('bookmarks', ['updateState']),
        init() {
            this.ready = true;

            if (this.disableState || !this.bookmarks) {
                return;
            }

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
        setOriginal() {
            return this.ready
                && this.$refs.form.setOriginal();
        },
        hideTab(tab) {
            return this.ready
                ? this.$refs.form.hideTab(tab)
                : null;
        },
        showTab(tab) {
            return this.ready
                ? this.$refs.form.showTab(tab)
                : null;
        },
    },
};
</script>

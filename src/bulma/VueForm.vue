<template>
    <core-form v-bind="$attrs"
        v-on="$listeners"
        @ready="ready = true"
        ref="coreForm">
        <template v-slot:default
            v-if="ready">
            <form-content v-on="$listeners">
                <template v-for="field in customFields"
                    v-slot:[field.name]="props">
                    <slot :name="field.name"
                        v-bind="props">
                        <form-field v-bind="props"/>
                    </slot>
                </template>
                <template v-for="section in customSections"
                    v-slot:[section.slot]="props">
                    <slot :name="section.slot"
                        v-bind="props"/>
                </template>
                <template v-for="actions in ['actions-right', 'actions-left']"
                          v-slot:[actions]>
                    <slot :name="actions"/>
                </template>
            </form-content>
        </template>
    </core-form>
</template>

<script>
import CoreForm from '../renderless/CoreForm.vue';
import FormContent from './parts/FormContent.vue';
import FormField from './parts/FormField.vue';

export default {
    name: 'VueForm',

    components: { CoreForm, FormContent, FormField },

    data: () => ({
        ready: false,
    }),

    computed: {
        customFields() {
            return this.ready
                ? this.$refs.coreForm.customFields()
                : [];
        },
        customSections() {
            return this.ready
                ? this.$refs.coreForm.customSections()
                : [];
        },
        data() {
            return this.ready
                ? this.$refs.coreForm.state.data
                : [];
        },
        formData() {
            return this.ready
                ? this.$refs.coreForm.formData
                : [];
        },
        dirty() {
            return this.ready
                ? this.$refs.coreForm.dirty()
                : false;
        },
        errors() {
            return this.ready
                ? this.$refs.coreForm.errors
                : null;
        },
    },

    methods: {
        fetch() {
            return this.ready
                && this.$refs.coreForm.fetch();
        },
        submit() {
            return this.ready
                && this.$refs.coreForm.submit();
        },
        field(field) {
            return this.ready
                && this.$refs.coreForm.field(field);
        },
        param(param) {
            return this.ready
                && this.$refs.coreForm.param(param);
        },
        routeParam(param) {
            return this.ready
                && this.$refs.coreForm.routeParam(param);
        },
        fill(state) {
            return this.ready
                && this.$refs.coreForm.fill(state);
        },
        setOriginal() {
            return this.ready
                && this.$refs.coreForm.setOriginal();
        },
        undo() {
            return this.ready
                && this.$refs.coreForm.undo();
        },
        hideTab(tab) {
            return this.ready
                && this.$refs.coreForm.hideTab(tab);
        },
        showTab(tab) {
            return this.ready
                && this.$refs.coreForm.showTab(tab);
        },
        hideField(field) {
            return this.ready
                && this.$refs.coreForm.hideField(field);
        },
        showField(field) {
            return this.ready
                && this.$refs.coreForm.showField(field);
        },
    },
};
</script>

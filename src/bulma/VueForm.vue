<template>
    <data-provider v-bind="$attrs"
        method="get">
        <template v-slot:default="{ data }">
            <core-form v-bind="$attrs"
                :data="data"
                v-on="$listeners"
                @ready="ready = true"
                ref="coreForm"
                v-if="data">
                <template v-slot:default>
                    <form-content v-if="ready">
                        <template v-for="field in customFields"
                            v-slot:[field.name]>
                            <slot :name="field.name"
                                v-bind="fieldBindings(field)"/>
                        </template>
                    </form-content>
                    <span v-else/>
                </template>
            </core-form>
            <span v-else/>
        </template>
    </data-provider>
</template>

<script>
import DataProvider from './DataProvider.vue';
import CoreForm from '../renderless/VueForm.vue';
import FormContent from './parts/FormContent.vue';

export default {
    name: 'VueForm',

    components: { DataProvider, CoreForm, FormContent },

    data: () => ({
        ready: false,
    }),

    computed: {
        customFields() {
            return this.ready
                ? this.$refs.coreForm.customFields
                : [];
        },
        tabbed() {
            return this.ready
                && this.$refs.coreForm.tabbed;
        },
        tabs() {
            return this.ready
                ? this.$refs.coreForm.tabs
                : [];
        },
    },

    methods: {
        field(field) {
            return this.ready
                && this.$refs.coreForm.field(field);
        },
        fieldBindings(field) {
            return this.ready
                && this.$refs.coreForm.fieldBindings(field);
        },
        param(param) {
            return this.ready
                && this.$refs.coreForm.param(param);
        },
        routeParam(param) {
            return this.ready
                && this.$refs.coreForm.routeParam(param);
        },
        hasVisibleFields(section) {
            return this.ready
                && this.$refs.coreForm.hasVisibleFields(section);
        },
    },
};
</script>

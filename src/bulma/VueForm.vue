<template>
    <data-provider v-bind="$attrs"
        method="get"
        ref="provider">
        <template v-slot:default="{ data }">
            <core-form v-bind="$attrs"
                :data="data"
                v-on="$listeners"
                @ready="ready = true"
                ref="coreForm"
                v-if="data">
                <template v-slot:default>
                    <form-content>
                        <template v-for="field in customFields"
                            v-slot:[field.name]="props">
                            <slot :name="field.name"
                                v-bind="props"/>
                        </template>
                    </form-content>
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
                ? this.$refs.coreForm.customFields()
                : [];
        },
    },

    methods: {
        fetch() {
            return this.ready
                && this.$refs.provider.fetch();
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
    },
};
</script>

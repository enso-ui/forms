<template>
    <core-form v-bind="$attrs"
        v-on="$listeners"
        @ready="ready = true"
        ref="coreForm">
        <template v-slot:default
            v-if="ready">
            <form-content>
                <template v-for="field in customFields"
                    v-slot:[field.name]="props">
                    <slot :name="field.name"
                        v-bind="props"/>
                </template>
            </form-content>
        </template>
    </core-form>
</template>

<script>
import CoreForm from '../renderless/VueForm.vue';
import FormContent from './parts/FormContent.vue';

export default {
    name: 'VueForm',

    components: { CoreForm, FormContent },

    data: () => ({
        ready: false,
    }),

    computed: {
        customFields() {
            return this.ready
                ? this.$refs.coreForm.customFields()
                : [];
        },
        data() {
            return this.ready
                ? this.$refs.coreForm.state.data
                : [];
        },
    },

    methods: {
        fetch() {
            return this.ready
                && this.$refs.coreForm.fetch();
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

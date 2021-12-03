<template>
    <vue-select v-bind="field.meta"
        v-model="field.value"
        :has-error="errors.has(field.name)"
        :i18n="i18n"
        :params="params"
        :pivot-params="pivotParams"
        :custom-params="customParams"
        :error-handler="errorHandler"
        @fetch="field.meta.options = $event"
        @input="errors.clear(field.name); $emit('changed')"
        ref="select"/>
</template>

<script>
import { VueSelect } from '@enso-ui/select/bulma';

export default {
    name: 'SelectField',

    components: { VueSelect },

    inject: ['errorHandler'],

    props: {
        errors: {
            type: Object,
            required: true,
        },
        field: {
            type: Object,
            required: true,
        },
        i18n: {
            type: Function,
            required: true,
        },
        customParams: {
            type: Object,
            default: () => ({}),
        },
        params: {
            type: Object,
            default: () => ({}),
        },
        pivotParams: {
            type: Object,
            default: () => ({}),
        },
    },

    emits: ['changed'],

    computed: {
        selection() {
            return this.$refs.select.selection;
        },
    },

    methods: {
        clear() {
            this.$refs.select.clear();
        },
        fetch() {
            this.$refs.select.fetch();
        },
    },
};
</script>

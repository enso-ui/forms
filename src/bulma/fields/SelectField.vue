<template>
    <vue-select v-model="field.value"
        :has-error="errors.has(field.name)"
        :i18n="i18n"
        :params="params"
        :pivot-params="pivotParams"
        :custom-params="customParams"
        v-bind="field.meta"
        v-on="$listeners"
        @fetch="field.meta.options = $event"
        @input="errors.clear(field.name); $emit('changed')"
        ref="select"/>
</template>

<script>
import { VueSelect } from '@enso-ui/select/bulma';

export default {
    name: 'SelectField',

    components: { VueSelect },

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

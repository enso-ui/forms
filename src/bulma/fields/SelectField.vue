<template>
    <vue-select v-bind="meta"
        v-model="field.value"
        :has-error="errors.has(field.name)"
        :http="http"
        :i18n="i18n"
        :params="field.meta.params ? field.meta.params : params"
        :pivot-params="field.meta.pivotParams ? field.meta.pivotParams : pivotParams"
        :custom-params="field.meta.customParams ? field.meta.customParams : customParams"
        :error-handler="errorHandler"
        @fetch="field.meta.options = $event"
        @update:model-value="errors.clear(field.name); $emit('changed')"
        ref="select">
        <template v-if="$slots.selection"
            #selection="props">
            <slot name="selection"
                v-bind="props"/>
        </template>
        <template v-if="$slots.option"
            #option="props">
            <slot name="option"
                v-bind="props"/>
        </template>
    </vue-select>
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
        http: {
            default: null,
            type: Function,
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
        readonly: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['changed'],

    computed: {
        selection() {
            return this.$refs.select.selection;
        },
        meta() {
            return {
                ...this.field.meta,
                readonly: this.readonly || this.field.meta.readonly === true,
            };
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

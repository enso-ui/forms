<template>
    <datepicker v-bind="{ ...field.meta, placeholder: i18n(field.meta.placeholder) }"
        v-model="field.value"
        :alt-input="!!field.meta.altFormat"
        :is-danger="errors.has(field.name)"
        :locale="locale"
        :time-only="timeOnly"
        @update:model-value="errors.clear(field.name); $emit('changed')"
        ref="datepicker"/>
</template>

<script>
import { Datepicker } from '@enso-ui/datepicker/bulma';

export default {
    name: 'DateField',

    components: { Datepicker },

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
        locale: {
            type: String,
            required: true,
        },
        timeOnly: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['changed'],

    methods: {
        clear() {
            this.$refs.datepicker.clear();
        },
    },
};
</script>

<template>
    <datepicker v-model="field.value"
        :disabled="field.meta.disabled"
        :format="field.meta.format"
        :is-danger="errors.has(field.name)"
        :locale="locale"
        :placeholder="i18n(field.meta.placeholder)"
        :week-numbers="field.meta.weekNumbers"
        :min="field.meta.min"
        :max="field.meta.max"
        :time="field.meta.time"
        :time-only="timeOnly"
        @input="errors.clear(field.name)"
        @keydown="$emit('update');"/>
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
};
</script>

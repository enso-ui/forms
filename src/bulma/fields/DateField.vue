<template>
    <datepicker v-model="field.value"
        :is-danger="errors.has(field.name)"
        :locale="locale"
        v-bind="{ ...field.meta, placeholder: i18n(field.meta.placeholder) }"
        v-on="$listeners"
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

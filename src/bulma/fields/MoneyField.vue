<template>
    <div :class="['control', { 'has-icons-right': errors.has(field.name) }]">
        <money :class="['input', { 'is-danger': errors.has(field.name) }]"
            v-bind="{ ...field.meta, placeholder: i18n(field.meta.placeholder) }"
            v-model="field.value"
            @update:model-value="errors.clear(field.name); $emit('changed')"/>
            <error-icon v-if="errors.has(field.name)"/>
    </div>
</template>

<script>
import Money from '@enso-ui/money';
import ErrorIcon from '../parts/ErrorIcon.vue';

export default {
    name: 'MoneyField',

    components: { Money, ErrorIcon },

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
    },

    emits: ['changed'],
};
</script>

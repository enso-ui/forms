<template>
    <div class="control is-flex is-align-items-center pl-1">
        <input type="checkbox"
            v-model="field.value"
            :name="field.name"
            :aria-label="i18n(field.label || field.name)"
            :aria-invalid="errors.has(field.name)"
            :disabled="field.meta.disabled || readonly || field.meta.readonly"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
            @change="errors.clear(field.name); $emit('changed')">
    </div>
</template>

<script>
export default {
    name: 'CheckboxField',

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
            default: key => key,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['blur', 'changed', 'focus'],
};
</script>

<style lang="scss" scoped>
.control {
    min-height: var(--bulma-control-height);
}
</style>

<template>
    <div :class="['control', { 'has-icons-right': errors.has(field.name) }]">
        <input :class="['input', { 'is-danger': errors.has(field.name) }]"
            v-model.number="field.value"
            :type="field.meta.content"
            v-bind="{ ...field.meta, placeholder: i18n(field.meta.placeholder) }"
            v-on="$listeners"
            @input="errors.clear(field.name); $emit('changed')"
            v-if="field.meta.content === 'number'">
        <input :class="['input', { 'is-danger': errors.has(field.name) }]"
            v-model="field.value"
            :type="field.meta.content"
            v-bind="{ ...field.meta, placeholder: i18n(field.meta.placeholder) }"
            v-on="$listeners"
            @input="errors.clear(field.name); $emit('changed')"
            v-else>
        <error-icon v-if="errors.has(field.name)"/>
    </div>
</template>

<script>
import ErrorIcon from '../parts/ErrorIcon.vue';

export default {
    name: 'InputField',

    components: { ErrorIcon },

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
};
</script>

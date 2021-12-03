<template>
    <div :class="['control', { 'has-icons-right': errors.has(field.name) || password }]">
        <input :class="['input', { 'is-danger': errors.has(field.name) }]"
            v-model.number="field.value"
            v-bind="{ ...field.meta, placeholder: i18n(field.meta.placeholder) }"
            :type="field.meta.content"
            @input="errors.clear(field.name); $emit('changed')"
            v-if="field.meta.content === 'number'">
        <input :class="['input', { 'is-danger': errors.has(field.name) }]"
            v-model="field.value"
            v-bind="{ ...field.meta, placeholder: i18n(field.meta.placeholder) }"
            :type="type"
            @input="errors.clear(field.name); $emit('changed')"
            v-else>
        <reveal-password :meta="field.meta"
            v-if="reveal"/>
        <error-icon v-if="errors.has(field.name)"/>
    </div>
</template>

<script>
import ErrorIcon from '../parts/ErrorIcon.vue';
import RevealPassword from '../parts/RevealPassword.vue';

export default {
    name: 'InputField',

    components: { ErrorIcon, RevealPassword },

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

    data: v => ({
        password: v.field.meta.content === 'password',
    }),

    computed: {
        type() {
            return this.field.meta.content === 'encrypt'
                ? 'password'
                : this.field.meta.content;
        },
        reveal() {
            return this.password && this.field.value && this.field.meta.reveal;
        },
    },
};
</script>

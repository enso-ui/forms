<template>
    <div class="control has-icons-right">
        <textarea class="textarea"
            :class="[{ 'is-danger': errors.has(field.name) }, { 'fixed': !field.meta.resize }]"
            v-model="field.value"
            v-bind="{ ...field.meta, placeholder: i18n(field.meta.placeholder) }"
            @update:model-value="errors.clear(field.name); $emit('changed')"/>
        <error-icon v-if="errors.has(field.name)"/>
    </div>
</template>

<script>
import ErrorIcon from '../parts/ErrorIcon.vue';

export default {
    name: 'TextareaField',

    components: { ErrorIcon },

    inject: ['i18n', 'errors'],

    props: {
        field: {
            type: Object,
            required: true,
        },
    },

    emits: ['changed'],
};
</script>

<style lang="scss" scoped>

    .fixed {
        resize: none;
    }

</style>

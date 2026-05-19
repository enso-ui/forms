<template>
    <div class="control has-icons-right">
        <textarea class="textarea"
            :class="[{ 'is-danger': errors.has(field.name) }, { 'fixed': !field.meta.resize }]"
            v-model="field.value"
            v-bind="meta"
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
        readonly: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['changed'],

    computed: {
        meta() {
            return {
                ...this.field.meta,
                placeholder: this.i18n(this.field.meta.placeholder),
                readonly: this.readonly || this.field.meta.readonly === true,
            };
        },
    },
};
</script>

<style lang="scss" scoped>

    .fixed {
        resize: none;
    }

</style>

<template>
    <wysiwyg v-bind="field.meta"
        v-model="field.value"
        :api-key="field.meta.apiKey"
        :has-error="errors.has(field.name)"
        @update:model-value="errors.clear(field.name); emit('changed')"
        v-if="editing"/>
    <div class="wysiwyg-preview p-3"
        :class="{ 'is-filled': !!field.value }"
        v-else>
        <div class="wysiwyg-preview__actions">
            <button class="button"
                type="button"
                @click="editing = true">
                {{ i18n('edit') }}
            </button>
        </div>
        <div class="preview"
            v-html="field.value"/>
    </div>
</template>

<script setup>

import { inject, ref } from 'vue';
import Wysiwyg from '@enso-ui/wysiwyg/bulma';

defineProps({
    field: {
        type: Object,
        required: true,
    },
});

const errors = inject('errors');
const i18n = inject('i18n');

const emit = defineEmits(['changed']);
const editing = ref(false);

</script>
<style lang="scss">
.wysiwyg-preview {
    background-color: var(--bulma-scheme-main);
    border: 1px solid var(--bulma-border);
    border-radius: 0.75rem;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 300px;
    min-height: 4.5rem;

    &.is-filled {
        background-color: var(--bulma-scheme-main);
    }

    .wysiwyg-preview__actions {
        display: flex;
        justify-content: flex-end;
    }

    .preview {
        color: inherit;
        max-height: 300px;
        overflow-y: auto;
    }
}
</style>

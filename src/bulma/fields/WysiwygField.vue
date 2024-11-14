<template>
    <wysiwyg v-bind="field.meta"
        v-model="field.value"
        :api-key="field.meta.apiKey"
        :has-error="errors.has(field.name)"
        @update:model-value="errors.clear(field.name); emit('changed')"
        v-if="editing"/>
    <div class="wysiwyg-preview p-1"
        :class="{'has-background-white': !!field.value }"
        v-else>
        <button class="button is-small is-outlined edit"
            @click="editing = true">
            {{ i18n('edit') }}
        </button>
        <div class="preview"
            v-html="field.value"/>
    </div>
</template>

<script setup>

import {
    defineEmits, defineProps, inject, ref,
} from 'vue';
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
        max-height: 300px;
        position: relative;
        .button.edit {
            position: absolute;
            top: 0.3em;
            right: 0.3em;
        }
        .preview {
            max-height: 300px;
            overflow-y: auto;
        }
    }
</style>

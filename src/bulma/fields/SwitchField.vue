<template>
    <vue-switch class="is-large is-info"
        v-model="field.value"
        :disabled="field.meta.disabled || field.meta.readonly"
        @update:modelValue="errors.clear(field.name); $emit('changed')"/>
</template>

<script>
import VueSwitch from '@enso-ui/switch/bulma';

export default {
    name: 'SwitchField',

    components: { VueSwitch },

    props: {
        errors: {
            type: Object,
            required: true,
        },
        field: {
            type: Object,
            required: true,
        },
    },

    emits: ['changed'],
};
</script>

<style>
    .field .vue-switch {
        margin-top: 6px;
        margin-bottom: 6px;
    }
</style>

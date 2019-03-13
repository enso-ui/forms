<template>
    <vue-switch class="is-large is-info"
        v-model="field.value"
        :disabled="field.meta.disabled || field.meta.readonly"
        v-on="$listeners"
        @click="$emit('update')"
        @input="errors.clear(field.name)"/>
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
};
</script>

<style>
    .field .vue-switch {
        margin-top: 0.4em;
    }
</style>

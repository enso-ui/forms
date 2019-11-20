<template>
    <wysiwyg v-model="field.value"
        :api-key="field.meta.apiKey"
        v-bind="field.meta"
        :plugins="field.meta.plugins"
        :has-error="errors.has(field.name)"
        v-on="$listeners"
        @input="errors.clear(field.name); $emit('changed')"/>
</template>

<script>
import Wysiwyg from '@enso-ui/wysiwyg/bulma';

export default {
    name: 'WysiwygField',

    components: { Wysiwyg },

    inject: ['errors'],

    props: {
        field: {
            type: Object,
            required: true,
        },
    },
};
</script>

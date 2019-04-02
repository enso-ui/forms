<template>
    <wysiwyg v-model="field.value"
        :readonly="field.meta.readonly"
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

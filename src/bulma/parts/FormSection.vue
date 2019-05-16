<template>
    <div class="columns is-multiline has-margin-bottom-large">
        <div class="column is-12"
            v-if="section.divider">
            <divider class="has-margin-bottom-medium"
                :title="i18n(section.title)"
                :placement="state.data.dividerTitlePlacement"/>
        </div>
        <div v-for="field in sectionFields(section)"
            class="column"
            :class="section.columns !== 'custom'
                ? columnSize(section.columns)
                : `is-${field.column}`"
            :key="field.name"
            v-else>
            <slot :name="field.name"
                v-if="field.meta.custom"/>
            <form-field :field="field"
                v-on="$listeners"
                v-else/>
        </div>
    </div>
</template>

<script>
import Divider from '@enso-ui/divider';
import FormField from './FormField.vue';

export default {
    name: 'FormSection',

    components: { FormField, Divider },

    inject: ['state', 'i18n', 'errors', 'sectionFields', 'columnSize'],

    props: {
        section: {
            type: Object,
            required: true,
        },
    },
};
</script>

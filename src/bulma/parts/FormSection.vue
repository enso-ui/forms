<template>
    <div class="columns is-multiline has-margin-bottom-large">
        <div class="column is-12"
            v-if="section.divider">
            <divider class="has-margin-bottom-medium"
                :title="i18n(section.title)"
                :placement="data.dividerTitlePlacement"/>
        </div>
        <div v-for="field in sectionFields(section)"
            class="column"
            :class="section.columns !== 'custom'
                ? columnSize(section.columns)
                : `is-${field.column}`"
            :key="field.name">
            <form-field :field="field"
                v-on="$listeners">
                <template v-slot:[field.name]
                    v-if="field.meta.custom">
                    <slot :name="field.name"/>
                </template>
            </form-field>
        </div>
    </div>
</template>

<script>
import Divider from '@enso-ui/divider';
import FormField from './FormField.vue';

export default {
    name: 'FormSection',

    components: { FormField, Divider },

    inject: ['data', 'i18n', 'errors', 'sectionFields', 'columnSize'],

    props: {
        section: {
            type: Object,
            required: true,
        },
    },
};
</script>

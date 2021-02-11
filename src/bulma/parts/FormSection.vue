<template>
    <div>
        <div class="section-divider"
            v-if="section.divider">
            <divider class="has-margin-bottom-medium"
                :title="i18n(section.title)"
                :placement="state.data.dividerTitlePlacement"/>
        </div>
        <div class="columns has-margin-bottom-large is-multiline"
            v-for="(fields, index) in fieldChunks(section)"
            :key="`chunk-${index}`">
            <div v-for="field in fields"
                class="column"
                :class="section.columns === 'custom' && `is-${field.column}`"
                :key="field.name">
                <template v-if="field.dummy"/>
                <slot :name="field.name"
                    v-else-if="field.meta.custom"/>
                <form-field :field="field"
                    v-on="$listeners"
                    v-else/>
            </div>
        </div>
    </div>
</template>

<script>
import Divider from '@enso-ui/divider';
import FormField from './FormField.vue';

export default {
    name: 'FormSection',

    components: { FormField, Divider },

    inject: ['state', 'i18n', 'fieldChunks'],

    props: {
        section: {
            type: Object,
            required: true,
        },
    },
};
</script>
<style>
.section-divider {
    width: 100%;
    padding: 0.75rem;
}
</style>

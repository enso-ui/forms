<template>
    <div>
        <form-header/>
        <form class="is-marginless"
            @submit.prevent>
            <form-tabs v-on="$listeners"
                v-if="state.data.tabs">
                <template v-for="field in customFields()"
                    v-slot:[field.name]>
                    <slot :name="field.name"
                        v-bind="fieldBindings(field)"/>
                </template>
            </form-tabs>
            <template v-for="(section, index) in state.data.sections"
                v-else>
                <form-section :key="index"
                    :section="section"
                    v-if="hasVisibleFields(section)">
                    <template v-for="field in sectionCustomFields(section)"
                        v-slot:[field.name]>
                        <slot :name="field.name"
                            v-bind="fieldBindings(field)"/>
                    </template>
                    <template v-if="section.columns === 'slot'"
                        v-slot:[section.slot]="props">
                        <slot :name="section.slot"
                            v-bind="props"/>
                    </template>
                </form-section>
            </template>
            <form-actions class="has-margin-top-large"
                v-on="$listeners">
                <template v-slot:actions>
                    <slot name="actions"/>
                </template>
            </form-actions>
        </form>
    </div>
</template>

<script>
import FormHeader from './FormHeader.vue';
import FormTabs from './FormTabs.vue';
import FormActions from './FormActions.vue';
import FormSection from './FormSection.vue';

export default {
    name: 'FormContent',

    components: {
        FormHeader, FormTabs, FormActions, FormSection,
    },

    inject: [
        'state', 'fieldBindings', 'customFields', 'sectionCustomFields', 'hasVisibleFields',
    ],
};
</script>

<style lang="scss">
    .form-tabs {
        position: relative;
        z-index: 1;
    }

    .tag.error-count {
        padding: 0.5em;
        margin-left: 0.3em;
    }
</style>

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
                <template v-for="section in customSections()"
                    v-slot:[section.slot]>
                    <slot :name="section.slot"
                        :section="section"/>
                </template>
            </form-tabs>
            <template v-for="(section, index) in state.data.sections"
                v-else>
                <slot :name="section.slot"
                    :section="section"
                    v-if="section.columns === 'slot'"/>
                <form-section :key="index"
                    :section="section"
                    v-else-if="visibleSection(section)">
                    <template v-for="field in sectionCustomFields(section)"
                        v-slot:[field.name]>
                        <slot :name="field.name"
                            v-bind="fieldBindings(field)"/>
                    </template>
                </form-section>
            </template>
            <form-actions class="mt-3"
                v-on="$listeners"
                v-if="!state.data.autosave">
                <template v-for="actions in ['actions-right', 'actions-left']"
                    v-slot:[actions]>
                    <slot :name="actions"/>
                </template>
            </form-actions>
        </form>
    </div>
</template>

<script>
import FormTabs from './FormTabs.vue';
import FormHeader from './FormHeader.vue';
import FormActions from './FormActions.vue';
import FormSection from './FormSection.vue';

export default {
    name: 'FormContent',

    components: {
        FormHeader, FormTabs, FormActions, FormSection,
    },

    inject: [
        'state', 'fieldBindings', 'customSections', 'customFields',
        'sectionCustomFields', 'visibleSection',
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

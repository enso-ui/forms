<template>
    <div>
        <form-header/>
        <form class="is-marginless">
            <form-tabs v-on="$listeners"
                v-if="data.tabs"/>
            <template v-for="(section, index) in data.sections"
                v-else>
                <form-section :key="index"
                    :section="section">
                    <template v-for="field in customFields"
                        v-slot:[field.name]>
                        <slot :name="field.name"
                            v-bind="fieldBindings(field)"/>
                    </template>
                </form-section>
            </template>
            <slot name="body"/>
            <form-actions class="has-margin-top-large"
                v-on="$listeners">
                <template slot="actions">
                    <slot name="actions"/>
                </template>
            </form-actions>
        </div></form></template></form-section></template></form>
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

    inject: ['data', 'fieldBindings', 'customFields'],
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

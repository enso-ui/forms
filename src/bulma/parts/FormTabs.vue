<template>
    <tabs class="form-tabs"
        v-on="$listeners">
        <template v-slot:label="{ tab }">
            {{ i18n(tab) }}
            <span class="tag is-danger is-small error-count"
                v-if="errorCount(tab)">
                {{ errorCount(tab) }}
            </span>
        </template>
        <tab keep-alive
            :id="tab"
            :key="tab"
            v-for="tab in tabs()">
            <template v-for="(section, index) in sections(tab)">
                <slot :name="section.slot"
                    v-if="section.columns === 'slot'"/>
                <form-section :key="index"
                    :section="section"
                    v-else-if="!section.hidden">
                    <template v-for="field in sectionCustomFields(section)"
                        v-slot:[field.name]>
                        <slot :name="field.name"
                            v-bind="fieldBindings(field)"/>
                    </template>
                </form-section>
            </template>
        </tab>
    </tabs>
</template>

<script>
import { EnsoTabs as Tabs, Tab } from '@enso-ui/tabs/bulma';
import FormSection from './FormSection.vue';

export default {
    name: 'FormTabs',

    components: { Tabs, Tab, FormSection },

    inject: [
        'errorCount', 'fieldBindings', 'sectionCustomFields',
        'i18n', 'sections', 'tabs',
    ],
};
</script>

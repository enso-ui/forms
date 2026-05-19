<template>
    <tabs class="form-tabs"
        :model-value="activeTab"
        @update:model-value="activate">
        <template #label="{ tab }">
            {{ i18n(tab) }}
            <span class="tag is-danger is-small error-count"
                v-if="errorCount(tab)">
                {{ errorCount(tab) }}
            </span>
        </template>
        <tab keep-alive
            :id="tab"
            :key="tab"
            v-bind="$attrs"
            v-for="tab in tabs()">
            <template v-for="(section, index) in sections(tab)">
                <slot :name="section.slot"
                    :readonly="isReadonly()"
                    v-if="section.columns === 'slot'"/>
                <form-section :key="index"
                    :section="section"
                    v-else-if="visibleSection(section)">
                    <template v-for="field in sectionCustomFields(section)"
                        #[field.name]>
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
        'errorCount', 'fieldBindings', 'i18n', 'isReadonly', 'routerErrorHandler',
        'sectionCustomFields', 'sections', 'tabs', 'visibleSection',
    ],

    data: () => ({
        activeTab: null,
    }),

    mounted() {
        this.syncFromRoute();
    },

    updated() {
        this.ensureValidTab();
    },

    watch: {
        '$route.query.tab': 'syncFromRoute',
    },

    methods: {
        activate(tab) {
            if (!this.tabs().includes(tab)) {
                return;
            }

            this.activeTab = tab;
            this.replaceTab(tab);
        },
        replaceTab(tab) {
            if (this.$route.query.tab === tab) {
                return;
            }

            this.$router.replace({
                name: this.$route.name,
                params: this.$route.params,
                query: { ...this.$route.query, tab },
            }).catch(this.routerErrorHandler);
        },
        ensureValidTab() {
            const tabs = this.tabs();

            if (!tabs.length) {
                return;
            }

            if (!tabs.includes(this.activeTab)
                || (this.$route.query.tab && !tabs.includes(this.$route.query.tab))) {
                this.syncFromRoute();
            }
        },
        syncFromRoute() {
            const tabs = this.tabs();

            if (!tabs.length) {
                return;
            }

            const tab = tabs.includes(this.$route.query.tab)
                ? this.$route.query.tab
                : tabs[0];

            this.activeTab = tab;
            this.replaceTab(tab);
        },
    },
};
</script>

<template>
    <div class="section-wrapper">
        <divider class="mt-5 mb-5"
            :title="i18n(section.title)"
            :placement="state.data.dividerTitlePlacement"
            v-if="section.divider"/>
        <div class="columns mb-3 is-multiline"
            v-for="row in rows"
            :key="`${section.id}-${row}`">
            <div class="column"
                v-for="column in columns"
                :class="cssClass(row, column)"
                :key="index(row, column)">
                <template v-if="index(row, column) < fields.length">
                    <slot :name="fields[index(row, column)].name"
                        v-if="fields[index(row, column)].meta.custom"/>
                    <form-field :field="fields[index(row, column)]"
                        v-bind="$attrs"
                        v-else/>
                </template>
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

    inject: ['state', 'i18n'],

    props: {
        section: {
            type: Object,
            required: true,
        },
    },

    computed: {
        columns() {
            const { columns } = this.section;

            return columns === 'custom' ? this.fields.length : columns;
        },
        fields() {
            return this.section.fields
                .filter(({ meta: { hidden } }) => hidden !== true);
        },
        rows() {
            const { columns } = this.section;

            return columns === 'custom' ? 1 : Math.ceil(this.fields.length / columns);
        },
    },

    methods: {
        cssClass(row, column) {
            const { columns } = this.section;

            return columns === 'custom'
                ? `is-${this.fields[this.index(row, column)].column}`
                : null;
        },
        index(row, column) {
            return (row - 1) * this.columns + column - 1;
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

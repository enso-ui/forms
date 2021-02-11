<template>
    <div class="section-wrapper">
        <divider class="mt-5 mb-5"
            :title="i18n(section.title)"
            :placement="state.data.dividerTitlePlacement"
            v-if="section.divider"/>
        <div class="columns has-margin-bottom-large is-multiline"
            v-for="row in rows"
            :key="`${section.id}-${row}`">
            <div class="column"
                v-for="column in columns"
                :class="cssClass(row, column)"
                :key="index(row, column)">
                <template v-if="index(row, column) < section.fields.length">
                    <slot :name="section.fields[index(row, column)].name"
                        v-if="section.fields[index(row, column)].meta.custom"/>
                    <form-field :field="section.fields[index(row, column)]"
                        v-on="$listeners"
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
            const { columns, fields } = this.section;

            return columns === 'custom' ? fields.length : columns;
        },
        rows() {
            const { columns, fields } = this.section;

            return columns === 'custom' ? 1 : Math.ceil(fields.length / columns);
        },
    },

    methods: {
        cssClass(row, column) {
            const { columns, fields } = this.section;

            return columns === 'custom'
                ? `is-${fields[this.index(row, column)].column}`
                : null;
        },
        index(row, column) {
            return (row - 1) * this.columns + column - 1;
        },
    }
};
</script>

<style>
.section-divider {
    width: 100%;
    padding: 0.75rem;
}
</style>

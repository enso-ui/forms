<template>
    <div class="form-field">
        <div class="field">
            <label class="label"
                v-if="state.data.labels">
                {{ i18n(field.label) }}
                <span class="icon is-small has-text-info"
                    v-tooltip="i18n(field.meta.tooltip)"
                    v-if="field.meta.tooltip">
                    <fa icon="info-circle"
                        size="xs"/>
                </span>
            </label>
        </div>
        <div :class="['field', { 'has-addons': hasAddons }, { 'is-grouped': isGrouped }]">
            <slot name="left"/>
            <div class="control is-expanded">
                <component :class="{ 'is-fullwidth': hasAddons }"
                    :is="fieldType(field)"
                    :field="field"
                    :errors="errors"
                    :i18n="i18n"
                    :locale="locale"
                    v-bind="$attrs"
                    @changed="autosave"
                    v-on="$listeners"
                    ref="field"/>
            </div>
            <slot name="right"/>
            <p class="help is-danger"
                v-if="errors.has(field.name)">
                {{ errors.get(field.name) }}
            </p>
        </div>
        <slot/>
    </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { VTooltip } from 'v-tooltip';
import SwitchField from '../fields/SwitchField.vue';
import InputField from '../fields/InputField.vue';
import MoneyField from '../fields/MoneyField.vue';
import DateField from '../fields/DateField.vue';
import TimeField from '../fields/TimeField.vue';
import SelectField from '../fields/SelectField.vue';
import TextareaField from '../fields/TextareaField.vue';
import WysiwygField from '../fields/WysiwygField.vue';

library.add(faInfoCircle);

export default {
    name: 'FormField',

    directives: { tooltip: VTooltip },

    components: {
        SwitchField,
        InputField,
        MoneyField,
        SelectField,
        DateField,
        TimeField,
        TextareaField,
        WysiwygField,
    },

    inject: ['fieldType', 'errors', 'i18n', 'locale', 'state', 'submit'],

    props: {
        field: {
            type: Object,
            required: true,
        },
        hasAddons: {
            type: Boolean,
            default: false,
        },
        isGrouped: {
            type: Boolean,
            default: false,
        },
    },

    created() {
        this.autosave = debounce(this.autosave, this.state.data.debounce);

        if (!this.state.data.labels && !this.field.meta.placeholder) {
            this.field.meta.placeholder = this.field.label;
        }
    },

    methods: {
        autosave() {
            if (this.state.data.autosave) {
                this.submit();
            }
        },
    },
};
</script>

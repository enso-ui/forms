<template>
    <dropdown class="dropdown-field" 
        v-bind="$attrs"
        v-on="$listeners"
        ref="dropdown">
        <template v-slot:label>
            <span class="tag is-bold is-small"
                :class="tagColor(field.value)">
                {{ label(field.value) }}
            </span>
        </template>
        <template v-slot:options>
            <a v-for="option in options"
                :key="option"
                class="dropdown-item"
                :class="{ 'is-active': option == field.value }"
                @click="$emit('input', option); field.value = parseInt(option, 10)">
                <span class="tag is-bold is-small"
                    :class="tagColor(option)">
                    {{ label(option) }}
                </span>
            </a>
        </template>
    </dropdown>
</template>

<script>
import { mapState } from 'vuex';
import Dropdown from '@enso-ui/dropdown/bulma';

export default {
    name: 'DropdownField',

    components: { Dropdown },

    props: {
        field: {
            type: Object,
            required: true,
        },
    },

    computed: {
        ...mapState(['enums']),
        options() {
            return this.enums[this.field.meta.options]._keys();
        }
    },
    
    methods: {
        label(item) {
            return this.enums[this.field.meta.options]._get(item);
        },
        tagColor(item) {
            return this.field.meta.style 
                ? this.enums[this.field.meta.style]._get(item) : null;
        }
    }
};
</script>
<style lang="scss">
    .dropdown-field {
        .dropdown-trigger.trigger-selector {
            min-width: 7em;
        }
    }
</style>

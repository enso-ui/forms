<template>
    <div class="level-item">
        <component :type="type"
            :is="tag"
            :class="['button', { 'is-loading': loading }, button.class]"
            :disabled="disabled || null"
            @click="$emit('click')">
            <span class="is-hidden-mobile">
                {{ i18n(button.label) }}
            </span>
            <span class="icon">
                <fa :icon="button.icon"/>
            </span>
            <span class="is-hidden"/>
        </component>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';

export default {
    name: 'Action',

    components: { Fa },

    inject: ['i18n'],

    props: {
        button: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        tag: {
            type: String,
            required: true,
            validator: v => ['a', 'button'].includes(v),
        },
    },

    emits: ['click'],

    computed: {
        type() {
            return this.tag === 'button'
                ? 'button'
                : null;
        },
    },
};
</script>

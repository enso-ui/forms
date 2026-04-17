<template>
    <div class="level is-mobile mb-0">
        <div class="level-left">
            <div class="level-item">
                <p class="title is-6 animate__animated animate__flash">
                    {{ i18n(actions.destroy.button.message) }}
                </p>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">    
                <a class="button"
                    @click="$emit('cancel')">
                    <span class="is-hidden-mobile">
                        {{ i18n('Cancel') }}
                    </span>
                    <span class="icon">
                        <fa :icon="faXmark"/>
                    </span>
                </a>    
                <a class="button is-dark ml-2"
                    @click="$emit('confirm')">
                    <span class="is-hidden-mobile">
                        {{ i18n(actions.destroy.button.label) }}
                    </span>
                    <span class="icon">
                        <fa :icon="faCheck"/>
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

export default {
    name: 'Confirmation',

    components: { Fa },

    inject: ['i18n', 'state'],

    emits: ['cancel', 'confirm'],

    data: () => ({
        faCheck,
        faXmark,
    }),

    computed: {
        actions() {
            return this.state.data.actions;
        },
    },
};
</script>

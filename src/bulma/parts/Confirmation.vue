<template>
    <div class="level mb-0">
        <div class="level-left">
            <p class="title is-6 animate__animated animate__flash mb-2">
                {{ i18n(actions.destroy.button.message) }}
            </p>
        </div>
        <div class="level-left">
            <div class="level-item">
                <div class="level is-mobile mb-0">
                    <div class="level-item">
                        <a class="button is-warning"
                            @click="$emit('cancel')">
                            <span class="is-hidden-mobile">
                                {{ i18n('Cancel') }}
                            </span>
                            <span class="icon">
                                <fa :icon="faXmark"/>
                            </span>
                        </a>
                    </div>
                    <div class="level-item">
                        <a class="button is-danger"
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

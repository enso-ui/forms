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
                                <fa icon="times"/>
                            </span>
                            <span class="is-hidden"/>
                        </a>
                    </div>
                    <div class="level-item">
                        <a class="button is-danger"
                            @click="$emit('confirm')">
                            <span class="is-hidden-mobile">
                                {{ i18n(actions.destroy.button.label) }}
                            </span>
                            <span class="icon">
                                <fa icon="check"/>
                            </span>
                            <span class="is-hidden"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck, faTimes);

export default {
    name: 'Confirmation',

    components: { Fa },

    inject: ['i18n', 'state'],

    emits: ['cancel', 'confirm'],

    computed: {
        actions() {
            return this.state.data.actions;
        },
    },
};
</script>

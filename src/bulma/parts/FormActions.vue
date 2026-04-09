<template>
    <confirmation v-if="confirmation"
        @cancel="confirmation = false"
        @confirm="confirmation = false; destroy()"/>
    <div class="actions level is-mobile"
        v-else>
        <div class="level-left">
            <action tag="a"
                :button="actions.back.button"
                @click="$router.go(-1)"
                v-if="actions.back"/>
            <action tag="a"
                :button="actions.destroy.button"
                @click="confirmation = true"
                v-if="actions.destroy && !actions.destroy.forbidden"/>
            <action tag="a"
                :button="actions.show.button"
                @click="show()"
                v-if="actions.show && !actions.show.forbidden"/>
            <action tag="a"
                :button="actions.create.button"
                @click="create()"
                v-if="actions.create && !actions.create.forbidden"/>
            <slot name="actions-left"/>
        </div>
        <div class="level-right">
            <div class="level-item"
                v-if="state.data.clearErrorsControl && errors.any()">
                <a class="button is-danger has-text-weight-bold"
                    @click="errors.empty()">
                    <span>
                        {{ i18n('errors') }}
                    </span>
                    <span class="icon is-small">
                        <fa :icon="faXmark"/>
                    </span>
                </a>
            </div>
            <div class="level-item"
                v-else-if="dirty() && !disableState">
                <a class="button is-dark"
                    @click="undo()">
                    <span>
                        {{ i18n('changes') }}
                    </span>
                    <span class="icon is-small">
                        <fa :icon="faRotateLeft"/>
                    </span>
                </a>
            </div>
            <slot name="actions-right"/>
            <action tag="a"
                :button="actions.store.button"
                :disabled="errors.any()"
                :loading="state.loading"
                @click="submit()"
                v-if="actions.store && !actions.store.forbidden && !state.data.autosave"/>
            <action tag="a"
                :button="actions.update.button"
                :disabled="errors.any()"
                :loading="state.loading"
                @click="submit()"
                v-else-if="actions.update && !actions.update.forbidden && !state.data.autosave"/>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import {
    faRotateLeft, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Action from './Action.vue';
import Confirmation from './Confirmation.vue';

export default {
    name: 'FormActions',

    components: { Action, Confirmation, Fa },

    inject: [
        'state', 'dirty', 'disableState', 'errors', 'undo',
        'i18n', 'submit', 'show', 'create', 'destroy'
    ],

    data: () => ({
        confirmation: false,
        faRotateLeft,
        faXmark,
    }),

    computed: {
        actions() {
            return this.state.data.actions;
        },
    },
};
</script>

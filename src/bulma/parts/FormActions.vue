<template>
    <div class="actions level is-mobile">
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
                <a class="button is-small is-bold is-danger"
                    @click="errors.empty()">
                    <span>
                        {{ i18n('errors') }}
                    </span>
                    <span class="icon is-small">
                        <fa icon="times"/>
                    </span>
                </a>
            </div>
            <div class="level-item"
                v-else-if="dirty() && !disableState">
                <a class="button is-small is-bold is-warning"
                    @click="undo()">
                    <span>
                        {{ i18n('changes') }}
                    </span>
                    <span class="icon is-small">
                        <fa icon="undo"/>
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
        <confirmation :message="actions.destroy.button.message"
            @close="confirmation = false"
            @commit="confirmation = false; destroy()"
            v-if="confirmation && actions.destroy"/>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTrashAlt, faEye, faPlus, faCheck, faArrowLeft, faTimes, faUndo,
} from '@fortawesome/free-solid-svg-icons';
import Action from './Action.vue';
import Confirmation from './Confirmation.vue';

library.add(faTrashAlt, faEye, faPlus, faCheck, faArrowLeft, faTimes, faUndo);

export default {
    name: 'FormActions',

    components: { Action, Confirmation, Fa },

    inject: [
        'state', 'dirty', 'disableState', 'errors', 'undo',
        'i18n', 'submit', 'show', 'create', 'destroy'
    ],

    data: () => ({
        confirmation: false,
    }),

    computed: {
        actions() {
            return this.state.data.actions;
        },
    },
};
</script>

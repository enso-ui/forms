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
            <slot name="actions"/>
        </div>
        <div class="level-right">
            <div class="level-item"
                v-if="errors.any()">
                <span class="tag is-bold is-danger is-small">
                    {{ i18n('errors') }}
                    <a class="delete is-small"
                        @click="errors.empty()"/>
                </span>
            </div>
            <div class="level-item"
                v-else-if="dirty()">
                <span class="tag is-bold is-warning is-small">
                    {{ i18n('changed') }}
                </span>
            </div>
            <action tag="button"
                :button="actions.store.button"
                :disabled="errors.any()"
                :loading="state.loading"
                @click="submit()"
                v-if="actions.store && !actions.store.forbidden && !state.data.autosave"/>
            <action tag="button"
                :button="actions.update.button"
                :disabled="errors.any()"
                :loading="state.loading"
                @click="submit()"
                v-else-if="actions.update && !actions.update.forbidden && !state.data.autosave"/>
        </div>
        <confirmation :show="confirmation"
            :message="actions.destroy.button.message"
            @close="confirmation = false"
            @commit="confirmation = false; destroy()"
            v-if="confirmation && actions.destroy"/>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTrashAlt, faEye, faPlus, faCheck, faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import Action from './Action.vue';
import Confirmation from './Confirmation.vue';

library.add(faTrashAlt, faEye, faPlus, faCheck, faArrowLeft);

export default {
    name: 'FormActions',

    components: { Action, Confirmation },

    inject: ['state', 'dirty', 'errors', 'i18n', 'submit', 'show', 'create', 'destroy'],

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

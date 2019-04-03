<template>
    <div class="actions">
        <a :class="['button', actions.back.button.class]"
            @click="$router.go(-1)"
            v-if="actions.back">
            <span class="is-hidden-mobile">
                {{ i18n('Back') }}
            </span>
            <span class="icon">
                <fa :icon="actions.back.button.icon"/>
            </span>
            <span class="is-hidden"/>
        </a>
        <a :class="['button', actions.destroy.button.class]"
            :disabled="actions.destroy.forbidden"
            @click="confirmation = !actions.destroy.forbidden"
            v-if="actions.destroy">
            <span class="is-hidden-mobile">
                {{ i18n(actions.destroy.button.label) }}
            </span>
            <span class="icon">
                <fa :icon="actions.destroy.button.icon"/>
            </span>
            <span class="is-hidden"/>
        </a>
        <a :class="['button', actions.show.button.class]"
            :disabled="actions.show.forbidden"
            @click="!actions.show.forbidden ? show() : null"
            v-if="actions.show">
            <span class="is-hidden-mobile">
                {{ i18n(actions.show.button.label) }}
            </span>
            <span class="icon">
                <fa :icon="actions.show.button.icon"/>
            </span>
            <span class="is-hidden"/>
        </a>
        <a :class="['button', actions.create.button.class]"
            :disabled="actions.create.forbidden"
            @click="!actions.create.forbidden ? create() : null"
            v-if="actions.create">
            <span class="is-hidden-mobile">
                {{ i18n(actions.create.button.label) }}
            </span>
            <span class="icon">
                <fa :icon="actions.create.button.icon"/>
            </span>
            <span class="is-hidden"/>
        </a>
        <slot name="actions"/>
        <a :class="[
                'button is-pulled-right',
                actions.store.button.class, { 'is-loading': state.loading }
            ]"
            :disabled="actions.store.forbidden || errors.any()"
            @click="submit"
            v-if="actions.store && !state.data.autosave">
            <span class="is-hidden-mobile">
                {{ i18n(actions.store.button.label) }}
            </span>
            <span class="icon">
                <fa :icon="actions.store.button.icon"/>
            </span>
            <span class="is-hidden"/>
        </a>
        <a :class="[
                'button is-pulled-right',
                actions.update.button.class, { 'is-loading': state.loading }
            ]"
            :disabled="actions.update.forbidden || errors.any()"
            @click="submit"
            v-if="actions.update && !state.data.autosave">
            <span class="is-hidden-mobile">
                {{ i18n(actions.update.button.label) }}
            </span>
            <span class="icon">
                <fa :icon="actions.update.button.icon"/>
            </span>
            <span class="is-hidden"/>
        </a>
        <div class="is-clearfix"/>
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
import Confirmation from './Confirmation.vue';

library.add(faTrashAlt, faEye, faPlus, faCheck, faArrowLeft);

export default {
    name: 'FormActions',

    components: { Confirmation },

    inject: ['state', 'errors', 'i18n', 'submit', 'show', 'create', 'destroy'],

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

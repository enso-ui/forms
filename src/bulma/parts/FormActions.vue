<template>
    <div v-if="confirmation">
        <p class="subtitle is-6 animate__animated animate__flash mb-2">
            {{ i18n(actions.destroy.button.message) }}
        </p>
        <div class="level is-mobile">
            <div class="level-left"/>
            <div class="level-left">
                <div class="level-item">
                    <a class="button is-warning"
                        @click="confirmation = false">
                        <span>
                            {{ i18n('Cancel') }}
                        </span>
                        <span class="icon">
                            <fa icon="times"/>
                        </span>
                    </a>
                </div>
                <div class="level-item">
                    <a class="button is-danger"
                        @click="confirmation = false; destroy()">
                        <span>
                            {{ i18n(actions.destroy.button.label) }}
                        </span>
                        <span class="icon">
                            <fa icon="check"/>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
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
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTrashAlt, faEye, faPlus, faCheck, faArrowLeft, faTimes, faUndo,
} from '@fortawesome/free-solid-svg-icons';
import Action from './Action.vue';

library.add(faTrashAlt, faEye, faPlus, faCheck, faArrowLeft, faTimes, faUndo);

export default {
    name: 'FormActions',

    components: { Action, Fa },

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

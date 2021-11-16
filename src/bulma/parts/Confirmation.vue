<template>
    <modal v-bind="$attrs"   >
        <div class="box">
            <h5 class="subtitle is-5">
                {{ i18n(message) }}
            </h5>
            <hr>
            <div class="level">
                <div class="level-left"/>
                <div class="level-right">
                    <div class="level-item">
                        <button class="button is-outlined"
                            @click="$emit('close')">
                            {{ i18n("Cancel") }}
                        </button>
                        <button class="button is-danger ml-1"
                            @click="$emit('commit')"
                            v-focus>
                            {{ i18n("Yes") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import { focus } from '@enso-ui/directives';
import { Modal } from '@enso-ui/modal/bulma';

export default {
    name: 'Confirmation',

    directives: { focus },

    components: { Modal },

    inject: ['i18n'],

    props: {
        message: {
            type: String,
            default: null,
        },
    },

    mounted() {
        this.$el.querySelector('.button.is-danger').focus();
    },
};
</script>

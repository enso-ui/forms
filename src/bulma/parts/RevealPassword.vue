<template>
    <span class="icon reveal-password is-small is-right is-clickable has-text-info"
        @click="toggle">
        <fa icon="eye"
            v-if="hidden"/>
        <fa icon="eye-slash"
            v-else/>
    </span>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

library.add(faEye, faEyeSlash);

export default {
    name: 'RevealPassword',

    props: {
        meta: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        hidden: true,
    }),

    methods: {
        toggle() {
            this.hidden = !this.hidden;
            this.meta.content = this.meta.content === 'password' ? 'text' : 'password';
        }
    }
};
</script>

<style lang="scss">
    .control.has-icons-right .icon.reveal-password {
        pointer-events: all;
    }
</style>

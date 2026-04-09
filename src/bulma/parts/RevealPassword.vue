<template>
    <span class="icon reveal-password is-naked is-small is-right is-clickable"
        @click="toggle">
        <fa :icon="faEye"
            v-if="hidden"/>
        <fa :icon="faEyeSlash"
            v-else/>
    </span>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default {
    name: 'RevealPassword',

    components: { Fa },

    props: {
        meta: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        faEye,
        faEyeSlash,
        hidden: true,
    }),

    methods: {
        toggle() {
            this.hidden = !this.hidden;
            this.meta.content = this.meta.content === 'password' ? 'text' : 'password';
        },
    },
};
</script>

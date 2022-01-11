<template>
    <h5 class="title is-5 form-title"
        v-if="state.data.icon || state.data.title">
        <span class="icon"
            v-if="state.data.icon">
            <fa :icon="state.data.icon"/>
        </span>
        <span v-if="state.data.title">
            {{ i18n(state.data.title) }}
        </span>
    </h5>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';

export default {
    name: 'FormHeader',

    components: { Fa },

    inject: ['state', 'i18n'],
};
</script>

<style lang="scss">
    .title.form-title {
        .icon {
            vertical-align: text-bottom;
        }
    }
</style>

<template>
    <h5 class="title is-5 form-title"
        v-if="data.icon || data.title">
        <span class="icon"
            v-if="data.icon">
            <fa :icon="data.icon"/>
        </span>
        <span v-if="data.title">
            {{ i18n(data.title) }}
        </span>
    </h5>
</template>

<script>
export default {
    name: 'FormHeader',

    inject: ['data'],
};
</script>

<style lang="scss">
    .title.form-title {
        .icon {
            vertical-align: text-bottom;
        }
    }
</style>

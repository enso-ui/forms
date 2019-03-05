<template>
    <date-field time-only
        v-on="$listeners"
        v-bind="$attrs"/>
</template>

<script>
import DateField from './DateField.vue';

export default {
    name: 'TimeField',

    components: { DateField },
};
</script>

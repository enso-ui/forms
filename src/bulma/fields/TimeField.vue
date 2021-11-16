<template>
    <date-field v-bind="$attrs"
        time-only/>
</template>

<script>
import DateField from './DateField.vue';

export default {
    name: 'TimeField',

    components: { DateField },
};
</script>

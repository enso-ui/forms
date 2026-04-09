<template>
    <span class="icon is-small is-right has-text-danger">
        <fa :icon="faTriangleExclamation"/>
    </span>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default {
    name: 'ErrorIcon',

    components: { Fa },

    data: () => ({
        faTriangleExclamation,
    }),
};
</script>

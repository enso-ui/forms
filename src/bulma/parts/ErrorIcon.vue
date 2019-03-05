<template>
    <span class="icon is-small is-right has-text-danger">
        <fa icon="exclamation-triangle"/>
    </span>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

library.add(faExclamationTriangle);

export default {
    name: 'ErrorIcon',
};
</script>

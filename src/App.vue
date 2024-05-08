<script>
import CreateJob from "./components/job/CreateJob.vue";
export default {
  components: {
    CreateJob,
  },
};
</script>

<template>
  <RouterView />
</template>

<script >

import {RouterView} from "vue-router"
export default {
  name: 'App',
}
</script>

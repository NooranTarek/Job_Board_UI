<!-- MyComponent.vue -->
<template>
  <div>
    <NavbarView />
    <RouterView />
</div>
</template>

<script>
import NavbarView from './NavbarView.vue'
import { RouterView } from 'vue-router';
export default {
  components:{
    NavbarView
  }
}
</script>


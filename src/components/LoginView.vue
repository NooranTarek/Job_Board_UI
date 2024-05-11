<!-- MyComponent.vue -->

<template>
  <div>
    <p>Login</p>
</div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!'
    };
  },
  methods: {
    changeMessage() {
      this.message = 'Vue is awesome!';
    }
  }
};
</script>

<style scoped>
/* Scoped styles specific to this component */
h1 {
  color: blue;
}
</style>

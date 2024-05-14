<!-- MyComponent.vue -->
<template>
  <p>About</p>
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
h1 {
  color: blue;
}
</style>

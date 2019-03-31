<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <p>My name is {{ name }}!</p>
    <p>My recipes: {{ recipes }}</p>
  </div>
</template>

<style></style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!!!",
      name: "Peter",
      recipes: []
    };
  },
  created: function() {
    // RUBY WEB REQUEST
    // response = HTTP.get("/api/products")
    // @recipes = response.data;
    // JAVASCRIPT WEB REQUEST
    axios.get("/api/recipes").then(response => {
      this.recipes = response.data;
    });
  },
  methods: {}
};
</script>

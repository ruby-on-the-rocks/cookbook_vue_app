<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <p>My name is {{ name }}!</p>
    <h1>New Recipe</h1>
    <button v-on:click="createRecipe()">Create recipe</button>
    <div v-for="recipe in recipes">
      <h2>Title: {{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title" />
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
    </div>
  </div>
</template>

<style>
img {
  width: 250px;
}
</style>

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
      console.log(this.recipes);
    });
  },
  methods: {
    createRecipe: function() {
      console.log("Create the recipe...");
      var params = {
        body_title: "example title",
        body_chef: "example chef",
        body_prep_time: 100,
        body_ingredients: "example ingredients",
        body_directions: "example directions"
      };
      axios.post("/api/recipes", params).then(response => {
        console.log("Success", response.data);
      });
    }
  }
};
</script>

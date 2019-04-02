<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <p>My name is {{ name }}!</p>
    <h1>New Recipe</h1>
    <div>
      Title:
      <input type="text" v-model="newRecipeTitle" />
      Chef:
      <input type="text" v-model="newRecipeChef" />
      Prep time:
      <input type="text" v-model="newRecipePrepTime" />
      Ingredients:
      <input type="text" v-model="newRecipeIngredients" />
      Directions:
      <input type="text" v-model="newRecipeDirections" />
      Image url:
      <input type="text" v-model="newRecipeImageUrl" />
    </div>
    <button v-on:click="createRecipe()">Create recipe</button>
    <div v-for="recipe in recipes">
      <h2>Title: {{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title" />
      <div>
        <button v-on:click="showRecipe(recipe)">More info</button>
      </div>
      <div v-if="recipe === currentRecipe">
        <p>Prep time: {{ recipe.prep_time }}</p>
        <p>Ingredients: {{ recipe.ingredients }}</p>
        <p>Directions: {{ recipe.directions }}</p>
      </div>
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
      recipes: [],
      newRecipeTitle: "",
      newRecipeChef: "",
      newRecipePrepTime: "",
      newRecipeIngredients: "",
      newRecipeDirections: "",
      newRecipeImageUrl: "",
      currentRecipe: null
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
        body_title: this.newRecipeTitle,
        body_chef: this.newRecipeChef,
        body_prep_time: this.newRecipePrepTime,
        body_ingredients: this.newRecipeIngredients,
        body_directions: this.newRecipeDirections
      };
      axios.post("/api/recipes", params).then(response => {
        this.recipes.push(response.data);
      });
    },
    showRecipe: function(recipe) {
      if (this.currentRecipe === recipe) {
        this.currentRecipe = null;
      } else {
        this.currentRecipe = recipe;
      }
    }
  }
};
</script>

<template>
  <div class="recipes-show">
    <h2>Title: {{ recipe.title }}</h2>
    <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title" />
    <p>Prep time: {{ recipe.prep_time }}</p>
    <p>Ingredients: {{ recipe.ingredients }}</p>
    <p>Directions: {{ recipe.directions }}</p>
    <button v-on:click="destroyRecipe(recipe)">Destroy recipe</button>

    <router-link v-bind:to="`/recipes/${recipe.id}/edit`">Edit this recipe</router-link>
    <router-link to="/">Back to all recipes</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      recipe: {}
    };
  },
  created: function() {
    axios.get("/api/recipes/" + this.$route.params.id).then(response => {
      this.recipe = response.data;
    });
  },
  methods: {
    destroyRecipe: function(recipe) {
      axios.delete("/api/recipes/" + recipe.id).then(response => {
        console.log("Successfully destroyed recipe", response.data);
        this.$router.push("/");
      });
    }
  }
};
</script>

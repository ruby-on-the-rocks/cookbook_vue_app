<template>
  <div class="recipes-new">
    <h1>New Recipe</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
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
  </div>
</template>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      newRecipeTitle: "",
      newRecipeChef: "",
      newRecipePrepTime: "",
      newRecipeIngredients: "",
      newRecipeDirections: "",
      newRecipeImageUrl: "",
      errors: []
    };
  },
  methods: {
    createRecipe: function() {
      console.log("Create the recipe...");
      this.errors = [];
      var params = {
        body_title: this.newRecipeTitle,
        body_chef: this.newRecipeChef,
        body_prep_time: this.newRecipePrepTime,
        body_ingredients: this.newRecipeIngredients,
        body_directions: this.newRecipeDirections
      };
      axios
        .post("/api/recipes", params)
        .then(response => {
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <p>My name is {{ name }}!</p>
    <div>
      <button v-on:click="setSortAttribute('title')">Sort by title</button>
      <button v-on:click="setSortAttribute('ingredients')">Sort by ingredients</button>
    </div>
    Search by title or ingredients:
    <input type="text" v-model="searchFilter" list="titles" />
    <datalist id="titles">
      <option v-for="recipe in recipes">{{ recipe.title }}</option>
    </datalist>
    <transition-group appear enter-active-class="animated rollIn" leave-active-class="animated bounceOutDown">
      <div
        v-for="recipe in orderBy(filterBy(recipes, searchFilter, 'title', 'ingredients'), sortAttribute, sortAscending)"
        v-bind:key="recipe.id"
      >
        <h2>Title: {{ recipe.title }}</h2>
        <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title" />
        <router-link v-bind:to="`/recipes/${recipe.id}`">More info</router-link>
      </div>
    </transition-group>
  </div>
</template>

<style>
img {
  width: 250px;
}
</style>

<script>
var axios = require("axios");
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Welcome to Vue.js!!!",
      name: "Peter",
      recipes: [],
      searchFilter: "",
      sortAttribute: "title",
      sortAscending: 1
    };
  },
  created: function() {
    // RUBY WEB REQUEST
    // response = HTTP.get("/api/products")
    // @recipes = response.data;
    // JAVASCRIPT WEB REQUEST
    axios
      .get("/api/recipes")
      .then(response => {
        this.recipes = response.data;
        console.log(this.recipes);
      })
      .catch(error => {
        console.log("Something went wrong...", error);
        if (error.response && error.response.status === 401) {
          this.$router.push("/login");
        }
      });
  },
  methods: {
    setSortAttribute: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        if (this.sortAscending === 1) {
          this.sortAscending = -1;
        } else {
          this.sortAscending = 1;
        }
      } else {
        this.sortAscending = 1;
      }
      this.sortAttribute = inputAttribute;
    }
  }
};
</script>

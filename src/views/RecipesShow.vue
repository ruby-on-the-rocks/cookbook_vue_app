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
    <div id="map"></div>
  </div>
</template>

<style>
#map {
  height: 300px;
  text-align: initial;
}
</style>

<script>
/* global mapboxgl */

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
  mounted: function() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGV0ZXJ4amFuZyIsImEiOiJjam96NnBwZmUycXI4M3FxaTR3aHQwenhkIn0.Fip_rZYF_exdMEDeQTNYoQ";
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 4 // starting zoom
    });

    var popup = new mapboxgl.Popup({ offset: 25 }).setText("Construction on the Washington Monument began in 1848.");

    var marker = new mapboxgl.Marker()
      .setLngLat([30.5, 50.5])
      .setPopup(popup)
      .addTo(map);
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

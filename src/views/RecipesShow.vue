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
      recipe: {},
      places: [
        {
          lat: 37.974728,
          long: -122.03711,
          description: "Alpine Bakery in Concord, delicious pastries!"
        },
        {
          lat: 36.973804,
          long: -122.02575,
          description: "Marinis is my favorite ice cream in Santa Cruz"
        },
        {
          lat: 37.791852,
          long: -122.42127,
          description: "Bob's Donuts in SF makes gigantic donuts, good for sharing (or eating alone!)"
        }
      ]
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

    this.places.forEach(function(place) {
      var popup = new mapboxgl.Popup({ offset: 25 }).setText(place.description);
      var marker = new mapboxgl.Marker()
        .setLngLat([place.long, place.lat])
        .setPopup(popup)
        .addTo(map);
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

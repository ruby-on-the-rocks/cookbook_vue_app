import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Test from "./views/Test.vue";
import RecipesNew from "./views/RecipesNew.vue";
import RecipesShow from "./views/RecipesShow.vue";
import RecipesEdit from "./views/RecipesEdit.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/test",
      name: "test",
      component: Test
    },
    {
      path: "/recipes/new",
      name: "recipes-new",
      component: RecipesNew
    },
    {
      path: "/recipes/:id",
      name: "recipes-show",
      component: RecipesShow
    },
    {
      path: "/recipes/:id/edit",
      name: "recipes-show",
      component: RecipesEdit
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

import { createWebHistory, createRouter } from "vue-router";
import DBook from "@/views/DBook.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: DBook,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/search/:key",
    name: "search",
    component: () => import("@/views/SearchDBook.vue"),
  },
  {
    path: "/book/:slug",
    name: "book.details",
    component: () => import("@/views/BookView.vue"),
  },
  {
    path: "/post/:slug",
    name: "post.details",
    component: () => import("@/views/PostView.vue"),
  },
  {
    path: "/post/update/:slug",
    name: "post.update",
    component: () => import("@/views/PostUpdate.vue"),
  },
  {
    path: "/user/:id",
    name: "user.view",
    component: () => import("@/views/UserView.vue"),
  },
  {
    path: "/login",
    name: "user.login",
    component: () => import("@/views/UserLogin.vue"),
  },
  {
    path: "/signup",
    name: "user.signup",
    component: () => import("@/views/UserSignup.vue"),
  },
  {
    path: "/create-post/",
    name: "post.create",
    component: () => import("@/views/PostCreate.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("User")) {
        next();
      } else {
        next({ name: "user.login" });
      }
    },
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;

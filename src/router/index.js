import { createWebHistory, createRouter, RouterLink } from "vue-router";
import HomeView from "../components/Candidate/HomeView.vue";
import AboutView from "../components/Candidate/AboutView.vue";
import CandidateView from "../components/Candidate/CandidateView.vue";
import LoginView from "../components/LoginView.vue";
import RegisterView from "../components/RegisterView.vue";

const routes = [
  {
    path: "/",
    component: CandidateView,
    children: [
      { path: "about", component: AboutView },
      { path: "home", component: HomeView },
    ],
  },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;

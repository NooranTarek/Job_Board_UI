import { createWebHistory, createRouter, RouterLink } from "vue-router";
import HomeView from "../components/Candidate/HomeView.vue";
import AboutView from "../components/Candidate/AboutView.vue";
import CandidateView from "../components/Candidate/CandidateView.vue";
import LoginView from "../components/LoginView.vue";
import RegisterView from "../components/RegisterView.vue";
import CandidateProfile from "../components/Candidate/CandidateProfile.vue"
import CandidateUpdateProfileForm from "../components/Candidate/CandidateUpdateProfileForm.vue"
import CandidateProfileApplication from "../components/Candidate/CandidateProfileApplication.vue"
import WelcomeCandidate from "../components/Candidate/WelcomeCandidate.vue";
const routes = [
  {
    path: "/",
    component: CandidateView,
    children: [
      { path: "about", component: AboutView },
      { path: "home", component: HomeView },
      { path: "/profile", component: CandidateProfile },
      { path: "/CandidateProfileApplication", component: CandidateProfileApplication },
      { path: "/CandidateUpdateProfileForm", component: CandidateUpdateProfileForm },
      { path: "/WelcomeCandidate", component: WelcomeCandidate },


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

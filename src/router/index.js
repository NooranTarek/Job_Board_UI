import { createWebHistory, createRouter, RouterLink } from "vue-router";
import HomeView from "../components/Candidate/HomeView.vue";
import AboutView from "../components/Candidate/AboutView.vue";
import CandidateView from "../components/Candidate/CandidateView.vue";
import LoginView from "../components/LoginView.vue";
import RegisterView from "../components/RegisterView.vue";
import CandidateProfile from "../components/Candidate/CandidateProfile.vue";
import CandidateUpdateProfileForm from "../components/Candidate/CandidateUpdateProfileForm.vue";
import CandidateProfileApplication from "../components/Candidate/CandidateProfileApplication.vue";
import CreateJob from "../components/job/CreateJob.vue";
import UpdateJob from "../components/job/UpdateJob.vue";
import WelcomeCandidate from "../components/Candidate/WelcomeCandidate.vue";
import manageJobsComponent from "../components/admin/job/manageJobsComponent.vue";
import JobList from "../components/job/JobList.vue";
import JobDetails from "../components/job/JobDetails.vue";

const routes = [
  {
    path: "/",
    component: CandidateView,
    children: [
      { path: "about", component: AboutView },
      { path: "home", component: HomeView },
      { path: "/profile", component: CandidateProfile },
      {
        path: "/CandidateProfileApplication",
        component: CandidateProfileApplication,
      },
      {
        path: "/CandidateUpdateProfileForm",
        component: CandidateUpdateProfileForm,
      },
      { path: "/WelcomeCandidate", component: WelcomeCandidate },
    ],
  },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/job/create", component: CreateJob },
  { path: "/job/update/:id", component: UpdateJob },
  { path: "/manageJobs", component: manageJobsComponent },
  { path: "/jobs", component: JobList },
  { path: "/job/:id", component: JobDetails, name: "JobDetails" },

];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;

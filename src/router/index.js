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
import UserMonitor from "../components/admin/UserMonitor.vue";
import EmployerMonitor from "../components/admin/EmployerMonitor.vue";

import NavbarAdmin from "../components/admin/NavbarAdmin.vue";
import { useUserStore } from "../store/modules/UserProfilePinia"; 
import manageJobsComponent from "../components/admin/job/manageJobsComponent.vue";
import JobList from "../components/job/JobList.vue";
import JobDetails from "../components/job/JobDetails.vue";
import JobSearch from "../components/job/JobSearch.vue";

import CandidateStatistics from "../components/Candidate/CandidateStatistics.vue"
const routes = [
  //! Candidate pages _______________________________________________________________

  {
    path: "/",
    component: CandidateView,
    children: [
      { path: "/candidate/about", component: AboutView },
      { path: "/candidate/home", component: HomeView },
      { path: "/candidate/profile", component: CandidateProfile },
      { path: "/candidate/CandidateStatistics", component: CandidateStatistics },
      {
        path: "/candidate/CandidateProfileApplication",
        component: CandidateProfileApplication,
      },
      {
        path: "/candidate/CandidateUpdateProfileForm",
        component: CandidateUpdateProfileForm,
      },
      { path: "/candidate/WelcomeCandidate", component: WelcomeCandidate },
    ],
    // meta: { requiresAuth: true, requiredRole: "candidate" },
  },

  //! Admin pages _______________________________________________________________
  {
    path: "/admin",
    component: NavbarAdmin,
    children: [
      {
        path: "candidate", // Define the route with a parameter
        name: "UserMonitor",
        component: UserMonitor,
        props: true, // This allows passing route params as props to the component
      },
      { path: "/admin/manageJobs", 
        component: manageJobsComponent ,
        name: "manageJobs",
      },
      {
        path: "employer", // Define the route with a parameter
        name: "EmployerMonitor",
        component: EmployerMonitor,
        props: true, // This allows passing route params as props to the component
      },
    ],
    props: true,
    meta: { requiresAuth: true, requiredRole: "admin" },
  },
  //! Employer pages _______________________________________________________________

  // {
  //   path: "/employer",
  //   component: NavbarEmployer,
  //   children: [
  //     { path: "UserMonitor", name: "UserMonitor", component: UserMonitor },
  //   ],
  //   meta: { requiresAuth: true, requiredRole: "employer" },
  // },

  //! Unautjorized pages _______________________________________________________________

  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/jobs/create", component: CreateJob },
  { path: "/jobs/update/:id", component: UpdateJob },
  { path: "/job/:id", component: JobDetails, name: "JobDetails" },
  { path: "/jobs", component: JobList },
  { path: "/jobs/search", component: JobSearch },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {

    if (!localStorage.getItem("token")) {
      next({ path: "/login", query: { redirect: to.fullPath } });
      return;
    }
  }

  if (to.matched.some((record) => record.meta.requiredRole)) {
    try {
      const user = await userStore.fetchUser();
      const requiredRole = to.meta.requiredRole;

      if (user.role !== requiredRole) {
        next({ path: "/login", query: { redirect: to.fullPath } });
        return;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      next({ path: "/login", query: { redirect: to.fullPath } });
      return;
    }
  }

  // Proceed to the next route
  next();
});





export default router;

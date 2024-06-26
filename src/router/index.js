import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../components/Candidate/HomeView.vue";
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
import NotFound from "../components/NotFound.vue"; // Import the NotFound component
import NavbarAdmin from "../components/admin/NavbarAdmin.vue";
import { useUserStore } from "../store/modules/UserProfilePinia";
import manageJobsComponent from "../components/admin/job/manageJobsComponent.vue";
import JobList from "../components/job/JobList.vue";
import JobDetails from "../components/job/JobDetails.vue";
import JobSearch from "../components/job/JobSearch.vue";
import NavbarView from "../components/Candidate/NavbarView.vue";
import NavbarEmployer from "../components/employer/navbarEmployer.vue";
import CandidateStatistics from "../components/Candidate/CandidateStatistics.vue";
import EmployerDashboard from "../components/employer/EmployerDashboard.vue";
import monitorApplications from "../components/employer/monitorApplications.vue";
import pendingApplications from "../components/employer/pendingApplications.vue";
import approvedApplications from "../components/employer/approvedApplications.vue";
import rejectedApplications from "../components/employer/rejectedApplications.vue";

const routes = [
  // Candidate pages
  {
    path: "/candidate",
    component: CandidateView,
    children: [
      { path: "home", component: JobSearch },
      { path: "jobs/:id", component: JobDetails, name: "CandidateJobDetails" },
      { path: "profile", component: CandidateProfile },
      { path: "CandidateStatistics", component: CandidateStatistics },
      {
        path: "CandidateProfileApplication",
        component: CandidateProfileApplication,
      },
      {
        path: "CandidateUpdateProfileForm",
        component: CandidateUpdateProfileForm,
      },
      { path: "WelcomeCandidate", component: WelcomeCandidate },
    ],
    meta: { requiresAuth: true, requiredRole: "candidate" },
  },
  // Admin pages
  {
    path: "/admin",
    component: NavbarAdmin,
    children: [
      { path: "jobs/:id", component: JobDetails, name: "AdminJobDetails" },
      {
        path: "candidate",
        name: "UserMonitor",
        component: UserMonitor,
        props: true,
      },
      {
        path: "manageJobs",
        component: manageJobsComponent,
        name: "manageJobsComponent",
      },
      {
        path: "employer",
        name: "EmployerMonitor",
        component: EmployerMonitor,
        props: true,
      },
    ],
    props: true,
    meta: { requiresAuth: true, requiredRole: "admin" },
  },
  // Employer pages
  {
    path: "/employer",
    component: NavbarEmployer,
    children: [
      { path: "home", component: JobSearch },
      { path: "jobs/:id", component: JobDetails, name: "EmployerJobDetails" },
      { path: "add", component: CreateJob, name: "addJob" },
      {
        path: "dashboard/:id",
        component: EmployerDashboard,
        name: "dashboards",
      },
      { path: "managejobs", component: JobSearch, name: "manageJobs" },
      { path: "update/:id", component: UpdateJob, name: "updateJob" },
      {
        path: "applications",
        component: monitorApplications,
        name: "monitorApplications",
      },
      {
        path: "pendingApplications/:id",
        component: pendingApplications,
        name: "pendingApplications",
      },
      {
        path: "approvedApplications/:id",
        component: approvedApplications,
        name: "approvedApplications",
      },
      {
        path: "rejectedApplications/:id",
        component: rejectedApplications,
        name: "rejectedApplications",
      },
    ],
    meta: { requiresAuth: true, requiredRole: "employer" },
  },
  // Unauthorized pages
  {
    path: "/",
    component: NavbarView,
    children: [
      { path: "", component: JobSearch },
      { path: "login", component: LoginView },
      { path: "register", component: RegisterView },
    ],
  },
  // Catch-all route for 404 Not Found page
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
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
  const user = await userStore.fetchUser();
  if (
    to.path === "/" &&
    localStorage.getItem("token") &&
    user.role === "admin"
  ) {
    // Redirect logged-in users trying to access the login page
    next({ path: "/admin/candidate", query: { redirect: to.fullPath } });
    return;
  }
  if (
    to.path === "/login" &&
    localStorage.getItem("token") &&
    user.role === "admin"
  ) {
    // Redirect logged-in users trying to access the login page
    next({ path: "/admin/candidate", query: { redirect: to.fullPath } });
    return;
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

  next();
});

export default router;

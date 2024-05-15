<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-4 mt-4">
        <div class="text-center card-box">
          <img
            style="padding-top: 20px;"
            src="../../assets/applications.png"
            height="200"
            width="200"
          />
          <h3 style="padding-top: 40px;">Applications</h3>
        </div>
      </div>

      <div class="col-md-8 col-lg-9">
        <div>
          <ul class="nav nav-tabs navtab-custom">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/employer/pendingApplications">Pending</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/employer/approvedApplications">Approved</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                to="/employer/rejectedApplications"
                style="color: rgb(0, 119, 255) !important;font-weight: 700;"
              >Rejected</RouterLink>
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="profile">
              <div class="row">
                <div class="col-sm-12">
                  <div v-if="loading" class="text-center card-box">
                    <button class="btn btn-primary" type="button" disabled>
                      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </button>
                  </div>
                  <div v-else>
                    <template v-if="filteredApplications.length > 0">
                      <div class="panel-body">
                        <table class="table table-condensed table-striped">
                          <thead>
                            <tr>
                              <th>Logo</th>
                              <th>Title</th>
                              <th>View Application</th>
                              <th>Deadline</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(application, index) in filteredApplications"
                              :key="application.id"
                            >
                              <td>
                                <img
                                  :src="application.job_listings.logo"
                                  :style="{ width: '100px', height: 'auto' }"
                                  alt
                                />
                              </td>
                              <td>{{ application.job_listings.title }}</td>
                              <td>
                                <button
                                  class="btn btn-primary"
                                  @click="openResume(application.resume)"
                                >View Resume</button>
                              </td>
                              <td>{{ application.job_listings.application_deadline }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                          <li
                            class="page-item"
                            :class="{ disabled: data.applications.current_page === 1 }"
                          >
                            <a
                              class="page-link"
                              @click.prevent="getEmployerApplications(data.applications.current_page - 1)"
                            >Previous</a>
                          </li>
                          <li
                            class="page-item"
                            v-for="page in data.applications.last_page"
                            :key="page"
                          >
                            <a
                              class="page-link"
                              @click.prevent="getEmployerApplications(page)"
                            >{{ page }}</a>
                          </li>
                          <li
                            class="page-item"
                            :class="{ disabled: data.applications.current_page === data.applications.last_page }"
                          >
                            <a
                              class="page-link"
                              @click.prevent="getEmployerApplications(data.applications.current_page + 1)"
                            >Next</a>
                          </li>
                        </ul>
                      </nav>
                    </template>
                    <template v-else>
                      <div class="text-center mt-1">
                        <p class="text-muted">There are currently no applications to monitor.</p>
                        <img
                          style="height : 30vh;"
                          src="../../assets/no_applications.png"
                          alt="No Applications Found"
                        />
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { useUserStore } from "../../store/modules/UserProfilePinia";
import "vue3-toastify/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  data() {
    return {
      loading: true,
      data: {
        applications: []
      }
    };
  },
  methods: {
    async getEmployerApplications(pageNumber = 1) {
      try {
        const id = this.$route.params.id;
        const response = await useUserStore().getEmployerApplications(
          pageNumber,
          1
        );
        this.data = response.data;
        this.loading = false;
        console.log(this.data);
      } catch (error) {
        console.error("Error fetching employer applications", error);
        this.loading = false;
      }
    },
    openResume(resumeUrl) {
      window.open(resumeUrl, "_blank");
    }
  },
  computed: {
    filteredApplications() {
      console.log("55555", this.data.applications);
      if (
        this.data.applications.data &&
        this.data.applications.data.length > 0
      ) {
        return this.data.applications.data.filter(
          application => application.status === "pending"
        );
      } else {
        return [];
      }
    }
  },
  created() {
    this.getEmployerApplications();
  }
};
</script>
  
  
  <style scoped>
.resume {
  font-size: 80px;
  margin-left: 80px;
}

.color1 {
  color: rgb(0, 174, 255);
}
.color2 {
  color: rgb(255, 166, 0);
}
.color3 {
  color: rgb(229, 255, 0);
}

.container {
  margin-top: 20px;
  padding-top: 50px;
  background: rgb(248, 249, 250);
}
/* ===========
     Profile
   =============*/
.card-box {
  padding: 20px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.06), 0 2px 0 0 rgba(0, 0, 0, 0.02);
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #ffffff;
}
.header-title {
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 16px;
  margin-bottom: 8px;
}
.social-links li a {
  -webkit-border-radius: 50%;
  background: #eff0f4;
  border-radius: 50%;
  color: #7a7676;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  width: 30px;
}

/* ===========
     Gallery
   =============*/
.portfolioFilter a {
  -moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  -webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  -webkit-transition: all 0.3s ease-out;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  color: #333333;
  padding: 5px 10px;
  display: inline-block;
  transition: all 0.3s ease-out;
}
.portfolioFilter a:hover {
  background-color: #228bdf;
  color: #ffffff;
}
.portfolioFilter a.current {
  background-color: #228bdf;
  color: #ffffff;
}
.thumb {
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  width: 100%;
}
.thumb-img {
  border-radius: 2px;
  overflow: hidden;
  width: 100%;
}
.gal-detail h4 {
  margin: 16px auto 10px auto;
  width: 80%;
  white-space: nowrap;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.gal-detail .ga-border {
  height: 3px;
  width: 40px;
  background-color: #228bdf;
  margin: 10px auto;
}

.tabs-vertical-env .tab-content {
  background: #ffffff;
  display: table-cell;
  margin-bottom: 30px;
  padding: 30px;
  vertical-align: top;
}
.tabs-vertical-env .nav.tabs-vertical {
  display: table-cell;
  min-width: 120px;
  vertical-align: top;
  width: 150px;
}
.tabs-vertical-env .nav.tabs-vertical li.active > a {
  background-color: #ffffff;
  border: 0;
}
.tabs-vertical-env .nav.tabs-vertical li > a {
  color: #333333;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  white-space: nowrap;
}
.nav.nav-tabs > li.active > a {
  background-color: #ffffff;
  border: 0;
}
.nav.nav-tabs > li > a {
  background-color: transparent;
  border-radius: 0;
  border: none;
  color: #333333 !important;
  cursor: pointer;
  line-height: 50px;
  font-weight: 500;
  padding-left: 20px;
  padding-right: 20px;
  font-family: "Roboto", sans-serif;
}
.nav.nav-tabs > li > a:hover {
  color: #228bdf !important;
}
.nav.tabs-vertical > li > a {
  background-color: transparent;
  border-radius: 0;
  border: none;
  color: #333333 !important;
  cursor: pointer;
  line-height: 50px;
  padding-left: 20px;
  padding-right: 20px;
}
.nav.tabs-vertical > li > a:hover {
  color: #228bdf !important;
}
.tab-content {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  color: #777777;
}
.nav.nav-tabs > li:last-of-type a {
  margin-right: 0px;
}
.nav.nav-tabs {
  border-bottom: 0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.navtab-custom li {
  margin-bottom: -2px;
}
.navtab-custom li a {
  border-top: 2px solid transparent !important;
}
.navtab-custom li.active a {
  border-top: 2px solid #228bdf !important;
}
.nav-tab-left.navtab-custom li a {
  border: none !important;
  border-left: 2px solid transparent !important;
}
.nav-tab-left.navtab-custom li.active a {
  border-left: 2px solid #228bdf !important;
}
.nav-tab-right.navtab-custom li a {
  border: none !important;
  border-right: 2px solid transparent !important;
}
.nav-tab-right.navtab-custom li.active a {
  border-right: 2px solid #228bdf !important;
}
.nav-tabs.nav-justified > .active > a,
.nav-tabs.nav-justified > .active > a:hover,
.nav-tabs.nav-justified > .active > a:focus,
.tabs-vertical-env .nav.tabs-vertical li.active > a {
  border: none;
}
.nav-tabs > li.active > a,
.nav-tabs > li.active > a:focus,
.nav-tabs > li.active > a:hover,
.tabs-vertical > li.active > a,
.tabs-vertical > li.active > a:focus,
.tabs-vertical > li.active > a:hover {
  color: #228bdf !important;
}

.nav.nav-tabs + .tab-content {
  background: #ffffff;
  margin-bottom: 20px;
  padding: 20px;
}
.progress.progress-sm .progress-bar {
  font-size: 8px;
  line-height: 5px;
}
</style>
  
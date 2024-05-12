<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-4">
        <div class="text-center card-box">
          <div class="member-card">
            <div class="thumb-xl member-thumb m-b-10 center-block">
              <img
                :src="user.image ? user.image : 'https://cdn-icons-png.flaticon.com/512/7415/7415181.png'"
                class="img-circle img-thumbnail"
                alt="profile-image"
              />
            </div>
            <div>
              <h4 class="m-b-5">{{ user ? user.name : 'Loading...' }}</h4>
            </div>
            <div class="text-left m-t-40">
              <p class="text-muted font-13">
                <span class="m-l-15">{{ user ? user.email : 'Loading...' }}</span>
              </p>
              <p class="text-muted font-13">
                <span class="m-l-15">{{ user ? user.role : 'Loading...' }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- end card-box -->
      </div>
      <!-- end col -->

      <div class="col-md-8 col-lg-9">
        <div>
          <div>
            <ul class="nav nav-tabs navtab-custom">
              <li class>
                <RouterLink class="nav-link" to="WelcomeCandidate">Welcome</RouterLink>
              </li>
              <li class>
                <RouterLink class="nav-link" to="CandidateUpdateProfileForm">Settings</RouterLink>
              </li>
              <li class>
                <RouterLink class="nav-link" to="CandidateProfileApplication">Applications</RouterLink>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="profile">
                <!-- Loop through user applications -->
                <div class="row">
                  <div class="col-sm-4" v-if="applications.length === 0">
                    <p>No applications found.</p>
                  </div>
                  <div class="col-sm-12" v-else>
                    <!-- Loop through applications in groups of three -->
                    <div v-for="(application, index) in applications" :key="application.id">
                      <div v-if="index % 3 === 0" class="row mt-3">
                        <div v-for="(app, i) in applications.slice(index, index + 3)" :key="app.id" class="col-sm-4">
                          <div class="gal-detail thumb">
                            <a :href="app.resume" class="image-popup" title="Application">
                              <i :class="'resume fa fa-file ' + getColorClass(index + i)" aria-hidden="true"></i>
                            </a>
                            <h4 class="text-center">{{ app.id }}</h4>
                            <div class="ga-border"></div>
                            <p class="text-muted text-center">
                              <small>{{ app.status }}</small>
                            </p>
                            <a style="text-decoration:none" :href="app.resume">
                              <h5 :class="'text-center ' + getColorClass(index + i)" aria-hidden="true">See Resume</h5>
                            </a>
                              <button style="margin-left:75px" @click="cancelApplication(app.id)" type="button" class="icon-remove btn btn-danger">Cancel<i class="icon-remove"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- End loop -->
                  </div>
                </div>
                <!-- End loop -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </div>
</template>

<script>
import { ref } from 'vue'; // Import ref from Vue
import { useUserStore } from "../../store/modules/UserProfilePinia";

export default {
  setup() {
    const userStore = useUserStore();
    const user = userStore.user;

    const applications = ref([]);

    const fetchApplications = async () => {
      return await userStore.fetchUserApplications(user.id);
    };

    const applicationsPromise = fetchApplications();
    applicationsPromise.then(applicationsData => {
      applications.value = applicationsData;
      applicationsData.forEach(application => {
        console.log("Application ID:", application.id);
        console.log("Email:", application.email);
        console.log("Resume URL:", application.resume);
        console.log("Status:", application.status);
      });
    });

    const getColorClass = (index) => {
      const colors = ['color1', 'color2', 'color3'];
      return colors[index % colors.length];
    };
    
    const cancelApplication = async (applicationId) => {
      try {
        await userStore.cancelApplication(applicationId);
      } catch (error) {
        console.error("Error canceling application:", error);
      }
    };

    return { applications, user, getColorClass, cancelApplication };
  }
};
</script>


<style scoped>
.resume{
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

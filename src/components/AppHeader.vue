<template>
  <nav
    class="navbar navbar-expand-md d-flex justify-content-between navbar-light bg-light shadow1"
  >
    <div class="navbar-section nav-logo-icon d-flex align-items-center">
      <div class="navbar-brand btn mb-0 h1" @click="goToHome">
        <img
          class="d-inline-block align-top"
          src="../assets/img/DBook_logo.png"
          alt="DbookLogo"
          height="40"
        />
      </div>
      <div>
        <div class="navbar-nav flex-row justify-content-between">
          <a
            href="https://www.facebook.com/huynh.dust"
            target="_blank"
            class="nav-item p-2 fb-icon"
          >
            <font-awesome-icon icon="fa-brands fa-facebook-f " size="lg" />
          </a>
          <a
            href="https://www.youtube.com/HuynhDust"
            target="_blank"
            class="nav-item p-2 youtube-icon"
          >
            <font-awesome-icon icon="fa-brands fa-youtube" size="lg" />
          </a>
          <a
            href="https://soundcloud.com/web5ngay"
            target="_blank"
            class="nav-item p-2 soundcloud-icon"
          >
            <font-awesome-icon icon="fa-brands fa-soundcloud" size="lg" />
          </a>
        </div>
      </div>
    </div>
    <div class="navbar-section d-flex align-items-center">
      <div class="form-inline my-2 my-lg-0 mr-3">
        <input
          class="form-control"
          type="search"
          placeholder="Tìm kiếm theo tên sách hoặc tên bài viết"
          aria-label="Search"
          v-model="keySearch"
          @keyup.enter="goToSearch"
        />
        <button
          class="btn btn-outline-warning btn-md my-2 my-sm-0 ml-1"
          @click="goToSearch"
        >
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>
      </div>

      <div v-if="isLogin" class="navbar-user navbar-item ml-2">
        <div class="avatar avatar-user" @click="toggleUserMore">
          <img class="h-100" alt="avt user" :src="user.avatar" />
        </div>
        <div
          v-if="isShowUserMore"
          class="nav-user-more list-group shadow1 rounded"
        >
          <div
            class="list-group-item user-select-none text-center user-info-item"
          >
            <div class="avatar avatar-user-more">
              <img class="h-100" alt="avt user" :src="user.avatar" />
            </div>

            <div class="navbar-brand h1 mb-0">
              <strong>{{ user.name }} </strong>
            </div>
          </div>
          <a
            @click="goToUserView"
            class="list-group-item list-group-item-action user-select-none"
          >
            <font-awesome-icon icon="fa-solid fa-pen-to-square" class="mr-2" />
            Bài viết của tôi
          </a>
          <a
            @click="logoutUser"
            class="list-group-item list-group-item-action user-select-none"
          >
            <font-awesome-icon
              icon="fa-solid fa-right-from-bracket"
              class="mr-2"
            />
            Đăng xuất
          </a>
        </div>
      </div>
      <div v-else>
        <span class="btn btn-signup" @click="goSignup"
          ><strong>Đăng ký</strong></span
        >
        <span @click="goLogin" class="btn btn-outline-primary btn-round"
          >Đăng nhập
        </span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import userService from "../services/user.service";

const router = useRouter();

const user = ref({});
const isLogin = ref(false);
const checkLogin = () => {
  if (localStorage.User) {
    user.value = JSON.parse(localStorage.User);
    isLogin.value = true;
  } else isLogin.value = false;
};

const isShowUserMore = ref(false);
const toggleUserMore = () => {
  isShowUserMore.value = !isShowUserMore.value;
};

const keySearch = ref("");
function goToSearch() {
  var key = keySearch.value;
  key = key.split(" ").join("+");
  router.push({ name: "search", params: { key } });
  keySearch.value = "";
}

function goToHome() {
  router.push({ name: "home" });
}
function goToUserView() {
  const id = JSON.parse(localStorage.User)._id;
  router.push({ name: "user.view", params: { id } });
}
function goLogin() {
  router.push({ name: "user.login" });
}
function goSignup() {
  router.push({ name: "user.signup" });
}

async function logoutUser() {
  await userService.logout();
  localStorage.setItem("isLogin", false);
  localStorage.removeItem("User");
  localStorage.removeItem("SavedToken");
  location.reload();
}

onMounted(() => {
  checkLogin();
});
</script>

<style scoped>
.btn-round {
  border-radius: 21px;
}
.btn-signup {
  color: #7c7c7c;
}
a {
  color: #7c7c7c;
}
.navbar {
  padding: 0.5rem 11rem;
}
.navbar-section {
  padding: 0 2vh;
}
.navbar-nav {
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 2px solid #dfdfdf;
}
.fb-icon:hover {
  cursor: pointer;
  color: #3b5998;
}
.youtube-icon:hover {
  cursor: pointer;
  color: #ff0000;
}
.soundcloud-icon:hover {
  cursor: pointer;

  color: #ff8800;
}
.form-inline .form-control {
  width: 350px;
}
.form-control:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem #dfac145f;
}
.navbar-brand {
  margin-right: 0;
}
.nav-user-more {
  width: 250px;
  position: absolute;
  z-index: 100;
  right: 0;
  top: calc(100% + 7px);
}
.user-info-item {
  cursor: default;
}
.navbar-user {
  cursor: pointer;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(204, 204, 204, 0.568);
  overflow: hidden;
}
.avatar-user-more {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

@media only screen and (max-width: 576px) {
  .navbar {
    padding: 0.5rem 1rem;
  }
  .nav-logo-icon {
    width: 100%;
    justify-content: space-around;
  }
  .form-inline .form-control {
    width: 210px;
  }
  .navbar-nav {
    margin: 0;
    padding: 0;
    border: none;
  }
  li {
    padding: 0 0.5rem;
  }
}
</style>

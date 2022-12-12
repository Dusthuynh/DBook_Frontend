<template>
  <section class="text-center text-lg-start">
    <div class="card mb-3 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5">
      <div class="row g-0 d-flex align-items-center justify-content-around">
        <div class="col-lg-6 flex-center flex-column">
          <img
            src="../assets/img/DBook_Logo.png"
            class="w-50"
            alt="ContactBook cover"
          />
          <h1 class="pt-3">HƠN CẢ CUỐN HÚT</h1>
        </div>

        <div class="col-lg-6">
          <h2 class="fw-bold mt-4">Đăng nhập</h2>
          <div class="card-body py-5 px-md-5">
            <UserFormLogin :user="user" @login:user="login" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <Popup v-if="isShowPopup" @cancel="hidePopup" :message="message" />
</template>

<script lang="js">
import UserFormLogin from "../components/UserFormLogin.vue";
import UserService from "../services/user.service";
import Popup from "../components/Popup.vue";
export default {
  data() {
    return {
      user: {},
      status: "",
      isShowPopup: false,
    };
  },
  components: {
    UserFormLogin,
    Popup,
  },
  computed: {
    message() {
      return this.status;
    },
  },
  methods: {
    hidePopup() {
      this.isShowPopup = false;
    },

    async login(user) {
      try {
        const login = await UserService.login(user);

        //Neu thanh cong
        localStorage.setItem('SavedToken', 'Bearer ' + login.data.token);

        var infoUser = login.data.data.user;
        console.log(infoUser);
        localStorage.setItem('User',   JSON.stringify(infoUser));


        this.$emit("isShowLogin", true);
        this.$router.push({ name: "home" });
      } catch (err) {
        if (err.response.data.message === "Incorrect email or password")
          this.sendErrorMessage(
            "Sai email hoặc mật khẩu đăng nhập. Vui lòng đăng nhập lại."
          );
        console.log(err);
      }
    },

    sendErrorMessage(data) {
      this.status = data;
      this.isShowPopup = true;
    },

    hideHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", false);
    },
  },
  mounted() {
    this.hideHeaderAndFooter();
  },
};
</script>

<style>
section {
  margin-top: 10%;
}
.rounded-t-5 {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

@media (min-width: 992px) {
  .rounded-tr-lg-0 {
    border-top-right-radius: 0;
  }

  .rounded-bl-lg-5 {
    border-bottom-left-radius: 0.5rem;
  }
}
</style>

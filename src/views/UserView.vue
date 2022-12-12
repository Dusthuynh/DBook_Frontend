<template>
  <div class="container db-social">
    <div class="jumbotron jumbotron-fluid"></div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-xl-11">
          <div class="widget head-profile has-shadow">
            <div class="widget-body pb-0">
              <div class="row d-flex align-items-center">
                <div
                  class="col-xl-4 col-md-4 d-flex justify-content-lg-start justify-content-md-start justify-content-center"
                >
                  <ul>
                    <li>
                      <div class="counter">{{ posts.length }}</div>
                      <div class="heading">Bài viết</div>
                    </li>
                    <li>
                      <div class="counter">{{ countViewPosts }}</div>
                      <div class="heading">Lượt xem</div>
                    </li>
                    <li>
                      <div class="counter">{{ countPointPosts }}</div>
                      <div class="heading">Điểm</div>
                    </li>
                  </ul>
                </div>
                <div class="col-xl-4 col-md-4 d-flex justify-content-center">
                  <div class="image-default">
                    <img
                      class="rounded-circle"
                      :src="user.avatar"
                      alt="user-avatar"
                    />
                  </div>
                  <div class="infos">
                    <h2>{{ user.name }}</h2>
                    <div class="email">{{ user.email }}</div>
                  </div>
                </div>
                <div
                  class="col-xl-4 col-md-4 d-flex justify-content-lg-end justify-content-md-end justify-content-center"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <post-list :posts="posts" />
</template>

<script>
import userService from "../services/user.service";
import postService from "../services/post.service";
import PostList from "../components/PostList.vue";
export default {
  components: {
    PostList,
  },
  data() {
    return {
      user: {},
      posts: [],
      isAuthor: false,
    };
  },
  computed: {
    countViewPosts() {
      var sum = 0;
      this.posts.map((el) => {
        sum += el.viewsQuantity;
      });
      return sum;
    },
    countPointPosts() {
      var sum = 0;
      this.posts.map((el) => {
        sum += el.vote;
      });
      return sum;
    },
  },
  methods: {
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
    checkAuthor() {
      const userId = JSON.parse(localStorage.User)._id;
      if (userId && userId === this.user._id) this.isAuthor = true;
    },
  },
  async created() {
    this.user = await userService.getUser(this.$route.params.id);
    this.posts = await postService.getAllOfUser(this.user._id);
    this.checkAuthor();
  },
  mounted() {
    this.showHeaderAndFooter();
  },
};
</script>

<style>
.db-social .jumbotron {
  margin: 0;
  background: url(https://images.unsplash.com/photo-1597167100957-1dfa110c1c14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1616&q=80);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: bottom center;
  color: #fff !important;
  height: 300px;
  position: relative;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
  padding: 0;
}

.container-fluid {
  padding: 30px 30px;
}

.db-social .head-profile {
  margin-top: -120px;
  border-radius: 4px;
  position: relative;
}

.widget {
  background: #fff;
  border-radius: 0;
  border: none;
  margin-bottom: 30px;
}
.has-shadow {
  box-shadow: 0 1px 15px 1px rgba(52, 40, 104, 0.08);
}
.db-social .head-profile:before {
  content: "";
  background: rgba(255, 255, 255, 0.6);
  height: 20px;
  width: 90%;
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 4px 4px 0 0;
}
.db-social .head-profile:after {
  content: "";
  background: rgba(255, 255, 255, 0.3);
  height: 20px;
  width: 80%;
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 4px 4px 0 0;
}
.db-social .widget-body {
  padding: 1rem 1.4rem;
}
.widget-body {
  padding: 1.4rem;
}
.pb-0,
.py-0 {
  padding-bottom: 0 !important;
}

.db-social .image-default img {
  width: 120px;
  position: absolute;
  top: -80px;
  left: 0;
  right: 0;
  margin: 0 auto;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 1);
  z-index: 10;
  background-color: #dedede;
}
.db-social .infos {
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 1rem;
  line-height: 1.8rem;
}
.db-social h2 {
  color: #2c304d;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}
.db-social .email {
  color: #aea9c3;
  font-size: 1rem;
}
.db-social .follow .btn {
  padding: 10px 30px;
}
.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.btn-shadow,
.btn-shadow a {
  color: #5d5386;
  background-color: #fff;
  border-color: #fff;
  box-shadow: 0 1px 15px 1px rgba(52, 40, 104, 0.15);
}
.db-social .head-profile .actions {
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.5rem;
}
.actions {
  z-index: 999;
  display: block;
}
.actions.dark .dropdown-toggle {
  color: #2c304d;
}
.actions .dropdown-toggle {
  color: #98a8b4;
  background: none;
  border: none;
  padding: 0;
  font-size: 1.7rem;
}
.actions .dropdown-menu {
  border: none;
  min-width: auto;
  font-size: 1rem;
  border-radius: 4px;
  padding: 1.4rem 1.8rem;
  text-align: left;
  box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.15);
}

.actions .dropdown-menu .dropdown-item {
  padding: 0.5rem 0;
}
.actions .dropdown-menu a {
  color: #2c304d;
  font-weight: 500;
}

.db-social .head-profile li:first-child {
  padding-left: 0;
}
.db-social .head-profile li {
  display: inline-block;
  text-align: center;
  padding: 0 1rem;
}
.db-social .head-profile li .counter {
  color: #2c304d;
  font-size: 1.4rem;
  font-weight: 600;
}
.db-social .head-profile li .heading {
  color: #aea9c3;
  font-size: 1rem;
}
</style>

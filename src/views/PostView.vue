<template>
  <div class="container row mt-4">
    <div class="col-3">
      <BookList :books="book" class="book-container" />
    </div>
    <div class="col-8 mt-1">
      <h2>{{ post.title }}</h2>

      <div class="info-section">
        <div class="author-section flex-center">
          <div class="flex-center" @click="gotoUserView">
            <div class="avatar avatar-user">
              <img class="h-100" alt="avt user" :src="post.author.avatar" />
            </div>
            <span class="author-text ml-2"
              ><strong>{{ post.author.name }}</strong>
            </span>
          </div>

          <span class="update-date ml-3">
            <span class="title-info">Last updated: </span>
            {{ getTime(post.updatedAt) }}
          </span>
          <span class="view-post ml-3">
            <span class="title-info">Views: </span>
            {{ post.viewsQuantity }}
          </span>
          <span
            v-if="showChangePost"
            @click="updatePost"
            class="btn btn-outline-secondary btn-round ml-3"
          >
            Sửa bài viết
          </span>
          <span
            v-if="showChangePost"
            @click="deletePost"
            class="btn btn-outline-danger btn-round ml-3"
          >
            Xóa bài viết
          </span>
        </div>
      </div>
      <hr />
      <div class="content-section mt-4 row">
        <div class="vote-container col-1">
          <font-awesome-icon
            icon="fa-solid fa-caret-up"
            :class="
              action === 'like' ? 'fa-vote fa-like selected' : 'fa-vote fa-like'
            "
            @click="votePost('like')"
          />
          <p class="point-vote">{{ post.vote }}</p>
          <font-awesome-icon
            icon="fa-solid fa-caret-down "
            :class="
              action === 'hate' ? 'fa-vote fa-hate selected' : 'fa-vote fa-hate'
            "
            @click="votePost('hate')"
          />
        </div>
        <div class="content-text col-11" v-html="post.content"></div>
      </div>
    </div>
  </div>

  <Popup v-if="isShowPopup" @cancel="hidePopup" :message="message" />
</template>

<script lang="js">
import BookList from "../components/BookList.vue";
import PostList from "../components/PostList.vue";
import postService from "../services/post.service";
import Popup from "../components/Popup.vue";

export default {
  components: {
    BookList,
    PostList,
    Popup,
  },
  data() {
    return {
      book: [],
      post: {
        title:"",
        author:"",
        updatedAt:"",
        viewsQuantity:""
      },
      action: 'none',
      status: "",
      isShowPopup: false,
      isAuthor: false,
    };
  },
  computed:{
    showChangePost(){
      return this.isAuthor
    },
    selectedvote(){
      return this.action;
    },
    message() {
      return this.status;
    },
  },
  methods: {
    hidePopup() {
      this.isShowPopup = false;
    },
    getTime (time) {
      var date = new Date(time);
      date = date.toLocaleDateString('en-GB')
      return date;
    },
    gotoUserView() {
      const id = this.post.author._id;
      this.$router.push({ name: "user.view", params: { id } });
    },
    hideHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
    async votePost(stt){
      try {
        const vote = {action:stt};
        const res = await postService.votePost(this.post._id,vote);
        if(res !== undefined){
          this.post.vote =  res.point;
          this.action =  res.action;
        }
        console.log(this.action)
      } catch (err) {
        console.log("💀ERROR")
        if(err.response.data.message === "You are not allowed to vote because you are the author")
        this.sendErrorMessage(
          "Bạn không thể vote khi là chủ bài viết"
          );
      }

    },
    async deletePost(){
      await postService.delete(this.post.slug);
      await this.$router.push({name:'home'})
    },
    updatePost(){
      const slug =  this.post.slug;
      //post will update
      localStorage.setItem("pwu",slug)
      this.$router.push({ name: "post.update", params: { slug } });
    },
    checkAuthor() {
      if(localStorage.User){
        const userId = JSON.parse(localStorage.User)._id;
        if (userId && userId === this.post.author._id) this.isAuthor = true;
      }
    },
    sendErrorMessage(data) {
      console.log("chay loi")
      this.status = data;
      this.isShowPopup = true;
    },
  },
  async created() {
    const retrivePost = await postService.get(this.$route.params.slug);
    this.post = retrivePost.post;
    // console.log(this.post)
    this.checkAuthor();
    if(retrivePost.myVote){
      if(retrivePost.myVote.voter_id)
      this.action = retrivePost.myVote.action
    }

    this.book.push(await this.post.book);
  },
  mounted() {
    this.hideHeaderAndFooter();
  },
};
</script>

<style scoped>
.btn-round {
  border-radius: 21px;
}
.container {
  min-height: 80vh;
  column-gap: 3rem;
}
.circle {
  display: inline-block;
  width: 50px;
  height: 50px;
  background-color: gray;
  border-radius: 50%;
}
.info-section {
  display: flex;
  justify-content: start;
  align-items: center;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(204, 204, 204, 0.568);
  overflow: hidden;
  cursor: pointer;
}
.author-avatar,
.author-text {
  cursor: pointer;
}
.content-text {
  font-size: 19px;
  font-weight: 400;
  line-height: 32px;
  margin: 0 0 20px;
  z-index: 2;
  color: rgba(0, 0, 0, 0.8);
  text-align: justify;
  text-justify: inter-word;
}
.title-info {
  font-weight: 600;
}
.vote-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.point-vote {
  margin: 0;
  font-size: 1.5rem;
  color: gray;
  cursor: default;
}
.fa-vote {
  font-size: 3rem;
  color: #ccc;
  cursor: pointer;
}
.fa-like:active,
.fa-like.selected {
  color: green;
}
.fa-hate:active,
.fa-hate.selected {
  color: red;
}
</style>

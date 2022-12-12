<template>
  <div class="container mt-3 row">
    <div class="img-container col-4">
      <div class="card-img">
        <img
          class="img-left"
          :src="book.imageLinks.thumbnail"
          alt="book.imageLinks.thumbnail"
        />
      </div>
    </div>

    <div class="detail-container col-8">
      <div class="book-container row">
        <div class="none-cusor">
          <div class="card-body">
            <h4 class="text-center">
              <strong>{{ book.title }}</strong>
            </h4>
            <div class="authors-section">
              <strong>Tác giả: </strong>
              <span v-for="author in book.authors" class="author mr-2">
                {{ author + " " }}
              </span>
            </div>
            <h6 class="text-sm-left">
              <strong>Số lượt review: </strong>
              {{ book.reviewsQuantity }}
            </h6>
            <p class="card-text ellipsis">
              {{ book.description }}
            </p>
          </div>
        </div>
        <div class="write-post-section d-flex justify-content-end">
          <div @click="goToCreatePost" class="btn btn-outline-warning">
            <font-awesome-icon icon="feather" />
            <span class="ml-1">Viết bài ngay</span>
          </div>
        </div>
      </div>
      <div class="post-container">
        <h4 class="card-title text-center">
          <strong>Những bài viết review</strong>
        </h4>
        <PostList :posts="posts" />
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "../components/PostList.vue";
import bookService from "../services/book.service";
import postService from "../services/post.service";
export default {
  components: {
    PostList,
  },
  data() {
    return {
      book: {},
      posts: [],
    };
  },
  methods: {
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
    goToCreatePost() {
      localStorage.setItem("bwcp", this.book.slug);
      this.$router.push({ name: "post.create" });
    },
  },
  async created() {
    this.book = await bookService.get(this.$route.params.slug);
    console.log(this.book);
    this.posts = await postService.getAllOfBook(this.book._id);
  },

  mounted() {
    this.showHeaderAndFooter();
  },
};
</script>

<style scoped>
.img-container {
  padding: 0;
}
.card-img {
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.authors-section {
  font-size: 1rem;
  margin-bottom: 0.2rem;
}
.card-body {
  padding-bottom: 1rem;
}
.author {
  cursor: pointer;
  transition: all 0.2s ease;
}
.author:hover {
  color: rgb(29, 155, 240);
}
.img-left {
  width: 100%;
  object-fit: cover;
  object-position: top;
}
.detail-container {
  margin-top: 1rem;
  padding-left: 0;
}
.book-container {
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  padding-bottom: 2rem;
}
.book-container:hover {
  transform: translate(0.25rem, 0);
}
.post-container {
  padding-left: 15px;
}
.card-title {
  padding-top: 2rem;
}
.none-cusor {
  cursor: default;
}
.write-post-section {
  width: 100%;
  padding: 0 3rem;
}
</style>

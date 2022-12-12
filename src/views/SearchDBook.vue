<template>
  <div>
    <h2 class="search-title text-center">
      Kết quả tìm kiếm: "<i> {{ keySearch }}</i
      >"
    </h2>
  </div>

  <div class="books-home">
    <h4 class="title-book">
      <strong>SÁCH THEO TÌM KIẾM: {{ books.length }}</strong>
    </h4>
    <book-list :books="books" />
  </div>

  <div class="post-home">
    <h4 class="title-book">
      <strong>BÀI VIẾT THEO TÌM KIẾM: {{ posts.length }}</strong>
    </h4>
    <post-list :posts="posts" />
  </div>
</template>

<script>
import bookService from "../services/book.service";
import postService from "../services/post.service";
import BookList from "@/components/BookList.vue";
import PostList from "@/components/PostList.vue";
export default {
  components: {
    BookList,
    PostList,
  },
  data() {
    return {
      books: [],
      posts: [],
    };
  },
  computed: {
    keySearch() {
      return this.$route.params.key.split("+").join(" ");
    },
  },
  methods: {
    async retrieveSearch() {
      this.books = await bookService.search(this.$route.params.key);
      this.posts = await postService.search(this.$route.params.key);
    },
    hideHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
  },
  created() {
    this.retrieveSearch();
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        this.retrieveSearch();
      }
    );
  },
  mounted() {
    this.hideHeaderAndFooter();
  },
};
</script>

<style scoped>
.wall-img {
  width: 100%;
  height: 25vh;
  object-fit: cover;
  display: block;
  margin-bottom: 1rem;
}
.books-home,
.post-home {
  margin-top: 3rem;
}
.search-title {
  padding-top: 2rem;
}
</style>

<template>
  <img
    class="wall-img shadow1"
    src="https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    alt="wall"
  />

  <div class="books-home">
    <h4 class="title-book"><strong>SÁCH NỔI BẬT</strong></h4>
    <book-list :books="listBook" />
  </div>

  <div class="post-home">
    <h4 class="title-book"><strong>BÀI VIẾT NỔI BẬT</strong></h4>
    <post-list :posts="listPost" />
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
    listBook() {
      return this.books;
    },
    listPost() {
      return this.posts;
    },
  },
  methods: {
    async retrieveHot() {
      try {
        this.books = await bookService.hotBooks();
        this.posts = await postService.hotPosts();
      } catch (err) {
        console.log(err);
      }
    },
    hideHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
  },
  mounted() {
    this.hideHeaderAndFooter();
    this.retrieveHot();
  },
};
</script>

<style scoped>
.wall-img {
  width: 100%;
  max-width: 1110px;
  height: 25vh;
  object-fit: cover;
  display: block;
  margin-bottom: 1rem;
}
.books-home,
.post-home {
  margin-top: 3rem;
}
</style>

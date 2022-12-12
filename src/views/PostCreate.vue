<template>
  <div class="container row mt-4">
    <BookList :books="book" class="col-3" />
    <div class="col-8 mt-1">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Tiêu đề bài viết"
          aria-label="title-post"
          aria-describedby="basic-addon2"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            @click="addPost"
            class="btn btn-outline-primary"
            type="button"
          >
            Tạo bài viết
          </button>
        </div>
      </div>
      <editor class="edit-container" v-model="content" />
    </div>
  </div>
</template>

<script lang="js">
import BookList from "../components/BookList.vue";
import bookService from "../services/book.service";
import postService from "../services/post.service";
import Editor from "../components/Editor.vue";
export default {
  components: {
    BookList,
    Editor,
  },
  data() {
    return {
      book: [],
      post: {},
      title:null,
      content: null,
    };
  },
  computed: {
    slug() {
      return localStorage.getItem("bwcp");
    },
  },
  methods: {
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
    async addPost(){
      const post = {
        title: this.title,
        content: this.content,
        book: this.book[0]._id
      };
      const slug = (await postService.create(post)).post.slug;
      this.$router.push({name:'post.details', params: { slug } });
    }
  },
  async created() {
    this.book.push(await bookService.get(this.slug));
  },
  mounted() {
    this.showHeaderAndFooter();
  },
};
</script>

<style scoped>
.form-control {
  font-size: 1rem;
}
</style>

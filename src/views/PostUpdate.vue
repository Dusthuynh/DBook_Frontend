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
            @click="updatePost"
            class="btn btn-outline-primary"
            type="button"
          >
            Cập nhật bài viết
          </button>
        </div>
      </div>
      <editor class="edit-container" v-model="content" />
    </div>
  </div>
</template>

<script lang="js">
import BookList from "../components/BookList.vue";
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
  methods: {
    showHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", true);
    },
    async updatePost(){
      const post = {
        title: this.title,
        content: this.content,
      };
      const slug = (await postService.update(this.post.slug,post)).post.slug;
      console.log(slug);
      this.$router.push({name:'post.details', params: { slug } });
    },
  },
  async created() {
    this.post = (await postService.get(this.$route.params.slug)).post;
    this.book.push(await this.post.book);
    this.title = this.post.title;
    this.content = this.post.content
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

<template>
  <ul class="list-group d-flex flex-row flex-wrap flex-between">
    <li
      class="list-group-item flex-gap"
      v-for="(post, index) in posts"
      :key="posts._id"
      @click="goToPostView(index)"
    >
      <div class="card flex-row flex-between">
        <div class="card-img">
          <img :src="post.imageCover" alt="PostThumbnail" class="img-left" />
        </div>
        <div class="card-body">
          <h5 class="card-title" :title="post.title">{{ post.title }}</h5>
          <div class="info-container">
            <span class="author-name pl-2">
              <strong>{{ post.author.name }}</strong>
            </span>
            <span class="view-post pl-2">
              <font-awesome-icon icon="fa-solid fa-eye" />
              {{ post.viewsQuantity }}
            </span>
          </div>
          <p class="card-text ellipsis mt-1">
            {{ post.content }}
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    posts: { type: Array, default: [] },
  },
  methods: {
    goToPostView(idx) {
      const slug = this.posts[idx].slug;
      this.$router.push({ name: "post.details", params: { slug } });
    },
    removeTagHTML() {
      this.post = this.posts.map((el) => {
        var html = el.content;
        var div = document.createElement("div");
        div.innerHTML = html;
        el.content = div.innerText;
      });
    },
  },
  updated() {
    this.post = this.posts.map((el) => {
      var html = el.content;
      var div = document.createElement("div");
      div.innerHTML = html;
      el.content = div.innerText;
    });
  },
};
</script>

<style scoped>
.card {
  align-items: flex-start;
  border-radius: 0.5rem;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  -webkit-line-clamp: 5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.flex-gap {
  display: inline-flex;
  flex-wrap: wrap;
}
.card-img {
  border-radius: 0.5rem;
  width: 25%;
  height: 100%;
  max-height: 200px;
  overflow: hidden;
  background-image: url(https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);
  background-attachment: local;
  background-position: -12.5rem -26rem;
}
.img-left {
  object-position: center;
  object-fit: fill;
  width: 100%;
}
.card-text {
  height: 5rem;
}
.card-body {
  height: 200px;
  overflow: hidden;
  padding: 1.5rem 1.25rem;
  align-self: center;
}
.list-group-item {
  border-radius: 0.5rem;
  cursor: pointer;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border: none;
  padding: 0;
  margin-bottom: 1rem;
}

.card-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 2rem;
  transition: all 0.1s ease;
}
.card-title:hover {
  color: #d6a101;
}

@media only screen and (max-width: 576px) {
  .list-group-item {
    margin: 0.5rem 0.2rem;
    align-items: center;
  }
  .card {
    align-items: center;
  }
  .card-img {
    width: 40%;
    align-self: stretch;
    overflow: hidden;
  }
  .img-left {
    width: auto;
    height: 100%;
  }
}
</style>

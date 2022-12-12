<template>
  <ul class="grid">
    <li class="list-group-item" v-for="(book, index) in books" :key="book._id">
      <div class="card">
        <div class="card-img">
          <img
            class="img-top"
            :src="book.imageLinks.thumbnail"
            alt="book.imageLinks.thumbnail"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title" :title="book.title">{{ book.title }}</h5>
          <span class="text-sm-left">
            <font-awesome-icon icon="fa-solid fa-pen-nib" />
            {{ book.reviewsQuantity }}
            <span>bài viết</span>
          </span>
          <p class="card-text ellipsis">
            {{ book.description }}
          </p>
        </div>
        <div class="card-bottom btn d-flex justify-content-around mb-2">
          <div class="btn btn-outline-secondary" @click="goToBookView(index)">
            <span> Xem các review</span>
          </div>
          <div class="btn btn-outline-warning" @click="goToCreatePost(index)">
            <font-awesome-icon icon="feather" />
            <span class="ml-1">Viết bài</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    books: { type: Array, default: [] },
  },
  methods: {
    goToBookView(idx) {
      const slug = this.books[idx].slug;
      this.$router.push({ name: "book.details", params: { slug } });
    },
    goToCreatePost(idx) {
      localStorage.setItem("bwcp", this.books[idx].slug);
      this.$router.push({ name: "post.create" });
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 17rem);
  gap: 20px 5px;
  padding: 0;
}
.card {
  width: 17rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.card-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 2rem;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  -webkit-line-clamp: 5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.card-img {
  overflow: hidden;
}
.img-top {
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: top;
  transition: all 0.3s ease;
}

.img-top:hover {
  transform: scale(1.1);
}

.card-body {
  padding: 1rem;
}

.card-text {
  height: 6.5rem;
}

.list-group-item {
  border-radius: 0.25rem;
  cursor: pointer;
  border: none;
  padding: 0;
}

.btn {
  padding: 0.5rem;
}

@media only screen and (max-width: 576px) {
  .card-img-top {
    height: 170px;
  }
  .card {
    width: 16rem;
  }
  .list-group-item {
    margin: 0.5rem 0.2rem;
  }
}
</style>

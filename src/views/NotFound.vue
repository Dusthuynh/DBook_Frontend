<template>
  <div class="page">
    <h3>
      Oops, không thể tìm thấy trang. Trở về
      <router-link to="/">trang chủ.</router-link>
    </h3>
  </div>
</template>

<script>
export default {
  methods: {
    hideHeaderAndFooter() {
      this.$emit("isShowHeaderAndFooter", false);
    },
  },
  mounted() {
    this.hideHeaderAndFooter();
  },
};
</script>

<style scoped>
.page {
  max-width: 800px;
  margin: 3rem auto;
}
</style>

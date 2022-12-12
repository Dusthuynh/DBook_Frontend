<template>
  <div id="app">
    <div>
      <app-header v-if="visible" />
      <div class="container">
        <router-view @isShowHeaderAndFooter="handleHeaderAndFooter" />
      </div>
    </div>
    <app-footer v-if="visible" />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      isShowHeaderAndFooter: false,
    };
  },
  computed: {
    visible() {
      return this.isShowHeaderAndFooter;
    },
  },

  methods: {
    handleHeaderAndFooter(status) {
      this.isShowHeaderAndFooter = status;
    },
  },
};
</script>

<style>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

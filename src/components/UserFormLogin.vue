<template>
  <Form @submit="login">
    <!-- Email input -->
    <div class="form-outline mb-4">
      <label class="form-label float-left" for="email">Địa chỉ Email</label>
      <Field
        type="email"
        name="email"
        class="form-control"
        v-model="userLocal.email"
      />
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
      <label class="form-label float-left" for="password">Mật khẩu</label>
      <Field
        type="password"
        name="password"
        class="form-control"
        v-model="userLocal.password"
      />
    </div>

    <!-- Submit button -->
    <button type="submit" class="btn btn-primary btn-block mb-4">
      Đăng nhập
    </button>
  </Form>
</template>

<script>
import { Form, Field } from "vee-validate";
export default {
  components: {
    Form,
    Field,
  },
  props: {
    user: {
      type: Object,
      default: () => ({
        email: "",
        password: "",
      }),
      required: true,
    },
  },
  methods: {
    login() {
      this.$emit("login:user", this.userLocal);
    },
  },
  data() {
    return {
      userLocal: this.user,
    };
  },
};
</script>

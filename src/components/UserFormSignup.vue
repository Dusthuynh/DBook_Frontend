<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Tên phải có giá trị"),
  email: Yup.string()
    .required("Email phải có giá trị")
    .email("Email không hợp lệ"),
  password: Yup.string()
    .min(6, "Mật khẩu dài ít nhất 6 ký tự")
    .required("Mật khẩu phải có giá trị"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Xác nhận mật khẩu sai")
    .required("Xác nhận mật khẩu phải có giá trị"),
  acceptTerms: Yup.string().required("Cần đồng ý điều khoản và điều kiện"),
});

const emit = defineEmits(["onSignup"]);

function onSignup(data) {
  const user = {
    name: data.name,
    email: data.email,
    password: data.password,
    passwordConfirm: data.confirmPassword,
  };
  console.log(user);
  emit("onSignup", user);
}
</script>

<template>
  <Form @submit="onSignup" :validation-schema="schema" v-slot="{ errors }">
    <div class="form-outline mb-4">
      <label class="form-label float-left" for="name">Tên</label>
      <Field
        type="text"
        name="name"
        class="form-control"
        :class="{ 'is-invalid': errors.name }"
      />
      <div class="invalid-feedback">{{ errors.name }}</div>
    </div>

    <div class="form-outline mb-4">
      <label class="form-label float-left" for="email">Email</label>
      <Field
        type="email"
        name="email"
        class="form-control"
        :class="{ 'is-invalid': errors.email }"
      />
      <div class="invalid-feedback">{{ errors.email }}</div>
    </div>

    <div class="form-outline mb-4">
      <label class="form-label float-left" for="password">Mật khẩu</label>
      <Field
        type="password"
        name="password"
        class="form-control"
        :class="{ 'is-invalid': errors.password }"
      />
      <div class="invalid-feedback">{{ errors.password }}</div>
    </div>

    <div class="form-outline mb-4">
      <label class="form-label float-left" for="confirmPassword"
        >Xác nhận mật khẩu</label
      >
      <Field
        type="password"
        name="confirmPassword"
        class="form-control"
        :class="{ 'is-invalid': errors.confirmPassword }"
      />
      <div class="invalid-feedback">{{ errors.confirmPassword }}</div>
    </div>

    <div class="form-group form-check">
      <Field
        name="acceptTerms"
        type="checkbox"
        id="acceptTerms"
        value="true"
        class="form-check-input"
        :class="{ 'is-invalid': errors.acceptTerms }"
      />
      <label for="acceptTerms" class="form-check-label"
        >Chấp nhận các Điều khoản & Điều kiện</label
      >
      <div class="invalid-feedback">{{ errors.acceptTerms }}</div>
    </div>

    <div class="form-group">
      <button type="submit" class="btn btn-primary mr-1">Đăng ký</button>
      <button type="reset" class="btn btn-secondary">Reset</button>
    </div>
  </Form>
</template>

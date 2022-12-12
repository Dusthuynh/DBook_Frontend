<template>
  <div class="modal" @click.self="onHideModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-danger">Thông báo</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="onHideModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
  methods: {
    onHideModal() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="css" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1060;
  width: 100%;
  height: 100%;
  display: block;
  overflow-x: hidden;
  overflow-y: hidden;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.429);
}

.showPopup {
  display: block;
}

.fade {
  transition: opacity 0.15s linear;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
  max-width: 500px;
  margin: 3.75rem auto;
}

.modal.fade .modal-dialog {
  transition: transform 0.3s ease-out;
  transform: translate(0, -50px);
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.modal-header {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}

.close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
  text-align: center;
}
</style>

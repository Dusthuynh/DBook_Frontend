import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://dbook-server.onrender.com/",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  base: process.env.NODE_ENV === "production" ? "/DBook/" : "./",
});

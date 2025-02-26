import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import process from "process";

export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     input: 'public/index.html',
  //   },
  // },
  server: {
    host: '0.0.0.0',
    port: process.env.CONTAINER_PORT, 
  }
});

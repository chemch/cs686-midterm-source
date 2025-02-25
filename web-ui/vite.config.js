import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import process from "process";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.CONTAINER_PORT, 
  }
});

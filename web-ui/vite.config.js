import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import process from "process";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.CONTAINER_PORT, 
    host: '0.0.0.0',
    strictPort: true,
    https: false,
    allowedHosts: [
      process.env.VITE_API_HOST,
      'cs686chemch.works',
      'localhost',
      '0.0.0.0'
    ]
  }
});

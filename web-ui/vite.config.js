import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import process from "process";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.CONTAINER_PORT, 
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: [
      'ec2-3-88-169-162.compute-1.amazonaws.com',
      'localhost',
      '0.0.0.0'
    ]
  }
});

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
    // ...(process.env.VITE_LOCAL_BUILD === "false" && {
    //   hmr: {
    //     protocol: "wss",
    //     host: process.env.VITE_API_HOST,
    //     port: 443,
    //   },
    // }),
    allowedHosts: [
      process.env.VITE_API_HOST,
      'localhost',
      '0.0.0.0'
    ]
  }
});

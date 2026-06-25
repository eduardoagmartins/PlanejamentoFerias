import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/auth": "http://localhost:3000",
      "/me": "http://localhost:3000",
      "/teams": "http://localhost:3000",
      "/employees": "http://localhost:3000",
      "/vacations": "http://localhost:3000",
      "/day-offs": "http://localhost:3000"
    }
  }
});

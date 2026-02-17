import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { name } from "./package.json";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: ["764b26dc1d11.ngrok-free.app"],
  },
  build: {
    outDir: path.resolve(__dirname, `build/${name}`),
  },
});

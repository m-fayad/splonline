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
    outDir: "dist",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep React core in the main bundle for stability
          if (id.includes("node_modules")) {
            if (id.includes("@mui/icons-material")) {
              return "mui-icons";
            }
            if (id.includes("@mui") || id.includes("@emotion")) {
              return "mui-core";
            }
          }
        },
      },
    },
  },
});

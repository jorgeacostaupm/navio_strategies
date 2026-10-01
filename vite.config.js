import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/navio_strategies/",
  resolve: {
    alias: {
      navio: fileURLToPath(new URL("./navio/src/index.js", import.meta.url)),
    },
  },
});

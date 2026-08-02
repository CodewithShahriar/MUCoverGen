import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    ...tanstackStart({
      server: { entry: "server" },
    }),
    react(),
  ],
});

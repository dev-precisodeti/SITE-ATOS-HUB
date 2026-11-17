import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// "npm run build" gera a pasta dist/ normal para hospedar.
// "npm run build:single" gera um único index.html com tudo embutido.
export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [react(), ...(mode === "single" ? [viteSingleFile()] : [])],
  build: { outDir: mode === "single" ? "dist-single" : "dist" },
}));

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { extname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "glob";
import { libInjectCss } from "vite-plugin-lib-inject-css";
// import packageJson from "./package.json" assert { type: "json" };

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      generateScopedName: "[local]--[hash:base64:5]",
    },
  },
  plugins: [react(), libInjectCss(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: "src/main.ts",
      formats: ["es"],
      fileName: "[name].js",
    },
    assetsDir: "dist/assets",
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom"],
      input: Object.fromEntries(
        globSync("src/**/*[^stories | d].{ts,tsx}").map((file) => [
          relative("src", file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});

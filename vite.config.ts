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
  plugins: [react(), libInjectCss(), dts({ outDir: "dist/types" })],
  build: {
    lib: {
      entry: "src/main.ts",
      formats: ["es", "cjs"],
      fileName(format, entryName) {
        if (format === "es") {
          return `esm/${entryName}.js`;
        }

        if (format === "cjs") {
          return `cjs/${entryName}.js`;
        }
        return "";
      },
    },
    assetsDir: "dist/assets",
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom"],
      input: Object.fromEntries(
        globSync("src/**/*[^stories].{ts,tsx}").map((file) => [
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

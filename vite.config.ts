/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { extname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "glob";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [react(), libInjectCss(), dts({ rollupTypes: true })],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@components",
        replacement: fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
      },
      {
        find: "@hooks",
        replacement: fileURLToPath(new URL("./src/hooks", import.meta.url)),
      },
    ],
  },
  build: {
    lib: {
      entry: "src/main.ts",
      formats: ["es"],
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
        entryFileNames: "[name].js",
      },
    },
  },
});

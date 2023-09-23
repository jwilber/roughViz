import { defineConfig } from "vite";
import { terser } from "rollup-plugin-terser";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "roughViz",
      formats: ["es", "umd"],
      fileName: (format) => `roughviz.${format}.js`,
    },
    rollupOptions: {
      plugins: [terser()],
      output: {
        globals: {},
      },
    },
  },
});

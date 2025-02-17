import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",  // ✅ Vite outputs to 'dist', NOT 'build'
    emptyOutDir: true,  // ✅ Ensures old builds are removed
  },
});

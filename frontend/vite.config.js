import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          carousel: ["react-slick", "slick-carousel"],
          icons: ["react-icons"],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging
    sourcemap: false,
    // Minify for production
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
  // Server options for development
  server: {
    port: 3000,
    open: true,
  },
});

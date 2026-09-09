import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Configuração do Vite com React e TailwindCSS v4
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

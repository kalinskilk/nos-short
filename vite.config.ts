import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { nodeExternals } from "./node-externals";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodeExternals()],
});

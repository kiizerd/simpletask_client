import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default {
  plugins: [react(), tsconfigPaths()],
  base: "/simpletask_client/",
};

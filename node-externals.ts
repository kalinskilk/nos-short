import { externals } from "rollup-plugin-node-externals";
import { Plugin } from "vite";

export function nodeExternals(): Plugin {
  return {
    enforce: "pre",
    ...externals(),
  };
}

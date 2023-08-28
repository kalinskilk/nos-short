import { Plugin } from "vite";

// following 2 lines are because the types from `rollup-plugin-node-externals` seems not working
/* const require = createRequire(import.meta.url); */

import { externals } from "rollup-plugin-node-externals";
/* const { externals } = require("rollup-plugin-node-externals"); */

export function nodeExternals(): Plugin {
  return {
    enforce: "pre",
    ...externals(),
  };
}

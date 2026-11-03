import {
  defineCloudflareConfig,
  type OpenNextConfig,
} from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  ...defineCloudflareConfig(),
  // Run `next build` directly so `npm run build` (`opennextjs-cloudflare build`) never recurses into itself.
  buildCommand: "npm run build:next",
};

export default config;

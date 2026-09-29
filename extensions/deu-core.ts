import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

import { getPackageMeta, packageRoot } from "../lib/index.js";

// Fuente única: package.json
const { name: PKG_NAME, version: PKG_VERSION } = getPackageMeta(
  import.meta.url,
);

export default function (pi: ExtensionAPI) {
  const root = packageRoot(import.meta.url);
}

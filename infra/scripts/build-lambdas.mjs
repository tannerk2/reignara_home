// Pre-bundles the webinar Lambda handlers (TS + shared imports + zod) into
// self-contained CJS bundles under infra/lambda-dist/<name>/index.js. Keeps
// @aws-sdk/* external (provided by the Node 20 runtime). Run before cdk synth.
//   node infra/scripts/build-lambdas.mjs   (from the project root)
import * as esbuild from "esbuild"
import path from "path"
import { fileURLToPath } from "url"

const here = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.join(here, "..", "lambda-src", "webinar")
const OUT = path.join(here, "..", "lambda-dist")

const entries = {
  submit: "submit.ts",
  redirect: "redirect.ts",
  resend: "resend.ts",
}

for (const [name, file] of Object.entries(entries)) {
  await esbuild.build({
    entryPoints: [path.join(SRC, file)],
    outfile: path.join(OUT, name, "index.js"),
    bundle: true,
    platform: "node",
    target: "node20",
    format: "cjs",
    external: ["@aws-sdk/*"],
    logLevel: "info",
  })
  console.log(`bundled ${name}`)
}
console.log("lambda bundles ready ->", OUT)

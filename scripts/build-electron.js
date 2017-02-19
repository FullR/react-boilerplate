const path = require("path");
const run = require("./script-utils/run");
const {appName} = require("../package.json");
const log = console.log.bind(console);

const platform = process.argv[2] || "all";
const arch = process.argv[3] || "all";
const dir = process.cwd();
const electronBuildDir = path.join(dir, "builds");

function buildElectron() {
  log(`Building electron applications for ${platform === "all" ? "all platforms" : platform}`);
  return run(`electron-packager "${dir}" "${appName}" --platform=${platform} --arch=${arch} --out="${electronBuildDir}" --overwrite`);
}

buildElectron().catch(log);

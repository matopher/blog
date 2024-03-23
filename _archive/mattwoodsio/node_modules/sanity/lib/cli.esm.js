import { loadEnv } from '@sanity/cli';
export { createCliConfig, defineCliConfig, getCliClient } from '@sanity/cli';
const envPrefix = "SANITY_STUDIO_";
function getStudioEnvironmentVariables() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix = "",
    envFile = false,
    jsonEncode = false
  } = options;
  const fullEnv = envFile ? {
    ...process.env,
    ...loadEnv(envFile.mode, envFile.envDir || process.cwd(), [envPrefix])
  } : process.env;
  const studioEnv = {};
  for (const key in fullEnv) {
    if (key.startsWith(envPrefix)) {
      studioEnv["".concat(prefix).concat(key)] = jsonEncode ? JSON.stringify(fullEnv[key] || "") : fullEnv[key] || "";
    }
  }
  return studioEnv;
}
export { getStudioEnvironmentVariables };
//# sourceMappingURL=cli.esm.js.map

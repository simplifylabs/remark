import { ExecutorContext } from "@nrwl/devkit";
import { appRootPath } from "@nrwl/tao/src/utils/app-root";
import * as webpack from "webpack";
import * as fs from "fs";
import * as path from "path";

export interface EchoExecutorOptions {}

export default async function echoExecutor(
  options: EchoExecutorOptions,
  context: ExecutorContext
) {
  const config = fs.readFileSync("apps/browser/webpack.config.js", "utf8");
  const webpackCompiler = webpack(
    require(path.join(appRootPath, "apps/browser/webpack.config.js"))(
      {},
      { mode: "production" }
    )
  );

  const success = await new Promise<boolean>((res) => {
    webpackCompiler.watch({}, (err, stats) => {
      if (err) {
        console.error(err);
        res(false);
      }

      console.log(
        stats.toString({
          chunks: false,
          colors: true,
        })
      );
    });
  });

  return { success };
}

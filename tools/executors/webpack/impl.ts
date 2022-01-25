import { ExecutorContext } from "@nrwl/devkit";
import webpack from "webpack";
import path from "path";

export interface ExecutorOptions {
  configPath: string;
  mode: string;
  watch: boolean;
  env?: object;
}

export default async function executor(
  options: ExecutorOptions,
  context: ExecutorContext
) {
  let env = { mode: options.mode };
  if (options.env) env = { ...options.env, ...env };

  const webpackCompiler = webpack(
    require(path.join(context.root, options.configPath))({}, env)
  );

  if (options.watch) {
    const success = await new Promise<boolean>((res) => {
      webpackCompiler.watch({}, (err, stats) => {
        if (err) {
          console.error(err);
          res(false);
        }

        console.info(
          stats.toString({
            assets: false,
            modules: false,
            chunks: false,
            performance: false,
            colors: true,
          })
        );
      });
    });

    return { success };
  } else {
    const success = await new Promise<boolean>((res) => {
      webpackCompiler.run((err, stats) => {
        if (err) {
          console.error(err);
          res(false);
        }

        console.info(
          stats.toString({
            assets: false,
            modules: false,
            chunks: false,
            performance: true,
            colors: true,
          })
        );

        webpackCompiler.close((err) => err && console.error(err));

        res(true);
      });
    });

    return { success };
  }
}

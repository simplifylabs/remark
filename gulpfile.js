const gulp = require("gulp"),
  gulpif = require("gulp-if"),
  jeditor = require("gulp-json-editor"),
  zip = require("gulp-zip"),
  manifest = require("./apps/browser/src/manifest.json"),
  package = require("./package.json");

function dist(browser, merge) {
  return gulp
    .src("./apps/browser/build/**/*")
    .pipe(gulpif(/^manifest.json$/, jeditor(merge)))
    .pipe(
      zip(`${manifest.name.toLowerCase()}-${browser}-${package.version}.zip`)
    )
    .pipe(gulp.dest("./dist/"));
}

function distFirefox() {
  return dist("firefox", (manifest) => {
    manifest.version = package.version;

    // Not supported in firefox
    delete manifest.externally_connectable;

    // Applications are required on firefox
    manifest.applications = {};
    manifest.commands["toggle_button"].suggested_key = {
      default: "Ctrl+Alt+Y",
    };
    manifest.commands["toggle_sidebar"].suggested_key = {
      default: "Ctrl+Alt+S",
    };
    return manifest;
  });
}

function distOpera() {
  return dist("opera", (manifest) => {
    manifest.version = package.version;
    manifest.externally_connectable.matches.pop();
    return manifest;
  });
}

function distChrome() {
  return dist("chrome", (manifest) => {
    manifest.version = package.version;
    manifest.externally_connectable.matches.pop();
    return manifest;
  });
}

function distEdge() {
  return dist("edge", (manifest) => {
    manifest.version = package.version;
    manifest.externally_connectable.matches.pop();
    return manifest;
  });
}

exports["dist:firefox"] = distFirefox;
exports["dist:chrome"] = distChrome;
exports["dist:opera"] = distOpera;
exports["dist:edge"] = distEdge;
exports["dist"] = gulp.parallel(distFirefox, distChrome, distOpera, distEdge);

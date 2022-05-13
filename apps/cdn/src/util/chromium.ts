import core from "puppeteer-core";

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

let _page: core.Page | null;
async function getPage() {
  if (_page) {
    return _page;
  }
  const browser = await core.launch({
    args: [],
    executablePath: exePath,
    headless: true,
  });
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(html: string) {
  const page = await getPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html);
  const file = await page.screenshot({ type: "jpeg" });
  return file;
}

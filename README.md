<h1 align="center">Remark</h1>
<p align="center">Uncensored comments, anywhere.</p>

![Example](https://imgur.com/NYTv4NE.png)

<br />
<!-- TODO: Update href's -->
<p align="center">
  <a href="https://chrome.google.com/webstore/detail/remark/x" target="_blank"><img src="https://imgur.com/3C4iKO0.png" width="64" height="64"></a>
  <a href="https://addons.mozilla.org/firefox/addon/remark/x" target="_blank"><img src="https://imgur.com/ihXsdDO.png" width="64" height="64"></a>
  <a href="https://microsoftedge.microsoft.com/addons/detail/remark/x" target="_blank"><img src="https://imgur.com/vMcaXaw.png" width="64" height="64"></a>
  <a href="https://addons.opera.com/extensions/details/remark/" target="_blank"><img src="https://imgur.com/nSJ9htU.png" width="64" height="64"></a>
  <a href="https://chrome.google.com/webstore/detail/remark/x" target="_blank"><img src="https://imgur.com/EuDp4vP.png" width="64" height="64"></a>
  <a href="https://chrome.google.com/webstore/detail/remark/x" target="_blank"><img src="https://imgur.com/z8yjLZ2.png" width="64" height="64"></a>
  <a href="https://addons.mozilla.org/firefox/addon/remark/" target="_blank"><img src="https://imgur.com/MQYBSrD.png" width="64" height="64"></a>
</p>
<br />

## Uncensored

Are your comments always getting deleted by the owner? In Remark, this is not possiblle anymore. Your comments can only be deleted by violating our Terms of Service.

## Better

Replies, Mentions, Upvotes and Downvotes - we have everything you need! Thanks to our voting system, you will always see the most important comments first.

## Anywhere

You could possibly comment anywhere you want! Even on sites that don't have a comment system. And the best of it - you can do all of that with just one account!

<br />

---

<br />

# Development

If you want to run any Remark application locally, follow these steps:

1. Make sure all [Prequerities](README.md#Prequerities) are installed
2. Follow [General Setup](README.md#General-Setup)
3. Follow [API](README.md#API-Setup), [Web](README.md#Web-Setup), [Browser](SETIP.md#Browser-Setup) and/or [CDN](SETIP.md#CDN-Setup) - depending on your needs!
4. Want to contribute? Check [CONTRIBUTING.md](CONTRIBUTING.md)

<br />

## Prequerities

1. Node ([nodejs.org](https://nodejs.org/en/download/))
2. MySQL ([mysql.com](https://www.mysql.com/de/downloads/))
3. Yarn (`npm i -g yarn`)
4. NX Cli (`yarn global add @nrwl/cli`)

<br />

## General Setup

1. Star & Fork the repository

![Fork](https://imgur.com/GeR5OCY.png)

2. Clone your fork

```bash
git clone git@github.com:USERNAME/remark.git
cd remark
```

3. Install all dependencies

```bash
yarn
```

4. Create global .env from template

```bash
cp .env.template .env
```

5. Edit `.env` to your needs

6. Pull prisma

```bash
yarn prisma:dev
```

Use these commands to execute an action for all apps:

```bash
yarn start
yarn build
yarn test
yarn lint
```

<br />

## API Setup

1. Create certs

```bash
yarn certs
```

2. Create API specific .env

```bash
cp apps/api/.env.template apps/api/.env
```

3. Edit `apps/api/.env` to your needs!

Commands:

```bash
nx serve api
nx build api
nx test api
nx lint api
```

## Web Setup

1. Create Web specific .env

```bash
cp apps/web/.env.template apps/api/.env.local
```

2. Edit apps/api/.env.local to your needs!

Commands:

```bash
nx serve web
nx build web
nx lint web
```

## Browser Setup

> Depends on [Web](README.md#Web-Setup) and [API](README.md#API-Setup)! [CDN](README.md#CDN-Setup) is recommended.

1. Build the extension

```bash
nx serve browser
```

### Chrome (or chromium based)

2. Open `chrome://extensions/`
3. Press "Load unpacked"
4. Navigate to the remark source code and select the `build` folder inside apps/browser/
5. A new extension should show up. Copy the ID showen in the extension box
6. Paste the copied id into `apps/web/.env.local` as the `NEXT_PUBLIC_CHROME_ID`

### Firefox

2. Enter `about:debugging` in the Firefox search bar
3. Navigate to the `This Firefox` tab
4. Press `Load Temporary Add-on`
5. Navigate to the remark source code and select the `manifest.json` file inside apps/browser/build

Commands:

```bash
nx serve browser
nx build browser
nx lint browser
```

## CDN Setup

> Depends on [API](README.md#API-Setup)!

1. Create CDN specific .env

```bash
cp apps/cdn/.env.template apps/cdn/.env
```

2. Edit `apps/cdn/.env` to your needs!

```bash
nx serve cdn
nx build cdn
nx lint cdn
```

## Contribute

Every contribution is welcome! Please commit any pull requests against the `main` branch. Learn more about how to contribute by reading the [`CONTRIBUTING.md`](CONTRIBUTING.md) file.

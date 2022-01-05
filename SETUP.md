# Remark Setup

If you want to run any Remark application locally, follow these steps:

1. Make sure all [Prequerities](SETUP.md#Prequerities) are installed
2. Follow [General Setup](SETUP.md#General-Setup)
3. Follow [API](SETUP.md#API-Setup), [Web](SETUP.md#Web-Setup), [Browser](SETIP.md#Browser-Setup) and/or [CDN](SETIP.md#CDN-Setup) - depending on your needs!
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
nx r api:serve
nx r api:build
nx r api:test
nx r api:lint
```

## Web Setup

1. Create Web specific .env

```bash
cp apps/web/.env.template apps/api/.env.local
```

2. Edit apps/api/.env.local to your needs!

Commands:

```bash
nx r web:serve
nx r web:build
nx r web:lint
```

## Browser Setup

> Depends on [Web](SETUP.md#Web-Setup) and [API](SETUP.md#API-Setup)! [CDN](SETUP.md#CDN-Setup) is recommended.

1. Build the extension

```bash
nx r browser:server
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
nx r browser:serve
nx r browser:build
nx r browser:lint
```

## CDN Setup

> Depends on [API](SETUP.md#API-Setup)!

1. Create CDN specific .env

```bash
cp apps/cdn/.env.template apps/cdn/.env
```

2. Edit `apps/cdn/.env` to your needs!

```bash
nx r browser:serve
nx r browser:build
nx r browser:test
nx r browser:lint
```

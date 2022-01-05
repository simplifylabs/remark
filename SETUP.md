# Remark Setup

If you want to run any Remark application locally, follow these steps:

1. Make sure all Prequerities are installed.
2. Follow [General Setup](SETUP.md#General-Setup).
3. Follow [API](SETUP.md#API-Setup), [Web](SETUP.md#Web-Setup), [Browser](SETIP.md#Browser-Setup) and/or [CDN](SETIP.md#CDN-Setup) - depending on your needs!
4. Want to contribute? Check [CONTRIBUTING.md](CONTRIBUTING.md).

## Prequerities

1. Node ([nodejs.org](https://nodejs.org/en/download/))
2. MySQL ([mysql.com](https://www.mysql.com/de/downloads/))
3. Yarn (`npm i -g yarn`)
4. NX Cli (`npm i -g @nrwl/cli`)

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

and edit .env to your needs.

5. Pull prisma

```bash
npm run prisma:dev
```

## API Setup

1. Create certs

```
yarn certs
```

2. Create .env

```
cp apps/api/.env.template apps/api/.env
```

and edit apps/api/.env to your needs.

<br />

---

<br />

## Contributing

If you want to contribute, follow [CONTRIBUTING.md](CONTRIBUTING.md).

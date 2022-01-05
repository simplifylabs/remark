# Build/Run Remark

## Prequerities

1. Node ([nodejs.org](https://nodejs.org/en/))
2. Yarn (`npm i -g yarn`)
3. NX Cli (`npm i -g @nrwl/cli`)

## Global Setup

Install all packages:

```bash
yarn
```

## API Setup

### Create certs

```
yarn certs
```

### Create .env

```
cp .env.template .env
cp apps/api/.env.template apps/api/.env
```

and edit .env and apps/api/.env to your needs!

### Pull prisma

```bash
npm run prisma:dev
```

## Contributing

If you want to contribute, follow [CONTRIBUTING.md](CONTRIBUTING.md).
# Build/Run Remark

Install all packages:

```bash
yarn
```

## API

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

# Prequerities

1. Node ([nodejs.org](https://nodejs.org/en/))
2. Yarn (`npm i -g yarn`)
3. NX Cli (`npm i -g @nrwl/cli`)

## Contributing

If you want to contribute, follow [CONTRIBUTE.md](CONTRIBUTE.md)

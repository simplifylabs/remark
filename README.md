# Remark

## Installation

Install all packages:

```bash
yarn
```

### API

**Create certs**

```
yarn certs
```

**Create .env**

```
cp apps/api/.env.template apps/api/.env
```

and edit apps/api/.env to your needs!

**Pull prisma**

Development:

```bash
npm run prisma:dev
```

Production:

```bash
npm run prisma:prod
```

## Prequerities

1. [Node](https://nodejs.org/en/)
2. Yarn `npm i -g yarn`
3. NX Cli `npm i -g @nrwl/cli`

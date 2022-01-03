# Remark

## Installation

Install all packages:

```bash
yarn
```

### API

** Create certs **

```
bash scripts/certs.sh
```

** Create .env **

```
cp apps/api/.env.template apps/api/.env
```

and edit apps/api/.env to your needs!

** Pull prisma **

Development:

```bash
npm run prisma:dev
```

Production:

```bash
npm run prisma:prod
```

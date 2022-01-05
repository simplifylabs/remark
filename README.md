<h1 align="center">Remark</h1>
<p align="center">Uncensored comments, anywhere.</p>

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
cp .env.template .env
cp apps/api/.env.template apps/api/.env
```

and edit .env and apps/api/.env to your needs!

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

1. Node ([nodejs.org](https://nodejs.org/en/))
2. Yarn (`npm i -g yarn`)
3. NX Cli (`npm i -g @nrwl/cli`)

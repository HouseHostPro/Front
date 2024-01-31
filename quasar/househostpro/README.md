# HouseHostPro (househostpro)

proyecto HouseHostPro

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

Para docker hay que modificar en quasar.config.js el devserver
y cambiar el parametro open: false y poner port: (puerto del docker)

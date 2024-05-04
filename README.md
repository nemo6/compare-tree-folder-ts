```
@types/express@4.17.15
@types/lodash@4.14.191
@typescript-eslint/eslint-plugin@5.48.1
@typescript-eslint/parser@5.48.1

express-ts@1.0.0
eslint@8.31.0
express@4.18.2
lodash@4.17.21
typescript@4.9.4
```

# tsconfig.json

```
{

"compilerOptions": {

  "target"            : "es6",
  "module"            : "commonjs",
  "moduleResolution"  : "node",
  "resovleJsonModule" : true,
  "esModuleInterop"   : true,
  "strict"            : true

  }

}
```

# package.json ? 1 ?

```
"devDependencies": {

  "@types/lodash": "^4.14.191",
  "@typescript-eslint/eslint-plugin": "^5.48.1",
  "@typescript-eslint/parser": "^5.48.1",

  "lodash": "^4.17.21",
  "electron": "^22.0.2",
  "eslint": "^8.31.0",
  "typescript": "^4.9.4"

}
```

```
.eslintrc.cjs
.eslintignore
```

# package.json ? 2 ?

```
"scripts": {

  "build": "npx tsc",
  "prestart": "npm run build",
  "start": "node dist/index.js",
  "preserve": "npm run build",
  "serve": "concurrently \"npx tsc -w\"  \"nodemon dist/index.js\""

}
...
"dependencies": {

  "@types/express": "^4.17.13",
  "@types/node": "^18.7.16",
  "concurrently": "^7.4.0",
  "rimraf": "^3.0.2",
  "typescript": "^4.8.3"

},

"devDependencies": {

  "express": "^4.18.2",
  "nodemon": "^2.0.19"

}
```

[Recursive functions in TypeScript](https://joshtronic.com/2020/04/20/recursive-functions-in-typescript/)

[Recursive data structure](https://catchts.com/recursive-ds)

[Pedantic index signatures in TypeScript](https://tkdodo.eu/blog/pedantic-index-signatures-in-type-script-4-1)

[Fun with advanced TypeScript](https://www.youtube.com/watch?v=nNse0r0aRT8)

# electron buid

```
"electron": "^25.2.0"
"electron-builder": "^24.4.0"
"lodash": "^4.17.21"
```

```
npm install electron electron-builder
```

# Remove types modules

    npm uninstall --no-save


```
npm run dist
```

```
express-ts@1.0.0
@types/express@4.17.15
@types/lodash@4.14.191
@typescript-eslint/eslint-plugin@5.48.1
@typescript-eslint/parser@5.48.1
eslint@8.31.0
express@4.18.2
lodash@4.17.21
typescript@4.9.4
```

```
.eslintrc.cjs
.eslintignore
```

	tsconfig.json

```
{
	"compilerOptions": {
		"target": "es6",
		"module": "commonjs",
		"moduleResolution": "node",
		"resovleJsonModule": true,
		"esModuleInterop": true,
		"strict": true,
		...
	}
}
```

[Recursive functions in TypeScript](https://joshtronic.com/2020/04/20/recursive-functions-in-typescript/)

[Recursive data structure](https://catchts.com/recursive-ds)

[Pedantic index signatures in TypeScript](https://tkdodo.eu/blog/pedantic-index-signatures-in-type-script-4-1)

[Fun with advanced TypeScript](https://www.youtube.com/watch?v=nNse0r0aRT8)

# Remove types modules

    npm uninstall --no-save

# electron buid

```
"electron": "^25.2.0",
"electron-builder": "^24.4.0",
"lodash": "^4.17.21",
```

```
npm install electron electron-builder
```

```
npm run dist
```

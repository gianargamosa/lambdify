---

- Creates service for lambda function
## Installation

```sh
npm i lambdify
# with yarn
yarn add lambdify
```

## Usage

### Help

If you need any docs on `lambdify` simply run the following from your terminal:

```sh
npx lambdify --help
```

### Targeting more files

`lambdify` also supports targeting other files that might not be in `src`.
Simply provide a glob to `lambdify` and it will also generate docs for those files.

```json
{
  "scripts": {
    "generate-docs": "lambdify components/**/*.(ts|tsx)"
  }
}
```

## Contributing

To get set up developing this library run the following commands.

```shell
# Install deps
yarn

# Build the library in watch mode
yarn start

# Run the tests
yarn test && yarn lint
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
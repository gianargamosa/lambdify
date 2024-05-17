---

- Creates documentation for any exported entity
- Combines JSDoc + TypeScript annotations
- Includes parameters, return types, descriptions, and even example blocks

## Installation

```sh
npm i lambdify
# with yarn
yarn add lambdify
```

## Usage

Simply run `lambdify` and it will pick up all the typescript files in your `src` folder and generate docs.

```json
{
  "scripts": {
    "generate-docs": "lambdify"
  }
}
```

And insert this block of code somewhere in your `README.md`:

```md
<!-- INSERT GENERATED DOCS START -->

<!-- INSERT GENERATED DOCS END -->
```

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

### Node API

You can use `lambdify` as a normal node package too!
This gives you finer grain control of where your docs are inserted!

<!-- lambdify-GENERATED START -->

#### `generateMarkdown` (function)

Generate the markdown docs a doc returned from `getAllDocs`

**Parameters:**

- doc (`TypeScriptDocument`) - The TypeScript document to generate types for
- headerDepth (`number`)

**returns:** string

#### `getAllDocs` (function)

Get the docs for all some files in the project.

**Parameters:**

- pattern (`string | string[]`) - A glob pattern or patterns to match files from

**returns:** Promise<TypeScriptDocument[]>

#### `createMatcher` (function)

Create a markdown comment matcher. This matches the section where
we will insert docs. Use this to create a custom section.

**Parameters:**

- name (`string`) - The name to use in the markdown comment

**returns:** RegExp

#### `GenerateOptions` (interface)

**Members:**

- matcher (`RegExp`) - A regex to match the part of the readme
- pattern (`string | string[]`) - A glob pattern or patterns to match files from
- headerDepth (`number`) - How deep the markdown headers should be

#### `generate` (function)

Generate all the docs and put it in the README.

**Parameters:**

- options (`GenerateOptions`) - Options for generating the docs

**returns:** Promise<void>

```tsx
import generate, { createMatcher } from 'lambdify';

generate({ matcher: createMatcher('lambdify-GENERATED') });
```

<!-- lambdify-GENERATED END -->

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
# Kubevue CLI

CLI for developing Kubevue Projects.

[![CircleCI][circleci-img]][circleci-url]
[![NPM Version][npm-img]][npm-url]
[![Dependencies][david-img]][david-url]
[![NPM Download][download-img]][download-url]

[circleci-img]: https://img.shields.io/circleci/project/github/kubevue/kubevue-cli.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/kubevue/kubevue-cli
[npm-img]: http://img.shields.io/npm/v/kubevue-cli.svg?style=flat-square
[npm-url]: http://npmjs.org/package/kubevue-cli
[david-img]: http://img.shields.io/david/kubevue/kubevue-cli.svg?style=flat-square
[david-url]: https://david-dm.org/kubevue/kubevue-cli
[download-img]: https://img.shields.io/npm/dm/kubevue-cli.svg?style=flat-square
[download-url]: https://npmjs.org/package/kubevue-cli

## Project Types

- `library`
- `app`

## Install

``` shell
npm install -g kubevue-cli
```

## Quick Start

``` shell
kubevue init app my-app
npm install
kubevue dev
```

## Commands

- `kubevue help`: Show help of all commands
- `kubevue -V, --version`: Show the version of current CLI

- `kubevue init <project-type> <project-name>`: Initalize a kubevue project
- `kubevue dev`: Run webpack develop server
    - `-c, --config-path <path>`: Kubevue config path
    - `-e, --entry-path <path>`: Change default entry path
    - `-l, --library-path <path>`: Library entry path. To be `./index.js` by default if project type is `library`
    - `-d, --docs`: Generate docs of common components in library. Always be true if project type is `library`
    - `-p, --port <port>`: Web Server Port
    - `-O, --no-open`: Disable to open browser at the beginning
    - `-H, --no-hot`: Disable to hot reload
    - `-v, --verbose`: Show more information
    - `--resolve-priority`: Priority to resolve modules or loaders, "cwd"(default) or "cli"
- `kubevue build`: Build a distribution
    - `-c, --config-path <path>`: Kubevue config path
    - `-e, --entry-path <path>`: Change default entry path
    - `-C, --no-clean`: Not clean the output directory at start
    - `-l, --library-path <path>`: Library entry path. To be `./index.js` by default if project type is `library`
    - `-d, --docs`: Generate docs of common components in library. Always be true if project type is `library`
    - `-s, --source-map`: Generate source map in build mode
    - `-v, --verbose`: Show more information
    - `--extract-css`: Extract CSS by ExtractTextWebpackPlugin in build mode
    - `--uglify-js`: Compress and mangle JS by UglifyjsWebpackPlugin in build mode
    - `--minify-js`: Minify JS only in `build` mode. Set `true` or `'babel-minify'` to use BabelBabelMinifyWebpackPlugin, set `'uglify-js'` to use UglifyjsWebpackPlugin as same as `--uglify`
    - `--force-shaking`: Force to enable tree shaking under this path without care of side effects. It\'s different from default tree shaking of webpack
    - `--experimental`: Enable some experimental loaders or plugins
    - `--resolve-priority`: Priority to resolve modules or loaders, "cwd"(default) or "cli"
- `kubevue serve`: Run a static server
    - `-c, --config-path <path>`: Kubevue config path
    - `-p, --port <port>`: Web Server Port
    - `-O, --no-open`: Disable to open browser at the beginning
- `kubevue test`: Run karma test
    - `-c, --config-path <path>`: Kubevue config path
    - `-p, --port <port>`: Web Server Port
    - `-w, --watch`: Karma watch
    - `--resolve-priority`: Priority to resolve modules or loaders, "cwd"(default) or "cli"
- `kubevue publish <version>`: Publish a new version
- `kubevue ghpages [directory]`: Push output directory to gh-pages. If the directory is not specfied, it will be webpack output path
    - `-c, --config-path <path>`: Kubevue config path
- `kubevue dep`: List dependencies of kubevue-cli
- `kubevue list [directory]`: List all components in a directory. If the directory is not specfied, it will be process.cwd()
- `kubevue transform <vue-path>`: Transform Vue component between singlefile and multifile pattern

## Configuration

Default `kubevue.config.js` file:

``` js
{
    type: '',                              // [Required] Kubevue project type. 'library', 'app'
    staticPath: '',                        // Path of static files, which will be copied into destination directory. It accepts a String or Array.
    libraryPath: '',                       // [Required] Library directory path. To be srcPath by default
    baseCSSPath: '',                       // Path of base CSS. If not set, it will be `library/base/base.css`
    globalCSSPath: '',                     // Path of global CSS. If not set, it will be `library/base/global.css`
    testPaths: {                           // Paths for karma test
        src: './src',
        unit: './test/unit',
    },
    entry: {                               // Generate entry and HTMLWebpackPlugin automatically
        pages: undefined,
        prepend: [],
        append: [],
        commons: false,
        template: undefined,
    },
    clean: true,                           // Clean the output directory in `build` mode
    docs: false,                           // Generate docs of common components in library. Always be true if project type is `library`
    open: true,                            // Enable/Disable to open browser at the beginning in `dev` mode
    hot: true,                             // Enable/Disable to hot reload in `dev` mode
    sourceMap: false,                      // Generate sourceMap in `build` mode
    verbose: false,                        // Show more information
    friendly: true,                        // Show errors friendly via FriendlyErrorsPlugin in `dev` mode
    lint: false,                           // Lint codes when compiling via eslint-loader
    extractCSS: false,                     // Extract CSS via ExtractTextWebpackPlugin only in `build` mode
    uglifyJS: true,                        // Compress JS via UglifyjsWebpackPlugin only in `build` mode
    minifyJS: false,                       // Minify JS only in `build` mode. Set `true` or 'babel-minify' to use BabelBabelMinifyWebpackPlugin, set 'uglify-js' to use UglifyjsWebpackPlugin as same as `uglifyJS: true`
    forceShaking: false,                   // Force to enable tree shaking under this path without care of side effects. It's different from default tree shaking of webpack.
    concatenation: true,
    experimental: false,                   // Enable some experimental loaders or plugins, like ModuleConcatenationPlugin
    resolvePriority: 'cwd',                // Priority to resolve modules or loaders, "current"(default), "cwd" or "cli"
    browsers: ['> 1%', 'last 2 versions', 'ie >= 9'],    // Browers Compatibility referred in autoprefixer. See browserslist for more details
    babelIncludes: [],                     // Reinclude some files excluded in node_modules
    webpack: {},                           // Extend webpack configuration
    webpackDevServer: {},                  // Extend webpackDevServer configuration
    postcss: [],                           // Extend postcss plugins
    vue: {},                               // Extend vue-loader options
    karma: {},                             // Extend karma configuration
    options: {},                           // Extra options for loaders or plugins,
    // such as IconFontPlugin, CSSSpritePlugin, ExtractTextWebpackPlugin, UglifyjsWebpackPlugin, EnvironmentPlugin, BabelMinifyWebpackPlugin, CopyWebpackPlugin, ForceShakingPlugin
};

```

## Development

### Related Dependencies

- [vue-multifile-loader][vue-multifile-loader-url] ![vue-multifile-loader][vue-multifile-loader-img]
- [@kubevue/vue-loader][kubevue-vue-loader-url] ![@kubevue/vue-loader][kubevue-vue-loader-img]
- [@kubevue/css-loader][kubevue-css-loader-url] ![@kubevue/css-loader][kubevue-css-loader-img]
- [@kubevue/doc-loader][kubevue-doc-loader-url] ![@kubevue/doc-loader][kubevue-doc-loader-img]
- [icon-font-loader][icon-font-loader-url] ![icon-font-loader][icon-font-loader-img]
- [css-sprite-loader][css-sprite-loader-url] ![css-sprite-loader][css-sprite-loader-img]
- [svg-classic-sprite-loader][svg-classic-sprite-loader-url] ![svg-classic-sprite-loader][svg-classic-sprite-loader-img]

[vue-multifile-loader-img]: http://img.shields.io/npm/v/vue-multifile-loader.svg?style=flat-square
[vue-multifile-loader-url]: http://npmjs.org/package/vue-multifile-loader
[kubevue-vue-loader-img]: http://img.shields.io/npm/v/@kubevue/vue-loader.svg?style=flat-square
[kubevue-vue-loader-url]: http://npmjs.org/package/@kubevue/vue-loader
[kubevue-css-loader-img]: http://img.shields.io/npm/v/@kubevue/css-loader.svg?style=flat-square
[kubevue-css-loader-url]: http://npmjs.org/package/@kubevue/css-loader
[kubevue-doc-loader-img]: http://img.shields.io/npm/v/@kubevue/doc-loader.svg?style=flat-square
[kubevue-doc-loader-url]: http://npmjs.org/package/@kubevue/doc-loader
[icon-font-loader-img]: http://img.shields.io/npm/v/icon-font-loader.svg?style=flat-square
[icon-font-loader-url]: http://npmjs.org/package/icon-font-loader
[css-sprite-loader-img]: http://img.shields.io/npm/v/css-sprite-loader.svg?style=flat-square
[css-sprite-loader-url]: http://npmjs.org/package/css-sprite-loader
[svg-classic-sprite-loader-img]: http://img.shields.io/npm/v/svg-classic-sprite-loader.svg?style=flat-square
[svg-classic-sprite-loader-url]: http://npmjs.org/package/svg-classic-sprite-loader

# html-script-src-replace

Install: `npm i html-script-src-replace -D`

html-script-src-replace is a cli program that updates a script elements src value to a new value in an html file. 

For example, suppose you have the following html:
```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<script type="text/javascript" src="./foo.js"></script>
</body>
</html>
```
html-script-src-replace could convert this to:
```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<script type="text/javascript" src="./foo_PCSBCihwEuR6LTbe5bVW.js"></script>
</body>
</html>
```

You would use html-script-src-replace when you are cache-busting javascript via changing the javascript's file name, but are not using a bundler like webpack/parcel/rollup.

html-script-src-replace knows the cache-bust string being used via the `CACHE_BUST_STRING` variable you set in your cli environment. (It sees this internally as `process.env.CACHE_BUST_STRING`).

For example, suppose you have the following npm scripts:

```
"build": "CACHE_BUST_STRING=$(random string) NODE_ENV=production run-s build:**",
"build:cachebust-js-files": "laren \"./dist/js/**/*.js\" \"f => f.replace('.js', '_' + process.env.CACHE_BUST_STRING + '.js')\"",
"build:update-html-script-src": "html-script-src-replace --html-input-file index.html --html-output-file dist/index.html --filename-postfix _"
```

you can see that `CACHE_BUST_STRING` is set to a random string that other npm tasks use for cache-busting, including update-html-script-src.


```
Options:
  -id, --script-element-id   HTML script element id (optional - this is handy in case you have more than one script tag in the html page)
  -i, --html-input-file      HTML input file
  -o, --html-output-file     HTML output file
  -pr, --filename-prefix     File name prefix (optional)
  -po, --filename-postfix    File name postfix (optional)
  -h, --help
```

Note: the cache bust string does not represent a hash of the javascript file. It is just a random string.

#### Other links

* [random-generator-cli](https://github.com/AmrSaber/random-cli) - generate random text
* [Laren](https://github.com/devmetal/laren) - rename files on the command line
* [cachebust-es6-imports-cli](https://gitlab.com/Darkle1/cachebust-es6-imports-cli) - rename es6 imports using the `CACHE_BUST_STRING`
* [babel-plugin-transform-rename-import](https://github.com/laat/babel-plugin-transform-rename-import)
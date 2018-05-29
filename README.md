
## STEP 1
Setup folder and file structure

    # coffeescript
        * src
            - coffee
                -- script.coffee
            - lib
            - sass
                -- main.scss
            - scripts
                -- logic1.js
                -- logic2.js
        * css
        * js
        * index.html

## STEP 2
Setting up nodejs with required packages

$ cd coffeescript

$ npm init

$ npm install --save-dev gulp gulp-util gulp-coffee gulp-concat gulp-sass gulp-uglify gulp-livereload tiny-lr

If you want to upgrade npm,
$ npm i npm@latest -g

If there are errors / packages deprecated, it will list them
$ npm install --save-dev vinyl replace-ext ansi-colors date-format fancy-log lodash.template minimist beeper through2 multipipe list-stream plugin-error

To audit vulnerable libraries, 
$ npm audit

To fix audited packages automatically if possible
$ npm audit fix


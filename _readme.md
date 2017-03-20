FOLDERS 
------------------------------------
    1.  src (input)
         |- app                 - all code files
         |- style               - all css files
         |- www                 - index.html and all resources - images,  libs, styles ... 

    2.  dist (output)
         |- debug
             |- ...             - all www src/www/ files and folders
             |- app.js          - compiled source code
             |- app.maps.js     - sourcemaps
             |- app.css         - concat source styles
         |- release
             |- ...             - all www src/www/ files and folders
             |- app.js          - compiled source code and minified
             |- app.css         - concat source styles and minified

BUILD
------------------------------------

    [ Main Commands ]    
    1. gulp clean               - remove "./dist/" folder
    2. gulp debug               - to "./bin/debug"   copy "src/www", build "src/style/", build "scr/app"
    3. gulp release             - to "./bin/release" copy "src/www", build "src/style/", build "scr/app"
    4. gulp building            - task build-debug and watch for any chandes in "scr/app" and "src/style"

    [ Other Commands ]    
    1. gulp www-debug           - to "./bin/debug"   copy "src/www"
    2. gulp www-release         - to "./bin/release" copy "src/www"

USAGE
------------------------------------

    1. run #npm install
    2. Change your google API KEY at ./src/www/index.html when including Google Maps API at header

    For debug:
    3. run #gulp debug
    4. run #npm start

    For release:
    3. run #gulp debug
    4. run #npm start
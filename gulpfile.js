// gulp is required
// gulp-nodemon plugin is required

/*
    command line: gulp
    [16:32:34] Using gulpfile ..\gulpfile.js
    [16:32:34] Starting 'default'...
    [16:32:35] Finished 'default' after 328 ms
    [16:32:35] [nodemon] 1.17.2
    [16:32:35] [nodemon] to restart at any time, enter `rs`
    [16:32:35] [nodemon] watching: *.*
    [16:32:35] [nodemon] starting `node app.js`
*/
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    chalk = require('chalk');

    // chalk ref https://github.com/chalk/chalk


    // Define default task with configuration to nodemon (gulp plugin to watch changes and restart server automatically)
    // task will define starting script
    // extensions to watch when changes occurs
    // set env.port to start on
    // set dir and files to ignore changes to
gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env:{
            PORT:8000
        },
        ignore:['./node_modules/**']
    })
    .on('restart', function(){          //listener to restart event, when app is restarted
        console.log(chalk.magenta('app restarted!'));
    })
})
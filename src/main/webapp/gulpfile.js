var gulp = require('gulp'),
    gutil = require('gulp-util'),
    del = require('del'),
    webpack = require('webpack');

var env_prod = process.env.NODE_ENV === 'production';

// Clean output directory
gulp.task('clean', function(cb){
    del([__dirname + '/assets/*'], cb);
});

gulp.task('webpack_compile', ['clean'], function(cb){
    webpack(require('./webpack.config')(env_prod), function (err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            verbose: true,
            version: false,
            timings: true
        }));
        cb();
    });
});


gulp.task('watch', ['webpack_compile'], function(){
    gulp.watch([__dirname + '/src/js/**/*.js', __dirname + '/src/js/**/*.jsx', __dirname + '/src/less/**/*.less' ], ['webpack_compile']);
});

gulp.task('default',['watch']);

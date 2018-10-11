var gulp = require('gulp')
var server = require('gulp-webserver')

gulp.task('server', function () {
  gulp.src('./public/')
           .pipe(server({
            port: 4001,
            livereload: true
           }))
})

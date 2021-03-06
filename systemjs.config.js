/**
 * System configuration for Angular 2 apps
 * Adjust as necessary for your application needs.
 */
(function (global) {
  var routerVer = '@3.0.0-alpha.7'; // lock router version
  // map tells the System loader where to look for things
  var map = {
    'app': 'app', // 'dist',

    '@angular': 'node_modules/@angular',
    '@angular/router': 'node_modules/@angular/router',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs': 'node_modules/rxjs',
    'angular2-jwt': 'node_modules/angular2-jwt',
    'ng2-bootstrap': 'node_modules/ng2-bootstrap',
    'moment': 'node_modules/moment',
    'crypto-js': 'node_modules/crypto-js',
    'jquery': 'node_modules/jquery/dist',
    'jqueryui': 'node_modules/jqueryui'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    '@angular/router': { main: 'index.js', defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'angular2-jwt': { main: 'angular2-jwt.js', defaultExtension: 'js' },
    'ng2-bootstrap': { main: 'ng2-bootstrap.js', defaultExtension: 'js' },
    'moment': { main: 'moment.js', defaultExtension: 'js' },
    'crypto-js': { main: 'crypto-js.js', defaultExtension: 'js' },
    'jquery': { main: 'jquery.min.js', defaultExtension: 'js' },
    'jqueryui': { main: 'jquery-ui.min.js', defaultExtension: 'js' },
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  };
  System.config(config);

})(this);

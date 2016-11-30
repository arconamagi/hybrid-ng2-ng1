// See also: https://angular.io/docs/ts/latest/quickstart.html
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'src': 'src',
    'rxjs': 'node_modules/rxjs',
    '@angular': 'node_modules/@angular',
    '@angular/upgrade/static': 'node_modules/@angular/upgrade/bundles/',
    'ng1app': 'src/ng1/app.js'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'rxjs': { defaultExtension: 'js' },
    'ts': { format: 'register', defaultExtension: 'js' }
  };

  var angularPackages = [
    'core',
    'common',
    'compiler',
    'platform-browser',
    'platform-browser-dynamic',
    'http',
    'upgrade'
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  angularPackages.forEach(function(pkgName) {
    packages['@angular/' + pkgName] = {
      main: 'bundles/' + pkgName + '.umd.js',
      defaultExtension: 'js'
    };
  });

  packages['src'] = {
    main: 'src',
    defaultExtension: 'js'
  };

  packages['@angular/upgrade/static'] = {
    main: 'upgrade-static.umd.js',
    defaultExtension: 'js'
  };

  var config = {
    map: map,
    packages: packages
  };

  console.log('config', config);

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);

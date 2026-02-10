Package.describe({
    name: 'vlasky:blaze-s-alert',
    summary: 'Simple and fancy notifications / alerts / errors for Meteor using Blaze Templates',
    version: '3.4.0',
    git: 'https://github.com/vlasky/meteor-blaze-s-alert.git',
    types: 'index.d.ts'
});

Package.onUse(function (api) {
    api.versionsFrom(['METEOR@2.0', 'METEOR@3.0']);
    api.use('ecmascript');
    api.use('mongo');
    api.use('templating@1.4.0');
    api.use('underscore');
    api.use('jquery@1.11.11 || 3.0.0', 'client');
    api.mainModule('client/index.js', 'client');
  // TypeScript ambient declaration file
    api.addAssets('index.d.ts', ['client', 'server']);
    api.addFiles([
        'client/s-alert-template.html',
        'client/s-alert-default.css',
        'client/s-alert-scale.css',
        'client/s-alert-slide.css',
        'client/s-alert-genie.css',
        'client/s-alert-jelly.css',
        'client/s-alert-flip.css',
        'client/s-alert-bouncyflip.css',
        'client/s-alert-stackslide.css'
    ], 'client');
    api.export('sAlert', ['client']);
});

Package.onTest(function (api) {
    api.versionsFrom(['METEOR@2.0', 'METEOR@3.0']);
    api.use('ecmascript');
    api.use('jquery@1.11.11 || 3.0.0', 'client');
    api.use([
        'templating@1.4.0',
        'vlasky:blaze-s-alert@3.4.0',
        'meteortesting:mocha'
    ]);
    api.mainModule('tests/s-alert-test.js', 'client');
});

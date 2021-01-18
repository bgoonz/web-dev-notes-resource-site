// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");





'use strict';

module.exports = {
  opts: {
    readme: './README.md',
    package: './package.json',
    template: './node_modules/jsdoc-fresh',
    recurse: true,
    verbose: true,
    destination: './docs/',
  },
  plugins: ['plugins/markdown', 'jsdoc-region-tag'],
  source: {
    excludePattern: '(^|\\/|\\\\)[._]',
    include: ['src'],
    includePattern: '\\.js$',
  },
  templates: {
    copyright: 'Copyright 2019 Google, LLC.',
    includeDate: false,
    sourceFiles: false,
    systemName: 'googleapis',
    theme: 'lumen',
    default: {
      outputSourceFiles: false,
    },
  },
  markdown: {
    idInHeadings: true,
  },
};

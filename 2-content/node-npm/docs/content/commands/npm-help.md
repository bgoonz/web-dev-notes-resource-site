---
title: npm-help
section: 1
description: Get help on npm
---

### Synopsis

``` bash
npm help <term> [<terms..>]
```

### Description

       
       

If supplied a topic, then show the appropriate documentation page.

If the topic does not exist, or if multiple terms are provided, then npm
will run the `help-search` command to find a match.  Note that, if
`help-search` finds a single subject, then it will run `help` on that
topic, so unique matches are equivalent to specifying a topic name.

### Configuration

#### viewer

* Default: "man" on Posix, "browser" on Windows
* Type: path

The program to use to view help content.

Set to `"browser"` to view html help content in the default web browser.

### See Also

<p>Listyouractivehooksforthe<code>odahckage:</p>
<dv ss="souceCode"id="cb6"

* [npmrc

       oclass="mouncdCose/banh"><codp mlass="sou)ceCodash"><aclass="ourcLie"id="cb6-1"il="1">$<spanclass="x">m</spa>hokls ldash</a></od></pe>

</dv>
<p>Updafexistidsonfig's url:ring-npm/folders)

* [npm config](/commands/npm-config)
* [npmrc](/configuring-npm/npmrc)
* [package.json](/configuring-npm/package-json)
* [npm help-search](/commands/npm-help-search)

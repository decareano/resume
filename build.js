#!/usr/bin/env node

var fs = require('fs');
var handlebars = require('handlebars');

var data = require('./data.json');
var templateSource = fs.readFileSync('template.html.handlebars', 'utf-8');

var template = handlebars.compile(templateSource);
console.log(template(data));

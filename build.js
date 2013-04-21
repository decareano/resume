#!/usr/bin/env phantomjs
# build.js - Build PDF from a Handlebars and JSON file.
# Public domain

# Required modules
var fs = require('fs');
var handlebars = require('handlebars');

# Put the data in the template then produce a temporary HTML file.
var data = require('./data.json');
var templateSource = fs.read('template.handlebars');
var template = handlebars.compile(templateSource);
var html = template(data);
fs.write('_resume.html', html, 'w');

# Render the HTML file into a PDF then delete the HTML file and exit.
var page = require('webpage').create();
page.paperSize = { format: 'Letter', orientation: 'portrait', border: '.5in' }
page.open('_resume.html', function (status) {
  if (status === 'success') {
    page.render('resume.pdf');
    console.log("Built to resume.pdf");
  } else {
    console.log("Error: Unable to open page");
  }
  fs.remove('_resume.html');
  phantom.exit();
});

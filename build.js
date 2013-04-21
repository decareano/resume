#!/usr/bin/env phantomjs

var fs = require('fs');
var handlebars = require('handlebars');

var data = require('./data.json');
var templateSource = fs.read('template.html.handlebars');

var template = handlebars.compile(templateSource);
var html = template(data);
fs.write('_resume.html', html, 'w');

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

//fs.writeFileSync('resume.html', resume);
//console.log("Built resume to resume.html.");

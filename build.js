#!./node_modules/phantomjs/bin/phantomjs
// build.js - Build PDF from a Handlebars and JSON file.
// Public domain

Size = 'Letter';
Margin = '.5in';

fs = require('fs');
system = require('system');
handlebars = require('handlebars');

// Put the data in the template then produce a temporary HTML file.
data = require('./data.json');
templateSource = fs.read('template.handlebars');
template = handlebars.compile(templateSource);
html = template(data);
fs.write('_resume.html', html, 'w');

// Render the HTML file into a PDF then delete the HTML file and exit.
page = require('webpage').create();
page.paperSize = { format: Size, orientation: 'portrait', border: Margin }
page.open('_resume.html', function (status) {
  if (status === 'success') {
    page.render('resume.pdf');
    console.log("Built to resume.pdf");
  } else {
    console.log("Error: Unable to open page");
  }
  if (system.args[1] !== '--keep-html') fs.remove('_resume.html');
  phantom.exit();
});

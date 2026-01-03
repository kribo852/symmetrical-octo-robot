import { writeFile, readFileSync } from 'fs';
import * as beautify from 'simply-beautiful';

var options = {
  indent_size: 2,
  // ...
}

let unformatted_html = readFileSync("output.html", 'utf8');
console.log(unformatted_html);
console.log(beautify);

console.log(beautify.default.html(unformatted_html, options));

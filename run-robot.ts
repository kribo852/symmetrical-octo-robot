import {TreeNode, HtmlNode} from './symmetrical-octo-robot.js'
import { writeFile, readFileSync } from 'fs';

let layout_file_name = process.argv[2];
let content_file_name = process.argv[3];

let tree = new HtmlNode(process.argv[4] ?? "Boring"); 

let layout = JSON.parse(readFileSync(layout_file_name, 'utf8'));

tree.add(layout);

let content = JSON.parse(readFileSync(content_file_name, 'utf8'));

for (let index in content) {
	tree.add(content[index]);
}


writeFile("output.html", tree.output,  function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("File created!");
});

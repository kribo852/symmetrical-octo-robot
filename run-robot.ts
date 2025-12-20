import {TreeNode, HtmlNode} from './symmetrical-octo-robot.js'
import { writeFile } from 'fs';


let tree = new HtmlNode(); 

let grid = {
	type: "layout",
	grid: [
		["", "heading", ""],
		["information"],
		["", "first_name", ""],
		["", "last_name", ""],
		["", "telephone", ""],
		["footer", ""]
	]
};

tree.add(grid);


let content = [
	{
		type: "input_text",
		name: "first_name",
		description: "enter your first name" 
	},
	{
		type: "input_text",
		name: "last_name",
		description: "enter your last name" 
	},
	{
		type: "input_text",
		name: "telephone",
		description: "enter your phone number" 
	},
	{
		type: "heading",
		name: "heading",
		description: "sign up for buying a near as new car!"
	},
	{
		type: "information",
		name: "information",
		description: "bla bla bla bla bla bla"
	},
	{
		type: "information",
		name: "footer",
		description: "other crazy offers here, or call +5436 1122334455678912367543345435243267"
	}
];

for (let index in content) {
	tree.add(content[index]);
}



writeFile("output.html", tree.output,  function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("File created!");
});

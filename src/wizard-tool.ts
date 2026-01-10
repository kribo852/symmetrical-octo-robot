import { writeFile, readFileSync } from 'fs';
import * as beautify from 'simply-beautiful';
import { HtmlNode } from './symmetrical-octo-robot.js'
const _prompt = require('prompt-sync')();

function run_wizzard() {
	let output_json = [];
	
	while(true) {
		console.log("Actions: <heading> <information> <input_text> <input_date> <picture> \n <select> <checkbox> <radio> <button> <output>");
		const action = _prompt("Select an action ");

		if(action == "exit") {
			break;
		}

		let object = {};

		object["type"] = action;

		switch(action) {
			case "heading":
			case "information":
			case "input_text":
			case "input_date":
				output_json.push(add_initial_visibility(add_property("description", add_property("name", object))));
			break;
			case "button":
				output_json.push(add_multi_values("shows" , (add_initial_visibility(add_property("description", add_property("name", object))))));
			break;
			case "select":
			case "radio":
			case "checkbox":	
				output_json.push(add_multi_values("values" , (add_initial_visibility(add_property("description", add_property("name", object))))));
			break;
			case "output":
				output_to_file(make_layout(output_json), output_json);
			break;
		}
		console.log(output_json);
	}
}

function add_property(property_name: string, object) {
	const value = _prompt("Enter value for the property " + property_name + " ");
	object[property_name] = value;
	return object;
}

function add_initial_visibility(object) {
	let visible = _prompt("Enter the initial visibility yes/no default yes")
	if (visible === "no") {
		object["visible"] = "no";
	}
	return object;
}

function output_to_file(layout, content) {
	let tree = new HtmlNode("Mystical_forest"); 
	tree.add(layout);
	for (let index in content) {
		tree.add(content[index]);
	}

	let unformatted_html = tree.output;

	var options = {
  		indent_size: 2,
	}

	let file_name = _prompt("Enter a file name ");

	console.log(beautify);

	writeFile(file_name, beautify.html(unformatted_html, options),  function(err) {
    	if (err) {
        	return console.error(err);
    	}
    	console.log("File created!");
	});
}

function make_layout(content) {
	let layout = {type: "layout", grid:[[""]] };
	for (let index in content) {
		layout.grid[0][0]+= content[index].name + " ";
	}
	return layout;
}

function add_multi_values(property_name: string, object) {
	object[property_name] = [];
	while(true) {
		const value = _prompt("Enter value for the property " + property_name + " or empty to return");
		if(value) {
			object[property_name].push(value);
		} else {
			break;
		}
	}
	return object;
}

run_wizzard();

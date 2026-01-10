# Symmetrical octo robot

## A repo for making small prototypes of web pages

### Features
 
 - Low fidelity prototypes!
 - Improvable colour schemes!

## installation

- install npm
- run "npm install" in terminal to install all needed node packages (for example node and typecript)


## Usage

- compile the typescript code to javascript with "npm run compile-source"
- create the output html file by running "npm run create-html-page"
- pretty print the html code to the console with npm run beautify
- run the wizard with "npm run wizard", this command starts a wizard program that makes prototypes

### The input specification

The input specification (layout.json and content.json) are two json files. This is because json is easy to handle in Typescript. It might be possible to build a more concise specification that gets transformed into the json format  
or even a gui to make it easier for non-technical personel to use the prototype tool.  
The layout json object specifies the layout of elements in the prototype. The layout specifies where elements are to be inserted in the prototype.  
This is done by placing the name of an element in a place in the layout. The content json objects specifies individual elements by name, type and description.

By letting the layout and the element definitions (content) of the page be separate, and the layout reference the content elements instead of the elements referencing the layout,  
it becomes easy to change the layout while keeping the content. On the other hand, 
it takes more effort to keep the same layout through multiple pages, where the contents change.  

The content.json and layout.json files specifies the content and the layout.

Example content json:

	[
		{
			"type":"heading",
			"name": "heading",
			"description": "Welcome!"
		},
		{
			"type":"information",
			"name": "information",
			"description" : "Welcome, book your train tickets here"
		},
		{
			"type":"input_text",
			"name": "first_name",
			"description" : "Enter your first name:"
		},
		{
			"type": "input_date",
			"name": "departure_date",
			"description": "When do you want to travel:"
		},
		{
			"type": "radio",
			"name": "classinfo",
			"description": "What class would you like",
			"values": ["first_class", "second_class"]
		},
		{
			"type": "checkbox",
			"name": "other_options",
			"description": "What other options would you like",
			"values": ["non_smoking", "window", "aisle", "pets_allowed", "bistro"]
		},
		{
			"type": "select",
			"name": "from",
			"description": "Travel from:",
			"values": ["Kumla", "Hallsberg", "Örebro", "Vingåker", "Laxå", "Gnesta", "Katrineholm", "Flen", "Kolmården", "Nyköping"]
		},
		{
			"type": "button",
			"name": "confirm_booking",
			"description": "confirm booking!",
			"shows": ["booking_complete", "train_pic", "continue_to_feedback"]
		},
		{
			"type":"picture",
			"name": "train_pic",
			"file": "book-train-ticket/train_pic.jpeg",
			"visible": "no"
		}
	]

#### Layout

Example layout json:

    {
        "type": "layout"
        "grid": [["", "heading", ""],["information"],["button1 button2 button3"], ["confirm"]]
    }

The layout has a list of lists structure. Each element in the list represents a row in the web page.
Inside the list element, a number of strings represent the columns of that row. Therefore, different rows can have different numbers of columns. Empty strings in this structure represent an empty cell in that row. Finally, content separated with a space, in a string, means that these content will be shown in the same cell, following each other. 

#### Element types
- picture, button, select, checkbox, radio, input_date, input_text, information, heading  

#### Other properties of the content elements
- name: acts as the id in html
- description: used as a descriptive text of the element
- shows: for buttons, this list tells the names of elements which are shown/hidden when the button is clicked
- visible: the initial state of visibility, for all elements except the heading. Hidden elements can be shown by clicking a configured button.
- values: a list of allowed values, for select-boxes, radio-butons and checkboxes.  

### Styles
There are some predefined styles you can use. The style is an argument in the package.json. For example npm run create-html-page Mystical_forrest, (Mystical_forest is the style). Its a bit akward, 
but currently you have to change the style in package.json yourself. The styles are defined in the file styles.ts. The default style is called Boring, it is used if no explicit style is specified.


### Examples
Small examples for generating web prototypes can be found in the folders: car-sales, christmas-card, and book-train-ticket, spicy-mushrooms.

### The wizard

The wizard is a typescript program that helps the user input elements into the prototype sequentially. 
The wizard is run from the terminal. It produces simple one-column prototypes.

## Notes

Pictures are created by Perchance AI.

Support a free Palestine 🇵🇸

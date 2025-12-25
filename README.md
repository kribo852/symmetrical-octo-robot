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

### The input specification

The input specification is a list of json elements. This is because json is easy to handle in Typescript. It might be possible to build a more concise specification that gets transformed into the json format   
or even a gui to make it easier for non-technical personel to use the prototype tool.     
The layout json object specifies the layout of elements in the prototype. The layout specifies where elements are to be inserted in the prototype.      
This is done by placing the name of an element in a place in the layout. The content json objects specifies individual elements by name, type and description.

By letting layout and elements of the page be separate, and the layout reference the content elements instead of the elements referencing the layout, it is easy to change the layout but keep the content. On the other hand, 
it takes more effort to keep the same layout through multiple pages, where the contents change.  

The content.json and layout.json files specifies the content and the layout.

Example content json: 
`
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
		"values": ["non_smoking", "window", "non_window", "pets_allowed", "bistro"]
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

`

### Element types
- picture, button, select, checkbox, radio, input_date, input_text, information, heading 

### Other properties of the content elements
- name: Acts as the id in html
- description: used as a descriptive text of the element
- shows: for buttons, this list tells the names of elements which are shown/hidden when the button is clicked
- visible: the initial state of visibility, for all elements except the heading. Hidden elements can be shown with a button.
- values: a list of allowed values, for select-boxes, radio-butons and checkboxes. 

###
Small examples for generation web prototypes can be found in the folders: car-sales, christmas-card, and book-train-ticket.


## Notes

Pictures are created by Perchance AI.

Support a free Palestine 🇵🇸

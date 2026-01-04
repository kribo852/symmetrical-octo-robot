import { Styles } from './styles.js'

interface TreeNode {
	startswith: string;
	endswith: string;

	get output(): string;

	add(json: any);

}

export class HtmlNode implements TreeNode {
	startswith: string;
	endswith: string;
	styleNode: StyleNode;
	gridNode: GridNode;
	scriptNode: ScriptNode;

	constructor(style: string) {
		this.startswith = "<!doctype html><html>";
		this.endswith = "</html>";
		this.styleNode = new StyleNode(style);
		this.gridNode = new GridNode();
		this.scriptNode = new ScriptNode();
	}

	get output(): string {
		const bootstrapcss = `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">`;
		const metatag = `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">`;

		return this.startswith + "<head>" + metatag + bootstrapcss + this.styleNode.output + "</head>" + "<body>"+this.gridNode.output+"</body>" + this.scriptNode.output + this.endswith;
	}

	add(json: any) {
		this.gridNode.add(json);
		this.scriptNode.add(json);
	}

}

class StyleNode implements TreeNode {
	startswith: string;
	endswith: string;
	style: Styles;

	constructor(style: string) {
		this.startswith = "<style>";
		this.endswith = "</style>";
		this.style = Styles[style];
	}


	get output(): string {
		return this.startswith + this.style + this.endswith;
	}

	add(json: any) {

	}
}

class ScriptNode implements TreeNode {
	startswith: string;
	endswith: string;

	constructor() {
		this.startswith = `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script><script>`;
		this.endswith = "</script>";
	}


	get output(): string {
		return this.startswith + this.endswith;
	}

	add(json: any) {
		if(!!json.shows) {
			this.startswith += 'function show_' + json.name + '() { \n';
		for (let index in json.shows) {
				let v_name = json.shows[index];
				this.startswith += `
				var `+v_name+` = document.getElementById("` + v_name + `");
  				if (`+v_name+`.style.display === "none") {
    				`+v_name+`.style.display = "initial";
  				} else {
    				`+v_name+`.style.display = "none";
  				}`
			}
			this.startswith += '}';
		}
		if(!!json.visible) {
			this.startswith += `document.getElementById("` + json.name + `").style.display="none";`
		}
	}
}

class GridNode implements TreeNode {
	startswith: string;
	endswith: string;
	grid;
	elements: Map<string,ElementNode>;

	constructor() {
		this.startswith = "";
		this.endswith = "";
		this.elements = new Map<string,ElementNode>();
		let emptyElementNode = new ElementNode();
		emptyElementNode.add({type: "empty"});
		this.elements.set("", emptyElementNode);
	}

	get output(): string {
		let rtn = "";
		console.log(this.grid);

		for (let row_index in this.grid) {
			let row = this.grid[row_index];
			rtn += `<div class=\"container\">`;
			for (let column_index in row) {
				rtn += `<div class="item">`;
				let lookupElementNames = row[column_index].split(" ");
					for(let i in lookupElementNames) {
						rtn += this.elements.get(lookupElementNames[i])?.output ?? "";
					}
				rtn += `</div>`;
			}
			rtn += "</div>";
		}

		return this.startswith + rtn + this.endswith;
	}

	add(json: any) {
		if(json.type == "layout") {
			this.grid = json.grid;
			return;
		}


		let newPotentialNode = new ElementNode(); 
		newPotentialNode.add(json);
		if(newPotentialNode.isActivated) {
			this.elements.set(json.name, newPotentialNode);
		}
	}
}

class ElementNode implements TreeNode {
    contained: TreeNode;
    startswith: string;
	endswith: string;

    constructor() {
    	this.startswith = ``;
    	this.endswith = ``;
    }

    add(json: any) {
    	switch (json.type) {
    		case ("input_text") :
    			this.contained = new InputTextNode();
    			this.contained.add(json);
    		break;
    		case ("button") :
    			this.contained = new ButtonNode();
    			this.contained.add(json);
    		break;
    		case ("information") :
    			this.contained = new InformationNode();
    			this.contained.add(json);
    		break;
    		case ("heading") :
    			this.contained = new HeadingNode();
    			this.contained.add(json);
    		break;
    		case ("empty") :
    			this.contained = new EmptyNode();
    			this.contained.add(json);
    		break;
    		case ("picture") :
    			this.contained = new PictureNode();
    			this.contained.add(json);
    		break;
    		case ("input_date") :
    			this.contained = new InputDateNode();
    			this.contained.add(json);
    		break;
    		case ("radio") :
    		case ("checkbox") :
    			this.contained = new InputRadioCheckboxNode();
    			this.contained.add(json);
    		break;
    		case ("select") :
    			this.contained = new InputSelectNode();
    			this.contained.add(json);
    		break;
    	}
    }

    get output(): string {
    	return this.startswith + this.contained.output + this.endswith;
    }

    get isActivated(): boolean {
    	return !!this.contained;
    }

}


class InputTextNode implements TreeNode {
	startswith: string;
	endswith: string;


	constructor() {
    	this.startswith = `<div id=""><p class="forinput">`;
    	this.endswith = `</p><input type="text"></div>`;
    }

    add(json: any) {
    	this.startswith = replace_identity(this.startswith, json);
    	this.startswith += json.description;
    }

    get output(): string {
    	return this.startswith + this.endswith;
    }
}


class InformationNode implements TreeNode {
	startswith: string;
	endswith: string;


	constructor() {
    	this.startswith = `<p id="">`;
    	this.endswith = `</p>`;
    }

    add(json: any) {
    	this.startswith = replace_identity(this.startswith, json);
    	this.startswith += json.description;
    }

    get output(): string {
    	return this.startswith + this.endswith;
    }
}

class HeadingNode implements TreeNode {
	startswith: string;
	endswith: string;


	constructor() {
    	this.startswith = `<h1>`;
    	this.endswith = `</h1>`;
    }

    add(json: any) {
    	this.startswith += json.description;
    }

    get output(): string {
    	return this.startswith + this.endswith;
    }
}

class EmptyNode implements TreeNode {
	startswith: string;
	endswith: string;


	constructor() {
    	this.startswith = ``;
    	this.endswith = ``;
    }

    add(json: any) {}

    get output(): string {
    	return this.startswith + this.endswith;
    }
}

class PictureNode implements TreeNode {
	startswith: string;
	endswith: string;
	source: string;


	constructor() {
    	this.startswith = `<div><img id=""`;
    	this.endswith = `></div>`;
    }

    add(json: any) {
    	this.source = ` src="` + json.file + `" `;
    	this.startswith = replace_identity(this.startswith, json);
    }

    get output(): string {
    	return this.startswith + this.source + this.endswith;
    }
}

class ButtonNode implements TreeNode {
	startswith: string;
	endswith: string;


	constructor() {
    	this.startswith = `<div><button id=""`;
    	this.endswith = `</button></div>`;
    }

    add(json: any) {
    	if(!!json.shows) {
    		this.startswith += ` onclick="show_` + json.name + `()"`; 
    	}
    	this.startswith = replace_identity(this.startswith, json);
    	this.startswith += ">";
    	this.startswith += json.description;
    }

    get output(): string {
    	return this.startswith + this.endswith;
    }
}

class InputDateNode implements TreeNode {
	startswith: string;
	endswith: string;


	constructor() {
    	this.startswith = `<div id=""><p class="forinput">`;
    	this.endswith = `</p><input type="date"></div>`;
    }

    add(json: any) {
    	this.startswith = replace_identity(this.startswith, json);
    	this.startswith += json.description;
    }

    get output(): string {
    	return this.startswith + this.endswith;
    }
}

class InputRadioCheckboxNode implements TreeNode {
	startswith: string;
	endswith: string;


	constructor() {
    	this.startswith = `<div id=""><p class="forinput">`;
    	this.endswith = `</div>`;
    }

    add(json: any) {
    	this.startswith = replace_identity(this.startswith, json);
    	this.startswith += json.description + `</p>`;

    	for (let index in json.values) {
    		this.startswith +=  `<div><input type="`+json.type+`" id=`+json.values[index]+` name=`+json.name+`/><label for="`+json.values[index]+`">`+json.values[index]+`</label></div>`;
    	}
    }

    get output(): string {
    	return this.startswith + this.endswith;
    }
}

class InputSelectNode implements TreeNode {
	startswith: string;
	endswith: string;


	constructor() {
    	this.startswith = `<div id=""><p class="forinput">`;
    	this.endswith = `</div>`;
    }

    add(json: any) {
    	this.startswith = replace_identity(this.startswith, json);
    	this.startswith += json.description + `</p><select>`;

    	for (let index in json.values) {
    		this.startswith +=  `<option>`+json.values[index]+`</option>`;
    	}

    	this.startswith += `</select>`;
    }

    get output(): string {
    	return this.startswith + this.endswith;
    }
}


function replace_identity(input: string, json: any) : string {
	return input.replace(`id=""`, `id="`+json.name+`"`);
}

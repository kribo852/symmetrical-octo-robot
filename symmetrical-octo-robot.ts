
export interface TreeNode {
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

	constructor() {
		this.startswith = "<!doctype html><html>";
		this.endswith = "</html>";
		this.styleNode = new StyleNode();
		this.gridNode = new GridNode();
	}

	get output(): string {
		return this.startswith + this.styleNode.output + "<body>"+this.gridNode.output+"</body>" + this.endswith;
	}

	add(json: any) {
		this.gridNode.add(json);
	}

}

class StyleNode implements TreeNode {
	startswith: string;
	endswith: string;

	constructor() {
		this.startswith = `<style>
		.container { 
			display: flex;
			height: auto;
		}
		div.item {
			width: 100%;
			background-color: rgb(215,215,255);
			border-right: 1px solid grey;
			border-bottom: 1px solid grey;
			text-align: center;
		}
		p.forinput{
			margin-top:2px;
			margin-bottom:2px;
		}
		input {
			margin-bottom:2px;
		}
		body {
			background-color: rgb(225,220,215);
		}`;
		this.endswith = "</style>";
	}


	get output(): string {
		return this.startswith + this.endswith;
	}

	add(json: any) {

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
		console.log(emptyElementNode);
	}

	get output(): string {
		let rtn = "";
		console.log(this.grid);

		for (let row_index in this.grid) {
			let row = this.grid[row_index];
			rtn += "<div class=\"container\">";
			for (let column_index in row) {
				let lookupElementNames = row[column_index].split(" ");
					for(let i in lookupElementNames) {
						rtn += this.elements.get(lookupElementNames[i])?.output ?? "";
					}
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
    	this.startswith = `<div class="item">`;
    	this.endswith = `</div>`;
    }

    add(json: any) {
    	switch (json.type) {
    		case ("input_text") :
    			this.contained = new InputTextNode();
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
    	this.startswith = `<div><p class="forinput">`;
    	this.endswith = `</p><input></div>`;
    }

    add(json: any) {
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
    	this.startswith = `<p>`;
    	this.endswith = `</p>`;
    }

    add(json: any) {
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
	picture_file: string;


	constructor() {
    	this.startswith = `<img src="`;
    	this.endswith = `">`;
    }

    add(json: any) {
    	this.picture_file = json.file;
    }

    get output(): string {
    	return this.startswith + this.picture_file + this.endswith;
    }

}


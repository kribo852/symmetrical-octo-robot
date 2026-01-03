const default_style = `
* {
	font-size: 1rem;
}
h1 {
	font-size: 2rem;
}
button {
	padding: 0.25rem;
	margin: 1rem;
}
img {
	margin: 0.5rem;
	max-width: calc(100% - 1rem);
	max-height:calc(100% - 1rem);
}
p.forinput{
		margin-top:1rem;
		margin-bottom:2px;
}
input {
	margin-bottom:1rem;
}
.container { 
	display: flex;
}
div.item {
	width: 100%;
	text-align: center;
}

`


export enum Styles {
	Boring = default_style + `* {
	font-family: 'sans-serif';
}
body {
	background-color: rgb(225,220,215);
}
div.item {
	background-color: rgb(215,215,255);
	border-right: 1px solid grey;
	border-bottom: 1px solid grey;
}`,
	Kill_Christmas = default_style + `* {
 	font-family: 'cursive';
}
div.item {
	background-color: rgb(175,50,50);
	border-right: 1px solid grey;
	border-bottom: 1px solid grey;
}
body {
	background-color: rgb(25,25,25);
}`,
	Mystical_forest = default_style + `* {
 	font-family: 'cursive';
	color: lightgrey;
}
div.item {
	border-right: 1px solid darkgreen;
	border-bottom: 1px solid darkgreen;
}
body {
	background-image: linear-gradient(rgb(0,35,60), rgb(15,50,35), rgb(0,35,60));
}
input {
	background-color: darkgreen;
}
select {
	background-color: darkgreen;
}
button {
	background-color: darkgreen;
}`

}

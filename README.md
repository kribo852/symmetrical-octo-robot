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

### The input specification

The input specification is a list of json elements. This is because json is easy to handle in Typescript. It is posible to build a more concise specification that gets transformed into the json format   
or even a gui to make it easier for non-technical personel to use the prototype tool.     
the layout json object specifies the layout of elements in the prototype. The layout specifies where elements are to be inserted in the prototype.      
This is done by placing the name of an element in a place in the layout. The list of element json objects specifies name, type and description of all elements.   
    
By letting layout and elements of the page be separate, and the layout reference the elements instead of the elements referencing the layout, it is easy to change the layout but keep the content. On the other hand, it takes more effort to keep the same layout through multiple pages, where the contents change.  


## Notes

Pictures are created by Perchance AI.

Support a free Palestine 🇵🇸

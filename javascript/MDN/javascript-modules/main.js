import { name, draw, reportArea, reportPerimeter } from "./modules/square";

// in this context, dot means the current location (relative path)
// in browser, this should be relative to site root, like: /js-examples/module-examples/basic-modules


// Module specifiers
// Bare module names as module specifiers
import { name as squareNameOne } from "shapes";
import { name as squareNameTwo } from "shapes/square";

// Remap a URL to another URL
import { name as squareNameThree } from "https://example.com/shapes/square.js";


const myCanvas = create("myCanvas", document.body, 480, 320);
const reportList = createReportList(myCanvas.id);

const square = draw(myCanvas.ctx, 50, 50, 100, "blue");
reportArea(square.length, reportList);
reportPerimeter(square.length, reportList);


// imported values are read-only
// similar to const, they cannot be re-assigned
// but properties of object values can still be modified


// we can check support for import maps using this:
if (HTMLScriptElement.supports?.("importmap")) {
    console.log("Browser supports import maps.");
}


/*
 * You are given an HTML file. Write a function that traverses all child elements of an 
 * element by a given CSS selector and prints all found elements in the format:
 * <Element name>: id="<id>", class="<class>"
 * Print each element on a new line. Indent child elements.
 */

function htmlElement(element) {
    this.htmlElement = element;
    this.indent = ' ';

    this.printElement = function printToDivByID(indent) {
        var idOfResultDiv = 'output';
        var elementClass = this.htmlElement.className;
        var elementId = this.htmlElement.id;
        var tagName = this.htmlElement.tagName;

        var result =
            indent +
            tagName.toLowerCase() + ": " +
            (elementId == '' ? elementId : 'id="' + elementId + '"') +
            (elementClass == '' ? elementClass : ' class="' + elementClass + '"') + '<br/>';

        var div = document.getElementById(idOfResultDiv);
        div.innerHTML += result;

    };

    this.getChildren = function () {
        var childrenAsHtmlElements = this.htmlElement.children;
        var countChildren = this.htmlElement.childElementCount;
        var arrayChild = [];
        var i;
        for (var i = 0; i < countChildren; i++) {
            if (childrenAsHtmlElements[i] != undefined) {
                var element = new htmlElement(childrenAsHtmlElements[i]);
                element.indent = this.indent + "&nbsp&nbsp&nbsp&nbsp&nbsp";
                arrayChild.push(element);
            }
        }
        return arrayChild;

    }
    this.printChildren = function () {
        var children = this.getChildren();
        var i;
        for (i in children) {
            children[i].printElement(this.indent);
            children[i].printChildren();

        }
    }
}

var selector = '.birds';
var element = document.querySelector(selector);
console.log(element);
var firstitem = new htmlElement(element);
firstitem.printChildren();

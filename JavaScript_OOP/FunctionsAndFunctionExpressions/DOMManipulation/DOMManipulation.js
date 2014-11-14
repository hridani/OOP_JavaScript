/*  Problem 3.	DOM Manipulation
 *   Create an IIFE module for working with the DOM tree. The module should support the following operations:
 *	Adding а DOM element to a parent element specified by selector
 *	Removing a child element from a parent specified by selector
 *	Attaching an event to a given selector by given event type and event hander
 *	Retrieving elements by a given CSS selector
 */

var domModule = function () {
    var appendChild = function (parent, childTag, text) {
        var parentElement = document.querySelector(parent);
        var theNewElement = document.createElement(childTag);
        var theTextOfTheElement = document.createTextNode(text);
        theNewElement.appendChild(theTextOfTheElement);
        if (parentElement) {
            parentElement.appendChild(theNewElement);
        }
    };

    var removeChild = function (parentSelector, childSelector) {
        var parentElement = document.querySelector(parentSelector);
        var childElement = parentElement.querySelector(childSelector);
        parentElement.removeChild(childElement);
    }

    var addHandler = function (selector, event, eventFunction) {
        var element = document.querySelector(selector);
        element.addEventListener(event, eventFunction, false);
   }

    var retrieveElements = function (selector) {
        var elements = document.querySelectorAll(selector);
        return elements;
    };

    return {
        appendChild: appendChild,
        removeChild: removeChild,
        addHandler: addHandler,
        retrieveElements: retrieveElements
    }
}();

var clickFunction = function () {
    domModule.appendChild("h1", "div", "This is a test");
    domModule.removeChild("h1", "div");
}

domModule.appendChild('body', 'div', 'Body -> div: Hello');
domModule.appendChild('div', 'h2', 'Body->div>h2: world!');
domModule.appendChild('body', 'h1', 'Body->h1: Hello, world!');
domModule.appendChild('h1', 'div', 'Body->h1->div: Div 2');
domModule.addHandler('h1', 'click', clickFunction);
console.log(domModule.retrieveElements("div"));
domModule.removeChild("div", "h2");

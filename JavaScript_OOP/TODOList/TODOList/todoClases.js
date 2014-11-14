'use strict';
Object.prototype.validateNonEmptyString = function (value, variableName) {
    if (typeof (value) != "string" || !value)
        throw new Error(variableName + " should be non-empty string");
}

Object.prototype.validateBoolean = function (value, variableName) {
    if (typeof (value) != "boolean")
        throw new Error(variableName + " should be a boolean");
}
var Container = (function () {

    function Container() {
        this._sections = [];
    }

    Container.prototype.addToDom = function (section) {
        this._sections.push(section);
    };

    Container.prototype.getData = function () {
        var result = this._sections.map(function (item) {
            return item.getData();
        });

        return {
            count: this._sections.length,
            _sections: result
        }
    };

    Container.prototype.getSectionByName = function (nameSection) {
        var nm = this._sections.length;
        for (var i = 0; i < nm ; i++) {
            var item = this._sections[i];
            if (item.getData().title == nameSection) {
                return item;
            }
        }

        return -1;
    };

    Container.prototype.getSectionByNumber = function (numberSection) {
        var nm = this._sections.length;
        if (numberSection >= 0 || numberSection < nm) {
            return this._sections[numberSection];
        }

        return -1;
    };

    return Container;
}());


var Item = (function () {
    function Item(content, status) {
        this.setContent(content);
        this.setStatus(status);
    }
    Item.prototype.setContent = function (content) {
        this.validateNonEmptyString(content, "content");
        this._content = content;
    }
    Item.prototype.setStatus = function (status) {
        this.validateBoolean(status, "status");
        this._status = status;
    }
    Item.prototype.getContent = function () {
        return this._content;
    }
    Item.prototype.getStatus = function () {
        return this._status;
    }
    Item.prototype.getData = function () {
        return {
            content: this.getContent(),
            status: this.getStatus()
        }
    };
    return Item;
})();


var Section = (function () {
    function Section(title) {
        this.setTitle(title);
        this._items = [];
    }
    Section.prototype.setTitle = function (title) {
        this.validateNonEmptyString(title, "title");
        this._title = title;
    }
    Section.prototype.getTitle = function () {
        return this._title;
    }
    Section.prototype.addToDom = function (item) {
        this._items.push(item);
    };
    Section.prototype.getItemByNumber = function (numberItem) {
        var nm = this._items.length;
        if (numberItem >= 0 || numberItem < nm) {
            return this._items[numberItem];
        }

        return -1;
    };
    Section.prototype.getData = function () {
        var result = this._items.map(function (item) {
            return item.getData();
        });

        return {
            title: this.getTitle,
            len: this._items.length,
            _items: result
        }
    };
    return Section;
}());

var toDom = function () {
    var containerInstance;
    return {
        getContainer: function () {
            if (!containerInstance) {
                containerInstance = new Container();
            }
            return containerInstance;
        },
        getSection: function (title) {
            return new Section(title);
        },
        getItem: function (content, status) {
            return new Item(content, status);
        }
    };
}();


function AddSection() {
    var container = toDom.getContainer();
    var countSection = container.getData().count;

    var nameSection = document.getElementById("title").value;

    var section = toDom.getSection(nameSection);
    container.addToDom(section);

    var result = '<div class="itemFields" id="itemSection' + countSection + '">' + '<h3>' + nameSection + '</h3>' + '</div> <div class="addItemBlock">' +
        '<input name="item" type="text" class="addItem" id="item' + countSection + '" placeholder="Add item...">' +
        '<button id="additem' + countSection + '"type="button" onclick="addItem(' + countSection + ')">+</button></div>';
    var newDiv = document.createElement("div");
    newDiv.setAttribute('class', "newSection");
    newDiv.innerHTML = result;
    document.getElementById('section').appendChild(newDiv);
}

function addItem(numberSection) {
    var container = toDom.getContainer();
    var section = container.getSectionByNumber(numberSection);
    var countItemsInSection = section.getData().len;

    var textItem = document.getElementById("item" + numberSection).value;
    var item = toDom.getItem(textItem, false);

    if (section != -1) {
        section.addToDom(item);
    }

    var border = '';
    if (countItemsInSection != 0) {
        border = 'style="border-top: 1px solid black"';
    }
    var result = '<input type="checkbox" name="textItem" value=0 onClick="clickItem(' + numberSection + ',' + countItemsInSection + ')">' +
    '<div class="checkDiv" ' + border + '>' + textItem + '</div>';

    var newDiv = document.createElement("div");
    newDiv.setAttribute('class', "divItem");
    newDiv.setAttribute('id', "divItem" + numberSection + countItemsInSection);
    newDiv.innerHTML = result;
    document.getElementById("itemSection" + numberSection).appendChild(newDiv);
    // var nameSection = document.getElementById("itemSection" + numberSection).firstChild.textContent;
    // var section = container.getSectionByName(nameSection);
}

function clickItem(numberSection, numberItem) {
    var checkItem = document.getElementById("divItem" + numberSection + numberItem);
    var choiceField = checkItem.children[0].value;
    var divGreen = checkItem.children[1];
    if (choiceField == 0) {
        checkItem.children[0].value = 1;
        divGreen.style.background = "#8AC007";
    } else {
        checkItem.children[0].value = 0;
        divGreen.style.background = "#ffffff";
    }

    var container = toDom.getContainer();
    var section = container.getSectionByNumber(numberSection);
    var item = section.getItemByNumber(numberItem);
    item.setStatus(!item.getStatus());
    var countItemsInSection = section.getData().len;
}
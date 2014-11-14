define(["extensions"],function () {
    'use strict';

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
    return Section;
});
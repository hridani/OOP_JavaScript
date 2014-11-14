define(["extensions"], function () {
    'use strict';
    var Container = (function () {

        var Container = function () {
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

    return Container;
});

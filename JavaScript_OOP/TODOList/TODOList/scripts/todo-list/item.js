define(function () {
    'use strict';
   
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
return Item;
});
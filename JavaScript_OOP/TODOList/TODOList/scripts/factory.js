define(['todo-list/container', 'todo-list/section', 'todo-list/item'], function (Container, Section, Item) {
    'use strict';
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
});


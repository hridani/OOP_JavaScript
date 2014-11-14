(function () {
    require(['factory'], function (factory) {
        
        function AddSection() {
            var container = factory.getContainer();
            var countSection = container.getData().count;
            
            var nameSection = document.getElementById("title").value;
            
            var section = factory.getSection(nameSection);
            container.addfactory(section);
            
            var result = '<div class="itemFields" id="itemSection' + countSection + '">' + '<h3>' + nameSection + '</h3>' + '</div> <div class="addItemBlock">' +
        '<input name="item" type="text" class="addItem" id="item' + countSection + '" placeholder="Add item...">' +
        '<button id="additem' + countSection + '"type="button" onclick="addItem(' + countSection + ')">+</button></div>';
            var newDiv = document.createElement("div");
            newDiv.setAttribute('class', "newSection");
            newDiv.innerHTML = result;
            document.getElementById('section').appendChild(newDiv);
        }
        
        function addItem(numberSection) {
            var container = factory.getContainer();
            var section = container.getSectionByNumber(numberSection);
            var countItemsInSection = section.getData().len;
            
            var textItem = document.getElementById("item" + numberSection).value;
            var item = factory.getItem(textItem, false);
            
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
            
            var container = factory.getContainer();
            var section = container.getSectionByNumber(numberSection);
            var item = section.getItemByNumber(numberItem);
            item.setStatus(!item.getStatus());
            var countItemsInSection = section.getData().len;
        }
    });
}).call(this);
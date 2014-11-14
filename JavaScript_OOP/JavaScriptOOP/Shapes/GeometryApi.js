var shapes = [];
function removeInputShape() {
    var inputFields = document.getElementById("choiceShape").lastChild;
    if (inputFields)
        document.getElementById('choiceShape').removeChild(inputFields);
}
function addInputFields() {
    removeInputShape();
    var choice = document.getElementById("shape");
    var choiceShape = choice.options[choice.selectedIndex].text;
    var result = '';
    switch (choiceShape) {
        case "Point":
            break;
        case "Triangle":
            result = '<label for="x1">' + 'X1: </label>' +
                     '<input name="x1" type="text" id="x1" value="0">' +
                    '<label for="y1">Y1: </label>' +
                     '<input name="y1" type="text" id="y1" value="0">' + '<br>' +
                        '<label for="x2">' + 'X2: </label>' +
                     '<input name="x2" type="text" id="x2" value="0">' +
                    '<label for="y2">Y2: </label>' +
                     '<input name="y2" type="text" id="y2" value="0">' + '<br>';
            break;
        case "Circle":
            result = '<label for="radius">' + 'Radius: </label>' +
                     '<input name="radius" type="text" id="radius" value="0">';
            
            break;
        case "Rectangle":
            result = '<label for="width">' + 'Width: </label>' +
                     '<input name="width" type="text" id="width" value="0">' +
                    '<label for="height">Height: </label>' +
                     '<input name="height" type="text" id="height" value="0">';
            break;
        case "Segment":
            result = '<label for="x1">' + 'X1: </label>' +
                     '<input name="x1" type="text" id="x1" value="0">' +
                    '<label for="y1">Y1: </label>' +
                     '<input name="y1" type="text" id="y1" value="0">';
            break;
        default:
            break;
    }
    var newDiv = document.createElement("div");
    newDiv.setAttribute('id', "newInputFields");
    newDiv.innerHTML = result;
    document.getElementById('choiceShape').appendChild(newDiv);
}
var countNewShapes = 0;

function addNewShape() {
    var choice = document.getElementById("shape");
    var choiceShape = choice.options[choice.selectedIndex].text;
    var result = '';
    switch (choiceShape) {
        case "Point":
            var x = document.getElementById("x").value;
            var y = document.getElementById("y").value;
            var color = document.getElementById("color").value;
            var point = new Point(x, y, color);
            shapes[countNewShapes] = point;
            result = point.toString();
            point.draw();
            break;
        case "Triangle":
            var x = document.getElementById("x").value;
            var y = document.getElementById("y").value;
            var x1 = document.getElementById("x1").value;
            var y1 = document.getElementById("y1").value;
            var x2 = document.getElementById("x2").value;
            var y2 = document.getElementById("y2").value;
            var color = document.getElementById("color").value;
            var triangle = new Triangle(x, y, x1, y1, x2, y2, color);
            shapes[countNewShapes] = triangle;
            result = triangle.toString();
            triangle.draw();
            break;
        case "Circle":
            var x = document.getElementById("x").value;
            var y = document.getElementById("y").value;
            var radius = document.getElementById("radius").value;
            var color = document.getElementById("color").value;
            var circle = new Circle(x, y, radius, color);
            shapes[countNewShapes] = circle;
            result = circle.toString();
            circle.draw();
            break;
        case "Rectangle":
            var x = document.getElementById("x").value;
            var y = document.getElementById("y").value;
            var width = document.getElementById("width").value;
            var height = document.getElementById("height").value;
            var color = document.getElementById("color").value;
            var rectangle = new Rectangle(x, y, width, height, color);
            shapes[countNewShapes] = rectangle;
            result = rectangle.toString();
            rectangle.draw();
            break;
        case "Segment":
            var x = document.getElementById("x").value;
            var y = document.getElementById("y").value;
            var x1 = document.getElementById("x1").value;
            var y1 = document.getElementById("y1").value;
            var color = document.getElementById("color").value;
            var segment = new Segment(x, y, x1, y1, color);
            shapes[countNewShapes] = segment;
            result = segment.toString();
            segment.draw();
            break;
        default:
            break;
    }
    var select = document.getElementById('shapes');
    var option = document.createElement('option');
    option.innerHTML = result;
    option.value = countNewShapes++;
    select.appendChild(option);
    select.selectedIndex++;
  //  select.options[select.selectedIndex].selected = true;
}

function downShape() {
    var select = document.getElementById('shapes');
    if (select.selectedIndex < 0) {
        select.selectedIndex = 0;
     //   select.options[select.selectedIndex].selected = true;
        return;
    }
    
    if (select.selectedIndex >= countNewShapes - 1) {
        return;
    }
    else {
        select.selectedIndex++;
        //select.options[select.selectedIndex].selected = true;
    }
}

function UpShape() {
    var select = document.getElementById('shapes');
    if (select.selectedIndex < 0) {
        select.selectedIndex = 0;
     //   select.options[select.selectedIndex].selected = true;
        return;
    }
    
    if (select.selectedIndex <= 0) {
        return;
    }
    else {
        select.selectedIndex--;
      //  select.options[select.selectedIndex].selected = true;
    }
}

function RemoveShape() {
    var select = document.getElementById('shapes');
    if (select.selectedIndex >= 0 && select.selectedIndex <= countNewShapes) {
        var canvas = document.getElementById("shapesCanvas");
        var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
       
        var index = select.selectedIndex;
        shapes.splice(index,1);
        select.removeChild(select.options[select.selectedIndex]);
        countNewShapes--;
        if (index > 0) {
            select.selectedIndex = index - 1;
        }
        else {
            select.selectedIndex = 0;
        }
        
        shapes.forEach(function(item) {
            item.draw();
        });
        // select.options[select.selectedIndex].selected = true;
    }
}

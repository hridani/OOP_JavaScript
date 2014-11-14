Object.prototype.extends = function (parent) {
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
}

var Shape = (function () {
    function Shape(x, y, color) {
        if (!(this instanceof arguments.callee)) {
            return new arguments.callee(x, y, color);
        }
        this._x = x;
        this._y = y;
        this._color = color;
    }
    Shape.prototype = (function () {
        return {
            draw : function () {
                var canvas = document.getElementById("shapesCanvas");
                var context = canvas.getContext('2d');
                context.fillStyle = this._color;
                context.strokeStyle = this._color;
                context.beginPath();
                return context;
            },
            toString: function () {
                return "X: " + this._x + ", Y: " + this._y + ", Color: " + this._color;
            }
        }
    }());
    
    return Shape;
}());

var Point = (function () {
    function Point(x, y, color) {
        Shape.call(this, x, y, color);
        if (!(this instanceof arguments.callee)) {
            return new arguments.callee(x, y, color);
        }
    }
    Point.extends(Shape);
   
    Point.prototype.draw = function () {
        var ctx = Shape.prototype.draw.call(this);
        ctx.fillRect(this._x, this._y, 3, 3);
    };
    
    Point.prototype.toString = function () {
        var result = Point.name + " [ " + Shape.prototype.toString.call(this) + " ] ";
        return result;
    };
    
    return Point;
}());

var Segment = (function () {
    function Segment(x, y, x1, y1, color) {
        Shape.call(this, x, y, color);
        this._x1 = x1;
        this._y1 = y1;
    }
    
    Segment.extends(Shape);
    Segment.prototype.draw = function () {
        var ctx = Shape.prototype.draw.call(this);
        ctx.moveTo(this._x, this._y);
        ctx.lineTo(this._x1 , this._y1);
        ctx.stroke();
    };
    Segment.prototype.toString = function () {
        var result = Segment.name + " [ " + Shape.prototype.toString.call(this);
        result += ", X1: " + this._x1 + ", Y1: " + this._y1 + " ] ";
        return result;
    };
    
    return Segment;
}());

var Triangle = (function () {
    
    function getDistanceBetweenPoints(x1, y1, x2, y2) {
        var differenceBetweenTwoPoints = Math.pow(x2 - x1 , 2) +
										Math.pow(y2 - y1 , 2);
        
        var distance = Math.sqrt(differenceBetweenTwoPoints);
        return distance;
    }
    
    function validateTriangle() {
        var sideA = getDistanceBetweenPoints(this._x, this._y, this._x1, this._y1);
        var sideB = getDistanceBetweenPoints(this._x1, this._y1, this._x2, this._y2);
        var sideC = getDistanceBetweenPoints(this._2, this._y2, this._x, this._y)
        if ((sideA + sideB) < sideC ||
            (sideB + sideC) < sideA ||
            (sideC + sideA) < sideB) {
            return false;
        }
        return true;
    }
    
    
    function Triangle(x, y, x1, y1, x2, y2, color) {
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
        if (!validateTriangle.call(this)) {
            throw new Error('Cannot draw triangle');
        }
        Shape.call(this, x, y, color);
    }
    
    Triangle.extends(Shape);
    
    Triangle.prototype.draw = function () {
        var ctx = Shape.prototype.draw.call(this);
        ctx.moveTo(this._x, this._y);
        ctx.lineTo(this._x1 , this._y1);
        ctx.lineTo(this._x2 , this._y2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };
    
    Triangle.prototype.toString = function () {
        var result = Triangle.name + " [ " + Shape.prototype.toString.call(this);
        result += ", X1: " + this._x1 + ", Y1: " + this._y1 +
            ", X2: " + this._x2 + ", Y2: " + this._y2 + " ] ";
        return result;
    };
    
    return Triangle;
}());


var Rectangle = (function () {
    function validatePosition() {
        if (this._width < 0 || this._height < 0) {
            return false;
        }
        return true;
    }
    
    function Rectangle(x, y, width, height, color) {
        this._width = width;
        this._height = height;
        if (!validatePosition.call(this)) {
            throw new Error('Cannot draw rectangle with negative sizes!');
        }
        Shape.call(this, x, y, color);
    }
    
    Rectangle.extends(Shape);
    
    Rectangle.prototype.draw = function () {
        var ctx = Shape.prototype.draw.call(this);
        ctx.fillRect(this._x, this._y, this._width, this._height);
    };
    Rectangle.prototype.toString = function () {
        var result = Rectangle.name + " [ " + Shape.prototype.toString.call(this);
        result += ", Width: " + this._width + ", Height: " + this._height + " ] ";
        return result;
    };
    
    return Rectangle;
}());

var Circle = (function () {
    function validateRadius() {
        if (this._radius < 0) {
            return false;
        }
        return true;
    }
    
    function Circle(x, y, radius, color) {
        this._radius = radius;
        if (!validateRadius.call(this)) {
            throw new Error('Cannot draw circle with negative radius');
        }
        Shape.call(this, x, y, color);
    }
    
    Circle.extends(Shape);
    
    Circle.prototype.draw = function () {
        var ctx = Shape.prototype.draw.call(this);
        ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    };
    Circle.prototype.toString = function () {
        var result = Circle.name + " [ " + Shape.prototype.toString.call(this);
        result += ", Radius: " + this._radius + " ] ";
        return result;
    };
    
    return Circle;
}());


var point = Point(10, 50, "#FF8900");
var circle = new Circle(100, 75, 50, "#8AC007");
var triangle = new Triangle(100, 110, 200, 10, 300, 110, "#F93914");
var rectangle = new Rectangle(20, -10, 100, 167, "#A012A3");
var segment = new Segment(-34, 23, 56, 78, "#D9015D");
console.log(point.toString());

console.log(segment.toString());
console.log(circle.toString());
console.log(triangle.toString());
console.log(rectangle.toString());

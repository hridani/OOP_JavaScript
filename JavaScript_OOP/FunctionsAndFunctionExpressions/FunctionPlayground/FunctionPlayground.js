/*
 *  Problem 1.	Function Playground
    Create a function with no parameters. Perform the following operations:
 	The function should print the number of its arguments and each of the arguments' type. 
	Call the function with different number and type of arguments.
	The function should print the this object. Compare the results when calling the function from:
	Global scope
	Function scope
	Over the object
	Use call and apply to call the function with parameters and without parameters
*/

function printArguments() {
    var output = '';
    if (arguments.length == 0)
        output = "No arguments\n";
    for (i = 0; i < arguments.length; i++) {
        output += "Argument[" + i + "] = " + arguments[i] + " ,type : " + typeof arguments[i] + "\n";
    }
    
    console.log(output);
}

printArguments();
printArguments("Hello", 1, "world");
printArguments("Pi", "is", "=", 3.143435353);

function printName(name) {
    this.publicName = name;
    var privateName = name;
    console.log("Person name in the function scope:", privateName);
}
printName("First Second");
console.log("Person name in the global scope:", publicName);

function setStudentName(name) {
    this.publicName = name;
    var privateText = "Name of students :" + name;
    this.getText = function getStudentName() {
        return privateText;
    }
}

setStudentName("Kiro Kirov");
console.log("1:");
console.log(publicName);
console.log("2:");
console.log(getText);
var george = new setStudentName("George");
console.log("1:");
console.log(george);
console.log("2:");
console.log(george.publicName);
console.log("3:");
console.log(george.getText());
var pesho = new setStudentName("Pesho");
console.log(pesho.getText());
setStudentName.call(pesho, "Minka");
console.log("New name of Pesho is:");
console.log(pesho.getText());
setStudentName.apply(pesho, ["Dani"]);
console.log("New name of Pesho is:");
console.log(pesho.getText());

//Use call and apply to call the function with parameters and without parameters

//x = 10;
var x = 10;
var y = { x: 15 };

function f(message) {
    console.log(message);
    console.log(this.x);
}
f("invoking f");
f.call({ x: 7 }, "invoking f via call");
f.apply(y, ["invoking f through apply"]);
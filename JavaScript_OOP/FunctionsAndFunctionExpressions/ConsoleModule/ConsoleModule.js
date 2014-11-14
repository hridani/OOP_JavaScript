/* Problem 4.	Console Module
 * Create a module for working with the console object. The module should support the following functionality:
 *	Writing a line to the console 
 *	Writing a line to the console using formatting (with placeholders)
 *  Writing to the console should call toString() to each element
 *	Writing errors and warnings to the console with and without format
 */
var specialConsole = function specialConsole() {
    function writeLine() {
        var message = arguments[0];
        if (arguments.length === 1) {
            consoleWrite(message);
        } else if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments);
            message = fillPlaceholders(message, args.slice(1, args.length));
            consoleWrite(message);
        }
    }
    function fillPlaceholders(str, args) {
        for (var i = 0; i < args.length; i++) {
            str = str.replace('{' + i + '}', args[i].toString());
        }
        return str;
    }

    function consoleWrite(str) {
        console.log(str.toString());
    }

    return {
        writeLine: writeLine,
        writeError: writeLine,
        writeWarning: writeLine
    };

}();

var array = ['first', '2', 'three'];
specialConsole.writeLine("Hello, World!");
specialConsole.writeLine("Array: {0}", array);
specialConsole.writeLine("{0}, {1}, {2}", "My name", "wow", 123);
specialConsole.writeError("Error: {0}", "A fatal error has occurred.");
specialConsole.writeWarning("Warning: {0}", "You are not allowed to do that!");
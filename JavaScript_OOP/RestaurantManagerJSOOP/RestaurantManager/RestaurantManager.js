function processRestaurantManagerCommands(commands) {
    'use strict';
    
    
    var RestaurantEngine = (function () {
        var _restaurants, _recipes;
        
        function initialize() {
            _restaurants = [];
            _recipes = [];
        }
        
        Object.prototype.extends = function (parent) {
            this.prototype = Object.create(parent.prototype);
            this.prototype.constructor = this;
        };
        
        Object.prototype.validateNonEmptyString = function (value, variableName) {
            if (typeof (value) != "string" || !value)
                throw new Error(variableName + " should be non-empty string");
        }
        
        Object.prototype.validateIntegerRange = function (value, variableName, minValue, maxValue) {
            if (typeof (value) != "number")
                throw new Error(variableName + " should be a number");
            if (value !== parseInt(value, 10)) {
                throw new Error(variableName + " should be a integer");
            }
            if (value < minValue || value > maxValue) {
                throw new Error("The " + variableName + " must be positive.");
            }
        }
        
        Object.prototype.validateFloatRange = function (value, variableName, minValue, maxValue) {
            if (typeof (value) != "number")
                throw new Error(variableName + " should be a number");
            if (value !== parseFloat(value)) {
                throw new Error(variableName + " should be a float");
            }
            if (value < minValue || value > maxValue) {
                throw new Error("The " + variableName + " must be positive.");
            }
        }
        
        Object.prototype.validateBoolean = function (value, variableName) {
            if (typeof (value) != "boolean")
                throw new Error(variableName + " should be a boolean");
        }
        
        var Restaurant = (function () {
            function Restaurant(name, location) {
                this.setName(name);
                this.setLocation(location);
                this._recipes = [];
            }
            Restaurant.prototype.setName = function (name) {
                this.validateNonEmptyString(name, "name");
                this._name = name;
            }
            Restaurant.prototype.getName = function () {
                return this._name;
            }
            Restaurant.prototype.setLocation = function (location) {
                this.validateNonEmptyString(location, "location");
                this._location = location;
            }
            Restaurant.prototype.getLocation = function () {
                return this._location;
            }
            Restaurant.prototype.getCount = function () {
                
                return this._recipes.length;
            }
            
            Restaurant.prototype.addRecipe = function (recipe) {
                this._recipes.push(recipe);

            }
            
            Restaurant.prototype.removeRecipe = function (recipe) {
                var index = this._recipes.indexOf(recipe);
                this._recipes.splice(index, 1);
            }
            
            Restaurant.prototype.printRestaurantMenu = function () {
                function ordredAlphabeticallyByName(typeOrder) {
                    var selectedRecipes = this._recipes.filter(function (recipe) {
                        var type = typeof recipe;
                        return recipe instanceof typeOrder;
                    });
                    selectedRecipes.sort(function (a, b) {
                        return a.getName().localeCompare(b.getName());
                    });
                    return selectedRecipes;
                }
                
                var nameStr = "***** " + this.getName() + " - " + this.getLocation() + " *****\n";
                var result = nameStr;
                if (this._recipes.length == 0) {
                    var noRecipesStr = "No recipes... yet\n";
                    return nameStr + noRecipesStr;
                }
                
                var drinkRecipes = ordredAlphabeticallyByName.call(this, Drink);
                
                if (drinkRecipes.length > 0) {
                    result += "~~~~~ DRINKS ~~~~~" + '\r\n';
                    drinkRecipes.forEach(function (item) {
                        result += item.toString();
                    });
                }
                var saladRecipes = ordredAlphabeticallyByName.call(this, Salad);
                if (saladRecipes.length > 0) {
                    result += "~~~~~ SALADS ~~~~~" + '\r\n';
                    saladRecipes.forEach(function (item) {
                        result += item.toString();
                    });
                }
                var mainRecipes = ordredAlphabeticallyByName.call(this, MainCourse);
                if (mainRecipes.length > 0) {
                    result += "~~~~~ MAIN COURSES ~~~~~" + '\r\n';
                    mainRecipes.forEach(function (item) {
                        result += item.toString();
                    });
                }
                var dessertRecipes = ordredAlphabeticallyByName.call(this, Dessert);
                if (dessertRecipes.length > 0) {
                    result += "~~~~~ DESSERTS ~~~~~" + '\r\n';
                    dessertRecipes.forEach(function (item) {
                        result += item.toString();
                    });
                }
                return result;
            }
            
            return Restaurant;
        }());
        
        
        var Recipe = (function () {
            var MIN_VALUE = 0;
            var MAX_VALUE = Number.MAX_VALUE;
            
            function Recipe(name, price, calories, quantity, timeToPrepare, unit) {
                if (this.constructor === Recipe) {
                    throw new Error("Can't instantiate abstract class Recipe.");
                }
                this.setName(name);
                this.setPrice(price);
                this.setCalories(calories);
                this.setQuantity(quantity);
                this.setTimeToPrepare(timeToPrepare);
                this.setUnit(unit);
            }
            
            Recipe.prototype.setName = function (name) {
                this.validateNonEmptyString(name, "name");
                this._name = name;
            }
            
            Recipe.prototype.getName = function () {
                return this._name;
            }
            
            Recipe.prototype.setPrice = function (price) {
                this.validateFloatRange(price, "price", MIN_VALUE, MAX_VALUE);
                this._price = price;
            }
            
            Recipe.prototype.getPrice = function () {
                return this._price;
            }
            
            Recipe.prototype.setCalories = function (calories) {
                this.validateIntegerRange(calories, "calories", MIN_VALUE, MAX_VALUE);
                this._calories = calories;
            }
            
            Recipe.prototype.getCalories = function () {
                return this._calories;
            }
            
            Recipe.prototype.setQuantity = function (quantity) {
                this.validateIntegerRange(quantity, "quantity", MIN_VALUE, MAX_VALUE);
                this._quantity = quantity;
            }
            
            Recipe.prototype.getQuantity = function () {
                return this._quantity;
            }
            
            Recipe.prototype.setTimeToPrepare = function (timeToPrepare) {
                if (timeToPrepare < MIN_VALUE) {
                    throw new Error("The " + 'timeToPrepare' + " must be positive.");
                }
                this._timeToPrepare = timeToPrepare;
            }
            
            Recipe.prototype.getTimeToPrepare = function () {
                return this._timeToPrepare;
            }
            
            Recipe.prototype.setUnit = function (unit) {
                this._unit = unit;
            }
            
            Recipe.prototype.getUnit = function () {
                return this._unit;
            }
            
            Recipe.prototype.toString = function () {
                var result = '==  ' + this.getName() + ' == $' + this.getPrice().toFixed(2) + '\r\n' +
                    'Per serving: ' + this.getQuantity() + " " + this.getUnit() + ', ' + this.getCalories() + ' kcal' + '\r\n' +
                    'Ready in ' + this.getTimeToPrepare() + ' minutes' + '\r\n';
                return result;
            }
            return Recipe;
        }());
        
        var Drink = (function () {
            var MAX_DRINK_CALORIES = 100;
            var MAX_DRINK_TIME_TO_PREPARE = 20;
            function Drink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
                Recipe.call(this, name, price, calories, quantity, timeToPrepare, "ml");
                this.setIsCarbonated(isCarbonated);
            }
            
            Drink.extends(Recipe);
            Drink.prototype.setTimeToPrepare = function (timeToPrepare) {
                if (timeToPrepare > MAX_DRINK_TIME_TO_PREPARE) {
                    throw new Error("The time to prepare a drink must not be greater than" + MAX_DRINK_TIME_TO_PREPARE + " minutes.");
                }
                Recipe.prototype.setTimeToPrepare.call(this, timeToPrepare);
            }
            Drink.prototype.getIsCarbonated = function () {
                return this._isCarbonated;
            };
            
            Drink.prototype.setIsCarbonated = function (isCarbonated) {
                this.validateBoolean(isCarbonated, "isCarbonated");
                this._isCarbonated = isCarbonated;
            };
            
            Drink.prototype.toString = function () {
                var carbonated = this.getIsCarbonated() ? "yes" : "no";
                return Recipe.prototype.toString.call(this) + "Carbonated: " + carbonated + '\r\n';
            }
            return Drink;
        }());
        
        
        var Meal = (function () {
            function Meal(name, price, calories, quantity, timeToPrepare, isVegan) {
                if (this.constructor === Meal) {
                    throw new Error("Can't instantiate abstract class Meal.");
                }
                Recipe.call(this, name, price, calories, quantity, timeToPrepare, "g");
                this.setIsVegan(isVegan);
            }
            
            Meal.extends(Recipe);
            Meal.prototype.getIsVegan = function () {
                return this._isVegan;
            };
            
            Meal.prototype.setIsVegan = function (isVegan) {
                this.validateBoolean(isVegan, "isVegan");
                this._isVegan = isVegan;
            };
            
            Meal.prototype.toggleVegan = function () {
                this._isVegan = !this._isVegan;
            }
            
            Meal.prototype.toString = function () {
                var vegan = this.getIsVegan() ? "[VEGAN] " : "";
                return vegan + Recipe.prototype.toString.call(this);
            }
            
            return Meal;
        }());
        
        var Dessert = (function () {
            function Dessert(name, price, calories, quantity, timeToPrepare, isVegan) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, isVegan);
                this._withSugar = true;
            }
            
            Dessert.extends(Meal);
            
            Dessert.prototype.toggleSugar = function () {
                this._withSugar = !this._withSugar;
            }
            
            Dessert.prototype.toString = function () {
                var freeSugar = this._withSugar ? "" : "[NO SUGAR] ";
                var result = Meal.prototype.toString.call(this);
                return freeSugar + result;
            }
            
            return Dessert;
        }());
        
        
        var MainCourse = (function () {
            function MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, isVegan);
                this.setType(type);
            }
            
            MainCourse.extends(Meal);
            MainCourse.prototype.getType = function () {
                return this._type;
            };
            
            MainCourse.prototype.setType = function (type) {
                this._type = type;
            };
            MainCourse.prototype.toString = function () {
                var mealText = Meal.prototype.toString.call(this);
                var result = mealText + "Type: " + this.getType() + '\r\n';
                return result;
            }
            return MainCourse;
        }());
        
        var Salad = (function () {
            function Salad(name, price, calories, quantity, timeToPrepare, containsPasta) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, parseBoolean("yes"));
                this.setContainsPasta(containsPasta);
            }
            Salad.extends(Meal);
            
            Salad.prototype.getContainsPasta = function () {
                return this._containsPasta;
            };
            
            Salad.prototype.setContainsPasta = function (containsPasta) {
                this._containsPasta = containsPasta;
            };
            
            Salad.prototype.toggleVegan = function () {
                Meal.prototype.setIsVegan(parseBoolean("yes"));
            };
            
            Salad.prototype.toString = function () {
                var pasta = this.getContainsPasta() ? "yes" : "no";
                var mealText = Meal.prototype.toString.call(this);
                var result = mealText + 'Contains pasta: ' + pasta + '\r\n';
                return result;
            }
            return Salad;
        }());
        
        var Command = (function () {
            
            function Command(commandLine) {
                this._params = new Array();
                this.translateCommand(commandLine);
            }
            
            Command.prototype.translateCommand = function (commandLine) {
                var self, paramsBeginning, name, parametersKeysAndValues;
                self = this;
                paramsBeginning = commandLine.indexOf("(");
                
                this._name = commandLine.substring(0, paramsBeginning);
                name = commandLine.substring(0, paramsBeginning);
                parametersKeysAndValues = commandLine
                    .substring(paramsBeginning + 1, commandLine.length - 1)
                    .split(";")
                    .filter(function (e) { return true });
                
                parametersKeysAndValues.forEach(function (p) {
                    var split = p
                        .split("=")
                        .filter(function (e) { return true; });
                    self._params[split[0]] = split[1];
                });
            }
            
            return Command;
        }());
        
        function createRestaurant(name, location) {
            _restaurants[name] = new Restaurant(name, location);
            return "Restaurant " + name + " created\n";
        }
        
        function createDrink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
            _recipes[name] = new Drink(name, price, calories, quantity, timeToPrepare, isCarbonated);
            return "Recipe " + name + " created\n";
        }
        
        function createSalad(name, price, calories, quantity, timeToPrepare, containsPasta) {
            _recipes[name] = new Salad(name, price, calories, quantity, timeToPrepare, containsPasta);
            return "Recipe " + name + " created\n";
        }
        
        function createMainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
            _recipes[name] = new MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type);
            return "Recipe " + name + " created\n";
        }
        
        function createDessert(name, price, calories, quantity, timeToPrepare, isVegan) {
            _recipes[name] = new Dessert(name, price, calories, quantity, timeToPrepare, isVegan);
            return "Recipe " + name + " created\n";
        }
        
        function toggleSugar(name) {
            var recipe;
            
            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }
            recipe = _recipes[name];
            
            if (recipe instanceof Dessert) {
                recipe.toggleSugar();
                return "Command ToggleSugar executed successfully. New value: " + recipe._withSugar.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleSugar is not applicable to recipe " + name + "\n";
            }
        }
        
        function toggleVegan(name) {
            var recipe;
            
            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }
            
            recipe = _recipes[name];
            if (recipe instanceof Meal) {
                recipe.toggleVegan();
                return "Command ToggleVegan executed successfully. New value: " +
                    recipe._isVegan.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleVegan is not applicable to recipe " + name + "\n";
            }
        }
        
        function printRestaurantMenu(name) {
            var restaurant;
            
            if (!_restaurants.hasOwnProperty(name)) {
                throw new Error("The restaurant " + name + " does not exist");
            }
            
            restaurant = _restaurants[name];
            return restaurant.printRestaurantMenu();
        }
        
        function addRecipeToRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;
            
            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }
            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }
            
            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.addRecipe(recipe);
            return "Recipe " + recipeName + " successfully added to restaurant " + restaurantName + "\n";
        }
        
        function removeRecipeFromRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;
            
            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }
            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }
            
            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.removeRecipe(recipe);
            return "Recipe " + recipeName + " successfully removed from restaurant " + restaurantName + "\n";
        }
        
        function executeCommand(commandLine) {
            var cmd, params, result;
            cmd = new Command(commandLine);
            params = cmd._params;
            
            switch (cmd._name) {
                case 'CreateRestaurant':
                    result = createRestaurant(params["name"], params["location"]);
                    break;
                case 'CreateDrink':
                    result = createDrink(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["carbonated"]));
                    break;
                case 'CreateSalad':
                    result = createSalad(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["pasta"]));
                    break;
                case "CreateMainCourse":
                    result = createMainCourse(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]), params["type"]);
                    break;
                case "CreateDessert":
                    result = createDessert(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]));
                    break;
                case "ToggleSugar":
                    result = toggleSugar(params["name"]);
                    break;
                case "ToggleVegan":
                    result = toggleVegan(params["name"]);
                    break;
                case "AddRecipeToRestaurant":
                    result = addRecipeToRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "RemoveRecipeFromRestaurant":
                    result = removeRecipeFromRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "PrintRestaurantMenu":
                    result = printRestaurantMenu(params["name"]);
                    break;
                default:
                    throw new Error('Invalid command name: ' + cmdName);
            }
            
            return result;
        }
        
        function parseBoolean(value) {
            switch (value) {
                case "yes":
                    return true;
                case "no":
                    return false;
                default:
                    throw new Error("Invalid boolean value: " + value);
            }
        }
        
        return {
            initialize: initialize,
            executeCommand: executeCommand
        };
    }());
    
    
    // Process the input commands and return the results
    var results = '';
    RestaurantEngine.initialize();
    commands.forEach(function (cmd) {
        if (cmd != "") {
            try {
                var cmdResult = RestaurantEngine.executeCommand(cmd);
                results += cmdResult;
            } catch (err) {
                results += err.message + "\n";
            }
        }
    });
    
    return results.trim();
}

// ------------------------------------------------------------
// Read the input from the console as array and process it
// Remove all below code before submitting to the judge system!
// ------------------------------------------------------------

(function () {
    var arr = [];
    if (typeof (require) == 'function') {
        // We are in node.js --> read the console input and process it
        require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        }).on('line', function (line) {
            arr.push(line);
        }).on('close', function () {
            console.log(processRestaurantManagerCommands(arr));
        });
    }
})();

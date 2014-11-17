function processTrainingCenterCommands(commands) {
    
    'use strict';
    
    var trainingcenter = (function () {
        
        var TrainingCenterEngine = (function () {
            
            var _trainers;
            var _uniqueTrainerUsernames;
            var _trainings;
            
            function initialize() {
                _trainers = [];
                _uniqueTrainerUsernames = {};
                _trainings = [];
            }
            
            function executeCommand(command) {
                var cmdParts = command.split(' ');
                var cmdName = cmdParts[0];
                var cmdArgs = cmdParts.splice(1);
                switch (cmdName) {
                    case 'create':
                        return executeCreateCommand(cmdArgs);
                    case 'list':
                        return executeListCommand();
                    case 'delete':
                        return executeDeleteCommand(cmdArgs);
                    default:
                        throw new Error('Unknown command: ' + cmdName);
                }
            }
            
            function executeCreateCommand(cmdArgs) {
                var objectType = cmdArgs[0];
                var createArgs = cmdArgs.splice(1).join(' ');
                var objectData = JSON.parse(createArgs);
                var trainer;
                switch (objectType) {
                    case 'Trainer':
                        trainer = new trainingcenter.Trainer(objectData.username, objectData.firstName, 
                            objectData.lastName, objectData.email);
                        addTrainer(trainer);
                        break;
                    case 'Course':
                        trainer = findTrainerByUsername(objectData.trainer);
                        var course = new trainingcenter.Course(objectData.name, objectData.description, trainer,
                            parseDate(objectData.startDate), objectData.duration);
                        addTraining(course);
                        break;
                    case 'Seminar':
                        trainer = findTrainerByUsername(objectData.trainer);
                        var seminar = new trainingcenter.Seminar(objectData.name, objectData.description, 
                            trainer, parseDate(objectData.date));
                        addTraining(seminar);
                        break;
                    case 'RemoteCourse':
                        trainer = findTrainerByUsername(objectData.trainer);
                        var remoteCourse = new trainingcenter.RemoteCourse(objectData.name, objectData.description,
                            trainer, parseDate(objectData.startDate), objectData.duration, objectData.location);
                        addTraining(remoteCourse);
                        break;
                    default:
                        throw new Error('Unknown object to create: ' + objectType);
                }
                return objectType + ' created.';
            }
            
            function findTrainerByUsername(username) {
                if (!username) {
                    return undefined;
                }
                for (var i = 0; i < _trainers.length; i++) {
                    if (_trainers[i].getUsername() == username) {
                        return _trainers[i];
                    }
                }
                throw new Error("Trainer not found: " + username);
            }
            
            function addTrainer(trainer) {
                if (_uniqueTrainerUsernames[trainer.getUsername()]) {
                    throw new Error('Duplicated trainer: ' + trainer.getUsername());
                }
                _uniqueTrainerUsernames[trainer.getUsername()] = true;
                _trainers.push(trainer);
            }
            
            function addTraining(training) {
                _trainings.push(training);
            }
            
            function executeListCommand() {
                var result = '', i;
                if (_trainers.length > 0) {
                    result += 'Trainers:\n' + ' * ' + _trainers.join('\n * ') + '\n';
                } else {
                    result += 'No trainers\n';
                }
                
                if (_trainings.length > 0) {
                    result += 'Trainings:\n' + ' * ' + _trainings.join('\n * ') + '\n';
                } else {
                    result += 'No trainings\n';
                }
                
                return result.trim();
            }
            
            function executeDeleteCommand(cmdArgs) {
                var objectType = cmdArgs[0];
                var deleteArgs = cmdArgs.splice(1).join(' ');
                switch (objectType) {
                    case 'Trainer':
                        var trainer = findTrainerByUsername(deleteArgs);
                        if (typeof trainer === 'undefined') {
                            throw new Error('Undefined trainert to delete: ' + trainer);
                        }
                        _trainings.forEach(function (item, index) {
                            if (item.getTrainer()) {
                                
                                if (deleteArgs.localeCompare(item.getTrainer().getUsername()) == 0) {
                                    _trainings[index].setTrainer();
                                }
                            }
                        });
                        var indexTrainer = _trainers.indexOf(trainer);
                        _trainers.splice(indexTrainer, 1);
                        //    indexTrainer = _uniqueTrainerUsernames.indexOf(trainer);
                        delete _uniqueTrainerUsernames[trainer.getUsername()];
                        break;
                    default:
                        throw new Error('Unknown object to delete: ' + objectType);
                }
                return objectType + ' deleted.';
            }
            
            var trainingCenterEngine = {
                initialize: initialize,
                executeCommand: executeCommand
            };
            return trainingCenterEngine;
        }());
        
        //Validation
        Object.prototype.extends = function (parent) {
            this.prototype = Object.create(parent.prototype);
            this.prototype.constructor = this;
        };
        
        Object.prototype.validateNonEmptyString = function (value, variableName) {
            if (typeof (value) != "string" || !value.trim()) {
                
                throw new Error(variableName + " should be non-empty string");
               
            }
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
        Object.prototype.validateDate = function (date, variableName) {
            var year = date.getFullYear();
            if (year < 2000 || year > 2020) {
                throw new Error("The " + variableName + " not valid.");
            }
        }
        
        Object.prototype.validateEmail = function (value, variableName) {
            //var re = /^[^@]+@[^@]+$/;slowly
            //var result = re.test(value);
            var nm = value.match(/\@/g).length;
            
            if (nm !== 1) {
                throw new Error(variableName + " should be contain @");
            }
        }
        
        
        var Trainer = (function () {
            
            function Trainer(username, firstName, lastName, email) {
                this.setUsername(username);
                this.setFirstName(firstName);
                this.setLastName(lastName);
                this.setEmail(email);
            }
            
            Trainer.prototype.setUsername = function (username) {
                this.validateNonEmptyString(username, "name");
                this._username = username;
            }
            
            Trainer.prototype.getUsername = function () {
                return this._username;
            }
            
            Trainer.prototype.setFirstName = function (firstName) {
                if (typeof firstName !== 'undefined') {
                    this.validateNonEmptyString(firstName, "firstName");
                }
                this._firstName = firstName;
            }
            
            Trainer.prototype.getFirstName = function () {
                return this._firstName;
            }
            
            Trainer.prototype.setLastName = function (lastName) {
                this.validateNonEmptyString(lastName, "lastName");
                this._lastName = lastName;
            }
            
            Trainer.prototype.getLastName = function () {
                return this._lastName;
            }
            
            Trainer.prototype.setEmail = function (email) {
                if (typeof email !== 'undefined') {
                    this.validateEmail(email, "email");
                }
                
                this._email = email;
            }
            
            Trainer.prototype.getEmail = function () {
                return this._email;
            }
            
            Trainer.prototype.toString = function () {
                var result = 'Trainer[username=' + this.getUsername();
                
                if (typeof this._firstName !== 'undefined') {
                    result += ';first-name=' + this.getFirstName();
                }
                result += ';last-name=' + this.getLastName();
                
                result += (typeof this._email === 'undefined') ? '' : ';email=' + this.getEmail();
                result += ']';
                return result;
            }
            
            return Trainer;
        }());
        
        
        var Training = (function () {
            function Training(name, description, trainer, startDate, duration) {
                if (this.constructor === Training) {
                    throw new Error("Can't instantiate abstract class Training.");
                }
                this.setDescription(description);
                this.setDuration(duration);
                this.setName(name);
                this.setTrainer(trainer);
                this.setStartDate(startDate);
            }
            
            Training.prototype.setDescription = function (description) {
                if (typeof description !== 'undefined') {
                    this.validateNonEmptyString(description, "description");
                }
                this._description = description;
            }
            
            Training.prototype.getDescription = function () {
                return this._description;
            }
            
            Training.prototype.setDuration = function (duration) {
                if (typeof duration !== 'undefined') {
                    this.validateIntegerRange(duration, 'duration', 1, 99);
                }
                
                this._duration = duration;
            }
            
            Training.prototype.getDuration = function () {
                return this._duration;
            }
            
            Training.prototype.setName = function (name) {
                this.validateNonEmptyString(name, "nameTraining");
                
                this._name = name;
            }
            
            Training.prototype.getName = function () {
                return this._name;
            }
            
            Training.prototype.setTrainer = function (trainer) {
                if (typeof trainer !== 'undefined') {
                    if (trainer == null) {
                        throw new Error(trainer + " should be non-empty object");
                    }
                }
                
                this._trainer = trainer;
            }
            
            Training.prototype.getTrainer = function () {
                return this._trainer;
            }
            
            Training.prototype.setStartDate = function (startDate) {
                this.validateDate(startDate, "date");
                this._startDate = startDate;
            }
            
            Training.prototype.getStartDate = function () {
                return this._startDate;
            }
            
            Training.prototype.toString = function () {
                var result = '[name=' + this.getName();
                if (typeof this._description !== 'undefined') {
                    result += ';description=' + this._description;
                }
                
                if (typeof this._trainer !== 'undefined') {
                    result += ';trainer=' + this._trainer;
                }
                
                result += ';date=' + formatDate(this._startDate);
                
                if (typeof this._duration !== 'undefined') {
                    result += ';duration=' + this._duration;
                }
                
                return result;
            }
            
            return Training;
        }());
        
        
        var Course = (function () {
            function Course(name, description, trainer, startDate, duration) {
                Training.call(this, name, description, trainer, startDate, duration);
            }
            
            Course.extends(Training);
            
            Course.prototype.toString = function () {
                var nameCourse = 'Course';
                var resultTraining = Training.prototype.toString.call(this);
                var result = resultTraining.replace('date', 'start-date');
                
                return nameCourse + result + ']';
            }
            
            return Course;
        }());
        
        
        var Seminar = (function () {
            function Seminar(name, description, trainer, startDate, duration) {
                Training.call(this, name, description, trainer, startDate, duration);
            }
            
            Seminar.extends(Training);
            
            Seminar.prototype.setDuration = function (duration) {
                if (typeof duration !== 'undefined') {
                    if (duration != 1) {
                        throw new Error("Duration's seminar is alawyes 1");
                    }
                }
                
                Training.prototype.setDuration.call(this, duration);
            }
            
            Seminar.prototype.toString = function () {
                var nameSeminar = 'Seminar';
                var result = Training.prototype.toString.call(this);
                return nameSeminar + result + ']';
            }
            
            return Seminar;
        }());
        
        
        var RemoteCourse = (function () {
            function RemoteCourse(name, description, trainer, startDate, duration, location) {
                Course.call(this, name, description, trainer, startDate, duration);
                this.setLocation(location);
            }
            
            RemoteCourse.extends(Course);
            
            RemoteCourse.prototype.setLocation = function (location) {
                this.validateNonEmptyString(location, "location");
                
                this._location = location;
            }
            
            RemoteCourse.prototype.getLocation = function () {
                return this._location;
            }
            
            RemoteCourse.prototype.toString = function () {
                var nameRemote = 'Remote';
                var result = Course.prototype.toString.call(this);
                result = result.slice(0, -1);
                if (typeof this._location !== 'undefined') {
                    result += ';location=' + this._location;
                }
                
                return nameRemote + result + ']';
            }
            
            return RemoteCourse;
        }());
        
        var trainingcenter = {
            Trainer: Trainer,
            Course: Course,
            Seminar: Seminar,
            RemoteCourse: RemoteCourse,
            engine: {
                TrainingCenterEngine: TrainingCenterEngine
            }
        };
        
        return trainingcenter;
    })();
    
    
    var parseDate = function (dateStr) {
        if (!dateStr) {
            return undefined;
        }
        var date = new Date(Date.parse(dateStr.replace(/-/g, ' ')));
        var dateFormatted = formatDate(date);
        if (dateStr != dateFormatted) {
            throw new Error("Invalid date: " + dateStr);
        }
        return date;
    }
    
    
    var formatDate = function (date) {
        var day = date.getDate();
        var monthName = date.toString().split(' ')[1];
        var year = date.getFullYear();
        return day + '-' + monthName + '-' + year;
    }
    
    
    // Process the input commands and return the results
    var results = '';
    trainingcenter.engine.TrainingCenterEngine.initialize();
    commands.forEach(function (cmd) {
        if (cmd != '') {
            try {
                var cmdResult = trainingcenter.engine.TrainingCenterEngine.executeCommand(cmd);
                results += cmdResult + '\n';
            } catch (err) {
                //console.log(err.stack);
                results += 'Invalid command.\n';
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
            console.log(processTrainingCenterCommands(arr));
        });
    }
})();

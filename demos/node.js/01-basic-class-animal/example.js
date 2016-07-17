require('../../../src/class.min.js');

// declare class with internal name 'Class'
var Animal = Class({
	Static: {
		Create: function (name, sound) {
			return new this.self(name, sound);
		}
	},
	Constructor: function (name, sound) {
		this.name = name;
		this.sound = sound;
	},
	name: '',
	sound: '',
	ShowYourself: function () {
		console.log(this.name + " - " + this.sound);
	},
	toString: function () {
		return "[object Animal]";
	}
});
// use
var dog = Animal.Create("Charlie", "wrr haf!");
dog.ShowYourself(); // 'Charlie - wrr haf!'

console.log(dog.self.Name); // 'Class'
console.log(dog.toString()); // '[object Animal]'
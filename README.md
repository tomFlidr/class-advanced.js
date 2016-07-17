# Class.js

- unique javascript helper to create Classes with possibilities to call any dynamic and static parent method anywhere
- usage: browser (MSIE6+, Safari, Opera, Chrome), Node.js and WSH (Windows Script Host)

## Basic Class - Animal
```javascript
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
```

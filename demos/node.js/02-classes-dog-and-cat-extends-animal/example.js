require('../../resources/js/node-examples.js');
require('../../../builds/latest/class.dev.js');

// Declare named class by Class.Define(...) 
// call into global memory space as 'Animal'
Class.Define('Animal', {
	Static: {
		GetInstance: function () {
			// this.static contains a child class definition
			// as later static binding in PHP normaly works
			return new this.static(arguments);
		}
	},
	Constructor: function (name, sound) {
		this.name = name;
		this.sound = sound;
	},
	name: '',
	sound: '',
	MakeNoise: function () {
		console.log(this.sound);
	},
	IntroduceYourself: function () {
		console.log(
			"People call me '{0}'.".format(this.name)
		);
	},
	DefineYourself: function (asdf) {
		console.log(
			"Globaly, I'm an '{0}'.".format(this.self.Name) + "\n" +
			"More precisely, I'm a '{0}'.".format(this.static.Name) + "\n" +
			"I live like an '{0}'.".format(this.static.Namespace) + "\n" +
			"My namespace is '{0}'.".format(this.static.Fullname)
		);
	}
});

// Declare named classes by Class.Define(...) call 
// into global memory space as 'Animal.Dog' and 'Animal.Cat'
// as extended classes from 'Animal' class.
Class.Define('Animal.Dog', {
	Extend: Animal,
	TellYourStory: function () {
		this.MakeNoise();
		this.IntroduceYourself();
		this.DefineYourself();
		console.log("But I'm the best friend of human.")
	}
});
Class.Define('Animal.Cat', {
	Extend: Animal,
	TellYourStory: function () {
		this.MakeNoise();
		this.IntroduceYourself();
		this.DefineYourself();
		console.log(
			"I don't care about people, but sometimes \n" +
			"they have something very good to eat."
		);
	}
});

// Create instances (both ways are doing the same):
var dog = new Animal.Dog("Charlie", "Wrr haf!");
var cat = Animal.Cat.GetInstance('Suzy', 'Pchchchchch!');

// 'Wrr haf!'
// People call me 'Charlie'.

// Globaly, I'm an 'Animal'.
// More precisely, I'm a 'Dog'.
// I live between 'Animal'.
// My type is 'Animal.Dog'.

// But the best friend of human.
dog.TellYourStory();


console.log("-------------------");


// Pchchchchch! [String]
// People call me 'Suzy'. [String]

// Globaly, I'm an 'Animal'.
// More precisely, I'm a 'Cat'.
// I live between 'Animal'.
// My type is 'Animal.Cat'. [String]

// I don't care about people, but sometimes 
// they have something very good to eat.
cat.TellYourStory();



console.log("-------------------");

console.log(dog instanceof Animal); // true
console.log(dog instanceof Animal.Dog); // true
console.log(dog instanceof Animal.Cat); // false
console.log(dog instanceof Date); // false

console.log("-------------------");

console.log(dog.static.Name); // 'Dog'
console.log(dog.static.Fullname); // 'Animal.Dog'
console.log(dog.static.Namespace); // 'Animal'
console.log(dog.static.Extend.Name); // 'Animal'
console.log(dog.static.Extend.Fullname); // 'Animal'
console.log(dog.static.Extend.Namespace); // ''

console.log("-------------------");

console.log(dog.static === Animal.Dog); // true
console.log(dog.static.Extend === Animal); // true
console.log(dog.static.prototype === Animal.Dog.prototype); // true
console.log(dog.static.Extend.prototype === Animal.prototype); // true

console.log("-------------------");

console.log(typeof Animal.Dog); // 'function'
console.log(typeof dog); // 'object'
console.log(dog.toString()); // '[object Animal.Dog]'

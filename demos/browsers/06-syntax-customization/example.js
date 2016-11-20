// syntax customization at app start:
Class.define = Class.Define;
Class.create = Class.Create;
Class.getByName = Class.GetByName;
Class.CustomizeSyntax({
	GetClassUid		: 'getClassUid',
	GetInstanceUid	: 'getInstanceUid',
    Inherited		: 'inherited',
	Extend			: 'extend',
	Static			: 'static',
	// for 'constructor' is not possible to use javascript 
	// build in function property 'constructor', use different:
	Constructor		: 'construct',
	Name			: 'name',
	Fullname		: 'fullname',
	Namespace		: 'namespace',
	static			: 'static',
	self			: 'self',
	parent			: 'parent'
});


// Declare named class by Class.Define(...) 
// call into global memory space as 'Animal'
Class.define('Animal', {
	static: {
		getInstance: function () {
			// this.static contains a child class definition
			// as later static binding in PHP normaly works
			return new this.static(arguments);
		}
	},
	construct: function (name, sound) {
		this.name = name;
		this.sound = sound;
	},
	name: '',
	sound: '',
	makeNoise: function () {
		console.log(this.sound);
	},
	introduceYourself: function () {
		console.log(
			"People call me '{0}'.".format(this.name)
		);
	},
	defineYourself: function (asdf) {
		console.log(
			"Globaly, I'm an '{0}'.".format(this.self.name) + '<br />' +
			"More precisely, I'm a '{0}'.".format(this.static.name) + '<br />' +
			"I live like an '{0}'.".format(this.static.namespace) + '<br />' +
			"My namespace is '{0}'.".format(this.static.fullname)
		);
	}
});

// Declare named classes by Class.Define(...) call 
// into global memory space as 'Animal.Dog' and 'Animal.Cat'
// as extended classes from 'Animal' class.
Class.define('Animal.Dog', {
	extend: Animal,
	tellYourStory: function () {
		this.makeNoise();
		this.introduceYourself();
		this.defineYourself();
		console.log("But I'm the best friend of human.")
	}
});
Class.define('Animal.Cat', {
	extend: Animal,
	tellYourStory: function () {
		this.makeNoise();
		this.introduceYourself();
		this.defineYourself();
		console.log(
			"I don't care about people, but sometimes <br />" +
			"they have something very good to eat."
		);
	}
});

// Create instances (both ways are doing the same):
var dog = new Animal.Dog("Charlie", "Wrr haf!");
var cat = Animal.Cat.getInstance('Suzy', 'Pchchchchch!');

// 'Wrr haf!'
// People call me 'Charlie'.

// Globaly, I'm an 'Animal'.
// More precisely, I'm a 'Dog'.
// I live between 'Animal'.
// My type is 'Animal.Dog'.

// But the best friend of human.
dog.tellYourStory();


console.log("-------------------");


// Pchchchchch! [String]
// People call me 'Suzy'. [String]

// Globaly, I'm an 'Animal'.
// More precisely, I'm a 'Cat'.
// I live between 'Animal'.
// My type is 'Animal.Cat'. [String]

// I don't care about people, but sometimes 
// they have something very good to eat.
cat.tellYourStory();



console.log("-------------------");

console.log(dog instanceof Animal); // true
console.log(dog instanceof Animal.Dog); // true
console.log(dog instanceof Animal.Cat); // false
console.log(dog instanceof Date); // false

console.log("-------------------");

console.log(dog.static.name); // 'Dog'
console.log(dog.static.fullname); // 'Animal.Dog'
console.log(dog.static.namespace); // 'Animal'
console.log(dog.static.extend.name); // 'Animal'
console.log(dog.static.extend.fullname); // 'Animal'
console.log(dog.static.extend.namespace); // ''

console.log("-------------------");

console.log(dog.static === Animal.Dog); // true
console.log(dog.static.extend === Animal); // true
console.log(dog.static.prototype === Animal.Dog.prototype); // true
console.log(dog.static.extend.prototype === Animal.prototype); // true

console.log("-------------------");

console.log(typeof Animal.Dog); // 'function'
console.log(typeof dog); // 'object'
console.log(dog.toString()); // '[object Animal.Dog]'

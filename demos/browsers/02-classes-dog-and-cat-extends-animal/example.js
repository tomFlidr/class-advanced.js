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
	DefineYourself: function () {
		console.log(
			"Globaly, I'm an '{0}'.".format(this.self.Name)
			+ '<br />' +
			"More precisely, I'm a '{0}'.".format(this.static.Name)
			+ '<br />' +
			"I belong to namespace '{0}'.".format(this.static.Namespace)
			+ '<br />' +
			"My full description is '{0}'.".format(this.static.Fullname)
		);
	},
	TellYourStory: function () {
		this.MakeNoise();
		this.DefineYourself();
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
			"I don't care about people, but sometimes <br />"+
			"they have something very good to eat."
		);
	}
});

// Create instances:
var creature = Class.Create("Animal", "Creature", "Rrroooaaarrr!")
var dog = new Animal.Dog("Charlie", "Wrr haf!");
var cat = Animal.Cat.GetInstance('Suzy', 'Pchchchchch!');



// 'Rrroooaaarrr!'

// Globaly, I'm an 'Animal'.
// More precisely, I'm a 'Animal'.
// I belong to namespace ''.
// My full description is 'Animal'.
creature.TellYourStory();


console.log("-------------------");

// 'Wrr haf!'
// People call me 'Charlie'.

// Globaly, I'm an 'Animal'.
// More precisely, I'm a 'Dog'.
// I belong to namespace 'Animal'.
// My full description is 'Animal.Dog'.

// But the best friend of human.
dog.TellYourStory();


console.log("-------------------");


// Pchchchchch! [String]
// People call me 'Suzy'. [String]

// Globaly, I'm an 'Animal'.
// More precisely, I'm a 'Cat'.
// I belong to namespace 'Animal'.
// My full description is 'Animal.Cat'. [String]

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

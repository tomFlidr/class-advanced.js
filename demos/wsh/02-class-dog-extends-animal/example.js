Class.Define('Animal', {
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
	}
});

Class.Define('Animals.Dog', {
	Extend: Animal,
	Static: {
		Create: function (name, sound) {
			return new this.self(name, sound);
		}
	},
	Constructor: function (name, sound) {
		this.parent(name, sound);
	},
	type: 'dog',
	ShowYourself: function () {
		this.parent();
		console.log(this.type);
	}
});

var dog = new Animals.Dog('Charlie', 'wrr haf!');
dog.ShowYourself(); // 'Charlie - wrr haf!, dog'

console.log(dog instanceof Animal); // true
console.log(dog instanceof Animals.Dog); // true
console.log(dog instanceof Date); // false

console.log(dog.self.Name); // 'Dog'
console.log(dog.self.Fullname); // 'Animals.Dog'
console.log(dog.self.Namespace); // 'Animals'
console.log(dog.self.Extend.Name); // 'Animal'
console.log(dog.self.Extend.Fullname); // 'Animal'
console.log(dog.self.Extend.Namespace); // ''

console.log(dog.self === Animals.Dog); // true
console.log(dog.self.Extend === Animal); // true
console.log(dog.self.prototype == Animals.Dog.prototype); // true
console.log(dog.self.Extend.prototype == Animal.prototype); // true

console.log(typeof Animals.Dog); // 'function'
console.log(typeof dog); // 'object'
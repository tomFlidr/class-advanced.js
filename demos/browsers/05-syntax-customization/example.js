// syntax customization:
var $class = Class;
$class.$define = Class.Define;
$class.$create = Class.Create;
$class.CustomizeSyntax({
	ClassImprint	: '$classId',
	InstanceImprint	: '$instanceId',
	Extend			: '$extends',
	Static			: '$static',
	Constructor		: '$constructor',
	Name			: '$name',
	Fullname		: '$fullname',
	Namespace		: '$namespace',
	self			: '$self',
	parent			: '$parent'
});


// usage with customized syntax:
$class.$define('Animal', {
	$static: {
		Create: function (name, sound) {
			return new this.$self(name, sound);
		}
	},
	$constructor: function (name, sound) {
		this.name = name;
		this.sound = sound;
	},
	name: '',
	sound: '',
	ShowYourself: function () {
		console.log(this.name + " - " + this.sound);
	}
});

$class.$define('Animals.Dog', {
	$extends: Animal,
	$static: {
		Create: function (name, sound) {
			return new this.$self(name, sound);
		}
	},
	$constructor: function (name, sound) {
		this.$parent(name, sound);
	},
	type: 'dog',
	ShowYourself: function () {
		this.$parent();
		console.log(this.type);
	}
});


// instance creating:
var dog = new Animals.Dog('Charlie', 'wrr haf!');
dog.ShowYourself(); // 'Charlie - wrr haf!, dog'


// result checking:
console.log(dog instanceof Animal); // true
console.log(dog instanceof Animals.Dog); // true
console.log(dog instanceof Date); // false

console.log(dog.$self.$name); // 'Dog'
console.log(dog.$self.$fullname); // 'Animals.Dog'
console.log(dog.$self.$namespace); // 'Animals'
console.log(dog.$self.$extends.$name); // 'Animal'
console.log(dog.$self.$extends.$fullname); // 'Animal'
console.log(dog.$self.$extends.$namespace); // ''

console.log(dog.$self === Animals.Dog); // true
console.log(dog.$self.$extends === Animal); // true
console.log(dog.$self.prototype == Animals.Dog.prototype); // true
console.log(dog.$self.$extends.prototype == Animal.prototype); // true

console.log(typeof Animals.Dog); // 'function'
console.log(typeof dog); // 'object'
require('../../resources/js/node-examples.js');
require('../../../builds/latest/class.dev.js');

// Declare not named class by Class(...) 
// call into custom variable 'Animal':
var Animal = Class({
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
	}
});

// Create instance:
var dog = new Animal('Charlie', 'Wrr haf!');

// 'Wrr haf!'
// 'People call me 'Charlie'.'
dog.IntroduceYourself();

console.log("----------------");

// Class Animal has only default name 'Class' inside.
// It has no Namespace defined, so Fullname is the same as Name
// and namespace is empty string. See another example how
// to define classes by Class.Define(...) with namespaces and names.
console.log(
	("Namespace: '{0}', \n" +
	"Fullname: '{1}', \n" +
	"Name: '{2}', \n")
	.format(
		dog.self.Namespace,
		dog.self.Fullname,
		dog.self.Name
	)
);
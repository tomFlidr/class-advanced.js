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
## Class Dog Extends Animal
```javascript
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
console.log(dog.self.Extend.Name); // 'Animal'

console.log(dog.self === Animals.Dog); // true
console.log(dog.self.Extend === Animal); // true
console.log(dog.self.prototype == Animals.Dog.prototype); // true
console.log(dog.self.Extend.prototype == Animal.prototype); // true

console.log(typeof Animals.Dog); // 'function'
console.log(typeof dog); // 'object'
```

## Three Extended Classes With Static Members
```javascript
Class.Define('Person', {
	Static: {
		Store: [],
		Register: function (person) {
			// in Static block:
			// - this context represents static context environment
			this.Store[person.id] = person;
		}
	},
	Constructor: function (id, name) {
		// in Constructor and dynamic methods:
		// - this context represents dynamic context environment
		this.id = id;
		this.name = name;
		this.self.Register(this);
	},
	id: 0,
	name: ''
});

Class.Define('Employe', {
	Extend: Person,
	Constructor: function (id, name, salary) {
		this.parent(id, name);
		this.salary = salary;
	},
	salary: 0,
	GetInfo: function () {
		return this.self.Name + " - name: " + this.name
			+ ", id: " + this.id + ", salary: " + this.salary;
	}
});

Class.Define('Manager', {
	Extend: Employe,
	Constructor: function (id, name, salary, idSecretary) {
		this.parent(id, name, salary);
		this.idSecretary = idSecretary;
	},
	idSecretary: 0,
	GetInfo: function () {
		var parentInfo = this.parent();
		return parentInfo + ",<br />"
			+ "&nbsp;&nbsp;&nbsp;" + "- secretary: "
			+ this.self.Store[this.idSecretary].GetInfo();
	}
});

// create class instance in standard way
var prManager = new Manager(5, 'Douglas Bridges', 50000, 2);

// create class instance by string as first argument, 
// all constructor params as second argument array
var secretary = Class.Create('Employe', [2, 'Janet Williams', 30000]);

// 'Employe - name: Janet Williams, id: 2, salary: 30000'
console.log(secretary.GetInfo());

// 'Manager - name: Douglas Bridges, id: 5, salary: 50000,
// - secretary: Employe - name: Janet Williams, id: 2, salary: 30000'
console.log(prManager.GetInfo());
```

## Class A, B, C And Parent Methods Calls Flows
```javascript
var A = Class({
	Static: {
		Create: function (one, two, three) {
			console.log('A::Create('+one+','+two+','+three+')');
			return new this.self(one, two, three);
		},
		FirstStatic: function (a, b, c) {
			console.log('A::FirstStatic('+a+','+b+','+c+')');
		}
	},
	Constructor: function (one, two, three) {
		console.log('A->Constructor('+one+','+two+','+three+')');
	},
	FirstDynamic: function (f, g, h) {
		console.log('A->FirstDynamic('+f+','+g+','+h+')');
		return this;
	},
	SecondDynamic: function (x, y, z) {
		console.log('A->SecondDynamic('+x+','+y+','+z+')');
		return this;
	},
	ThirdDynamic: function (x, y, z) {
		console.log('A->ThirdDynamic('+x+','+y+','+z+')');
		return this;
	}
});

var B = Class({
	Extend: A,
	Static: {
		Create: function (one, two, three) {
			console.log('C::Create('+one+','+two+','+three+')');
			return new this.self(one, two, three);
		},
		FirstStatic: function (a, b, c) {
			console.log('B::FirstStatic('+a+','+b+','+c+')');
		},
		SecondStatic: function (a, b, c) {
			console.log('B::SecondStatic('+a+','+b+','+c+')');
			this.parent.FirstStatic(a, b, c);
		}
	},
	Constructor: function (one, two, three) {
		console.log('B->Constructor('+one+','+two+','+three+')');
		this.parent.apply(this, [one, two, three]);
	},
	FirstDynamic: function (x, y, z) {
		console.log('B->FirstDynamic('+x+','+y+','+z+')');
		this.parent.ThirdDynamic(x, y, z);
		return this;
	},
	SecondDynamic: function (f, g, h) {
		console.log('B->SecondDynamic('+f+','+g+','+h+')');
		this.parent.FirstDynamic(f, g, h);
		return this;
	},
	ThirdDynamic: function (x, y, z) {
		console.log('B->ThirdDynamic('+x+','+y+','+z+')');
		return this;
	}
});

Class.Define('C', {
	Extend: B,
	Static: {
		Create: function (one, two, three) {
			console.log('C::Create('+one+','+two+','+three+')');
			return Class.Create(this.self.Name, [].slice.apply(arguments));
		},
		FirstStatic: function (a, b, c) {
			console.log('C::FirstStatic('+a+','+b+','+c+')');
		},
		SecondStatic: function (a, b, c) {
			console.log('C::SecondStatic('+a+','+b+','+c+')');
		},
		ThirtStatic: function (a, b, c) {
			console.log('C::ThirtStatic('+a+','+b+','+c+')');
			this.parent.SecondStatic(a, b, c);
		}
	},
	Constructor: function (one, two, three) {
		console.log('C->Constructor('+one+','+two+','+three+')');
		this.parent(one, two, three);
	},
	FirstDynamic: function (f, g, h) {
		console.log('C->FirstDynamic('+f+','+g+','+h+')');
		this.parent.SecondDynamic(f, g, h);
		return this;
	},
	SecondDynamic: function (m, n, o) {
		console.log('C->SecondDynamic('+m+','+n+','+o+')');
		this.ThirdDynamic(m, n, o);
		return this;
	},
	ThirdDynamic: function (x, y, z) {
		console.log('C->ThirdDynamic('+x+','+y+','+z+')');
		this.parent.FirstDynamic(x, y, z);
		return this;
	}
});


/**
This code flows through methods:
	C::ThirtStatic(a,b,c)
	B::SecondStatic(a,b,c)
	A::FirstStatic(a,b,c)
	C::Create(1,2,3)
*/
C.ThirtStatic('a', 'b', 'c');


/**
This code flows through methods:
	C->Constructor(1,2,3)
	B->Constructor(1,2,3)
	A->Constructor(1,2,3)
*/
var c = C.Create(1, 2, 3)
	/**
	This code flows through methods:
		C->FirstDynamic(f,g,h)
		B->SecondDynamic(f,g,h)
		A->FirstDynamic(f,g,h)
	*/
	.FirstDynamic('f', 'g', 'h')
	/**
	This code flows through methods:
		C->SecondDynamic(m,n,o)
		C->ThirdDynamic(m,n,o)
		B->FirstDynamic(m,n,o)
		A->ThirdDynamic(m,n,o)
	*/
	.SecondDynamic('m', 'n', 'o')
	/**
	This code flows through methods:
		C->ThirdDynamic(x,y,z)
		B->FirstDynamic(x,y,z)
		A->ThirdDynamic(x,y,z)
	*/
	.ThirdDynamic('x', 'y', 'z');

console.log(c); // [object C]
```
### Browser Usage
```html
<script src="./class.min.js" type="text/javascript"></script>
<script type="text/javascript">
var MyClass = Class({
	Constructor: function () {
		console.log("It works!");
	}
});
var myInstance = new MyClass(); // "It works!
</script>
```
### Node.js Usage
```javascript
require('./class.min.js');
var MyClass = Class({
	Constructor: function () {
		console.log("It works!");
	}
});
var myInstance = new MyClass(); // "It works!
```

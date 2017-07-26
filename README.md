# **Javascript Class (Class.js)**

[![Latest Stable Version](https://img.shields.io/badge/stable-2.1.2-green.svg)](https://github.com/tomFlidr/class.js/releases)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/tomFlidr/class.js/blob/master/LICENCE)

 Universal JS library for prototyped classes - extending, constructor, static and dynamic elements, parent methods calls, self reflection and much more. For all browsers, Node.js and Windows Script Host.

## **INSTALATION**

```shell
npm install tomFlidr/class.js
```

## **DOWNLOAD**
 
* [**download class.dev.js (for development with JSDocs comments for IDE)**](https://tomflidr.github.io/class.js/builds/2.1.2/class.dev.js)
* [**download class.min.js (for production)**](https://tomflidr.github.io/class.js/builds/2.1.2/class.min.js)

```html
<!-- for production: -->
<script type="text/javascript" src="https://tomflidr.github.io/class.js/builds/2.1.2/class.min.js"></script>

<!-- for development with JSDocs comments for IDE: -->
<script type="text/javascript" src="https://tomflidr.github.io/class.js/builds/2.1.2/class.dev.js"></script>
```

## **DEMOS**
- [**1. Basic Class - Animal**](https://tomflidr.github.io/class.js/demos/browsers/01-basic-class-animal/index.html)
- [**2. Class Dog And Cat Extends Animal**](https://tomflidr.github.io/class.js/demos/browsers/02-classes-dog-and-cat-extends-animal/index.html)
- [**3. Late Static Binding**](https://tomflidr.github.io/class.js/demos/browsers/03-late-static-binding/index.html)
- [**4. Three Extended Classes With Static Members**](https://tomflidr.github.io/class.js/demos/browsers/04-three-extended-classes-with-static-members/index.html)
- [**5. Three Controller Classes And Different Behaviour In Actions**](https://tomflidr.github.io/class.js/demos/browsers/05-three-controller-classes-and-different-behaviour-in-actions/index.html)
- [**6. Class A, B, C And Parent Methods Calls Flows**](https://tomflidr.github.io/class.js/demos/browsers/06-class-a-b-c-and-parent-calls/index.html)
- [**7. Syntax Customization**](https://tomflidr.github.io/class.js/demos/browsers/07-syntax-customization/index.html)

## **Features**
- very fast, effective, supersmall - all in **6.5 KB - minimized**, **2.4 KB - gzipped**
- multi environment:
  - **all browsers** (MSIE6+, Safari, Opera, Chrome)
  - **Node.js**
  - **WSH** (Windows Script Host)
  - Adobe (only old archived version 0.6)
- **syntax customization** - any declaration keyword or internal class keyword shoud be customized
- inspired by PHP OOP, Ext.JS and Prototype.JS syntax
- documented with JSDocs comments
- **Function.prototype.bind polyfill included**
- possibility to define:
  - **Static** elements
  - parent class by **Extend** keyword
  - **Constructor** method
  - all **other elements as dynamic** elements
- possibility to call any dynamic and static parent method anywhere by:
  - **this.parent(arguments);** // in static and dynamic functions
  - **this.parent(param1, param2);** // in static and dynamic functions
  - **this.parent.anyStaticMethod(param1, param2);** // in static functions
  - **this.parent.anyDynamicMethod(param1, param2);** // in dynamic functions
  - **this.parent.apply(this, [param1, param2]);** // in static and dynamic functions
  - **this.parent.anyStaticMethod.apply(this, [param1, param2]);** // in static functions
  - **this.parent.anyDynamicMethod.apply(this, [param1, param2]);** // in dynamic functions
- posibility to get **current class definition** by:
  - **this.self;** // without the need to know class name itself
  - **this.static;** // without the need to know class name itself
  - this.self context (static class definition) is changed in each defined dynamic and static method
    into value coresponded with original definition place
  - this.static context (static class definition) is not changed and it all time coresponds to
    original instance context - like [**Late Static Bindings**](http://php.net/manual/en/language.oop5.late-static-bindings.php) in PHP OOP
- posibility to get class name / fullname / namespace (only if class is defined by Class.Define();) by: 
  - **this.self.Fullname;** or **this.static.Fullname;**
  - **this.self.Name;** or **this.static.Name;**
  - **this.self.Namespace;** or **this.static.Namespace;**
- posibility to **create instance by**:
  - classic Javascript **new keyword**:
    var instance = new ClassName(param1, param2);
  - class name string with **Class.Create(); method**:
    var instance = Class.Create('ClassName', param1, param2);
- **inheritance checking** by javascript 'instanceof' keyword
- posibility to create anonymous classes like:
  - **new Class({Constructor:function(text){console.log(text)}})("It works!");**
- Visual Studio - Go To Definition (F12) support - for current level objects and parent methods

## **1. Basic Class - Animal**
```javascript
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
dog.MakeNoise();

// 'People call me 'Charlie'.'
dog.IntroduceYourself();
```
## **2. Class Dog And Cat Extends Animal**
```javascript
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
			"Globaly, I'm an '{0}'.".format(this.self.Name)
			+ '<br />' +
			"More precisely, I'm a '{0}'.".format(this.static.Name)
			+ '<br />' +
			"I live like an '{0}'.".format(this.static.Namespace)
			+ '<br />' +
			"My namespace is '{0}'.".format(this.static.Fullname)
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

// Create instances (all ways are creating an instance):
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
```

## **4. Three Extended Classes With Static Members**
```javascript
Class.Define('Person', {
	Static: {
		Store: [],
		Count: 0,
		Register: function (person) {
			// in Static block:
			// - this context represents static context environment
			this.Store[person.id] = person;
			this.Count += 1;
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
		return this.static.Name + " - name: " + this.name
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
var prManager = new Manager(0, 'Douglas Bridges', 50000, 1);

// create class instance by string as first argument, 
// all constructor params as second argument array
var secretary = Class.Create('Employe', 1, 'Janet Williams', 30000);

// 'Employe - name: Janet Williams, id: 1, salary: 30000'
console.log(secretary.GetInfo());

// 'Manager - name: Douglas Bridges, id: 0, salary: 50000,
// - secretary: Employe - name: Janet Williams, id: 1, salary: 30000'
console.log(prManager.GetInfo());

// Primitive values are not linked,
// so real count of registered persons
// is written in Person.Count memory space
console.log(Person.Count);	// 2
console.log(Employe.Count);	// 0
console.log(Manager.Count);	// 0

// Nonprimitive values are lined as references,
// so registered persons store is written 
// in Person.Count memory space and two another links are created
console.log(Person.Store.length);	// 2
console.log(Employe.Store.length);	// 2
console.log(Manager.Store.length);	// 2
```

## **5. Three Controller Classes And Different Behaviour In Actions**
```javascript
// System controller class - parent for all controllers:
Class.Define('Controller', {
	Static: {
		Dispatch: function (path, actionName) {
			new this.static(path)[actionName + 'Action']().Render();
		}
	},
	Constructor: function (path) {
		this.path = path;
	},
	path: null,
	Render: function () {
		console.log(JSON.stringify(this.path));
	}
});

// Front controller class - parent for all front controllers:
Class.Define('Controller.Front', {
	Extend: Controller,
	prepareView: function () {
		this.view = {
			path: this.path,
			agent: navigator.appName,
			lang: navigator.language
		};
	},
	view: null,
	Render: function () {
		console.log(
			JSON.stringify(this.view, null, "  ")
		);
	}
});

// Specific controller class for text pages,
// this controller will be dispatched 4 times:
Class.Define('Controller.Front.Default', {
	Extend: Controller.Front,
	prepareView: function () {
		this.parent(arguments);
		this.view.content = "You are here: '{0}'."
			.format(this.view.path.substr(1));
		this.view.layout = 'two-columns';
		this.view.leftMenu = [
			'About', 'Partners', 'Contacts'
		];
	},
	HomeAction: function () {
		/*****************************************************/
		/* You can call parent method directly from         **/
		/* any other method to skip current implementation! **/
		this.parent.prepareView();
		/*****************************************************/
		this.view.content = 'Welcome to our website!';
		this.view.layout = 'one-column';
		return this;
	},
	DefaultAction: function () {
		this.prepareView();
		return this;
	},
	ContactsAction: function () {
		this.prepareView();
		this.view.contactMain = 'info@company.com';
		return this;
	}
});


// Dispatching different requests to different 
// actions with different needs:

var ctrlDef = Controller.Front.Default;

ctrlDef.Dispatch('/home',		'Home');
ctrlDef.Dispatch('/about-us',	'Default');
ctrlDef.Dispatch('/partners',	'Default');
ctrlDef.Dispatch('/contacts',	'Contacts');
```

## **6. Class A, B, C And Parent Methods Calls Flows**
```javascript
Class.Define('A', {
	Static: {
		Create: function (one, two, three) {
			console.log(this.self.Name + '::Create(' + one + ',' + two + ',' + three + ')');
			return Class.Create(this.static.Name, arguments);
		},
		FirstStatic: function (a, b, c) {
			console.log(this.self.Name + '::FirstStatic(' + a + ',' + b + ',' + c + ')');
		}
	},
	Constructor: function (one, two, three) {
		console.log(this.self.Name+'->Constructor('+one+','+two+','+three+')');
	},
	FirstDynamic: function (f, g, h) {
		console.log(this.self.Name+'->FirstDynamic('+f+','+g+','+h+')');
		return this;
	},
	SecondDynamic: function (x, y, z) {
		console.log(this.self.Name+'->SecondDynamic('+x+','+y+','+z+')');
		return this;
	},
	ThirdDynamic: function (x, y, z) {
		console.log(this.self.Name+'->ThirdDynamic('+x+','+y+','+z+')');
		return this;
	}
});

Class.Define('B', {
	Extend: A,
	Static: {
		FirstStatic: function (a, b, c) {
			console.log("this is never called");
		},
		SecondStatic: function (a, b, c) {
			console.log(this.self.Name+'::SecondStatic('+a+','+b+','+c+')');
			this.parent.FirstStatic(a, b, c);
		}
	},
	Constructor: function (one, two, three) {
		console.log(this.self.Name+'->Constructor('+one+','+two+','+three+')');
		this.parent(arguments);
	},
	FirstDynamic: function (x, y, z) {
		console.log(this.self.Name+'->FirstDynamic('+x+','+y+','+z+')');
		this.ThirdDynamic(x, y, z);
		return this;
	},
	ThirdDynamic: function (x, y, z) {
		console.log(this.self.Name+'->ThirdDynamic('+x+','+y+','+z+')');
		this.parent.ThirdDynamic(x, y, z);
		return this;
	}
});

Class.Define('C', {
	Extend: B,
	Static: {
		SecondStatic: function (a, b, c) {
			console.log("this is never called");
		},
		ThirtStatic: function (a, b, c) {
			console.log(this.self.Name + '::ThirtStatic(' + a + ',' + b + ',' + c + ')');
			this.parent.SecondStatic(a, b, c);
		}
	},
	one: 0,
	two: 0,
	three: 0,
	Constructor: function (one, two, three) {
		this.one = one;
		this.two = two;
		this.three = three;
		console.log(this.self.Name+'->Constructor('+one+','+two+','+three+')');
		this.parent(arguments);
	},
	FirstDynamic: function (f, g, h) {
		console.log(this.self.Name+'->FirstDynamic('+f+','+g+','+h+')');
		this.parent.SecondDynamic(f, g, h);
		return this;
	},
	SecondDynamic: function (m, n, o) {
		console.log(this.self.Name+'->SecondDynamic('+m+','+n+','+o+')');
		this.ThirdDynamic(m, n, o);
		return this;
	},
	ThirdDynamic: function (x, y, z) {
		console.log(this.self.Name+'->ThirdDynamic('+x+','+y+','+z+')');
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
				A->SecondDynamic(f,g,h)
	*/
	.FirstDynamic('f', 'g', 'h')
	/**
	This code flows through methods:
		C->SecondDynamic(m,n,o)
		C->ThirdDynamic(m,n,o)
			B->FirstDynamic(m,n,o)
			B->ThirdDynamic(m,n,o)
				A->FirstDynamic(m,n,o)
	*/
	.SecondDynamic('m', 'n', 'o')
	/**
	This code flows through methods:
		C->ThirdDynamic(x,y,z)
			B->FirstDynamic(x,y,z)
				A->ThirdDynamic(x,y,z)
	*/
	.ThirdDynamic('x', 'y', 'z');

console.log(c.toString()); // [object C]
```

### **7. Syntax Customization**
```javascript
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
	Constructor: 'construct',
	// for 'name' is not possible to use javascript 
	// build in 'Function.name' property, use different:
	Name			: 'className',
	Fullname		: 'classFullname',
	Namespace		: 'classNamespace',
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
	defineYourself: function () {
		console.log(
			"Globaly, I'm an '{0}'.".format(this.self.className)
			+ '<br />' +
			"More precisely, I'm a '{0}'.".format(this.static.className)
			+ '<br />' +
			"I belong to namespace '{0}'.".format(this.static.classNamespace)
			+ '<br />' +
			"My full description is '{0}'.".format(this.static.classFullname)
		);
	},
	tellYourStory: function () {
		this.makeNoise();
		this.defineYourself();
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

// Create instances:
var creature = Class.create("Animal", "Creature", "Rrroooaaarrr!")
var dog = new Animal.Dog("Charlie", "Wrr haf!");
var cat = Animal.Cat.getInstance('Suzy', 'Pchchchchch!');



// 'Rrroooaaarrr!'

// Globaly, I'm an 'Animal'.
// More precisely, I'm a 'Animal'.
// I belong to namespace ''.
// My full description is 'Animal'.
creature.tellYourStory();


console.log("-------------------");

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

console.log(dog.static.className); // 'Dog'
console.log(dog.static.classFullname); // 'Animal.Dog'
console.log(dog.static.classNamespace); // 'Animal'
console.log(dog.static.extend.className); // 'Animal'
console.log(dog.static.extend.classFullname); // 'Animal'
console.log(dog.static.extend.classNamespace); // ''

console.log("-------------------");

console.log(dog.static === Animal.Dog); // true
console.log(dog.static.extend === Animal); // true
console.log(dog.static.prototype === Animal.Dog.prototype); // true
console.log(dog.static.extend.prototype === Animal.prototype); // true

console.log("-------------------");

console.log(typeof Animal.Dog); // 'function'
console.log(typeof dog); // 'object'
console.log(dog.toString()); // '[object Animal.Dog]'
```
### **Browser Usage**
- install any browser if necessary (MSIE6+, Firefox, Google Chrome, Safari, Opera...)
- create new empty text file with name "example.html":
- open the file "example.html" in the browser to run
```html
<!DOCTYPE HTML>
<html lang="en-US">
	<head>
		<meta charset="UTF-8" />
	</head>
	<body>
		<script src="./class.dev.js" type="text/javascript"></script>
		<script type="text/javascript">
			var MyClass = Class({
				Constructor: function () {
					console.log("It works!");
				}
			});
			var myInstance = new MyClass(); // "It works!
		</script>	
	</body>
</html>

```
### **Node.js Usage**
- install node.js from nodejs.org if necessary
- create new empty text file with name "example.js":
- type into command line window "node example.js" to run
```javascript
require('./class.dev.js');
var MyClass = Class({
	Constructor: function () {
		console.log("It works!");
	}
});
var myInstance = new MyClass(); // "It works!
```
### **Windows Script Host Usage**
- create new empty text file with name "example.wsf":
- doubleclick on the file "example.wsf" to run
```html
<job>
	<script type="JScript" src="./class.dev.js"></script>
	<script type="JScript">
		var MyClass = Class({
			Constructor: function () {
				WScript.echo("It works!");
			}
		});
		var myInstance = new MyClass(); // "It works!
	</script>
</job>
```

## **DEMOS**
- [**1. Basic Class - Animal**](https://tomflidr.github.io/class.js/demos/browsers/01-basic-class-animal/index.html)
- [**2. Class Dog And Cat Extends Animal**](https://tomflidr.github.io/class.js/demos/browsers/02-classes-dog-and-cat-extends-animal/index.html)
- [**3. Late Static Binding**](https://tomflidr.github.io/class.js/demos/browsers/03-late-static-binding/index.html)
- [**4. Three Extended Classes With Static Members**](https://tomflidr.github.io/class.js/demos/browsers/04-three-extended-classes-with-static-members/index.html)
- [**5. Three Controller Classes And Different Behaviour In Actions**](https://tomflidr.github.io/class.js/demos/browsers/05-three-controller-classes-and-different-behaviour-in-actions/index.html)
- [**6. Class A, B, C And Parent Methods Calls Flows**](https://tomflidr.github.io/class.js/demos/browsers/06-class-a-b-c-and-parent-calls/index.html)
- [**7. Syntax Customization**](https://tomflidr.github.io/class.js/demos/browsers/07-syntax-customization/index.html)

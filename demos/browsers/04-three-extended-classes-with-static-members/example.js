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
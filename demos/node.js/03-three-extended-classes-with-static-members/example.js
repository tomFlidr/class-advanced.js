require('../../../src/class.min.js');

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
		return parentInfo + ",\n"
			+ "\t" + "- secretary: "
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
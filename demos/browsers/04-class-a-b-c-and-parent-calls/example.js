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
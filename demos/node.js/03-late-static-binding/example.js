require('../../resources/js/node-examples.js');
require('../../../builds/latest/class.dev.js');

Class.Define('Animal', {
	Static: {
		PrintSelf: function () {
			console.log(
				("Self full class name: '{0}', \n" +
				"Self class name: '{1}', \n" +
				"Self class namespace: '{2}'.")
				.format(
					this.self.Fullname,
					this.self.Name,
					this.self.Namespace
				)
			);
		},
		PrintStatic: function () {
			console.log(
				("Static full class name: '{0}', \n" +
				"Static class name: '{1}', \n" +
				"Static class namespace: '{2}'.")
				.format(
					this.static.Fullname,
					this.static.Name,
					this.static.Namespace
				)
			);
		}
	}
});

Class.Define('Animal.Dog', {
	Extend: Animal
});
Class.Define('Animal.Cat', {
	Extend: Animal
});


//Self full class name: 'Animal', 
//Self class name: 'Animal', 
//Self class namespace: ''.
Animal.PrintSelf();
//Self full class name: 'Animal', 
//Self class name: 'Animal', 
//Self class namespace: ''.
Animal.Dog.PrintSelf();
//Self full class name: 'Animal', 
//Self class name: 'Animal', 
//Self class namespace: ''.
Animal.Cat.PrintSelf();


//Static full class name: 'Animal', 
//Static class name: 'Animal', 
//Static class namespace: ''.
Animal.PrintStatic();
//Static full class name: 'Animal.Dog', 
//Static class name: 'Dog', 
//Static class namespace: 'Animal'.
Animal.Dog.PrintStatic();
//Static full class name: 'Animal.Cat', 
//Static class name: 'Cat', 
//Static class namespace: 'Animal'.
Animal.Cat.PrintStatic();
// System controller class - parent for all controllers:
Class.Define('Controller', {
	Static: {
		Dispatch: function (path, actionName) {
			console.log(this.static.Fullname);
			new this.static(path)[actionName + 'Action']().Render();
		}
	},
	Constructor: function (path) {
		this.path = path;
	},
	path: '',
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
			agent: 'BrowserName',
			lang: 'en'
		};
	},
	view: {},
	Render: function () {
		console.log(
			JSON.stringify(this.view, null, "   ")
		);
	}
});

// Specific controller class for text pages,
// this controller will be dispatched 4 times:
Class.Define('Controller.Front.Default', {
	Extend: Controller.Front,
	prepareView: function () {
		this.parent();
		this.view.content = "You are here: '{0}'."
			.format(this.path.substr(1));
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

ctrlDef.Dispatch('/home', 'Home');
console.log("------------------------");
ctrlDef.Dispatch('/about-us', 'Default');
console.log("------------------------");
ctrlDef.Dispatch('/partners', 'Default');
console.log("------------------------");
ctrlDef.Dispatch('/contacts',	'Contacts');
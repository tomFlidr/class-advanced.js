require('../../resources/js/node-examples.js');
require('../../../builds/latest/class.dev.js');

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
			agent: 'BrowserName',
			lang: 'en'
		};
	},
	view: null,
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
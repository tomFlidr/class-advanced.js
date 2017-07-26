/**
 * Javascript Class Helper
 * @author Tom Flidr <tomflidr@gmail.com>
 * @version 2.1.2
 * @summary 2017-07-26
 * @example

Class.Define('ClassName', {
	Extend: ParentClassDef,
	Static: {
		staticElm: function () {
			// call parent static method with same name
			this.parent(arguments);
			// call any other parent static method
			this.parent.otherParentStaticElm(arguments);
		}
	},
	Constructor: function (param1, param2;) {
		// call parent Constructor:
		this.parent(arguments);
		// reflect your code by:
		console.log(this.self.Name, this.self.Fullname, this.self.Namespace);
	},
	dynamicElm: function () {
		// call parent dynamic method with same name:
		this.parent(arguments);
		// call any other parent dynamic method
		this.parent.otherParentDynamicElm(arguments);
	}
});

*/

Class = (function (_globalScope) {

	if (typeof(_globalScope.Class) != 'undefined') return _globalScope.Class;

	// function.prototype.bind Polyfill for Object.create('ClassName, [/* arguments*/]):
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
	Function.prototype.bind||(Function.prototype.bind=function(a){if(typeof this!=='function'){throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');}var b=[].slice,c='prototype',d=b.call(arguments,1),e=this,f=function(){},g=function(){return e.apply(this instanceof f?this:a,d.concat(b.call(arguments)))};if(this[c]){f[c]=this[c]}g[c]=new f();return g});

	/**
	 * @typedef		ClassConfig
	 * @type		{Object}
	 *
	 * @property	{Class}		Extend			Parent class definition.
	 * @property	{Object}	Static			Class static elements and constants - to get any static element from dynamic element - use: this.self.staticElementName;.
	 * @property	{Function}	Constructor		Class constructor function - class instance start point.
	 * @property	{Object}	varDynamic		Any other custom property to define dynamic class element.
	 */

	/**
	 * @typedef		Instance
	 * @type		{Object}
	 * @access		public
	 */

	/**
	 * @typedef		Definition
	 * @type		{Function}
	 * @access		public
	 *
	 * @property	{String}	Name		Class name, for example: 'Books'<br />
	 * @property	{String}	Fullname	Class namespace and name, for example: 'App.Controllers.Books'
	 * @property	{String}	Namespace	Class namespace, for example: 'App.Controllers'.
	 */

	/**
	 * @typedef		ClassHelper
	 * @type		{Function}
	 * @access		public
	 */

	/**
	 * @summary													Declare named class or anonymous not named class as javascript Function type. Returns Class definition.
	 * @type		{ClassHelper}
	 * @access		public
	 *
	 * @param		{String|ClassConfig}	fullNameOrCfg		Class full name or class body definition. Not required. Empty object by default. Class body definition is plain object and it should containes properties: 'Extend', 'Constructor', 'Static' and anything else to define dynamic element in your class.
	 * @param		{?ClassConfig}			cfgOrNothing		Class body definition or nothing. Not required. Empty object by default. Class body definition is plain object and it should containes properties: 'Extend', 'Constructor', 'Static' and anything else to define dynamic element in your class.
	 *
	 * @return		{Definition}			Class definition.
	 */
	var $class = function () {
		/// <signature>
		///		<summary>Declare anonymous not named class as javascript Function type. Returns Class definition.</summary>
		///		<param name="cfg" type="ClassConfig">Class body definition. Not required. Empty object by default. Class body definition should containes properties: 'Extend', 'Constructor', 'Static' and anything else to define dynamic element in your class.</param>
		///		<returns type="Definition" />
		/// </signature>
		/// <signature>
		///		<summary>Declare self named class as javascript Function type. If called namespace not exists, empty objects are initialized. Returns Class definition.</summary>
		///		<param name="fullName" type="String">Full name of class to define. Required. Example: 'App.Controllers.Books' for 'Books' class name in namespace 'App.Controllers'.</param>
		///		<param name="cfg" type="ClassConfig" optional="true">Class body definition. Not required. Empty object by default. Class body definition should containes properties: 'Extend', 'Constructor', 'Static' and anything else to define dynamic element in your class.</param>
		///		<returns type="Definition" />
		/// </signature>
		var _args = $class._normalizeArgs(arguments),
			_defaultClassName = 'Class',
			_result;
		if (typeof (_args[0]) == 'string') {
			return $class._defineNamedClass(_args[0], _args.length > 1 ? _args[1] : {});
		} else {
			_result = $class._defineClass(_args[0], _defaultClassName);
			_result[$class._constants.Namespace] = '';
			_result[$class._constants.Fullname] = _defaultClassName;
			return _result;
		}
	};

	/**
	 * @summary		Class definition keywords to configure Class helper with those default syntax values to create class declarations and to behave by them.
	 * @type		{Object}
	 * @access		public
	 *
	 * @property	{String}		ClassImprint		Keyword to define how each class declaration will be signed inside.
	 * @property	{String}		InstanceImprint		Keyword to define how each class instance will be signed inside.
	 * @property	{String}		Inherited			Keyword to define how each dynamic or static function <br />will be marked it it is inherited or not.
	 * @property	{String}		Extend				Keyword to define parent class.
	 * @property	{String}		Static				Keyword to define object with static class elements.
	 * @property	{String}		Constructor			Keyword to define class constructor function
	 * @property	{String}		Name				Keyword to define class name in class elements <br />founded in 'this.self.Name' and in 'this.static.Name'.
	 * @property	{String}		Namespace			Keyword to define class namespace in class elements <br />founded in 'this.self.Namespace' <br />and in 'this.static.Namespace'.
	 * @property	{String}		Fullname			Keyword to define class fullna'ClassUidTemplate'me - namespace and name <br />separated by dot. In class elements <br />founded in 'this.self.Fullname' and in 'this.static.Fullname'.
	 * @property	{String}		static				Keyword to define class static elements. In each class <br />function those static elements are dynamicly <br />changed to corespond with original this context.
	 * @property	{String}		self				Keyword to define class self elements. In each class <br />function those self elements correspond to elements <br />originaly defined in current class.
	 * @property	{String}		parent				Keyword to define parent function caller <br />or parent function callers defined after dot.
	 */
	$class.Constants = {
		'GetClassUid'		: 'GetClassUid',
		'GetInstanceUid'	: 'GetInstanceUid',
		'Inherited'			: 'Inherited',
		'Extend'			: 'Extend',
		'Static'			: 'Static',
		'Constructor'		: 'Constructor',
		'Name'				: 'Name',
		'Namespace'			: 'Namespace',
		'Fullname'			: 'Fullname',
		'static'			: 'static',
		'self'				: 'self',
		'parent'			: 'parent'
	};

	/**
	 * @summary		Public enumerator with class creation behaviours to set into Class.SetCreationBehaviour(); for global configuration.
	 * @type		{Object}
	 * @access		public
	 *
	 * @property	{Number}	ErrorIfNotFound	Value - 0. <br />Configred as default behaviour. <br />If there will be no class to create or return, <br />new Error will be thrown.
	 * @property	{Number}	NullIfNotFound	Value - 1. <br />If there will be no class to create or return, <br />null will be returned.
	 * @property	{Number}	DoNothing		Value - 2. <br />If there will be no class to create or return, <br />script will continue as it do not know anything <br />and it risks to invoke an Error or it invokes javascript Proxy loading if any configured.
	 */
	$class.ConstructionBehaviour = {
		'ErrorIfNotFound'	: 0,
		'NullIfNotFound'	: 1,
		'DoNothing'			: 2
	};

	/**
	 * @summary		Declaration imprints template
	 * @type		{string}
	 * @access		public
	 */
	$class.ClassUidTemplate = 'class{0}';

	/**
	 * @summary		Instance imprints template
	 * @type		{string}
	 * @access		public
	 */
	$class.InstanceUidTemplate = 'instance{0}';

	/**
	 * @summary		Private store to hold class definition configured to determinate class config elements if they have any key meaning or not.
	 * @type		{object}
	 * @access		private
	 */
	$class._keywords = {};

	/**
	 * @summary		Private store to hold class definition configured keywords to create declarations and behave by them.
	 * @type		{object}
	 * @access		private
	 */
	$class._constants = {};

	/**
	 * @summary		Private counter for declaration imprints
	 * @type		{number}
	 * @access		private
	 */
	$class._classUidCounter = 0;

	/**
	 * @summary		Private counter for instance imprints
	 * @type		{number}
	 * @access		private
	 */
	$class._instanceUidCounter = 0;

	/**
	 * @summary					Global Class creation behaviour.
	 * @type		{Number}
	 * @access		private
	 * @see						ClassConstructionBehaviour type
	 */
	$class._constructionBehaviour = 0;

	/**
	 * @summary					Global Class switch to determinate if file is used <br />for intellisense whispering or for 'go to definition' purposes <br />in development IDE by emulated environment or <br />in any other executor to behave normaly.
	 * @type		{Boolean}
	 * @access		private
	 * @see						For visual Studio: C:\Program Files (x86)\Microsoft Visual Studio 14.0\JavaScript\References\domWeb.js:14050
	 */
	$class._editorIntelliSense = (function () {
		var nav = _globalScope.navigator, loc = _globalScope.location, objStr = 'object';
		if (
			typeof (nav) == objStr && !nav.onLine && nav.userAgent.indexOf('.NET') > -1 &&
			typeof (loc) == objStr && loc.href == 'about:blank' && loc.pathname == '/blank'
		) {
			// Visual Studio detected
			return true;
		}
		return false;
	})();

	/**
	 * @summary										Customize Class helper syntax to define classes <br />and customize clases behaviour. <br />Do it at application start before any class <br />is declarated and do not reconfigure anything after!!!
	 * @access		public
	 *
	 * @param		{Class.Constants=}		cfg		Plain object contains keys and values from Class.Constants Object. <br />Any value shoud be changed to customize classes syntax definition and behaviour. <br />If any key and value is not given, Class helper use it's default.
	 *
	 * @return		{ClassHelper}					Global Class helper object.
	 */
	$class.CustomizeSyntax = function (cfg) {
		var value = '';
		cfg = cfg || {};
		for (var key in cfg) {
			value = cfg[key];
			$class._keywords[value] = true;
			$class._constants[key] = value;
		};
		return $class;
	};
	$class.CustomizeSyntax($class.Constants);

	/**
	 * @summary												Sets global configuration for Class helper <br />how to behave if there is no class to create <br />or return in methods Class.Create() or Class.GetByName().
	 * @access	public
	 *
	 * @param	{Class.ConstructionBehaviour}	behaviour	Construction behaviour value. 0 by default. <br />ErrorIfNotFound (0) - to thrown an error if there will be no class found, <br />NullIfNotFound (1) - to return null if there will be no class found and <br />DoNothing (2) - to do nothing if there will be no class found and to risks any other Error or to invoke Proxy loading if any configured.
	 *
	 * @return	{ClassHelper}								Global Class helper object.
	*/
	$class.SetConstructionBehaviour = function (behaviour) {
		$class._constructionBehaviour = typeof (behaviour) == 'number' ? behaviour : 0;
		return $class;
	};

	/**
	 * @summary								Declare class as javascript Function type. <br />If called namespace does not exists, empty objects are initialized. <br />Returns new class definition.
	 * @access	public
	 *
	 * @param	{String}		fullName	Full name of class to define. Required. Example: 'App.Controllers.Books' for 'Books' class name in namespace 'App.Controllers'.
	 * @param	{ClassConfig}	cfg			Class body definition. Not required. Empty object by default. Class body definition should containes properties: 'Extend', 'Constructor', 'Static' and anything else to define dynamic element in your class.
	 *
	 * @return	{Definition}				Class definition.
	 */
	$class.Define = function (fullName, cfg) {
		return $class._defineNamedClass(fullName, cfg || {});
	};

	/**
	 * @summary							Get class definition by full name. <br />Throws Error by default if class is not found in global memory space. <br />To change this behaviour, use Class.SetConstructionBehaviour(); <br />Returns Class definition or null if there is no class definition in global memory space.
	 * @access	public
	 *
	 * @param	{String}	fullName	Full name of class definition to get. Required. Example: 'App.Controllers.Books' for 'Books' class name in namespace 'App.Controllers'.
	 * 
	 * @throws	{Error}					If global switch configured by Class.SetConstructionBehaviour() is set to 0 (ErrorIfNotFound) or to 2 (DoNothing), Error should be thrown if class is not found in global memory space.
	 *
	 * @return	{Definition|Null}		Class definition or null if global switch configured by Class.SetConstructionBehaviour() is set to 1 (NullIfNotFound), Null should be returned if class is not found in global memory space.
	*/
	$class.GetByName = function (fullName) {
		var _explodedName = fullName.split('.'),
			_namePart = '',
			_currentScope = _globalScope;
		for (var i = 0, l = _explodedName.length; i < l; i += 1) {
			_namePart = _explodedName[i];
			if (!(_namePart in _currentScope)) {
				if ($class._constructionBehaviour === 0) {
					throw new Error("Class '" + fullName + "' doesn't exist!");
				} else if ($class._constructionBehaviour === 1) {
					_currentScope = null;
					break;
				}
			}
			_currentScope = _currentScope[_namePart]; // invoke Proxy autoloading if any configured
		}
		return _currentScope;
	};

	/**
	 * @summary										Create class instance as javascript Function type. <br />Throws Error by default if class is not found in global memory space. <br />To change this behaviour, use Class.SetConstructionBehaviour(); <br />Returns Class instance or null if there is no class definition in global memory space.
	 * @access		public
	 *
	 * @param		{String}		fullName		Full name of class to define. Required. Example: 'App.Controllers.Books' for 'Books' class name in namespace 'App.Controllers'.
	 * @param		{...Object=}	constructorArgs	Class constructor function arguments. Repeating parameter. Optional.
	 *
	 * @throws		{Error}							If global switch configured by Class.SetConstructionBehaviour() is set to 0 (ErrorIfNotFound) or to 2 (DoNothing), Error should be thrown if class is not found in global memory space.
	 *
	 * @return		{Instance|Null}					Class instance or null if global switch configured by Class.SetConstructionBehaviour() is set to 1 (NullIfNotFound), Null should be returned if class is not found in global memory space.
	 */
	$class.Create = function (fullName) {
		/// <signature>
		///		<summary>Create class instance as javascript Function type. <br />Throws Error by default if class is not found in global memory space. <br />To change this behaviour, use Class.SetConstructionBehaviour(); <br />Returns Class instance or null if there is no class definition in global memory space.</summary>
		///		<param name="String" type="fullName">Full name of class to define. Required. Example: 'App.Controllers.Books' for 'Books' class name in namespace 'App.Controllers'.</param>
		///		<param name="...Object" type="constructorArgs" parameterArray="true" optional="true" >Class constructor function arguments. Repeating parameter. Optional.</param>
		///		<returns type="Instance|Null" />
		/// </signature>
		var classDefinition = $class.GetByName(fullName);
		var args = $class._normalizeArgs(arguments);
		if ($class._constructionBehaviour === 1 && !classDefinition) return classDefinition;
		args.shift(); // remove fullName
		args.unshift(classDefinition); // add classDefinition
		return new (classDefinition.bind.apply(classDefinition, args))();
	};

	/**
	 * @summary								Declare class as javascript Function type. <br />If called namespace does not exists, empty objects are initialized. <br />Returns new class definition.
	 * @access	private
	 *
	 * @param	{String}		fullName	Full name of class to define. Required. Example: 'App.Controllers.Books' for 'Books' class name in namespace 'App.Controllers'.
	 * @param	{ClassConfig}	cfg			Class body definition. Not required. Empty object by default. Class body definition should containes properties: 'Extend', 'Constructor', 'Static' and anything else to define dynamic element in your class.
	 *
	 * @return	{Definition}				Class definition.
	 */
	$class._defineNamedClass = function (fullName, cfg) {
		var _explodedName = fullName.split('.'),
			_name = _explodedName.pop(),
			_namePart = '',
			_currentScope = _globalScope,
			_result;
		for (var i = 0, l = _explodedName.length; i < l; i += 1) {
			_namePart = _explodedName[i];
			if (!(_namePart in _currentScope)) {
				_currentScope[_namePart] = {};
			}
			_currentScope = _currentScope[_namePart] || {};
		}
		if (cfg.toString === {}.toString) {
			cfg.toString = function () {
				return '[object ' + fullName + ']';
			}
		}
		_result = $class._defineClass(cfg, _name);
		_result[$class._constants.Namespace] = _explodedName.join('.');
		_result[$class._constants.Fullname] = fullName;
		_currentScope[_name] = _result;
		return _result;
	};

	/**
	 * @summary								Declare class as javascript Function type by plain object config. <br />Return a new class definition.
	 * @access	private
	 *
	 * @param	{ClassConfig}	cfg			Class body definition. Required.
	 * @param	{String}		_name		Name of class to define. Required.
	 *
	 * @return	{Definition}				Class definition.
	 */
	$class._defineClass = function (cfg, _name) {
		var _extend = $class._constants.Extend,
			_nameStr = $class._constants.Name,
			_classImprint = $class._constants.GetClassUid,
			_constructorStr = $class._constants.Constructor,
			_self = $class._constants.self,
			_static = $class._constants.static,
			_prototypeStr = 'prototype',
			_currentClassImprint = '',
			_parentClassImprint = '';
		/**
		 * @summary		Class itself and class static elements.<br /><br />Do not use it by 'this.constructor' with small 'c' at begin.<br />Use 'this.self' or 'this.static'.<br /><br />Objects 'this.self' and this.static' in dynamic elements <br />represents class itself (class definition) and all static elements<br />defined in 'Static' class config section.<br /><br />In parent classes calls, 'self' definition is dynamicly changed <br />for each class as original class definition, 'static' represents <br /> all time class definition from original instance context. <br /><br />For code reflection there are 3 predefined system Strings:<br />- Name - class name, for example: 'Books'<br />- Fullname - class namespace and name, for example: 'App.Controllers.Books'<br />- Namespace - class namespace, for example: 'App.Controllers'.
		 * 
		 * @access		protected
		 * @type		{Definition}
		 */
		var Class = $class._editorIntelliSense
			? (cfg[_constructorStr] ? cfg[_constructorStr] : cfg)
			: function () {
				return $class._constructor(cfg, this, $class._normalizeArgs(arguments));
			};
		var _classDefinition = Class;
		// imprints for parent calls
		if (cfg[_extend]) {
			if (typeof (cfg[_extend][_classImprint]) == 'function') {
				_parentClassImprint = cfg[_extend][_classImprint]();
			} else {
				_parentClassImprint = $class._completeClassUid();
				/**
				 * @summary		System function to get class definition sign.
				 * @access		private
				 * @return		{String}
				 */
				cfg[_extend][_classImprint] = function () {
					return _parentClassImprint;
				};
			}
		}
		_currentClassImprint = $class._completeClassUid();
		/**
		 * @summary		System function to get class definition sign.
		 * @access		private
		 * @return		{String}
		 */
		_classDefinition[_classImprint] = function () {
			return _currentClassImprint;
		};
		// extend parent and current dynamic and static elements (including constructor)
		$class._extendParentPrototype(_classDefinition, cfg, _parentClassImprint);
		$class._extendParentStatic(_classDefinition, cfg, _parentClassImprint);
		$class._declareCurrentPrototype(_classDefinition, cfg);
		$class._declareCurrentStatic(_classDefinition, cfg);
		// store current Class object in local property for later use
		_classDefinition[_self] = _classDefinition;
		_classDefinition[_static] = _classDefinition;
		// to find parent definition by imprint traversing - parent calls - store parent class definition in static place
		if (cfg[_extend]) {
			_classDefinition[_self][_extend] = cfg[_extend];
			_classDefinition[_static][_extend] = cfg[_extend];
		}
		// to get anytime inside instance class definition without naming it:
		_classDefinition[_prototypeStr][_self] = _classDefinition;
		_classDefinition[_prototypeStr][_static] = _classDefinition;
		// define parent calls helper in static methods
		$class._declareParentStaticCalls(_classDefinition);
		// return function with prototype - ready to use like: var instance = new ClassName();
		_classDefinition[_nameStr] = _name;
		return _classDefinition;
	};

	/**
	 * @summary								Second function called after class instance is created. <br /><br />Determinates if context is from instance, if not, only counstructor function is called as it is.<br /><br />If context is from instance, new unique id for instance is created, <br />parent proxy mmethods are created and constructor is called.
	 * @access	private
	 *
	 * @param	{ClassConfig}	_cfg		Class body definition. Required.
	 * @param	{Instance}		_context	Current instance context. Required.
	 * @param	{Array}			_args		Current instance constructor arguments. Required.
	 *
	 * @return	{Instance|*}				Current cnstance context.
	 */
	$class._constructor = function (_cfg, _context, _args) {
		var _constructorStr = $class._constants.Constructor,
			_instanceImprint = '';
		if (_context === _globalScope) {
			// constuctor function has been called withoud 'new' keyword before - so user just want to call constructor as it is.
			return $class._callConstructorNonInstance(_cfg, _context, _args, _constructorStr);
		} else {
			// fingerprint for dynamic parent calls
			_instanceImprint = $class._completeInstanceUid();
			/**
			 * @summary		System function to get class instance sign.
			 * @access		private
			 * @return		{String}
			 */
			_context[$class._constants.GetInstanceUid] = function () {
				return _instanceImprint;
			};
			// define parent calls helper in dynamic methods in later binding here after instance is created - to work with 'this' context properly
			$class._declareParentDynamicCalls(_context);
			// call defined constructor
			if (typeof(_context[_constructorStr]) == 'function') {
				return _context[_constructorStr].apply(_context, _args);
			} else {
				return _context;
			}
		}
	};

	/**
	 * @summary									Third function called after class instance is created. <br /><br />If context is not from instance, counstructor function is called as it is.
	 * @access	private
	 *
	 * @param	{ClassConfig}	_cfg			Class body definition. Required.
	 * @param	{Instance}		_context		Current instance context. Required.
	 * @param	{Array}			_args			Current instance constructor arguments. Required.
	 * @param	{String}		_constructorStr	Constructor constant string. Required.
	 * 
	 * @throws	{Error}							If there is no function defined in class body - means there is no constructor function - error is thrown.
	 *
	 * @return	{*}
	 */
	$class._callConstructorNonInstance = function (_cfg, _context, _args, _constructorStr) {
		if (typeof (_cfg[_constructorStr]) == 'function') {
			return _cfg[_constructorStr].apply(_context, _args);
		} else {
			throw new Error("Class definition is not possible to call as function, it's necessary to create instance with 'new' keyword before class definition.");
		}
	};

	/**
	 * @summary				Completes new class unique id, increments $class._classUidCounter.
	 * @access	private
	 * @return	{String}	
	 */
	$class._completeClassUid = function () {
		var _result = $class.ClassUidTemplate.replace('{0}', $class._classUidCounter);
		$class._classUidCounter += 1;
		return _result;
	};

	/**
	 * @summary				Completes new instance unique id, increments $class._instanceUidCounter.
	 * @access	private
	 * @return	{String}	
	 */
	$class._completeInstanceUid = function () {
		var _result = $class.InstanceUidTemplate.replace('{0}', $class._instanceUidCounter);
		$class._instanceUidCounter += 1;
		return _result;
	};

	/**
	 * @summary					Make new class definition as extension from parent class definition, prepared for instanceof javascript operator.
	 * @access	private
	 * @see		http://javascript.crockford.com/prototypal.html
	 *
	 * @param	{Definition}	_classDefinition	New class definition
	 * @param	{ClassConfig}	_cfg				Class body config
	 * @param	{String}		_parentClassImprint	Parent class imprint
	 */
	$class._extendParentPrototype = function (_classDefinition, cfg, _parentClassImprint) {
		var Prototype = function () { },
			_prototype = 'prototype',
			_cfgExtend = cfg[$class._constants.Extend],
			_cfgExtendProto;
		if (_cfgExtend) {
			_cfgExtendProto = _cfgExtend[_prototype];
			/*if (Object.create) {
				classDefinition[_prototype] = Object.create(_cfgExtendProto);
			} else {*/
				if (_cfgExtend) Prototype[_prototype] = _cfgExtendProto;
				_classDefinition[_prototype] = new Prototype();
			//}
			$class._extendParentProtoSetUpNonDeclaredProxyCalls(
				_classDefinition[_prototype], _cfgExtendProto, cfg, _parentClassImprint, 0
			);
		}
		$class._extendParentProtoSetUpFunctions(_classDefinition[_prototype], _cfgExtendProto);
	};

	/**
	 * @summary					Extend current class definition with static elements from parent class definition by for each cycle.
	 * @access	private
	 *
	 * @param	{Definition}	classDefinition		New class definition
	 * @param	{ClassConfig}	cfg					Class body config
	 * @param	{String}		parentClassImprint	Parent class imprint
	 */
	$class._extendParentStatic = function (classDefinition, cfg, _parentClassImprint) {
		var _staticName = '',
			_nameStr = $class._constants.Name,
			_cfgExtend = cfg[$class._constants.Extend],
			_fnStr = 'function';
		if (_cfgExtend) {
			for (_staticName in _cfgExtend) {
				if (
					!($class._keywords[_staticName] === true) && // do not extend class keyword elements
					_staticName.substr(0, 1) != '_' // do not extend private elements
				) {
					classDefinition[_staticName] = _cfgExtend[_staticName];
					if (typeof (_cfgExtend[_staticName]) == _fnStr) {
						if (!$class._editorIntelliSense) classDefinition[_staticName] = $class._parentCallProvider(_staticName, 1);
						classDefinition[_staticName][_nameStr] = _staticName;
					}
				}
			}
			$class._extendParentProtoSetUpNonDeclaredProxyCalls(
				classDefinition, _cfgExtend, cfg[$class._constants.Static] || {}, _parentClassImprint, 1
			);
		}
	};

	/**
	 * @summary		Magic - do not read and touch.
	 */
	$class._extendParentProtoSetUpNonDeclaredProxyCalls = function (_classDefinitionProto, _cfgExtendProto, cfg, _parentClassImprint, _staticCalls) {
		if ($class._editorIntelliSense) return;
		var _parentStr = $class._constants.parent;
		for (var _dynamicName in _cfgExtendProto) {
			// if there is any dynamic function in parent class declared but not declared in current class definition config:
			if (
				!($class._keywords[_dynamicName] === true) && // if dynamic element name is not class keyword
				typeof (_cfgExtendProto[_dynamicName]) == 'function' && // if dynamic element in parent class definition is a function
				!(_dynamicName in cfg)// if dynamic name is not declared in current class definition config
			) {
				_classDefinitionProto[_dynamicName] = $class._parentCallProvider(_dynamicName, _staticCalls)
			}
		}
	};

	/**
	 * @summary								Define  and define system 'Name' property on each dynamic function if necessary.
	 * @access	private
	 * @param	{Object}	_currentProto	New class definition prototype
	 * @param	{Object}	_cfgExtendProto	Possible parent class prototype definition
	 */
	$class._extendParentProtoSetUpFunctions = function (_currentProto, _cfgExtendProto) {
		var _nameStr = $class._constants.Name,
			_parentStr = $class._constants.parent,
			_fnStr = 'function';
		for (var _dynamicName in _currentProto) {
			if (
				!($class._keywords[_dynamicName] === true) &&
				typeof (_currentProto[_dynamicName]) == _fnStr
			) {
				if (_cfgExtendProto && _cfgExtendProto[_dynamicName] && !$class._editorIntelliSense) {
					_currentProto[_dynamicName] = $class._parentCallProvider(_dynamicName, 0);
				}
				if (typeof (_currentProto[_dynamicName][_nameStr]) != 'string') {
					_currentProto[_dynamicName][_nameStr] = _dynamicName;
				}
			}
		}
	};

	/**
	 * @summary									Return proper parent function call
	 * @access		private
	 * @param		{string}	_fnName			Parent function name.
	 * @param		{int}		_staticCalls	1 if parent function call hasto be static, 0 otherwise.
	 * @return		{Object}					Parent function call result.
	 */
	$class._parentCallProvider = function (_fnName, _staticCalls) {
		var _parentStr = $class._constants.parent,
			_staticStr = $class._constants.static;
		return function () {
			return this[_parentStr][_fnName].apply(
				_staticCalls ? this[_staticStr] : this,
				$class._normalizeArgs(arguments)
			)
		}
	};

	/**
	 * @summary											Defines dynamic class elements defined by class config
	 * @access		private
	 *
	 * @param		{Definition}	classDefinition		Class definition context
	 * @param		{ClassConfig}	cfg					Class config
	 */
	$class._declareCurrentPrototype = function (classDefinition, cfg) {
		var _classPrototype = classDefinition.prototype,
			_nameStr = $class._constants.Name,
			_constructor = $class._constants.Constructor,
			_cfgExtend = cfg[$class._constants.Extend],
			_parentPrototype = _cfgExtend ? _cfgExtend.prototype : {},
			_fnStr = 'function',
			_dynamicName = '';
		for (_dynamicName in cfg) {
			if (!($class._keywords[_dynamicName] === true)) {
				_classPrototype[_dynamicName] = cfg[_dynamicName];
				if (typeof (cfg[_dynamicName]) == _fnStr) {
					_classPrototype[_dynamicName][_nameStr] = _dynamicName;
				}
			}
		}
		if (cfg[_constructor]) {
			_classPrototype[_constructor] = cfg[_constructor];
			_classPrototype[_constructor][_nameStr] = _constructor;
		}
		_classPrototype[$class._constants.GetInstanceUid] = function () { return '' };
	};

	/**
	 * @summary											Defines static class elements defined by class config
	 * @access		private
	 *
	 * @param		{Definition}	classDefinition		Class definition context
	 * @param		{ClassConfig}	cfg					Class config
	 */
	$class._declareCurrentStatic = function (classDefinition, cfg) {
		var _staticName = '',
			_fnStr = 'function',
			_nameStr = $class._constants.Name,
			_cfgStatic = cfg[$class._constants.Static];
		if (_cfgStatic) {
			for (_staticName in _cfgStatic) {
				if (!($class._keywords[_staticName] === true)) {
					classDefinition[_staticName] = _cfgStatic[_staticName];
					if (typeof (_cfgStatic[_staticName]) == _fnStr)
						classDefinition[_staticName][_nameStr] = _staticName;
				}
			}
		}
	};

	/**
	 * @summary								Defines instance parent calls base provider and instance elements providers
	 * @access		private
	 *
	 * @param		{Instance}	_context	Class instance context
	 */
	$class._declareParentDynamicCalls = function (_context) {
		var _nameStr = $class._constants.Name,
			_parent = $class._constants.parent,
			_staticStr = $class._constants.static,
			_prototypeStr = 'prototype',
			_constructorNameStr = $class._constants.Constructor,
			_dynamicName = '',
			_currentDefinition = _context[_staticStr],
			_parentDefinition = _currentDefinition[_staticStr][$class._constants.Extend],
			_instanceImprintValue = '',
			_fnStr = 'function',
			_parentClassDefinition,
			_parentDefinitionPrototype,
			_clsProtoParent;
		if ($class._editorIntelliSense) {
			//_constructorNameStr = arguments.callee.caller[_nameStr];
			_instanceImprintValue = _context[$class._constants.GetInstanceUid]();
			_parentClassDefinition = $class._getIntellisenseParentDefinition(_context, _constructorNameStr, 0);
			/**
			 * @summary		Parent function with the same name caller. <br />You can use this function as object  and by dot operator <br />call any other function from parent class by it's name <br />like: this.parent.anything(arguments);
			 * @type		{Function}
			 */
			_currentDefinition[_prototypeStr][_parent] = _parentClassDefinition[_prototypeStr][_constructorNameStr];
		} else {
			/**
			 * @summary		Parent function with the same name caller. <br />You can use this function as object  and by dot operator <br />call any other function from parent class by it's name <br />like: this.parent.anything(arguments);
			 * @type		{Function}
			 */
			_currentDefinition[_prototypeStr][_parent] = function () {
				return $class._parentCall(
					this, arguments.callee.caller[_nameStr], $class._normalizeArgs(arguments), 0
				);
			};
		}
		_clsProtoParent = _currentDefinition[_prototypeStr][_parent];
		if (_parentDefinition) {
			_parentDefinitionPrototype = _parentDefinition[_prototypeStr];
			for (_dynamicName in _parentDefinitionPrototype) {
				if (typeof (_parentDefinitionPrototype[_dynamicName]) == _fnStr && !($class._keywords[_dynamicName] === true)) {
					_clsProtoParent[_dynamicName] = $class._declareParentDynamicCallsProvider(_context, _dynamicName);
				}
			}
		}
	};

	/**
	 * @summary									Defines instance parent calls instance elements providers
	 * @access		private
	 *
	 * @param		{Instance}	_context		Class instance context
	 * @param		{String}	_dynamicName	Class dynamic function name
	 *
	 * @return		{Function}
	 */
	$class._declareParentDynamicCallsProvider = function (_context, _dynamicName) {
		if ($class._editorIntelliSense) {
			var _instanceImprintValue = _context[$class._constants.GetInstanceUid](),
				_parentClassDefinition = $class._getIntellisenseParentDefinition(_context, _dynamicName, 0);
			/**
			 * @summary		Parent function with the same name caller. <br />You can use this function as object  and by dot operator <br />call any other function from parent class by it's name <br />like: this.parent.anything(arguments);
			 * @type		{Function}
			 */
			return _parentClassDefinition.prototype[_dynamicName];
		} else {
			/**
			 * @summary		Parent function with the same name caller. <br />You can use this function as object and by dot operator <br />call any other function from parent class by it's name <br />like: this.parent.anything(arguments);
			 * @type		{Function}
			 */
			return function () {
				return $class._parentCall(_context, _dynamicName, $class._normalizeArgs(arguments), 0);
			}
		}
	};

	/**
	 * @summary												Defines static parent calls base provider and static elements providers
	 * @access		private
	 *
	 * @param		{Definition}	_currentDefinition		Class definition
	 */
	$class._declareParentStaticCalls = function (_currentDefinition) {
		var _nameStr = $class._constants.Name,
			_parent = $class._constants.parent,
			_staticName = '',
			_fnStr = 'function',
			_parentDefinition = _currentDefinition[$class._constants.Extend],
			_clsParent;
		_currentDefinition[_parent] = function () {
			return $class._parentCall(this, arguments.callee.caller[_nameStr], $class._normalizeArgs(arguments), 1);
		};
		_clsParent = _currentDefinition[_parent];
		if (_parentDefinition) {
			for (_staticName in _parentDefinition) {
				if (typeof (_parentDefinition[_staticName]) == _fnStr && !Boolean($class._keywords[_staticName])) {
					_clsParent[_staticName] = $class._declareParentStaticCallsProvider(_currentDefinition, _staticName);
				}
			}
		}
	};

	/**
	 * @summary										Defines static parent calls elements providers
	 * @access		private
	 *
	 * @param		{Definition}	_context		Class definition
	 * @param		{String}		_staticName		Class static function name
	 *
	 * @return		{Function}
	 */
	$class._declareParentStaticCallsProvider = function (_context, _staticName) {
		if ($class._editorIntelliSense) {
			var _instanceImprintValue = _context[$class._constants.GetClassUid](),
				_parentClassDefinition = $class._getIntellisenseParentDefinition(_context, _staticName, 1);
			return _parentClassDefinition[_staticName];
		} else {
			return function () {
				return $class._parentCall(_context, _staticName, $class._normalizeArgs(arguments), 1);
			}
		}
	};

	/**
	 * @summary												Parent function call processor for dynamic and static parent calls.
	 * @access		private
	 *
	 * @param		{Instance|Definition}	_context		Class instance context or class definition context
	 * @param		{String}				_staticName		Class static function name
	 * @param		{Array}					_args			Parent function arguments
	 * @param		{Number}				_imprintsIndex	Index for imprints to serach parent class, 0 for instance calls, 1 for static calls
	 *
	 * @throws		{Error}									If there is no parent method, Error is thrown.
	 *
	 * @return		{*}
	 */
	$class._parentCall = function (_context, _methodName, _args, _imprintsIndex) {
		var _result,
			_fullname = $class._constants.Fullname,
			_selfStr = $class._constants.self,
			_staticStr = $class._constants.static,
			_currentLevelClassDefinition = _context[_staticStr],
			_parentClassDefinition = _currentLevelClassDefinition[$class._constants.Extend],
			_parentMethod;
		if (!_parentClassDefinition) {
			throw "No parent class defined for type: '" + _currentLevelClassDefinition[_fullname] + "'.";
		};
		_parentMethod = _imprintsIndex ? _parentClassDefinition[_methodName] : _parentClassDefinition.prototype[_methodName];
		if (!(_parentMethod instanceof Function)) {
			throw "No parent method named: '" + _methodName + "' for type: '" + _currentLevelClassDefinition[_fullname] + "'.";
		};
		_context[_selfStr] = _parentClassDefinition; // set up parent class definition into this.self
		_result = _parentMethod.apply(_imprintsIndex ? _context[$class._constants[_staticStr]] : _context, _args);
		_context[_selfStr] = _currentLevelClassDefinition;
		return _result;
	};

	/**
	 * @summary												Returns parent function for intellisense virtual editor in IDE
	 * @access		private
	 *
	 * @param		{Instance|Definition}	_context		Class instance context or class definition context
	 * @param		{String}				_methodName		Class instance or static function name
	 * @param		{Number}				_imprintsIndex	Index for imprints to serach parent class, 0 for instance calls, 1 for static calls
	 *
	 * @throws		{Error}									If there is no parent method, Error is thrown.
	 */
	$class._getIntellisenseParentDefinition = function (_context, _methodName, _imprintsIndex) {
		var _currentLevelClassDefinition = _context[$class._constants.self],
			_parentClassDefinition = _currentLevelClassDefinition[$class._constants.Extend];
		if (!_parentClassDefinition) {
			throw "No parent class defined for type: '" + _currentLevelClassDefinition[$class._constants.Fullname] + "'.";
		};
		return _parentClassDefinition;
	};

	/**
	 * @summary					Converts Arguments array into standard javascript array. If Arguments contains only one item and this one item is Arguments array, it converts into result this first item into standard javascript array.
	 * @param	{Arguments}	obj	Full name of class to define. Required. Example: 'App.Controllers.Books' for 'Books' class name in namespace 'App.Controllers'.
	 * @return	{Array}			Standard javascript array with previous function arguments.
	 */
	$class._normalizeArgs = function (obj) {
		if (obj.length === 1 && $class._isArgs(obj[0])) {
			return [].slice.apply(obj[0]);
		} else {
			return [].slice.apply(obj);
		}
	};

	/**
	 * @summary							Checks if sended object is javascript Arguments typed array or not.
	 * @param	{Arguments|Object}	obj	Object to check.
	 * @return	{Boolean}					
	 */
	$class._isArgs = function (obj) {
		// be carefull for WSH - there is no Arguments typed array, there is only Object with callee... but not a string, just object returned by typeof()
		return typeof(obj) == 'object' && typeof(obj.callee) != 'undefined' && Object.prototype.toString.apply(obj) != '[object Array]'
	};

	// set ClassHelper object into parent environment under 'Class' key
	_globalScope.Class = $class;

	// return ClassHelper object into parent environment
	return $class;

	/**
	 * Define parent environment:
	 * If module.exports object exists (Node.js):
	 * - define Class helper into it
	 * If not:
	 * - define Class helper into this
	 *	- which should be window object in browsers
	 *	- global space in Adobe Extendscript Toolkit or Windows Script Host global environment.
	 */
})(Boolean(typeof (module) !== 'undefined' && module.exports) ? global : this);
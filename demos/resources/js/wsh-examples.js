var console = console || {};
console.stack = [];
console.log = function () {
	var args = [].slice.apply(arguments),
		type = '', 
		obj;
	for (var i = 0, l = args.length; i < l; i += 1) {
		obj = args[i];
		type = Object.prototype.toString.apply(obj);
		console.stack.push(obj + ' [' + type.substr(8, type.length - 1));
	}
};
console.echo = function(){
	WScript.echo(console.stack.join("\r\n"));
};

var JSON = {
	parse: function (sJSON) { return eval('(' + sJSON + ')'); },
	stringify: (function () {
		var toString = Object.prototype.toString;
		var isArray = Array.isArray || function (a) { return toString.call(a) === '[object Array]'; };
		var escMap = { '"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t' };
		var escFunc = function (m) { return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1); };
		var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
		return function stringify(value) {
			if (value == null) {
				return 'null';
			} else if (typeof value === 'number') {
				return isFinite(value) ? value.toString() : 'null';
			} else if (typeof value === 'boolean') {
				return value.toString();
			} else if (typeof value === 'object') {
				if (typeof value.toJSON === 'function') {
					return stringify(value.toJSON());
				} else if (isArray(value)) {
					var res = '[';
					for (var i = 0; i < value.length; i++)
						res += (i ? ', ' : '') + stringify(value[i]);
					return res + ']';
				} else if (toString.call(value) === '[object Object]') {
					var tmp = [];
					for (var k in value) {
						if (value.hasOwnProperty(k))
							tmp.push(stringify(k) + ': ' + stringify(value[k]));
					}
					return '{' + tmp.join(', ') + '}';
				}
			}
			return '"' + value.toString().replace(escRE, escFunc) + '"';
		};
	})()
};

if (!('format' in String) && !('format' in String.prototype)) {
	String.format = function () {
		var args = [].slice.apply(arguments),
			tmpl = args.shift(),
			regExp;
		for (var i = 0, l = args.length; i < l; i += 1) {
			regExp = new RegExp('\\{' + i + '\\}', 'g');
			tmpl = tmpl.replace(regExp, args[i]);
		}
		return tmpl;
	}
	String.prototype.format = function () {
		var args = [].slice.apply(arguments);
		args.unshift(this);
		return String.format.apply(String, args);
	}
}
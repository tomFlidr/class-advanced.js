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
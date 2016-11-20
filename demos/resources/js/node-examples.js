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
var examplesOnLoadHandler = function () {
	if (location.origin == 'file://') {
		code.innerHTML = 'Please place this example on web server <br />and run page over http:// protocol <br />to load source Javascrit code here.';
		code.style.background = 'orange';
		return;
	}
	var oldIe = document.all;
	var createAndAppendElement = function (name, attrs) {
		var elm = document.createElement(name);
		for (var key in attrs) {
			elm.setAttribute(key, attrs[key]);
		}
		if (oldIe) {
			document.body.insertAdjacentElement('beforeEnd', elm);
		} else {
			document.body.appendChild(elm);
		}
	};
	var xhr;
	if ('XMLHttpRequest' in window) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Msxml2.XMLHTTP.6.0');
	}
	xhr.open('get', './example.js', true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			var codeStr = xhr.responseText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			if (oldIe) {
				code.innerHTML = codeStr.replace(/\t/g, "&nbsp;&nbsp;&nbsp;").replace(/\n/g, "<br />");
				result.style.height = (result.parentNode.parentNode.offsetHeight - 60) + 'px';
			} else {
				code.innerHTML = codeStr;
				createAndAppendElement('script', {
					src: '../../resources/js/prism-js-code-highlighter.js?_=' + (+new Date),
					type: 'text/javascript'
				});
				createAndAppendElement('link', {
					href: '../../resources/css/prism-js-code-highlighter.css?_=' + (+new Date),
					rel: 'stylesheet'
				});
				result.parentNode.style.height = result.parentNode.parentNode.offsetHeight + 'px';
			}
		}
	};
	xhr.send();
};

var console = console || {};
console.log = function () {
	var args = [].slice.apply(arguments),
		newItems = [],
		type = '',
		printType = result.nodeName.toLowerCase() == 'div',
		obj;
	for (var i = 0, l = args.length; i < l; i += 1) {
		obj = args[i];
		type = Object.prototype.toString.apply(obj);
		if (printType) obj += ' [' + type.substr(8, type.length - 1);
		newItems.push(obj);
	}
	result.innerHTML += '<div>' + newItems.join('</div><div>') + '</div>';
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
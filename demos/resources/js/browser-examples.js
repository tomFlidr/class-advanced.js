var examplesOnLoadHandler = function () {
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
					src: '../../resources/js/prism-js-code-highlighter.js',
					type: 'text/javascript'
				});
				createAndAppendElement('link', {
					href: '../../resources/css/prism-js-code-highlighter.css',
					rel: 'stylesheet'
				});
				columns.style.height = columns.offsetHeight + 'px';
				result.parentNode.style.height = '100%';
			}
		}
	};
	xhr.send();
}
var console = console || {};
console.log = function () {
	var args = [].slice.apply(arguments),
		newItems = [],
		type = '', 
		obj;
	if (result.innerHTML.length > 0) result.innerHTML += '<br />';
	for (var i = 0, l = args.length; i < l; i += 1) {
		obj = args[i];
		type = Object.prototype.toString.apply(obj);
		newItems.push(obj + ' [' + type.substr(8, type.length - 1))
	}
	result.innerHTML += newItems.join('<br />');
};
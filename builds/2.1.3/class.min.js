/**
 * @summary Javascript Class Helper
 * @author Tom Flidr <tomflidr@gmail.com>
 * @version 2.1.3
 * @date 2017-08-13
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
var Class=function(h){function a(){var b=a.b(arguments);if("string"==typeof b[0])return a.u(b[0],1<b.length?b[1]:{});b=a.s(b[0],"Class");b[a.a.Namespace]="";b[a.a.Fullname]="Class";return b}if("undefined"!=typeof h.Class)return h.Class;Function.prototype.bind||(Function.prototype.bind=function(a){function d(){return g.apply(this instanceof c?this:a,f.concat(e.call(arguments)))}function c(){}if("function"!==typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
var e=[].slice,f=e.call(arguments,1),g=this;this.prototype&&(c.prototype=this.prototype);d.prototype=new c;return d});a.Constants={GetClassUid:"GetClassUid",GetInstanceUid:"GetInstanceUid",Inherited:"Inherited",Extend:"Extend",Static:"Static",Constructor:"Constructor",Name:"Name",Namespace:"Namespace",Fullname:"Fullname","static":"static",self:"self",parent:"parent"};a.ConstructionBehaviour={ErrorIfNotFound:0,NullIfNotFound:1,DoNothing:2};a.ClassUidTemplate="class{0}";a.InstanceUidTemplate="instance{0}";
a.c={};a.a={};a.i=0;a.l=0;a.g=0;a.f=function(){var a=h.navigator,d=h.location;return"object"==typeof a&&!a.onLine&&-1<a.userAgent.indexOf(".NET")&&"object"==typeof d&&"about:blank"==d.href&&"/blank"==d.pathname?!0:!1}();a.CustomizeSyntax=function(b){var d;b=b||{};for(var c in b)d=b[c],a.c[d]=!0,a.a[c]=d;return a};a.CustomizeSyntax(a.Constants);a.SetConstructionBehaviour=function(b){a.g="number"==typeof b?b:0;return a};a.Define=function(b,d){return a.u(b,d||{})};a.GetByName=function(b){for(var d=b.split("."),
c,e=h,f=0,g=d.length;f<g;f+=1){c=d[f];if(!(c in e)){if(0===a.g)throw Error("Class '"+b+"' doesn't exist!");if(1===a.g){e=null;break}}e=e[c]}return e};a.Create=function(b,d){var c=a.GetByName(b),e;if(!c&&1===a.g)return c;"[object Array]"!={}.toString.apply(d)||2<arguments.length?(e=a.b(arguments),e.shift()):e=a.b(d||[]);e.unshift(c);return new (c.bind.apply(c,e))};a.u=function(b,d){for(var c=b.split("."),e=c.pop(),f="",g=h,k=0,l=c.length;k<l;k+=1)f=c[k],f in g||(g[f]={}),g=g[f]||{};d.toString==={}.toString&&
(d.toString=function(){return"[object "+b+"]"});f=a.s(d,e);f[a.a.Namespace]=c.join(".");f[a.a.Fullname]=b;return g[e]=f};a.s=function(b,d){var c=a.a.Extend,e=a.a.Name,f=a.a.GetClassUid,g=a.a.Constructor,k=a.a.self,l=a.a["static"],h="",m="",g=a.f?b[g]?b[g]:b:function(){return a.B(b,this,a.b(arguments))};b[c]&&("function"==typeof b[c][f]?m=b[c][f]():(m=a.o(),b[c][f]=function(){return m}));h=a.o();g[f]=function(){return h};a.K(g,b,m);a.L(g,b,m);a.C(g,b);a.D(g,b);g[k]=g;g[l]=g;b[c]&&(g[k][c]=b[c],g[l][c]=
b[c]);g.prototype[k]=g;g.prototype[l]=g;a.H(g);g[e]=d;return g};a.B=function(b,d,c){var e=a.a.Constructor,f="";if(d===h)return a.w(b,d,c,e);f=a.A();d[a.a.GetInstanceUid]=function(){return f};a.F(d);return"function"==typeof d[e]?d[e].apply(d,c):d};a.w=function(a,d,c,e){if("function"==typeof a[e])return a[e].apply(d,c);throw Error("Class definition is not possible to call as function, it's necessary to create instance with 'new' keyword before class definition.");};a.o=function(){var b=a.ClassUidTemplate.replace("{0}",
a.i);a.i+=1;return b};a.A=function(){var b=a.InstanceUidTemplate.replace("{0}",a.l);a.l+=1;return b};a.K=function(b,d){function c(){}var e=d[a.a.Extend],f;e&&(f=e.prototype,e&&(c.prototype=f),b.prototype=new c,a.v(b.prototype,f,d,0));a.J(b.prototype,f)};a.L=function(b,d){var c="",e=a.a.Name,f=d[a.a.Extend];if(f){for(c in f)!0!==a.c[c]&&"_"!=c.substr(0,1)&&(b[c]=f[c],"function"==typeof f[c]&&(a.f||(b[c]=a.m(c,1)),b[c][e]=c));a.v(b,f,d[a.a.Static]||{},1)}};a.v=function(b,d,c,e){if(!a.f)for(var f in d)!0===
a.c[f]||"function"!=typeof d[f]||f in c||(b[f]=a.m(f,e))};a.J=function(b,d){var c=a.a.Name,e;for(e in b)!0!==a.c[e]&&"function"==typeof b[e]&&(d&&d[e]&&!a.f&&(b[e]=a.m(e,0)),"string"!=typeof b[e][c]&&(b[e][c]=e))};a.m=function(b,d){var c=a.a.parent,e=a.a["static"];return function(){return this[c][b].apply(d?this[e]:this,a.b(arguments))}};a.C=function(b,d){var c=b.prototype,e=a.a.Name,f=a.a.Constructor,g="";for(g in d)!0!==a.c[g]&&(c[g]=d[g],"function"==typeof d[g]&&(c[g][e]=g));d[f]&&(c[f]=d[f],c[f][e]=
f);c[a.a.GetInstanceUid]=function(){return""}};a.D=function(b,d){var c="",e=a.a.Name,f=d[a.a.Static];if(f)for(c in f)!0!==a.c[c]&&(b[c]=f[c],"function"==typeof f[c]&&(b[c][e]=c))};a.F=function(b){var d=a.a.Name,c=a.a.parent,e=a.a["static"],f=a.a.Constructor,g="",k=b[e],e=k[e][a.a.Extend],l;a.f?(b[a.a.GetInstanceUid](),l=a.j(b),k.prototype[c]=l.prototype[f]):k.prototype[c]=function(){return a.h(this,arguments.callee.caller[d],a.b(arguments),0)};c=k.prototype[c];if(e)for(g in f=e.prototype,f)"function"==
typeof f[g]&&!0!==a.c[g]&&(c[g]=a.G(b,g))};a.G=function(b,d){return a.f?(b[a.a.GetInstanceUid](),a.j(b).prototype[d]):function(){return a.h(b,d,a.b(arguments),0)}};a.H=function(b){var d=a.a.Name,c=a.a.parent,e="",f=b[a.a.Extend];b[c]=function(){return a.h(this,arguments.callee.caller[d],a.b(arguments),1)};c=b[c];if(f)for(e in f)"function"!=typeof f[e]||a.c[e]||(c[e]=a.I(b,e))};a.I=function(b,d){return a.f?(b[a.a.GetClassUid](),a.j(b)[d]):function(){return a.h(b,d,a.b(arguments),1)}};a.h=function(b,
d,c,e){var f=a.a.Fullname,g=a.a.self,k=a.a["static"],l=b[k],h=l[a.a.Extend],m;if(!h)throw"No parent class defined for type: '"+l[f]+"'.";m=e?h[d]:h.prototype[d];if(!(m instanceof Function))throw"No parent method named: '"+d+"' for type: '"+l[f]+"'.";b[g]=h;d=m.apply(e?b[a.a[k]]:b,c);b[g]=l;return d};a.j=function(b){b=b[a.a.self];var d=b[a.a.Extend];if(!d)throw"No parent class defined for type: '"+b[a.a.Fullname]+"'.";return d};a.b=function(b){return 1===b.length&&a.M(b[0])?[].slice.apply(b[0]):[].slice.apply(b)};
a.M=function(a){return"object"==typeof a&&"undefined"!=typeof a.callee&&"[object Array]"!={}.toString.apply(a)};return h.Class=a}("undefined"!==typeof module&&module.exports?global:this);

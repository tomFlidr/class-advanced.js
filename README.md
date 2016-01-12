# class.js

- unique javascript helper to create Classes with possibilities to call dynamic and static parent methods
- usage: browser or WSH (Windows Script Host), Node.JS

```
// Declaration

var ParentClassName = $class({
    $static: {
        parentStaticMethod: function (e, f) {
            console.log(e, f);
        }
    },
    $constructor: function (a, b) {
        console.log(a, b);
    },
    $dynamic: {
        parentDynamicMethod: function (c, d) {
            console.log(c, d);
        }
    }
});

var ChildClassName = $class({
    $extends: ParentClassName,
    $static: {
        childStaticMethod: function (e, f) {
            this.$base('parentStaticMethod', e, f);
        }
    },
    $constructor: function (a, b) {
        this.$base('$constructor', a, b);
    },
    $dynamic: {
        childDynamicMethod: function (c, d) {
            this.$base('parentDynamicMethod', c, d);
        }
    }
});


// Usage

var childInstance = new ChildClassName('a', 'b');	// a b

childInstance.childDynamicMethod('c', 'd');			// c d
childInstance.parentDynamicMethod('cc', 'dd');		// cc dd

ChildClassName.childStaticMethod('e', 'f');			// e f
ChildClassName.parentStaticMethod('ee', 'ff');		// ee ff
```

## To use class.js in Node.JS:
- modify class.js file - define $class object into global object and call require like this:

class.js:
```
global.$class=function(){function a(b){fun..... // rest of library definition 
```

app.js:
```
require('./class.js');
var ClassName = $class({.....});
```

- or modify class.js file - wrap $class object into module.exports and call require like this:
class.js:
```
module.exports=function(){
var $class=function(){function a(b){fun..... // rest of library definition 
return $class;};
```

app.js
```
var $class = require('./class.js')();
var ClassName = $class({.....});
```

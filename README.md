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

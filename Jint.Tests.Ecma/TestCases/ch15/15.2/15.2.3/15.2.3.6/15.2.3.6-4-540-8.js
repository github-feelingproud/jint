/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/**
 * @path ch15/15.2/15.2.3/15.2.3.6/15.2.3.6-4-540-8.js
 * @description Object.defineProperty fails to update [[Get]] and [[Set]] attributes of an indexed accessor property 'P' whose [[Configurable]] attribute is false, 'O' is an Arguments object (8.12.9 step 11.a)
 */


function testcase() {
        var obj = (function () {
            return arguments;
        }());

        obj.verifySetFunction = "data";
        var getFunc = function () {
            return obj.verifySetFunction;
        };
        var setFunc = function (value) {
            obj.verifySetFunction = value;
        };
        Object.defineProperty(obj, "0", {
            get: getFunc,
            set: setFunc,
            configurable: false
        });

        var result = false;
        try {
            Object.defineProperty(obj, "0", {
                get: function () {
                    return 100;
                }
            });
        } catch (e) {
            result = e instanceof TypeError &&
                accessorPropertyAttributesAreCorrect(obj, "0", getFunc, setFunc, "verifySetFunction", false, false);
        }

        try {
            Object.defineProperty(obj, "0", {
                set: function (value) {
                    obj.verifySetFunction1 = value;
                }
            });
        } catch (e1) {
            return result && e1 instanceof TypeError &&
                accessorPropertyAttributesAreCorrect(obj, "0", getFunc, setFunc, "verifySetFunction", false, false);
        }
    }
runTestCase(testcase);

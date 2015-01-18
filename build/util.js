/***
 *     /$$$$$$$$                                 /$$     /$$                               /$$
 *    | $$_____/                                | $$    |__/                              | $$
 *    | $$       /$$   /$$ /$$$$$$$   /$$$$$$$ /$$$$$$   /$$  /$$$$$$  /$$$$$$$   /$$$$$$ | $$
 *    | $$$$$   | $$  | $$| $$__  $$ /$$_____/|_  $$_/  | $$ /$$__  $$| $$__  $$ |____  $$| $$
 *    | $$__/   | $$  | $$| $$  \ $$| $$        | $$    | $$| $$  \ $$| $$  \ $$  /$$$$$$$| $$
 *    | $$      | $$  | $$| $$  | $$| $$        | $$ /$$| $$| $$  | $$| $$  | $$ /$$__  $$| $$
 *    | $$      |  $$$$$$/| $$  | $$|  $$$$$$$  |  $$$$/| $$|  $$$$$$/| $$  | $$|  $$$$$$$| $$
 *    |__/       \______/ |__/  |__/ \_______/   \___/  |__/ \______/ |__/  |__/ \_______/|__/
 *
 *
 *
 *                                                                                             /$$
 *                                                                                            |__/
 *      /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$/$$$$  /$$$$$$/$$$$  /$$ /$$$$$$$   /$$$$$$
 *     /$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$ |____  $$| $$_  $$_  $$| $$_  $$_  $$| $$| $$__  $$ /$$__  $$
 *    | $$  \ $$| $$  \__/| $$  \ $$| $$  \ $$| $$  \__/  /$$$$$$$| $$ \ $$ \ $$| $$ \ $$ \ $$| $$| $$  \ $$| $$  \ $$
 *    | $$  | $$| $$      | $$  | $$| $$  | $$| $$       /$$__  $$| $$ | $$ | $$| $$ | $$ | $$| $$| $$  | $$| $$  | $$
 *    | $$$$$$$/| $$      |  $$$$$$/|  $$$$$$$| $$      |  $$$$$$$| $$ | $$ | $$| $$ | $$ | $$| $$| $$  | $$|  $$$$$$$
 *    | $$____/ |__/       \______/  \____  $$|__/       \_______/|__/ |__/ |__/|__/ |__/ |__/|__/|__/  |__/ \____  $$
 *    | $$                           /$$  \ $$                                                               /$$  \ $$
 *    | $$                          |  $$$$$$/                                                              |  $$$$$$/
 *    |__/                           \______/                                                                \______/
 *      /$$$$$$                                  /$$     /$$
 *     /$$__  $$                                | $$    |__/
 *    | $$  \__/ /$$   /$$ /$$$$$$$   /$$$$$$$ /$$$$$$   /$$  /$$$$$$  /$$$$$$$   /$$$$$$$
 *    | $$$$    | $$  | $$| $$__  $$ /$$_____/|_  $$_/  | $$ /$$__  $$| $$__  $$ /$$_____/
 *    | $$_/    | $$  | $$| $$  \ $$| $$        | $$    | $$| $$  \ $$| $$  \ $$|  $$$$$$
 *    | $$      | $$  | $$| $$  | $$| $$        | $$ /$$| $$| $$  | $$| $$  | $$ \____  $$
 *    | $$      |  $$$$$$/| $$  | $$|  $$$$$$$  |  $$$$/| $$|  $$$$$$/| $$  | $$ /$$$$$$$/
 *    |__/       \______/ |__/  |__/ \_______/   \___/  |__/ \______/ |__/  |__/|_______/
 *
 *
 *
 */

function atomEquals (obj1, obj2) {
  // THIS METHOD IS ONLY GUARANTEED TO WORK WITH SOMETHING CALLED AN ATOM
  // AN ATOM IS AN OBJECT WITH ONLY ONE KEY-VALUE PAIR, AN INTEGER OR A STRING.
  // EX: {a: 5}, "5", 0.33, "bla bla bla", but not {a: 5, b: 2}
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function findIndexOfAtomInArray(array, atom) {
  for (var i = 0; i < array.length; i++) {
    if (atomEquals(array[i], atom)) {
      return i;
    }
  }
  return -1;
}

function intersect (arrays) {
  var common = arrays[0];
  arrays.forEach(function (array) {
    common = common.filter(function (obj) {
      return findIndexOfAtomInArray(array, obj) !== -1;
    });
  });
  return common;
}

function difference (arrays) {
    var everything = [].concat.apply([], arrays);
    var diff = [];

    everything.forEach(function (val) {
        if (everything.lastIndexOf(val) === everything.indexOf(val)) {
            diff.push(val);
        }
    });

    return diff;
}

function forEach (obj, fn) {
    Object.keys(obj).forEach(function (val, index) {
        fn(obj[val], index, obj);
    });
}

function merge(obj1, obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

function set(array) {
    var set = [];

    forEach(array, function (val) {
        if (set.indexOf(val) === -1) {
            set.push(val);
        }
    });

    return set;
}

function findCommonKeys(objects) {
  return intersect(objects.map(function (obj) {
    return Object.keys(obj);
  }));
}

function toArray (arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}

function log (message) {
    return function () {
        console.log.apply(console, [message].concat(toArray(arguments)));
        return arguments;
    };
}

function compose (func1, func2) {
    var funcs = arguments;
    return function () {
        var args = arguments;
        for (var i = funcs.length; i --> 0;) {
            args = [funcs[i].apply(this, args)];
        }
        return args[0];
    };
    return function () {
        return func1.call(this, func2.apply(this, arguments));
    };
}

function findCommonValues(objects) {
  var keys = findCommonKeys(objects);
  var values = objects.map(function (obj) {
    return keys.map(function (key) {
      var o = {};
      o[key] = obj[key];
      return o;
    });
  });

  return intersect(values);
}

function collect(list, listItem) {
    if (list.indexOf(listItem) === -1) {
        list.push(listItem);
    }
    return list;
}

function hasProperty(name) {
    return function (object) {
        return object[name] !== undefined;
    };
}

function property(name) {
    return function (object) {
        if (object === undefined) {
            return false;
        }
        return object[name];
    };
}

function isPropertyEqual (property, value) {
    return function (object) {
        return object[property] === value;
    };
}

function vormNaam (leerling) {
    return leerling.voornaam + " " + leerling.achternaam;
}

function countWithProperty (array, property, value) {
    return array.reduce(function (prev, current) {
        if (array[property] === value) {
            prev += 1
        }
        return prev;
    }, 0);
}

function isNumberish (numberEsque) {
    return !isNaN(parseFloat(numberEsque, 10));
}

function parseIfNumberish(numberEsque) {
    // return type number if it is a number or parsable number, else return string
    if (typeof numberEsque === "number") {
        return numberEsque;
    } else if (isNumberish(numberEsque)) {
        return parseFloat(numberEsque);
    }
    return numberEsque;
}

function observable (data) {
  var observable = Object.create(null);
  observable.subscribers = [];
  observable.data = data;

  observable.filters = {};

  function notify () {
    var data = observable.data;
    Object.keys(observable.filters).forEach(function (key) {
        data = observable.filters[key](data);
    });
    observable.subscribers.forEach(function (subscriber) {
      subscriber.notify(data);
    });
  }

  observable.update = function (updateFunction) {
    observable.data = updateFunction(observable.data);
    observable.notify(observable.data);
    observable.onUpdate ? observable.onUpdate() : null;
  };

  observable.onUpdate;

  observable.notify = function () {
    notify();
  };

  observable.register = function (subscriber) {
    observable.subscribers.push(subscriber);
  };

  observable.registerFilter = function (name, filter) {
    observable.filters[name] = filter;
  };

  observable.unregisterFilter = function (name) {
    delete observable.filters[name];
  };

  observable.poke = function () {
    // simply notify all subscribers of the data inside this object, even though there was no change.
    notify();
  };

  return observable;
}

function subscriber () {
  var subscriber = Object.create(null);

  subscriber.notify = function (data) {
    console.log("received new data!", data);
  };

  return subscriber;
}

function toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

/***
 *      /$$$$$$  /$$                           /$$             /$$                     /$$
 *     /$$__  $$| $$                          | $$            | $$                    | $$
 *    | $$  \ $$| $$$$$$$   /$$$$$$$  /$$$$$$ | $$ /$$   /$$ /$$$$$$    /$$$$$$       | $$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$
 *    | $$$$$$$$| $$__  $$ /$$_____/ /$$__  $$| $$| $$  | $$|_  $$_/   /$$__  $$      | $$__  $$ /$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$
 *    | $$__  $$| $$  \ $$|  $$$$$$ | $$  \ $$| $$| $$  | $$  | $$    | $$$$$$$$      | $$  \ $$| $$  \ $$| $$  \__/| $$  \__/| $$  \ $$| $$  \__/
 *    | $$  | $$| $$  | $$ \____  $$| $$  | $$| $$| $$  | $$  | $$ /$$| $$_____/      | $$  | $$| $$  | $$| $$      | $$      | $$  | $$| $$
 *    | $$  | $$| $$$$$$$/ /$$$$$$$/|  $$$$$$/| $$|  $$$$$$/  |  $$$$/|  $$$$$$$      | $$  | $$|  $$$$$$/| $$      | $$      |  $$$$$$/| $$
 *    |__/  |__/|_______/ |_______/  \______/ |__/ \______/    \___/   \_______/      |__/  |__/ \______/ |__/      |__/       \______/ |__/
 *
 *
 *
 *       /$$                      /$$$$$$  /$$                 /$$
 *      | $$                     /$$__  $$|__/                | $$
 *     /$$$$$$    /$$$$$$       | $$  \__/ /$$ /$$$$$$$   /$$$$$$$
 *    |_  $$_/   /$$__  $$      | $$$$    | $$| $$__  $$ /$$__  $$
 *      | $$    | $$  \ $$      | $$_/    | $$| $$  \ $$| $$  | $$
 *      | $$ /$$| $$  | $$      | $$      | $$| $$  | $$| $$  | $$
 *      |  $$$$/|  $$$$$$/      | $$      | $$| $$  | $$|  $$$$$$$
 *       \___/   \______/       |__/      |__/|__/  |__/ \_______/
 *
 *
 *
 *
 *
 *      /$$$$$$$  /$$$$$$  /$$$$$$/$$$$  /$$$$$$/$$$$   /$$$$$$  /$$$$$$$
 *     /$$_____/ /$$__  $$| $$_  $$_  $$| $$_  $$_  $$ /$$__  $$| $$__  $$
 *    | $$      | $$  \ $$| $$ \ $$ \ $$| $$ \ $$ \ $$| $$  \ $$| $$  \ $$
 *    | $$      | $$  | $$| $$ | $$ | $$| $$ | $$ | $$| $$  | $$| $$  | $$
 *    |  $$$$$$$|  $$$$$$/| $$ | $$ | $$| $$ | $$ | $$|  $$$$$$/| $$  | $$
 *     \_______/ \______/ |__/ |__/ |__/|__/ |__/ |__/ \______/ |__/  |__/
 *
 *
 *
 *                         /$$
 *                        | $$
 *     /$$    /$$ /$$$$$$ | $$ /$$   /$$  /$$$$$$   /$$$$$$$
 *    |  $$  /$$/|____  $$| $$| $$  | $$ /$$__  $$ /$$_____/
 *     \  $$/$$/  /$$$$$$$| $$| $$  | $$| $$$$$$$$|  $$$$$$
 *      \  $$$/  /$$__  $$| $$| $$  | $$| $$_____/ \____  $$
 *       \  $/  |  $$$$$$$| $$|  $$$$$$/|  $$$$$$$ /$$$$$$$/
 *        \_/    \_______/|__/ \______/  \_______/|_______/
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

function findCommonKeys(objects) {
  return intersect(objects.map(function (obj) {
    return Object.keys(obj);
  }));
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

/***
 *           /$$             /$$
 *          | $$            | $$
 *      /$$$$$$$  /$$$$$$  /$$$$$$    /$$$$$$
 *     /$$__  $$ |____  $$|_  $$_/   |____  $$
 *    | $$  | $$  /$$$$$$$  | $$      /$$$$$$$
 *    | $$  | $$ /$$__  $$  | $$ /$$ /$$__  $$
 *    |  $$$$$$$|  $$$$$$$  |  $$$$/|  $$$$$$$
 *     \_______/ \_______/   \___/   \_______/
 *
 *
 *
 */

// {"naam": "Frits Karmen", "leerlingNummer": 123124125, "email": "FritsKarmen@website.com", "mentor": "Thijs"}
var leerlingen = observable([
    {
        "voornaam": "Martijn",
        "achternaam": "Brekelmans",
        "leerlingNummer": 2899328,
        "email-avans": "tijntje_7@msn.com",
        "mentor": "Jos",
        "groep": "F",
        "opmerking": "Maakt deze website"
    },
    {
        "voornaam": "Chris",
        "achternaam": "Ermans",
        "leerlingNummer": 2154234,
        "email-avans": "brian.dams@student.avans.nl",
        "mentor": "Peter",
        "groep": "A",
        "opmerking": ""
    },
    {
        "voornaam": "Baal",
        "achternaam": "Bobsen",
        "leerlingNummer": 3266980,
        "email-avans": "baal@prinny.com",
        "mentor": "Peter",
        "groep": "C",
        "opmerking": ""
    },
    {
        "voornaam": "Luc",
        "leerlingNummer": 3700707,
        "achternaam": "Ackerveken",
        "tussenvoegsel": "van den",
        "voorletters": "L.",
        "gebruikersnaam": "lackerveke",
        "mentor": "Judith",
        "opleiding": "TI",
        "major": "ES",
        "cohort": 2014,
        "vooropleiding": "havo",
        "profiel": "NT",
        "email-avans": "l.vandenackerveken@student.avans.nl",
        "email-eigen": "luc@ackerveken.nl",
        "groep": "D",
        "opmerking": ""
    },
    {
        "voornaam": "Jan",
        "achternaam": "Toppels",
        "mentor": "Judith",
        "email-avans": "jan@toppeltje.nl",
        "leerlingNummer": 12212332,
        "groep": "H",
        "opmerking": "Jan Toppels bestaat niet :|"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3147562,
        "groep": "D",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2143960,
        "groep": "B",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2760250,
        "groep": "C",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3925143,
        "groep": "E",
        "opmerking": ""
    },
    {
        "voornaam": "Wel",
        "achternaam": "iemand",
        "mentor": "Judith",
        "email-avans": "wel-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3815983,
        "groep": "D",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3465620,
        "groep": "G",
        "opmerking": ""
    },
    {
        "voornaam": "Wel",
        "achternaam": "iemand",
        "mentor": "Judith",
        "email-avans": "wel-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2364004,
        "groep": "E",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3891014,
        "groep": "C",
        "opmerking": ""
    },
    {
        "voornaam": "Wel",
        "achternaam": "iemand",
        "mentor": "Judith",
        "email-avans": "wel-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3791246,
        "groep": "C",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3293567,
        "groep": "D",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3118936,
        "groep": "B",
        "opmerking": ""
    },
    {
        "voornaam": "Wel",
        "achternaam": "iemand",
        "mentor": "Judith",
        "email-avans": "wel-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3242225,
        "groep": "F",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2169471,
        "groep": "C",
        "opmerking": ""
    },
    {
        "voornaam": "Wel",
        "achternaam": "iemand",
        "mentor": "Judith",
        "email-avans": "wel-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2784836,
        "groep": "A",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2900427,
        "groep": "E",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3013939,
        "groep": "F",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3410772,
        "groep": "E",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3279429,
        "groep": "B",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2537866,
        "groep": "E",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3001661,
        "groep": "E",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2334397,
        "groep": "F",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3722498,
        "groep": "A",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2325398,
        "groep": "E",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2265600,
        "groep": "D",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2611276,
        "groep": "F",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2678630,
        "groep": "B",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2449044,
        "groep": "A",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2797701,
        "groep": "F",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3787732,
        "groep": "A",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3888466,
        "groep": "G",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3763381,
        "groep": "B",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2740095,
        "groep": "C",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2813547,
        "groep": "D",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3960506,
        "groep": "A",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2821639,
        "groep": "A",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2967506,
        "groep": "F",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2549568,
        "groep": "E",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2496004,
        "groep": "F",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3096291,
        "groep": "B",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3332527,
        "groep": "G",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 3794440,
        "groep": "E",
        "opmerking": ""
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn",
        "leerlingNummer": 2712445,
        "groep": "G",
        "opmerking": ""
    }
]);

leerlingen.onUpdate = function (leerlingen) {
    // zend nieuwe leerlingen naar server, that's it!
};

function verzamelLeraren(leerlingen) {
    return leerlingen.data.map(property("mentor")).reduce(collect, []);
}

function verzamelGroepen(leerlingen) {
    return leerlingen.data.map(property("groep")).reduce(collect, []).sort();
}

var leraren = observable(verzamelLeraren(leerlingen));
var groepen = observable(verzamelLeraren(leerlingen));

(function () {
    var sub = subscriber();
    leerlingen.register(sub);

    sub.notify = function () {
        leraren.update(function () {
            return verzamelLeraren(leerlingen);
        });
        groepen.update(function () {
            return verzamelGroepen(leerlingen);
        });
    };
}());

/***
 *                                               /$$
 *                                              | $$
 *      /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$$ /$$$$$$
 *     /$$__  $$ /$$__  $$ |____  $$ /$$_____/|_  $$_/
 *    | $$  \__/| $$$$$$$$  /$$$$$$$| $$        | $$
 *    | $$      | $$_____/ /$$__  $$| $$        | $$ /$$
 *    | $$      |  $$$$$$$|  $$$$$$$|  $$$$$$$  |  $$$$/
 *    |__/       \_______/ \_______/ \_______/   \___/
 *
 *
 *
 *                                                                                           /$$
 *                                                                                          | $$
 *      /$$$$$$$  /$$$$$$  /$$$$$$/$$$$   /$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$  /$$$$$$$  /$$$$$$    /$$$$$$$
 *     /$$_____/ /$$__  $$| $$_  $$_  $$ /$$__  $$ /$$__  $$| $$__  $$ /$$__  $$| $$__  $$|_  $$_/   /$$_____/
 *    | $$      | $$  \ $$| $$ \ $$ \ $$| $$  \ $$| $$  \ $$| $$  \ $$| $$$$$$$$| $$  \ $$  | $$    |  $$$$$$
 *    | $$      | $$  | $$| $$ | $$ | $$| $$  | $$| $$  | $$| $$  | $$| $$_____/| $$  | $$  | $$ /$$ \____  $$
 *    |  $$$$$$$|  $$$$$$/| $$ | $$ | $$| $$$$$$$/|  $$$$$$/| $$  | $$|  $$$$$$$| $$  | $$  |  $$$$/ /$$$$$$$/
 *     \_______/ \______/ |__/ |__/ |__/| $$____/  \______/ |__/  |__/ \_______/|__/  |__/   \___/  |_______/
 *                                      | $$
 *                                      | $$
 *                                      |__/
 */

/***
 *                 /$$                 /$$     /$$             /$$     /$$           /$$
 *                | $$                | $$    |__/            | $$    |__/          | $$
 *      /$$$$$$$ /$$$$$$    /$$$$$$  /$$$$$$   /$$  /$$$$$$$ /$$$$$$   /$$  /$$$$$$ | $$   /$$
 *     /$$_____/|_  $$_/   |____  $$|_  $$_/  | $$ /$$_____/|_  $$_/  | $$ /$$__  $$| $$  /$$/
 *    |  $$$$$$   | $$      /$$$$$$$  | $$    | $$|  $$$$$$   | $$    | $$| $$$$$$$$| $$$$$$/
 *     \____  $$  | $$ /$$ /$$__  $$  | $$ /$$| $$ \____  $$  | $$ /$$| $$| $$_____/| $$_  $$
 *     /$$$$$$$/  |  $$$$/|  $$$$$$$  |  $$$$/| $$ /$$$$$$$/  |  $$$$/| $$|  $$$$$$$| $$ \  $$
 *    |_______/    \___/   \_______/   \___/  |__/|_______/    \___/  |__/ \_______/|__/  \__/
 *
 *
 *
 */

var Statistiek = React.createClass({displayName: 'Statistiek',
    getInitialState: function () {
        return {leerlingen: []};
    },
    componentWillMount: function () {
        var sub = subscriber();
        this.props.leerlingen.register(sub);
        sub.notify = function (lln) {
            this.setState({leerlingen: lln});
        }.bind(this);
    },
    aantalLeerlingen: function () {
        return this.state.leerlingen.length;
    },
    leerlingenPerDocent: function () {
        var leerlingenPerDocent = this.state.leerlingen.reduce(function (prev, current) {
            if (prev.hasOwnProperty(current.mentor)) {
                prev[current.mentor] += 1;
            } else {
                prev[current.mentor] = 1;
            }
            return prev;
        }, {});
        return leerlingenPerDocent;
    },
    docentenStatistiek: function () {
        var leerlingenPerDocent = this.leerlingenPerDocent();

        docentenStatistiek = Object.keys(leerlingenPerDocent).map(function (leraar, index, array) {
            var aantalLeerlingen = leerlingenPerDocent[leraar];
            if (index === array.length - 1) {
                return React.createElement("span", null, " en ", React.createElement("span", {className: "nummer"}, aantalLeerlingen), " bij ", leraar, ".");
            } else {
                return React.createElement("span", null, React.createElement("span", {className: "nummer"}, aantalLeerlingen), " bij ", leraar, ", ");
            }
        });

        return docentenStatistiek;
    },
    render: function () {
        var docenten = this.state.leerlingen.map(function (leerling) {
            return leerling.mentor;
        });
        var aantalLeerlingen    = this.state.leerlingen.length;
        var leerlingenPerDocent = this.leerlingenPerDocent();
        var docentenStatistiek  = this.docentenStatistiek();
        var plural              = leerlingenPerDocent[Object.keys(leerlingenPerDocent)[0]] === 1 ? "hoort" : "horen";
        var aantalDocenten      = countWithProperty(this.state.leerlingen, "mentor", "Jos");
        console.log(aantalDocenten);
        return (
            React.createElement("p", null, "In totaal zijn er ", React.createElement("span", {className: "nummer"}, aantalLeerlingen), " leerlingen. Van deze leerlingen ", plural, " er ", docentenStatistiek)
        );
    }
});

/***
 *
 *
 *      /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$$
 *     /$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$| $$__  $$
 *    | $$  \ $$| $$  \__/| $$  \ $$| $$$$$$$$| $$  \ $$| $$$$$$$$| $$  \ $$
 *    | $$  | $$| $$      | $$  | $$| $$_____/| $$  | $$| $$_____/| $$  | $$
 *    |  $$$$$$$| $$      |  $$$$$$/|  $$$$$$$| $$$$$$$/|  $$$$$$$| $$  | $$
 *     \____  $$|__/       \______/  \_______/| $$____/  \_______/|__/  |__/
 *     /$$  \ $$                              | $$
 *    |  $$$$$$/                              | $$
 *     \______/                               |__/
 */

var Groep = React.createClass({displayName: 'Groep',
    render: function () {
        var classString = "groep";
        classString += this.props.selected ? " selected" : "";
        return (
            React.createElement("li", {className: classString, onClick: this.props.onClick.bind(this, this)}, this.props.groep)
        );
    }
});

var GroepenContainer = React.createClass({displayName: 'GroepenContainer',
    handleClick: function (groep) {
        var groepNaam;

        this.props.leerlingen.unregisterFilter(this.state.filter);
        this.setState({filter: groep.props.groep});

        groepNaam = groep.props.groep;

        if (groepNaam) {
            if (groepNaam !== this.state.filter) {
                this.props.leerlingen.registerFilter(groepNaam, function (leerlingen) {
                    return leerlingen.filter(isPropertyEqual("groep", groepNaam));
                });
            } else {
                this.setState({filter: undefined});
            }
        }

        this.props.leerlingen.poke();
    },
    componentWillMount: function () {
        var groepSub = subscriber();
        this.props.groepen.register(groepSub);

        groepSub.notify = function (groepen) {
            this.setState({groepen: groepen});
        }.bind(this);
    },
    getInitialState: function () {
        return {filter: "", groepen: []};
    },
    render: function () {
        var groepenLijst = this.state.groepen.map(function (groep) {
            var selected = this.state.filter === groep;
            return (
                React.createElement(Groep, {groep: groep, selected: selected, onClick: this.handleClick})
            );
        }, this);
        return (
            React.createElement("div", {className: "GroepenContainer"}, 
                React.createElement("h2", null, "Groepen"), 
                React.createElement("ul", null, 
                    groepenLijst
                )
            )
        );
    }
});

/***
 *     /$$
 *    | $$
 *    | $$  /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$$
 *    | $$ /$$__  $$ /$$__  $$ |____  $$ /$$__  $$ /$$__  $$| $$__  $$
 *    | $$| $$$$$$$$| $$  \__/  /$$$$$$$| $$  \__/| $$$$$$$$| $$  \ $$
 *    | $$| $$_____/| $$       /$$__  $$| $$      | $$_____/| $$  | $$
 *    | $$|  $$$$$$$| $$      |  $$$$$$$| $$      |  $$$$$$$| $$  | $$
 *    |__/ \_______/|__/       \_______/|__/       \_______/|__/  |__/
 *
 *
 *
 */

var Leraar = React.createClass({displayName: 'Leraar',
    render: function () {
        var classString = "foto-leraar";
        classString += this.props.selected ? " selected" : "";
        return (
            React.createElement("div", {className: classString, onClick: this.props.onClick.bind(this, this)}, this.props.naam)
        );
    }
});

var LerarenContainer = React.createClass({displayName: 'LerarenContainer',
    handleClick: function (leraar) {
        var leraarNaam;

        this.props.leerlingen.unregisterFilter(this.state.filter);
        this.setState({filter: leraar.props.naam});
        leraarNaam = leraar.props.naam;

        if (leraarNaam) {
            if (leraarNaam !== this.state.filter) {
                this.props.leerlingen.registerFilter(leraarNaam, function (leerlingen) {
                    return leerlingen.filter(isPropertyEqual("mentor", leraarNaam));
                });
            } else {
                this.setState({filter: undefined});
            }
        }

        this.props.leerlingen.poke();
    },
    getInitialState: function () {
        return {filter: ""};
    },
    render: function () {
        var lerarenLijst = this.props.leraren.map(function (leraar) {
            var selected = this.state.filter === leraar.naam;
            return (
                React.createElement(Leraar, {naam: leraar.naam, onClick: this.handleClick, selected: selected})
            );
        }, this);
        return (
            React.createElement("div", {className: "LerarenContainer"}, 
                lerarenLijst
            )
        );
    }
});

/***
 *                         /$$                       /$$     /$$                     /$$$$$$$                                /$$
 *                        | $$                      | $$    |__/                    | $$__  $$                              | $$
 *      /$$$$$$$  /$$$$$$ | $$  /$$$$$$   /$$$$$$$ /$$$$$$   /$$  /$$$$$$  /$$$$$$$ | $$  \ $$  /$$$$$$  /$$   /$$  /$$$$$$$| $$$$$$$
 *     /$$_____/ /$$__  $$| $$ /$$__  $$ /$$_____/|_  $$_/  | $$ /$$__  $$| $$__  $$| $$$$$$$  /$$__  $$| $$  | $$ /$$_____/| $$__  $$
 *    |  $$$$$$ | $$$$$$$$| $$| $$$$$$$$| $$        | $$    | $$| $$  \ $$| $$  \ $$| $$__  $$| $$  \__/| $$  | $$|  $$$$$$ | $$  \ $$
 *     \____  $$| $$_____/| $$| $$_____/| $$        | $$ /$$| $$| $$  | $$| $$  | $$| $$  \ $$| $$      | $$  | $$ \____  $$| $$  | $$
 *     /$$$$$$$/|  $$$$$$$| $$|  $$$$$$$|  $$$$$$$  |  $$$$/| $$|  $$$$$$/| $$  | $$| $$$$$$$/| $$      |  $$$$$$/ /$$$$$$$/| $$  | $$
 *    |_______/  \_______/|__/ \_______/ \_______/   \___/  |__/ \______/ |__/  |__/|_______/ |__/       \______/ |_______/ |__/  |__/
 *
 *
 *
 */

var selectionBrush = (function () {
    var brush = Object.create(null);
    brush.mode = "select";

    brush.selected = observable([]);

    function deselect (component) {
        return function (selected) {
            var copy = selected;
            var index = copy.indexOf(component.props.leerling);
            if (index !== -1) {
                copy.splice(index, 1);
            }
            return copy;
        }
    }

    function select (component) {
        return function (selected) {
            var copy = selected;
            var index = copy.indexOf(component.props.leerling);
            if (index === -1) {
                copy.push(component.props.leerling);
            }
            return copy;
        }
    }

    function act (component) {
        if (brush.mode === "select") {
            brush.selected.update(select(component));
        } else {
            brush.selected.update(deselect(component));
        }
    }

    brush.startSelection = function (isInitialSelected, component) {
        if (isInitialSelected) {
            brush.mode = "deselect";
        } else {
            brush.mode = "select";
        }
        act(component);
    };

    brush.paintSelection = function (component) {
        act(component);
        return brush.mode === "select";
    };

    return brush;
}());

/***
 *     /$$                               /$$ /$$
 *    | $$                              | $$|__/
 *    | $$  /$$$$$$   /$$$$$$   /$$$$$$ | $$ /$$ /$$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$$
 *    | $$ /$$__  $$ /$$__  $$ /$$__  $$| $$| $$| $$__  $$ /$$__  $$ /$$__  $$| $$__  $$
 *    | $$| $$$$$$$$| $$$$$$$$| $$  \__/| $$| $$| $$  \ $$| $$  \ $$| $$$$$$$$| $$  \ $$
 *    | $$| $$_____/| $$_____/| $$      | $$| $$| $$  | $$| $$  | $$| $$_____/| $$  | $$
 *    | $$|  $$$$$$$|  $$$$$$$| $$      | $$| $$| $$  | $$|  $$$$$$$|  $$$$$$$| $$  | $$
 *    |__/ \_______/ \_______/|__/      |__/|__/|__/  |__/ \____  $$ \_______/|__/  |__/
 *                                                         /$$  \ $$
 *                                                        |  $$$$$$/
 *                                                         \______/
 */

var LeerlingenContainer = React.createClass({displayName: 'LeerlingenContainer',
    getInitialState: function () {
        return {leerlingen: []};
    },
    componentWillMount: function () {
        var sub = subscriber();
        this.props.leerlingen.register(sub);
        sub.notify = function (lln) {
            this.setState({leerlingen: lln});
        }.bind(this);
    },
    render: function () {
        var leerlingenLijst = this.state.leerlingen.map(function (leerling) {
            return (
                React.createElement(Leerling, {leerling: leerling, key: this.leerlingNummer, selectionBrush: this.props.selectionBrush})
            );
        }.bind(this));
        return (
            React.createElement("div", {className: "LeerlingenContainer"}, 
                leerlingenLijst, 
                React.createElement(NieuwLeerlingForm, {leerlingen: this.props.leerlingen})
            )
        );
    }
});

var Leerling = React.createClass({displayName: 'Leerling',
    paintSelection: function (event) {
        if (event.buttons === 1) {
            this.setState({selected: this.props.selectionBrush.paintSelection(this)});
        }
    },
    startSelection: function (event) {
        if (event.buttons === 1) {
            this.props.selectionBrush.startSelection(this.state.selected, this);
            this.setState({selected: !this.state.selected});
        }
    },
    getInitialState: function () {
        return {selected: false};
    },
    componentWillUnmount: function () {
        this.props.selectionBrush.selected.update(function (selected) {
            var copy = selected;
            var index = copy.indexOf(this.props.leerling);
            if (index !== -1) {
                copy.splice(index, 1);
            }
            return copy;
        }.bind(this));
    },
    render: function () {
        var classString = "Leerling";
        classString += this.state.selected ? " selected" : "";
        var leerling = this.props.leerling;
        var naam = vormNaam(leerling);
        return (
            React.createElement("div", {className: classString, onMouseEnter: this.paintSelection, onMouseDown: this.startSelection}, 
                React.createElement("div", {className: "foto-leerling"}), 
                React.createElement("div", {className: "info-leerling"}, 
                    React.createElement("h4", {className: "naam-leerling"}, naam), 
                    React.createElement("p", {className: "leerlingNummer"}, leerling.leerlingNummer), 
                    React.createElement("p", {className: "email"}, leerling["email-avans"]), 
                    React.createElement("p", {className: "opmerking"}, leerling.opmerking)
                )
            )
        );
    }
});

var NieuwLeerlingForm = React.createClass({displayName: 'NieuwLeerlingForm',
    getInitialState: function () {
        return {formValue: ""};
    },
    render: function () {
        return (
            React.createElement("form", {className: "Leerling", onSubmit: this.handleSubmit}, 
                React.createElement("div", {className: "aandacht"}, "Voeg nieuwe leerling toe"), 
                React.createElement("input", {type: "text", value: this.state.formValue, onChange: this.handleOnChange})
            )
        );
    },
    handleOnChange: function (event) {
        this.setState({formValue: event.target.value});
    },
    handleSubmit: function (event) {
        event.preventDefault();
        var target = event.target.querySelector("input");
        var nieuweLeerling = JSON.parse(target.value);
        if (this.props.leerlingen.data.findIndex(isPropertyEqual("leerlingNummer", nieuweLeerling.leerlingNummer)) === -1) {
            this.props.leerlingen.update(function (lln) {
                var leln = lln;
                leln.push(JSON.parse(target.value));
                return leln;
            });
        } else {
            alert("Je leerling heeft geen uniek leerlingNummer... :|");
        }
        this.setState({formValue: ""});
    }
});

/***
 *                     /$$ /$$   /$$
 *                    | $$|__/  | $$
 *      /$$$$$$   /$$$$$$$ /$$ /$$$$$$    /$$$$$$   /$$$$$$
 *     /$$__  $$ /$$__  $$| $$|_  $$_/   /$$__  $$ /$$__  $$
 *    | $$$$$$$$| $$  | $$| $$  | $$    | $$  \ $$| $$  \__/
 *    | $$_____/| $$  | $$| $$  | $$ /$$| $$  | $$| $$
 *    |  $$$$$$$|  $$$$$$$| $$  |  $$$$/|  $$$$$$/| $$
 *     \_______/ \_______/|__/   \___/   \______/ |__/
 *
 *
 *
 */

var GroepEditor = React.createClass({displayName: 'GroepEditor',
    reset: function () {
        this.setState({aanpassingen: {}});
    },
    componentWillMount: function () {
        var sub = subscriber();
        this.props.selectionBrush.selected.register(sub);
        sub.notify = function (leerlingen) {
            this.setState({leerlingen: leerlingen});
            this.setState({aanpassingen: {}});
        }.bind(this);
    },
    getInitialState: function () {
        return {leerlingen: [], aanpassingen: {}};
    },
    onChange: function (event) {
        var key           = event.target.getAttribute("data-key");
        var aanpassingen  = this.state.aanpassingen;

        aanpassingen[key] = parseIfNumberish(event.target.value);

        this.setState({aanpassingen: aanpassingen});
    },
    onSubmit: function (event) {
        var leerling = this.state.leerling;
        event.preventDefault();
        this.props.leerlingen.update(function (leerlingen) {
            var leerlingNummers = this.state.leerlingen.map(function (leerling) {
                return leerling.leerlingNummer;
            });
            leerlingNummers.forEach(function (leerlingNummer) {
                var aanpassingKeys = Object.keys(this.state.aanpassingen);
                aanpassingKeys.forEach(function (aanpassingKey) {
                    var leerlingIndex = leerlingen.findIndex(function (testLeerling) {
                        return testLeerling.leerlingNummer === leerlingNummer;
                    });
                    leerlingen[leerlingIndex][aanpassingKey] = this.state.aanpassingen[aanpassingKey];
                    // look, a bind line!
                }.bind(this));
            }.bind(this));
            return leerlingen;
        }.bind(this));
        // this.reset();
    },
    render: function () {
        var commons = findCommonValues(this.state.leerlingen);
        var form;
        var error;
        var errorBericht = "Er zijn geen gelijke velden gevonden :(";
        if (commons) {
            form = commons.map(function (keyvalue) {
                // beautiful code 10/10
                var key = Object.keys(keyvalue)[0];
                var value;
                if (this.state.aanpassingen[key] !== undefined) {
                    value = this.state.aanpassingen[key];
                } else {
                    value = keyvalue[key];
                }
                var type = toType(value);
                var field;
                if (type === "number") {
                    field = React.createElement("input", {type: "number", onChange: this.onChange, value: value, 'data-key': key});
                } else if (type === "string") {
                    field = React.createElement("input", {type: "text", onChange: this.onChange, value: value, 'data-key': key});
                }
                return (
                    React.createElement("div", null, 
                        React.createElement("label", null, key, ": "), field
                    )
                );
            }.bind(this));
            form.push(React.createElement("input", {type: "submit"}));
        }
        if (form && form.length === 0) {
            error = React.createElement("p", null, errorBericht)
        }
        return (
            React.createElement("div", null, 
                React.createElement("h3", null, "Leerling editor, hier kan je je geselecteerde leerling aanpassen. Als je meerdere leerlingen geselecteerd hebt dan pas je al de geselecteerde leerlingen tegelijkertijd aan."), 
                React.createElement("form", {onSubmit: this.onSubmit}, 
                    form
                ), 
                error
            )
        );
    }
});

var FiltersContainer = React.createClass({displayName: 'FiltersContainer',
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h1", {className: "filtersTitle"}, "Filters"), 
                React.createElement(GroepenContainer, {groepen: this.props.groepen, leerlingen: this.props.leerlingen})
            )
        );
    }
});

/***
 *                                         /$$
 *                                        | $$
 *      /$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$$  /$$$$$$   /$$$$$$
 *     /$$__  $$ /$$__  $$| $$__  $$ /$$__  $$ /$$__  $$ /$$__  $$
 *    | $$  \__/| $$$$$$$$| $$  \ $$| $$  | $$| $$$$$$$$| $$  \__/
 *    | $$      | $$_____/| $$  | $$| $$  | $$| $$_____/| $$
 *    | $$      |  $$$$$$$| $$  | $$|  $$$$$$$|  $$$$$$$| $$
 *    |__/       \_______/|__/  |__/ \_______/ \_______/|__/
 *
 *
 *
 */

React.render(
    React.createElement(LeerlingenContainer, {leerlingen: leerlingen, selectionBrush: selectionBrush}),
    document.getElementById("leerlingen")
);

React.render(
    React.createElement(FiltersContainer, {groepen: groepen, leerlingen: leerlingen}),
    document.getElementById("filters")
);

React.render(
    React.createElement(Statistiek, {leerlingen: leerlingen}),
    document.getElementById("extra")
);

React.render(
    React.createElement(GroepEditor, {selectionBrush: selectionBrush, leerlingen: leerlingen}),
    document.getElementById("aggregateEditor")
);



leerlingen.poke();
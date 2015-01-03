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

function collect(list, listItem) {
    if (list.indexOf(listItem) === -1) {
        list.push(listItem);
    }
    return list;
}

function property(name) {
    return function (object) {
        return object[name];
    }
}

function isPropertyEqual (property, value) {
    return function (object) {
        return object[property] === value;
    };
}

function vormNaam (leerling) {
    return leerling.voornaam + " " + leerling.achternaam;
}

function countWithProperty (collection, property, value) {
    return collection.reduce(function (prev, current) {
        return current[property] === value ? prev + 1 : prev;
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
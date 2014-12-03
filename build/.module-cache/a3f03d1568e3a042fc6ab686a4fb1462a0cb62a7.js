var leerlingen = [
    {"naam": "Martijn Brekelmans", "leerlingNummer": 2072491, "email": "tijntje_7@msn.com", "leraar": "Jos"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
];

var leraren = [
    {"naam": "Peter"},
    {"naam": "Jos"},
    {"naam": "Thijs"},
    {"naam": "Tonny"},
];

var util = {};
util.collectObservable = function (observable) {
    var values = [];
    console.log(values.length);
    observable.onValue(function (aVeryDescriptiveValue) {
        values.push(aVeryDescriptiveValue);
    });
    console.log(values.length);
    return values;
};

var Statistiek = React.createClass({displayName: 'Statistiek',
    render: function () {
        var aantalLeerlingen = this.props.leerlingen.length;
        return (
            React.createElement("p", null, "In totaal zijn er ", React.createElement("span", {className: "nummer"}, aantalLeerlingen), " leerlingen")
        );
    }
});

var Leraar = React.createClass({displayName: 'Leraar',
    render: function () {
        return (
            React.createElement("div", {className: "foto-leraar"}, this.props.naam)
        );
    }
});

var LerarenContainer = React.createClass({displayName: 'LerarenContainer',
    render: function () {
        var lerarenLijst = this.props.leraren.map(function (leraar) {
            return (
                React.createElement(Leraar, {naam: leraar.naam})
            );
        });
        return (
            React.createElement("div", {className: "LerarenContainer"}, 
                lerarenLijst
            )
        );
    }
});

var LeerlingenContainer = React.createClass({displayName: 'LeerlingenContainer',
    getInitialState: function () {

        return {leerlingen: []};
    },
    componentWillMount: function () {
        var leerlingen = util.collectObservable(this.props.leerlingen);
        this.setState({leerlingen: leerlingen});
    },
    render: function () {
        // console.log(this.state.leerlingen);
        // console.log(this.state.leerlingen.length);
        var leerlingenLijst = this.state.leerlingen.map(function (leerling) {
            log('hi');
            return (
                React.createElement(Leerling, {naam: leerling.naam, email: leerling.email, leerlingNummer: leerling.leerlingNummer})
            );
        });
        return (
            React.createElement("div", {className: "LeerlingenContainer"}, 
                leerlingenLijst, 
                React.createElement(NieuwLeerlingForm, null)
            )
        );
    }
});

var Leerling = React.createClass({displayName: 'Leerling',
    render: function () {
        return (
            React.createElement("div", {className: "Leerling"}, 
                React.createElement("div", {className: "foto-leerling"}), 
                React.createElement("h4", {className: "naam-leerling"}, this.props.naam), 
                React.createElement("p", {className: "email"}, this.props.email), 
                React.createElement("span", {className: "leerlingNummer"}, this.props.leerlingNummer)
            )
        );
    }
});

var NieuwLeerlingForm = React.createClass({displayName: 'NieuwLeerlingForm',
    render: function () {
        return (
            React.createElement("form", {className: "Leerling"}, 
                React.createElement("div", {className: "aandacht"}, "Voeg nieuwe leerling toe"), 
                React.createElement("input", {type: "text"})
            )
        );
    }
});

var log = function (value) {
    console.log("log: ", value);
};

var leerlingStream = new Bacon.Bus();
// Voeg alle leerlingen toe aan de stream
leerlingen.forEach(leerlingStream.push.bind(leerlingStream));

React.render(
    React.createElement(LeerlingenContainer, {leerlingen: leerlingStream}),
    document.getElementById("leerlingen")
);

React.render(
    React.createElement(LerarenContainer, {leraren: leraren}),
    document.getElementById("leraren")
);

React.render(
    React.createElement(Statistiek, {leerlingen: leerlingStream}),
    document.getElementById("statistiek")
);

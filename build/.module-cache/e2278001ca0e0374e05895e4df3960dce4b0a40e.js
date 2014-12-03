var leerlingen = [
    {"naam": "Martijn Brekelmans", "leerlingNummer": 2072491, "email": "tijntje_7@msn.com", "leraar": "Jos"},
    {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    {"naam": "Baal Bobsen", "leerlingNummer": 2023030404, "email": "baal@prinny.com", "leraar": "Peter"},
    // {"naam": "Frits Karmen", "leerlingNummer": 123124125, "email": "FritsKarmen@website.com", "leraar": "Thijs"},
    // {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    // {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    // {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    // {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    // {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    // {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    // {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    // {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    // {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    // {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    // {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
    // {"naam": "Chris Ermans", "leerlingNummer": 20122014, "email": "brian.dams@student.avans.nl", "leraar": "Peter"},
];

var leraren = [
    {"naam": "Peter"},
    {"naam": "Jos"},
    {"naam": "Thijs"},
    {"naam": "Tonny"},
];

var Statistiek = React.createClass({displayName: 'Statistiek',
    componentWillMount: function () {
        var that = this;
        this.props.leerlingen.scan([], ".concat").onValue(function (value) {
            that.setState({leerlingen: value});
        });
    },
    render: function () {
        var aantalLeerlingen = this.state.leerlingen.length;
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
        this.props.leerlingen.scan([], ".concat").onValue(function (val) {
            console.log(val);
            this.setState({leerlingen: val});
        }.bind(this));
    },
    render: function () {
        var leerlingenLijst = this.state.leerlingen.map(function (leerling) {
            return (
                React.createElement(Leerling, {naam: leerling.naam, email: leerling.email, leerlingNummer: leerling.leerlingNummer})
            );
        });
        return (
            React.createElement("div", {className: "LeerlingenContainer"}, 
                leerlingenLijst, 
                React.createElement(NieuwLeerlingForm, {leerlingen: this.props.leerlingen})
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
            React.createElement("form", {className: "Leerling", onSubmit: this.handleSubmit}, 
                React.createElement("div", {className: "aandacht"}, "Voeg nieuwe leerling toe"), 
                React.createElement("input", {type: "text"})
            )
        );
    },
    handleSubmit: function (event) {
        event.preventDefault();
        this.props.leerlingen.push(JSON.parse(event.target.value));
    }
});

var leerlingStream = new Bacon.Bus();

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

leerlingen.forEach(leerlingStream.push.bind(leerlingStream));

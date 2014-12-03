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

var Statistiek = React.createClass({
    componentWillMount: function () {
        var that = this;
        this.props.leerlingen.scan([], ".concat").onValue(function (value) {
            that.setState({leerlingen: value});
        });
    },
    render: function () {
        var aantalLeerlingen = this.state.leerlingen.length;
        return (
            <p>In totaal zijn er <span className="nummer">{aantalLeerlingen}</span> leerlingen</p>
        );
    }
});

var Leraar = React.createClass({
    render: function () {
        return (
            <div className="foto-leraar">{this.props.naam}</div>
        );
    }
});

var LerarenContainer = React.createClass({
    render: function () {
        var lerarenLijst = this.props.leraren.map(function (leraar) {
            return (
                <Leraar naam={leraar.naam} />
            );
        });
        return (
            <div className="LerarenContainer">
                {lerarenLijst}
            </div>
        );
    }
});

var LeerlingenContainer = React.createClass({
    getInitialState: function () {
        return {leerlingen: []};
    },
    componentWillMount: function () {
        this.props.leerlingen.scan([], ".concat").onValue(function (val) {
            this.setState({leerlingen: val});
        }.bind(this));
    },
    render: function () {
        var leerlingenLijst = this.state.leerlingen.map(function (leerling) {
            return (
                <Leerling naam={leerling.naam} email={leerling.email} leerlingNummer={leerling.leerlingNummer}></Leerling>
            );
        });
        return (
            <div className="LeerlingenContainer">
                {leerlingenLijst}
                <NieuwLeerlingForm leerlingen={this.props.leerlingen}/>
            </div>
        );
    }
});

var Leerling = React.createClass({
    render: function () {
        return (
            <div className="Leerling">
                <div className="foto-leerling"></div>
                <h4 className="naam-leerling">{this.props.naam}</h4>
                <p className="email">{this.props.email}</p>
                <span className="leerlingNummer">{this.props.leerlingNummer}</span>
            </div>
        );
    }
});

var NieuwLeerlingForm = React.createClass({
    getInitialState: function () {
        return {formValue: ""};
    },
    render: function () {
        return (
            <form className="Leerling" onSubmit={this.handleSubmit}>
                <div className="aandacht">Voeg nieuwe leerling toe</div>
                <input type="text" value={this.state.formValue} onChange={this.handleOnChange}/>
            </form>
        );
    },
    handleOnChange: function (event) {
        this.setState({formValue: event.target.value});
    },
    handleSubmit: function (event) {
        event.preventDefault();
        var target = event.target.querySelector("input");
        this.props.leerlingen.push(JSON.parse(target.value));
        this.setState({formValue: ""});
    }
});

var leerlingStream = new Bacon.Bus();

React.render(
    <LeerlingenContainer leerlingen={leerlingStream}/>,
    document.getElementById("leerlingen")
);

React.render(
    <LerarenContainer leraren={leraren}/>,
    document.getElementById("leraren")
);

React.render(
    <Statistiek leerlingen={leerlingStream}/>,
    document.getElementById("statistiek")
);

leerlingen.forEach(leerlingStream.push.bind(leerlingStream));

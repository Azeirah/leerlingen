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

var Statistiek = React.createClass({
    render: function () {
        var aantalLeerlingen = this.props.leerlingen.length;
        return (
            <p>Totaal aantal leerlingen: <span>{aantalLeerlingen}</span></p>
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
    render: function () {
        var leerlingenLijst = this.props.leerlingen.map(function (leerling) {
            return (
                <Leerling naam={leerling.naam} email={leerling.email} leerlingNummer={leerling.leerlingNummer}></Leerling>
            );
        });
        return (
            <div className="LeerlingenContainer">
                {leerlingenLijst}
                <NiewLeerlingForm/>
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

var NiewLeerlingForm = React.createClass({
    render: function () {
        return (
            <form className="Leerling">
                <div className="aandacht">Voeg nieuwe leerling toe</div>
                <input type="text" />
            </form>
        );
    }
});

React.render(
    <LeerlingenContainer leerlingen={leerlingen}/>,
    document.getElementById("leerlingen")
);

React.render(
    <LerarenContainer leraren={leraren}/>,
    document.getElementById("leraren")
);

React.render(
    <Statistiek leerlingen={leerlingen}/>,
    document.getElementById("statistiek")
);
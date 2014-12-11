function observable (data) {
  var observable = Object.create(null);
  observable.subscribers = [];
  observable.data = data;

  var filters = {};

  function notify () {
    var data = observable.data;
    Object.keys(filters).forEach(function (key) {
        data = filters[key](data);
    });
    observable.subscribers.forEach(function (subscriber) {
      subscriber.notify(data);
    });
  }

  observable.update = function (updateFunction) {
    observable.data = updateFunction(observable.data);
    observable.notify(observable.data);
  };

  observable.notify = function () {
    notify();
  };

  observable.register = function (subscriber) {
    observable.subscribers.push(subscriber);
  };

  observable.registerFilter = function (name, filter) {
    filters[name] = filter;
  };

  observable.unregisterFilter = function (name) {
    delete filters[name];
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

// {"naam": "Frits Karmen", "leerlingNummer": 123124125, "email": "FritsKarmen@website.com", "mentor": "Thijs"}
var leerlingen = observable([
    {
        "voornaam": "Martijn",
        "achternaam": "Brekelmans",
        "leerlingNummer": 2072491,
        "email-avans": "tijntje_7@msn.com",
        "mentor": "Jos"
    },
    {
        "voornaam": "Chris",
        "achternaam": "Ermans",
        "leerlingNummer": 20122014,
        "email-avans": "brian.dams@student.avans.nl",
        "mentor": "Peter"
    },
    {
        "voornaam": "Baal",
        "achternaam": "Bobsen",
        "leerlingNummer": 2023030404,
        "email-avans": "baal@prinny.com",
        "mentor": "Peter"
    },
    {
        "voornaam": "Luc",
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
        "email-eigen": "luc@ackerveken.nl"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Wel",
        "achternaam": "iemand",
        "mentor": "Judith",
        "email-avans": "wel-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Wel",
        "achternaam": "iemand",
        "mentor": "Judith",
        "email-avans": "wel-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Wel",
        "achternaam": "iemand",
        "mentor": "Judith",
        "email-avans": "wel-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Wel",
        "achternaam": "iemand",
        "mentor": "Judith",
        "email-avans": "wel-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Wel",
        "achternaam": "iemand",
        "mentor": "Judith",
        "email-avans": "wel-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
    {
        "voornaam": "Helemaal",
        "achternaam": "Niemand",
        "mentor": "Thijs",
        "email-avans": "niemand-verdient@HetOmEenPlaceholder.te.zijn"
    },
]);

var leraren = [
    {"naam": "Peter"},
    {"naam": "Jos"},
    {"naam": "Thijs"},
    {"naam": "Tonny"},
    {"naam": "Judith"}
];

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

function isPropertyEqual (property, value) {
    return function (object) {
        return object[property] === value;
    };
}

var Statistiek = React.createClass({
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
        var docentenStatistiek = (function () {
            var statistieken = [];
            var keys = Object.keys(leerlingenPerDocent);
            keys.forEach(function (leraar, index) {
                var aantalLeerlingen = leerlingenPerDocent[leraar];
                if (index !== keys.length - 1) {
                    statistieken.push(
                        <span><span className="nummer">{aantalLeerlingen}</span> bij {leraar}, </span>
                    );
                } else {
                    statistieken.push(
                        <span> en <span className="nummer">{aantalLeerlingen}</span> bij {leraar}.</span>
                    );
                }
            });
            return statistieken;
        }());
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
        var aantalDocenten      = countWithProperty(this.state.leerlingen, "leraar", "Jos");
        return (
            <p>In totaal zijn er <span className="nummer">{aantalLeerlingen}</span> leerlingen. Van deze leerlingen {plural} er {docentenStatistiek}</p>
        );
    }
});

var Leraar = React.createClass({
    render: function () {
        var classString = "foto-leraar";
        classString += this.props.selected ? " selected" : "";
        return (
            <div className={classString} onClick={this.props.onClick.bind(this, this)}>{this.props.naam}</div>
        );
    }
});

var LerarenContainer = React.createClass({
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
                <Leraar naam={leraar.naam} onClick={this.handleClick} selected={selected}/>
            );
        }, this);
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
        var sub = subscriber();
        this.props.leerlingen.register(sub);
        sub.notify = function (lln) {
            this.setState({leerlingen: lln});
        }.bind(this);
    },
    render: function () {
        var leerlingenLijst = this.state.leerlingen.map(function (leerling) {
            return (
                <Leerling naam={vormNaam(leerling)} email={leerling["email-avans"]} leerlingNummer={leerling.leerlingNummer}></Leerling>
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
    handleClick: function (event) {
        if (event.buttons === 1) {
            this.setState({selected: !this.state.selected});
        }
    },
    getInitialState: function () {
        return {selected: false};
    },
    render: function () {
        var classString = "Leerling";
        classString += this.state.selected ? " selected" : "";
        return (
            <div className={classString} onMouseEnter={this.handleClick} onMouseDown={this.handleClick}>
                <div className="foto-leerling"></div>
                <div className="info-leerling">
                    <h4 className="naam-leerling">{this.props.naam}</h4>
                    <p className="email">{this.props.email}</p>
                </div>
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
        this.props.leerlingen.update(function (lln) {
            var leln = lln;
            leln.push(JSON.parse(target.value));
            return leln;
        });
        this.setState({formValue: ""});
    }
});

var GroepEditor = React.createClass({
    render: function () {
        return (
            <h3>Groep editor, hier kan je bijvoorbeeld de klas, groep of mentor bij alle geselecteerde leerlingen aanpassen</h3>
        );
    }
});

React.render(
    <LeerlingenContainer leerlingen={leerlingen}/>,
    document.getElementById("leerlingen")
);

React.render(
    <LerarenContainer leraren={leraren} leerlingen={leerlingen}/>,
    document.getElementById("leraren")
);

React.render(
    <Statistiek leerlingen={leerlingen}/>,
    document.getElementById("statistiek")
);

React.render(
    <GroepEditor/>,
    document.getElementById("extra")
);



leerlingen.poke();
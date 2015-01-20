function observable (data) {
  var observable = Object.create(null);
  observable.subscribers = [];
  observable.data = data;

  observable.filters = {};

  function notify () {
    var data = observable.data;
    Object.keys(observable.filters).forEach(function (key) {
        data = observable.filters[key].filter(data);
    });
    observable.subscribers.forEach(function (subscriber) {
      subscriber.notify(data);
    });
  }

  observable.update = function (updateFunction) {
    var oldData = observable.data;
    observable.data = updateFunction(observable.data);
    if (observable.data === undefined) {
        throw TypeError("observable.update was updated to undefined, this is not allowed.");
        observable.data = oldData;
        return;
    }
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

  observable.registerFilter = function (filtername, filtervalue, filterfunction) {
    // filtername = blokFilter
    // filtervalue = "a", of "b", of "c" etc...
    observable.filters[filtername] = {
        filter: filterfunction,
        name: filtername,
        filtervalue: filtervalue
    };
  };

  observable.unregisterFilter = function (filtername) {
    delete observable.filters[filtername];
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

var leerlingen;

var leerlingenRequest = new XMLHttpRequest();
leerlingenRequest.onload = function () {
    leerlingen = observable(JSON.parse(this.responseText));
    start();
};
leerlingenRequest.open("get", "get.php", true);
leerlingenRequest.send();

function start () {
    function verzamelLeraren(leerlingen) {
        return leerlingen.data.map(property("mentor")).reduce(collect, []);
    }

    var leraren = observable(verzamelLeraren(leerlingen));
    var groepen = observable(["A", "B", "C", "D", "E", "F", "G", "H"]);
    var jaren = Object.keys(
                                  set(leerlingen.data.filter(hasProperty("groepen")).
                                  map(property("groepen"))).
                                  reduce(merge)
                            );
    var blokken = ["1", "2", "3", "4"];

    (function () {
        var sub = subscriber();
        leerlingen.register(sub);

        sub.notify = function () {
            leraren.update(function () {
                return verzamelLeraren(leerlingen);
            });
            groepen.update(function () {
                return ["A", "B", "C", "D", "E", "F", "G", "H"];
            });
        };
    }());

    function makeImageFromNames (names) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var fontHeight = 15;
        var width = 190;
        var height = names.length * 15 + 40;
        canvas.width = width;
        canvas.height = height;

        ctx.font = "bold 15px Helvetica";

        names.forEach(function (name, index) {
          ctx.fillText(name, 4, index * fontHeight + fontHeight);
        });

        return {
            canvas: canvas,
            width: width,
            height: name
        };
    }

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

    var Jaar = React.createClass({displayName: 'Jaar',
        render: function () {
            var classString = this.props.selected ? " selected" : "";
            return (
                React.createElement("li", {className: classString, onClick: this.props.click.bind(this, this)}, this.props.jaar)
            );
        }
    });

    var Blok = React.createClass({displayName: 'Blok',
        render: function () {
            var classString = this.props.selected ? " selected" : "";
            return (
                React.createElement("li", {className: classString, onClick: this.props.click.bind(this, this)}, this.props.blok)
            );
        }
    });

    var TijdContainer = React.createClass({displayName: 'TijdContainer',
        getInitialState: function () {
            return {jaarFilter: new Date().getFullYear().toString(), jaren: jaren, blokken: blokken, blokFilter: "1"};
        },
        componentWillMount: function () {
            var tijdSub = subscriber();
            this.props.leerlingen.register(tijdSub);

            tijdSub.notify = function (leerlingen) {
                this.setState({jaren: jaren});
            }.bind(this);
        },
        handleJaarClick: function (jaar) {
            var jaarNaam = jaar.props.jaar;

            if (this.state.jaarFilter !== jaarNaam) {
                this.setState({jaarFilter: jaarNaam});
                this.activeerJaarFilter(jaarNaam);
            }

            setTimeout(this.props.leerlingen.poke, 15);
        },
        activeerBlokFilter: function (blokNaam) {
            this.props.leerlingen.registerFilter("blokfilter", blokNaam, function (leerlingen) {
                var heeftGroepJaarEnBlok = compose(property(blokNaam), property(this.state.jaarFilter), property("groepen"));
                return leerlingen.filter(heeftGroepJaarEnBlok);
            }.bind(this));
        },
        activeerJaarFilter: function (jaarNaam) {
            this.props.leerlingen.registerFilter("jaarfilter", jaarNaam, function (leerlingen) {
                var heeftGroepEnjaar = compose(property(jaarNaam), property("groepen"));
                return leerlingen.filter(heeftGroepEnjaar);
            }.bind(this));
        },
        handleBlokClick: function (blok) {
            var blokNaam = blok.props.blok;

            if (this.state.blokFilter !== blokNaam) {
                this.setState({blokFilter: blokNaam});
                this.activeerBlokFilter(blokNaam);
            }

            setTimeout(this.props.leerlingen.poke, 15);
        },
        componentDidMount: function () {
            this.activeerBlokFilter(this.state.blokFilter);
            this.activeerJaarFilter(this.state.jaarFilter);

            this.props.leerlingen.poke();
        },
        render: function () {
            var jarenLijst = this.state.jaren.map(function (jaar) {
                var selected = this.state.jaarFilter === jaar;
                return (
                    React.createElement(Jaar, {jaar: jaar, selected: selected, click: this.handleJaarClick})
                );
            }, this);

            var blokkenLijst = this.state.blokken.map(function (blok) {
                var selected = this.state.blokFilter === blok;
                return (
                    React.createElement(Blok, {blok: blok, selected: selected, click: this.handleBlokClick})
                )
            }, this);

            return (
                React.createElement("div", {className: "TijdContainer"}, 
                    React.createElement("h2", null, "Jaar"), 
                    React.createElement("ul", null, 
                        jarenLijst
                    ), 
                    React.createElement("h2", null, "Blok"), 
                    React.createElement("ul", null, 
                        blokkenLijst
                    )
                )
            );
        }
    });

    var Groep = React.createClass({displayName: 'Groep',
        getInitialState: function () {
            return {filter: "", groepen: [], drag: false};
        },
        dragEnter: function (event) {
            this.setState({drag: true});
            event.preventDefault();
        },
        dragOver: function (event) {
            event.preventDefault();
        },
        onDragDrop: function (event) {
            this.setState({drag: false});
            var groepTo = this.props.groep;
            var ids = this.props.selectionBrush.selected.data.map(property("leerlingNummer"));
            var blokfiltervalue = this.props.leerlingen.filters["blokfilter"].filtervalue;
            var jaarfiltervalue = this.props.leerlingen.filters["jaarfilter"].filtervalue;

            this.props.leerlingen.update(function (leerlingen) {
                return leerlingen.map(function (leerling) {
                    if (ids.indexOf(leerling.leerlingNummer) !== -1) {
                        leerling["groepen"][jaarfiltervalue][blokfiltervalue] = groepTo;
                    }
                    return leerling;
                });
            })
        },
        onDragExit: function (event) {
            this.setState({drag: false});
        },
        click: function (event) {
            this.props.onClick.call(this, this);
        },
        render: function () {
            var classString = "groep";
            classString += this.props.selected ? " selected" : "";
            var border = this.state.drag ? "2px dotted black" : "";
            var characterStyle = {
                "color": colorFromCharacter(this.props.groep, groepen.data, 1),
                "fontWeight": "bold"
            };
            var groepStyle = {
                "border": border
            };
            return (
                React.createElement("li", {style: groepStyle, className: classString, onDragExit: this.onDragExit, onDrop: this.onDragDrop, onDragOver: this.dragOver, onDragEnter: this.dragEnter, onClick: this.click}, "Groep ", React.createElement("span", {style: characterStyle}, this.props.groep))
            );
        }
    });

    var GroepenContainer = React.createClass({displayName: 'GroepenContainer',
        handleClick: function (groep) {
            var groepNaam = groep.props.groep;

            if (this.state.filter === groepNaam) {
                this.setState({filter: undefined});
                this.props.leerlingen.unregisterFilter("groepfilter");
            } else {
                this.setState({filter: groepNaam});
                this.activeerGroepFilter(groepNaam);
            }

            this.props.leerlingen.poke();
        },
        activeerGroepFilter: function (groepNaam) {
            if (groepNaam !== undefined) {
                this.props.leerlingen.unregisterFilter("groepfilter");
                this.props.leerlingen.registerFilter("groepfilter", groepNaam, function (leerlingen) {
                    var blokfiltervalue = this.props.leerlingen.filters["blokfilter"].filtervalue;
                    var jaarfiltervalue = this.props.leerlingen.filters["jaarfilter"].filtervalue;
                    var kloptGroepJaarEnBlok = compose(isPropertyEqual(blokfiltervalue, groepNaam), property(jaarfiltervalue), property("groepen"));
                    return leerlingen.filter(kloptGroepJaarEnBlok);
                }.bind(this));
            }
        },
        componentWillMount: function () {
            var groepSub = subscriber();
            this.props.groepen.register(groepSub);

            groepSub.notify = function (groepen) {
                this.setState({groepen: groepen});
            }.bind(this);
        },
        getInitialState: function () {
            return {filter: undefined, groepen: []};
        },
        render: function () {
            var groepenLijst = this.state.groepen.map(function (groep) {
                var selected = this.state.filter === groep;
                return (
                    React.createElement(Groep, {groep: groep, leerlingen: this.props.leerlingen, selectionBrush: this.props.selectionBrush, selected: selected, onClick: this.handleClick})
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
                    React.createElement(Leerling, {leerlingen: this.props.leerlingen, leerling: leerling, key: this.leerlingNummer, selectionBrush: this.props.selectionBrush})
                );
            }.bind(this));
            return (
                React.createElement("div", {className: "LeerlingenContainer"}, 
                    leerlingenLijst
                )
            );
        }
    });

    var GroepDraggable = React.createClass({displayName: 'GroepDraggable',
        drag: function (event) {
            event.dataTransfer.setData("groep", this.props.groep);
            var names = this.props.selectionBrush.selected.data.map(vormNaam);
            var canvas = makeImageFromNames(names);
            event.dataTransfer.setDragImage(canvas.canvas, canvas.width, canvas.height);
        },
        click: function (event) {
            // prevents selecting the underlying student
            event.stopPropagation();
        },
        render: function () {
            var style = {
                "color": colorFromCharacter(this.props.groep, groepen.data, 1)
            };
            return (
                React.createElement("div", {className: "groepDraggable", draggable: "true", style: style, onMouseDown: this.click, onDragStart: this.drag, onMouseEnter: this.mouseEnter, onMouseLeave: this.mouseLeave}, this.props.groep)
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
            var blokfiltervalue = this.props.leerlingen.filters["blokfilter"].filtervalue;
            var jaarfiltervalue = this.props.leerlingen.filters["jaarfilter"].filtervalue;
            var groep = this.props.leerling.groepen[jaarfiltervalue][blokfiltervalue];
            var backgroundColor = this.state.selected ? {
                "backgroundColor": colorFromCharacter(groep, groepen.data, 0.3)
            } : {};
            return (
                React.createElement("div", {className: classString, onMouseEnter: this.paintSelection, onMouseDown: this.startSelection, style: backgroundColor}, 
                    React.createElement("div", {className: "info-leerling"}, 
                        React.createElement("h4", {className: "naam-leerling"}, naam, " ", React.createElement(GroepDraggable, {selectionBrush: this.props.selectionBrush, groep: groep})), 
                        React.createElement("p", {className: "leerlingNummer"}, leerling.leerlingNummer), 
                        React.createElement("p", {className: "email"}, leerling["email-avans"]), 
                        React.createElement("p", {className: "opmerking"}, leerling.opmerking)
                    )
                )
            );
        }
    });

    var FiltersContainer = React.createClass({displayName: 'FiltersContainer',
        render: function () {
            return (
                React.createElement("div", null, 
                    React.createElement("h1", {className: "filtersTitle"}, "Filters"), 
                    React.createElement(GroepenContainer, {groepen: this.props.groepen, leerlingen: this.props.leerlingen, selectionBrush: this.props.selectionBrush}), 
                    React.createElement(TijdContainer, {leerlingen: this.props.leerlingen})
                )
            );
        }
    });


    /**
     *
     *
     *   /$$$$$$$  /$$$$$$  /$$    /$$ /$$$$$$
     *  /$$_____/ |____  $$|  $$  /$$//$$__  $$
     * |  $$$$$$   /$$$$$$$ \  $$/$$/| $$$$$$$$
     *  \____  $$ /$$__  $$  \  $$$/ | $$_____/
     *  /$$$$$$$/|  $$$$$$$   \  $/  |  $$$$$$$
     * |_______/  \_______/    \_/    \_______/
     *
     *
     *
     */

    var Save = React.createClass({displayName: 'Save',
        getInitialState: function () {
            return {dirty: false};
        },
        componentWillMount: function () {
            this.props.leerlingen.onUpdate = function () {
                this.setState({dirty: true});
            }.bind(this);
        },
        onsave: function () {
            var leerlingenSaveRequest = new XMLHttpRequest();
            leerlingenSaveRequest.open("POST", "save.php");
            leerlingenSaveRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            leerlingenSaveRequest.send(JSON.stringify(leerlingen.data, null, 2));
        },
        render: function () {
            if (this.state.dirty) {
                return (
                    React.createElement("button", {className: "saveButton", onClick: this.onsave}, "Er zijn onopgeslagen veranderingen")
                );
            } else {
                return (
                    React.createElement("span", null)
                );
            }
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
        React.createElement(FiltersContainer, {groepen: groepen, selectionBrush: selectionBrush, leerlingen: leerlingen}),
        document.getElementById("filters")
    );

    React.render(
        React.createElement(Save, {leerlingen: leerlingen}),
        document.getElementById("save")
    );

    leerlingen.poke();
}

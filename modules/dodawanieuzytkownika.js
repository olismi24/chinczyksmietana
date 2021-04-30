module.exports = function (req, res, bazaDanych) {
    const DB_Schema = {
        "users": [],
        "nicks": [],
        "doGry": 0,
        "ktoChceGrac": {
            red: {
                chceGrac: false
            },
            blue: {
                chceGrac: false
            },
            green: {
                chceGrac: false
            },
            yellow: {
                chceGrac: false
            },
        },
    }
    const dostepneKolory = ["red", "blue", "green", "yellow"]
    bazaDanych.findOne({
        doGry: {
            $lt: 4
        }
    }, function (err, docs) {
        if (docs == null) {
            bazaDanych.insert(DB_Schema, function (err, newDoc) { //insert-oryginalny ciąg z określonym tekstem wstawionym w określonej
                bazaDanych.findOne({ // zamiast obiektu rezultat
                    doGry: {
                        $lt: 4
                    }
                }, function (err, docs) {
                    bazaDanych.update({
                        _id: docs._id
                    }, {
                        $push: {
                            users: {
                                nick: req.body.nick,
                                color: dostepneKolory[docs.doGry]
                            },
                            nicks: req.body.nick
                        },
                        $set: {
                            doGry: docs.doGry + 1
                        }
                    }, {}, function (err, numUpdated) {
                        req.session.dbKey = docs._id
                        req.session.kimJestem = {
                            nick: req.body.nick,
                            color: dostepneKolory[docs.doGry],
                            idGracza: docs.doGry
                        }
                        res.json({
                            success: true
                        })
                    });
                    bazaDanych.persistence.compactDatafile()
                })
            });
        } else {
            if (docs.nicks.includes(req.body.nick)) { //sprawdzanie unikalności nicku
                res.json({
                    message: "Twoj nick nie jest unikalny",
                    success: false
                })
            } else {
                bazaDanych.update({
                    _id: docs._id
                }, {
                    $push: {
                        users: {
                            nick: req.body.nick,
                            color: dostepneKolory[docs.doGry],
                            idGracza: docs.doGry
                        },
                        nicks: req.body.nick
                    },
                    $set: {
                        doGry: docs.doGry + 1
                    }
                }, {}, function (err, numUpdated) {
                    req.session.dbKey = docs._id
                    req.session.kimJestem = {
                        nick: req.body.nick,
                        color: dostepneKolory[docs.doGry],
                        idGracza: docs.doGry
                    }
                    res.json({
                        success: true
                    })
                });
                bazaDanych.persistence.compactDatafile() //czyści DB 
            }
        }
    });
}
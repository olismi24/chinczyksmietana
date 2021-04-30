const newUser = require('./dodawanieuzytkownika')
const poczekalniaStatus = require('./tworzeniepoczekalni')
module.exports = function routing(app, path, dirname, bazaDanych) {
    //GET
    app.get("/", (req, res) => {
        if (req.session.dbKey)
            res.redirect("/poczekalnia")
        else
            res.sendFile(path.join(dirname, "/static/pages/register.html"))
    })
    app.get("/poczekalnia", (req, res) => {
        if (req.session.dbKey)
            res.sendFile(path.join(dirname, "/static/pages/poczekalnia.html"))
        else
            res.redirect("/")
    })
    app.get("/uzytkownicy", (req, res) => {
        if (req.session.dbKey) //dostęp do danych przez sesje
            bazaDanych.findOne({
                _id: req.session.dbKey
            }, function (err, doc) {
                let poczatekGry = poczekalniaStatus.sprawdzRozpoczecieGry(doc)
                console.log(poczatekGry);
                if (poczatekGry)
                    bazaDanych.update({
                        _id: req.session.dbKey
                    }, {
                        $set: {
                            doGry: 4 //set zastępuje wartość pola określoną wartością.
                        }
                    }, {},
                        function (err, upd) {
                            bazaDanych.persistence.compactDatafile()
                            res.json({
                                status: poczatekGry,
                                ...doc,
                                kimJestem: {
                                    ...req.session.kimJestem
                                }
                            })
                        })
                else
                    res.json({
                        status: poczatekGry,
                        ...doc,
                        kimJestem: {
                            ...req.session.kimJestem
                        }
                    })
            });
        else
            res.redirect("/")
    })
    //POST
    app.post("/newUser", (req, res) => {
        //nasz nick jest unikalny 
        newUser(req, res, bazaDanych)
        //do jakiegoś pokoju / tworzy nowy pokój 
    })
    app.post('/taKtoraWysylaZapytania', function (req, res) {
        if (req.session.dbKey)
            poczekalniaStatus.chceGrac(req, res, bazaDanych)
        else
            res.redirect("/")
    })
    app.post("/drop", (req, res) => {
        var oczka = Math.floor(Math.random() * 6) + 1
        console.log(oczka)
        res.json(oczka)
    })
}
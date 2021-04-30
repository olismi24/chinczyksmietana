import Plansza from "./plansza.js"

window.addEventListener('DOMContentLoaded', () => {
    poczekalnia.pobierzUzytkownikow()
    poczekalnia.synchronizuj()
    document.querySelector('input[type=checkbox]').addEventListener('input', poczekalnia.chceGrac)
    document.getElementById('rzut').addEventListener('click', poczekalnia.rzutKostka)
})
const poczekalnia = {
    tablicaUzytkownikow: [],
    bazaDanych: {},
    kimJestem: {},
    ktoChceGrac: [],
    tablicaSpanow: [],
    numerGracza: null,
    synchronizacjaUzytkownikowInt: null,
    pobierzUzytkownikow() {
        //Funkcja - pobranie wszystkich aktualnie obecnych graczy wywoływanie 1 przy starcie i cyklicznie aż do statu gry
        fetch('/uzytkownicy', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.bazaDanych = {
                    ...data
                }
                this.numerGracza = data.kimJestem.idGracza
                this.kimJestem = {
                    ...data.kimJestem
                }
                this.nazwijUzytkownikow()
                if (data.status) {
                    this.startGry()
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    nazwijUzytkownikow() {
        this.tablicaSpanow = document.querySelectorAll('span');
        this.bazaDanych.nicks.forEach((element, counter) => {
            this.tablicaSpanow[counter].innerText = element
        });
        Object.keys(this.bazaDanych.ktoChceGrac).forEach((element, counter) => {
            console.log(element);
            if (this.bazaDanych.ktoChceGrac[element].chceGrac) {
                poczekalnia.tablicaSpanow[counter].classList.add(element)
            } else {
                poczekalnia.tablicaSpanow[counter].classList.remove(element)
            }
        })
    },
    synchronizuj() {
        this.synchronizacjaUzytkownikowInt = setInterval(() => {
            this.pobierzUzytkownikow()
        }, 4000)
    },
    chceGrac(e) {
        console.log(e.target.checked)
        console.log(poczekalnia.kimJestem)
        console.log(poczekalnia.tablicaSpanow[poczekalnia.numerGracza])
        if (e.target.checked) {
            poczekalnia.tablicaSpanow[poczekalnia.numerGracza].classList.add(poczekalnia.kimJestem.color)
            poczekalnia.chceGracNaSerer(e.target.checked)
        } else {
            poczekalnia.tablicaSpanow[poczekalnia.numerGracza].classList.remove(poczekalnia.kimJestem.color)
            poczekalnia.chceGracNaSerer(e.target.checked)
        }
    },
    chceGracNaSerer(status) {
        fetch('/taKtoraWysylaZapytania', { // adres serwera
            method: 'POST', //metoda
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                color: this.kimJestem.color,
                status: status
            }), //to co wysyłamy w postaci stringu JSONO'podonnego 
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },

    startGry() {
        clearInterval(this.synchronizacjaUzytkownikowInt)
    },
    //rzut kostką
    rzutKostka() {
        fetch('/drop', { // adres serwera
            method: 'POST', //metoda
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.getElementById('kostka').innerHTML = ""
                var img = new Image(100, 100)
                img.src = "../images/" + data + ".jpg"
                document.getElementById('kostka').append(img)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}
Plansza.rysuj()
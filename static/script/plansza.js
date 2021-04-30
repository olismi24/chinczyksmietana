export default class Plansza {
    static rysuj() {
        console.log("rysuje")
        this.rysowanieBazy()
        this.rysowanieGry()
    }
    static pole(x, y, szerokosc, wysokosc, kolor) {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.rect(x, y, szerokosc, wysokosc);
        ctx.fillStyle = kolor
        ctx.fill()
        ctx.stroke();
    }
    static rysowanieBazy() {
        let { pole } = this
        // gracz 1 - kolor
        pole(10, 10, 55, 55, "red")
        pole(75, 10, 55, 55, "red")
        pole(10, 75, 55, 55, "red")
        pole(75, 75, 55, 55, "red")
        // gracz 2 - niebieski
        pole(595, 10, 55, 55, "LightSeaGreen")
        pole(660, 10, 55, 55, "LightSeaGreen") // odejmuje od lewego górnego wierzchołka
        pole(595, 75, 55, 55, "LightSeaGreen")
        pole(660, 75, 55, 55, "LightSeaGreen")
        // gracz 3
        pole(10, 595, 55, 55, "yellow")
        pole(75, 595, 55, 55, "yellow")
        pole(10, 660, 55, 55, "yellow")
        pole(75, 660, 55, 55, "yellow")
        // gracz 4 
        pole(595, 595, 55, 55, "Green")
        pole(660, 595, 55, 55, "Green")
        pole(595, 660, 55, 55, "Green")
        pole(660, 660, 55, 55, "Green")
    }
    static rysowanieGry() {
        let { pole } = this
        pole(10, 270, 55, 55, "red") // wyjście czerwonego z bazy
        pole(10, 335, 55, 55, "lightgrey")
        pole(10, 400, 55, 55, "lightgrey")
        pole(75, 400, 55, 55, "lightgrey")
        pole(140, 400, 55, 55, "lightgrey")
        pole(205, 400, 55, 55, "lightgrey")
        pole(270, 400, 55, 55, "lightgrey")
        pole(270, 465, 55, 55, "lightgrey")
        pole(270, 530, 55, 55, "lightgrey")
        pole(270, 595, 55, 55, "lightgrey")
        pole(270, 660, 55, 55, "yellow") // wyjście żółtego z bazy
        pole(335, 660, 55, 55, "lightgrey")
        pole(400, 660, 55, 55, "lightgrey")
        pole(400, 595, 55, 55, "lightgrey")
        pole(400, 530, 55, 55, "lightgrey")
        pole(400, 465, 55, 55, "lightgrey")
        pole(400, 400, 55, 55, "lightgrey")
        pole(465, 400, 55, 55, "lightgrey")
        pole(530, 400, 55, 55, "lightgrey")
        pole(595, 400, 55, 55, "lightgrey")
        pole(660, 400, 55, 55, "green") // wyjście zielonego z bazy
        pole(660, 335, 55, 55, "lightgrey")
        pole(660, 270, 55, 55, "lightgrey")
        pole(595, 270, 55, 55, "lightgrey")
        pole(530, 270, 55, 55, "lightgrey")
        pole(465, 270, 55, 55, "lightgrey")
        pole(400, 270, 55, 55, "lightgrey")
        pole(400, 205, 55, 55, "lightgrey")
        pole(400, 140, 55, 55, "lightgrey")
        pole(400, 75, 55, 55, "lightgrey")
        pole(400, 10, 55, 55, "LightSeaGreen") // wyjście niebieskiego z bazy
        pole(335, 10, 55, 55, "lightgrey")
        pole(270, 10, 55, 55, "lightgrey")
        pole(270, 75, 55, 55, "lightgrey")
        pole(270, 140, 55, 55, "lightgrey")
        pole(270, 205, 55, 55, "lightgrey")
        pole(270, 270, 55, 55, "lightgrey")
        pole(205, 270, 55, 55, "lightgrey")
        pole(140, 270, 55, 55, "lightgrey")
        pole(75, 270, 55, 55, "lightgrey")
        //czerwone wygrane
        pole(75, 335, 55, 55, "red")
        pole(140, 335, 55, 55, "red")
        pole(205, 335, 55, 55, "red")
        pole(270, 335, 55, 55, "red")
        //żółte wygrane
        pole(335, 595, 55, 55, "yellow")
        pole(335, 530, 55, 55, "yellow")
        pole(335, 465, 55, 55, "yellow")
        pole(335, 400, 55, 55, "yellow")
        //zielone wygrane
        pole(595, 335, 55, 55, "green")
        pole(530, 335, 55, 55, "green")
        pole(465, 335, 55, 55, "green")
        pole(400, 335, 55, 55, "green")
        //niebieskie wygrane
        pole(335, 75, 55, 55, "LightSeaGreen")
        pole(335, 140, 55, 55, "LightSeaGreen")
        pole(335, 205, 55, 55, "LightSeaGreen")
        pole(335, 270, 55, 55, "LightSeaGreen")
    }
}
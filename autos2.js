
let autos = require('./autos.js');

let concesionaria = {
    autos: autos,
    buscarAuto: function (patente) {
        for (let i = 0; i < autos.length; i++) {
            if (patente === autos[i].patente) {
                return autos[i]
            }

        }
        return null
    },
    venderAuto: function (patente) {
        let buscado = this.buscarAuto(patente);
        return buscado.vendido = true

    },
    autosParaLaVenta: function () {
        let autosEnVenta = this.autos.filter(auto => auto.vendido === false)
        return autosEnVenta
    },
    autosNuevos: function () {
        let enVenta = this.autosParaLaVenta()
        let autosNuevos = enVenta.filter(autoKm => autoKm.km < 100)
        return autosNuevos
    },
    listaDeVentas: function () {
        let precioVendidos = this.autos.filter(autoV => autoV.vendido === true)
        let listaPrecios = precioVendidos.map(function (precios) {
            return precios.precio
        })
        return listaPrecios
    },
    totalDeVentas: function () {
        let listapreciosVendidos = this.listaDeVentas();
        const reducer = (valorAnterior, valorActual) => valorAnterior + valorActual

        return listapreciosVendidos.reduce(reducer, 0)
    },
    puedeComprar: function (auto, persona) {

        let esCostoso = auto.precio > persona.capacidadDePagoTotal;
        let valorCuota = auto.precio / auto.cuotas;
        let puedeComprarlo = persona.capacidadDePagoEnCuotas > valorCuota;
        if (!esCostoso & puedeComprarlo) {
            return true
        } else {
            return false
        }
    },
    autosQuePuedeComprar: function (persona) {
        let disponibles = this.autosParaLaVenta();
        let puedeComprarDisponible = disponibles.filter(auto => this.puedeComprar(auto, persona));
        return puedeComprarDisponible


    }
};
console.log(concesionaria.autosQuePuedeComprar({
    nombre: 'Juan',
    capacidadDePagoEnCuotas: 30000,
    capacidadDePagoTotal: 100000000
}))





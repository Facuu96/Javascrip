document.addEventListener('DOMContentLoaded', () => {
    const cantidadInput = document.getElementById('Cantidad');
    const botonOficial = document.getElementById('Oficial');
    const botonDblue = document.getElementById('D-blue');
    const botonMep = document.getElementById('mep');
    const botonEblue = document.getElementById('E-blue');
    const lista = document.getElementById('lista');
    const historial = document.getElementById('historial');
    const eliminarHistorialBtn = document.querySelector('.Eliminar');
    const borrarHistorialBtn = document.querySelector('.Borrar');

    let conversionDivisas = {};

    fetch('conversiones.json')
        .then(response => response.json())
        .then(data => {
            conversionDivisas = data.conversionDivisas;
            cargarHistorial();
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            mostrarAlerta('Error', 'No se pudieron cargar las tasas de cambio.');
        });

    function agregarResultado(monto, tipoCambio, nombreMoneda) {
        if (isNaN(tipoCambio)) {
            mostrarAlerta('Error', 'La tasa de cambio no es válida.');
            return;
        }
        const montoConvertido = monto * tipoCambio;
        const listaItem = document.createElement('li');
        listaItem.textContent = `Conversión: $${monto} a ${nombreMoneda} ${montoConvertido.toFixed(2)} (Tasa: ${tipoCambio})`;
        lista.appendChild(listaItem);
    }

    function agregarHistorial(monto, tipoCambio, nombreMoneda) {
        const historialItem = {
            texto: `Conversión: $${monto} a ${nombreMoneda} ${ (monto * tipoCambio).toFixed(2)} (Tasa: ${tipoCambio})`,
            monto: monto,
            tipoCambio: tipoCambio,
            nombreMoneda: nombreMoneda
        };
        let historialItems = JSON.parse(localStorage.getItem('historial')) || [];
        if (!historialItems.some(item => item.texto === historialItem.texto)) {
            historialItems.push(historialItem);
            localStorage.setItem('historial', JSON.stringify(historialItems));
            actualizarHistorial();
        }
    }

    function crearHistorialItem({ texto }) {
        const historialItem = document.createElement('li');
        historialItem.textContent = texto;
        return historialItem;
    }

    function mostrarAlerta(titulo, mensaje) {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'info',
            confirmButtonText: 'OK'
        });
    }

    function realizarConversion(tipoCambio, nombreMoneda) {
        const cantidad = parseFloat(cantidadInput.value);
        if (isNaN(cantidad) || cantidad <= 0) {
            mostrarAlerta('Error', 'Por favor ingresa una cantidad válida.');
            return;
        }
        if (isNaN(tipoCambio)) {
            mostrarAlerta('Error', 'La tasa de cambio no es válida.');
            return;
        }
        agregarResultado(cantidad, tipoCambio, nombreMoneda);
        agregarHistorial(cantidad, tipoCambio, nombreMoneda);
        Swal.fire('Éxito', 'Conversión realizada con éxito.', 'success');
    }

    function actualizarHistorial() {
        historial.innerHTML = '';
        let historialItems = JSON.parse(localStorage.getItem('historial')) || [];
        historialItems.forEach(item => {
            historial.appendChild(crearHistorialItem(item));
        });
    }

    function cargarHistorial() {
        actualizarHistorial();
    }

    botonOficial.addEventListener('click', () => realizarConversion(conversionDivisas.oficial, 'Moneda Oficial'));
    botonDblue.addEventListener('click', () => realizarConversion(conversionDivisas.dblue, 'Dólar Blue'));
    botonMep.addEventListener('click', () => realizarConversion(conversionDivisas.mep, 'Dólar MEP'));
    botonEblue.addEventListener('click', () => realizarConversion(conversionDivisas.eblue, 'Dólar Blue'));

    eliminarHistorialBtn.addEventListener('click', () => {
        lista.innerHTML = '';
        Swal.fire('Historial', 'Historial de resultados eliminado.', 'info');
    });

    borrarHistorialBtn.addEventListener('click', () => {
        localStorage.removeItem('historial');
        historial.innerHTML = '';
        Swal.fire('Historial', 'Historial completo eliminado.', 'info');
    });
});




















//document.addEventListener('DOMContentLoaded', () => {
    //const conversionMoneda = {
        //dolarOficial: 972, 
        //dolarBlue: 1375, 
        //dolarMep: 1329,  
        //euroBlue: 1478   
    //};
    //const cantidadInput = document.getElementById('Cantidad');
    //const lista = document.getElementById('lista');
    
    //if (localStorage.getItem('cantidad')) {
        //cantidadInput.value = localStorage.getItem('cantidad');
    //}

    //const convertirDivisa = (tipoDivisa) => {
        //const cantidad = parseFloat(cantidadInput.value);
        //if (isNaN(cantidad) || cantidad <= 0) {
            //alert('Cantidad incorrecta');
            //return;
        //}
        
        //const resultado = cantidad * conversionMoneda[tipoDivisa];
        //const ul = document.createElement('ul');
        //ul.textContent = `La conversion en ${tipoDivisa}: ${resultado.toFixed(2)}`;
        //lista.appendChild(ul);
        
        //localStorage.setItem('cantidad', cantidad);
    //};
    
    //document.getElementById('Oficial').addEventListener('click', () => convertirDivisa('dolarOficial'));
    //document.getElementById('D-blue').addEventListener('click', () => convertirDivisa('dolarBlue'));
    //document.getElementById('mep').addEventListener('click', () => convertirDivisa('dolarMep'));
    //document.getElementById('E-blue').addEventListener('click', () => convertirDivisa('euroBlue'));
//});





























//let divisas = [
//{
//    nombre: "peso",
//    precio: 1 
//},
//{
//    nombre: "dolar oficial",
//    precio: 900
//},
//{ 
//    nombre: "dolar blue",
//    precio: 1400
//},
//{
//    nombre: "dolar mep",
//    precio: 1300
//},
//{
//    nombre: "euro blue",
//    precio: 1500
//},

//]




//class divisa {
//    constructor(nombre, precio){
//        (this.nombre = nombre), (this.precio = precio);
//    }
//}

//let divisaNueva = new divisa ("" , );

//divisa.push( divisaNueva );


    //for(let i = 0; i < divisas.length; i++){
        //console.log(divisas[i].)//jugar con un objeto
        //console.log()
    //}


    //let calcularVenta = ()=> {
        //let= valortotal = 0;
        //for(let i = 0; i < divisas.length; i++)
            //{valorTotal = valorTotal + divisas[1].precio * divisas[].precio } //jugar con distintas divisas
        
    
    //return valorTotal;
//}

    //let totalVendido = calcularVenta( )
    //console.log ( valorTotal )







//let dolar = 1300
//let euro = 950

//nombre= prompt( "ingresa tu nombre");
//edad = Number (prompt ("¿cuantos años tenes?"));
//if ( edad >= 18 ) { 
    
//} 
//else  alert ( "no tenes acceso" )

//let divisa = prompt ("¿que divisa queres comprar?")
//let cantidad = Number (prompt( "cuantos queres comprar?"))



//let conversor = (cantidadPesos) =>{
//    return cantidadPesos/1300
//} 

//let resultadoDolar = conversor ( 8000 )
//console.log = (resultadoDolar)


//let conversorEuro = (cantidadPesos) =>{
//    return cantidadPesos/950
//} 

//let resultado = conversorEuro ( 5000 )
//console.log = (resultado)
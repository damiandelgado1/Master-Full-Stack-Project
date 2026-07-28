const miConstante = 5;

let prueba_variable = 'Hola esto es una Prueba'

let prueba_funcion = () => {
    console.log('Desde prueba_funcion')
}

let paraExportar = {
    miFuncion: prueba_funcion,
    miConstante: miConstante
}

export {
    miConstante,
    prueba_variable
}
const adder = (array) => {
    let aux = 0;
    let result = 0;
    array.map( items => {
         aux = items.product.precio * items.quantity;
         result = result + aux;
    })
    return result;
}

export default adder;
// Exporting Module
console.log('Exporting Module');
const shippingCost = 10;
export const cart = [];
// Variables declared inside of a module is scoped to this module;
// Basically inside a module the module itself is like the Top level scope.
// And by default this means that all Top level variables are private inside of this variable
// This variables are scoped to the current module.
// We can only use them here
// Now if we want them to use them in the script.js module then we will have to use exports.
// In ES modules are 2 typse of exports:  Named Exports and  Default Exports
// Named Imports is actually the simplest way of exporting something from a module because all we have to do is to put export in front of anything ,that we might want to export

export const addToCart = function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${quantity} ${product} added to the cart`);
}; // By now this variable is private inside of the module, if we wanted to export it ,so that we can import it in some other module. We write export in front of it.// This creates a named export from this module.
// Export need to happen in the Top level Code

//We can export multiple things from a module using Named Exports// This is the main use case of named exports
// And also we can  export multiple things at the same time , using Named Exports.

const totalPrice = 237;
const totalQuantity = 23;
export { totalPrice, totalQuantity as tq }; // this it is a little bit like exporting an obj from this module.

////We can change the name also we just write as

//////❗ Default Exports
///We use default exports when we only want to export one thing per module
//We write export default and then we simply wanted to export a value. for example if we want to export a function we would export just the value itself, not the variable
export default function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${quantity} ${product} added to the cart`);
}
// then when we imported we can basically give it any name that we want

/////////////////////////////////////////////////////
export const birthDate = function (birthDate) {
  console.log(2023 - birthDate);
};

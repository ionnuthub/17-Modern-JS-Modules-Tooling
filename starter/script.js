// Importing Module

//To import that other module:

//We write import then a string with the location of the module
//('./shoppingCart.js');
//  ./ = means the current location.
// the vscode omits the .js we have to add mannually
// But ES modules also work with out the extension
//When we want to connect a module to the HTML file we need to specify the type attribute.
// We go in the html in the script and we <script type='module' .   <script type="module" defer src="script.js"></script>

import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

console.log('Importing module');

// In the console result is: logged exporting module first and after that we have logged importing module
// that means the code in exporting module is executed before any code in the importing module.
// the code in this module here is parsed and before it is executed, all the code in the modules that imports is executed first.
// All the imported statements are hoisted to the Top
// We dont's use strict because all modules are executed in strict mode by default
// Now we can import the variable from export// For that we write the exact same name betwen curly braces and after from.
// With named imports you have to give them the same name and put them inside curly braces.
// Now we are able to call this function as it was defined here in this same scope

addToCart('bread', 5);

////Now we can import this variables using the same name inside the curly braces
/// Now we can use them. In this case we just log them.
// Now we have acces to them in this main importing module.
//console.log(price, tq);

//We can change the name also // We simply write totalPrice as price

///////////////////////////////////////////////////////////////////////////
/////❗ Import everything at the same time
/// We can also import all the exports of a module at the same time.// We write import and then a star *  which means everything and as what name we want. // But the convention it is we write the name with first capital letter when we import everything into an object like this
//  * = everything

// This here will create an obj which contains everything that is exported from the module that we specified
// This will basically create a namespace for all of the values, exported from that module.

import * as ShoppingCart from './shoppingCart.js';
console.log('Importing Module');

// Now whenever we want to use something' that was exported from ./shoppingCart.js'// We then take that from this object
ShoppingCart.addToCart('bread', 5);
//'./shoppingCart.js' // basically this module is exporting a public API just like a class.
// it Is as if this object ShoppingCart was an object created from a class which now has these methods addToCart() and also properties like:
console.log(ShoppingCart.totalPrice);

// Offcourse we are not trying to replace classes with modules, its just looks similar

////////////////////////////////////////////
///❗
///This will then import the Default Export no matter what that's called.
// We can give any name that we want // In this case add
//Its advisable do not import the same module twice how we do here
// We can mix all of them in the same import statement
// If we want we can have default and name imports and exports all the same time.// we add  , after  the default name and we add the curly braces {}
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// add('pizza', 2);
// console.log(price);
// ShoppingCart.addToCart('apple', 3);
// console.log(ShoppingCart.totalPrice);
// In practice we ussually never mix Named and Default Exports in the same module
// The prefred style is to use one Default Expert per module and then import that here
//That is the reason why it is easier to import a Default Exports.// Here we dont even need to use the curly braces.
// To make it easier to import default exports

import food from './shoppingCart.js';
food('pizza', 2);

console.log(price);

//❗❗❗Do not use Default and Named Exports

//❗ Imports are live connection to exports
// Imports are not copies of the export. They are instead like a live connection// It means that point to the same place in memory.
import f, { cart } from './shoppingCart.js';
f('bananas', 19);
console.log(cart);

import { birthDate } from './shoppingCart.js';
birthDate(1981);

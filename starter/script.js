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

//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//❗ Top-Level Await (ES2022)
// We can use the await outside of async functions, at least in modules.
// Wich we call Top-Level await
// Only works in modules
// In our HTML file we have our type set to module. This is what is requierd in order to make Top-Level await to work.
//
// const res = await fetch('https://jsonplaceholder.typicode.com/posts'); // is what to do an HTTP or AJAX request.
// Now we use a new API with some fake data. Called json placeholder, we are interested just in post. We copy the url
// And now we can use the top-level await and save it in a variable
// Then we need another await to parse the data as JSON

// const data = await res.json(); // Parse data as JSON
// console.log(data);

//❗ This blocks the execution of the entire module now.
//console.log('Something');
// And sometimes it is not what we want.
// It can be harmful in special in a very long running task

////More real world
// Many times we have sittuations where we want to return some data

///This function do the fetch request and then will only return the very last post.
//We want to return for example a new obj with the title of data(which is the entire array ) and we want to get the last element.
// To get the last element we use the last 2022  at() method, which will get the very last element of an array.
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);
  return { title: data.at(-1).title, body: data.at(-1).body };
};
// The result it is a Promise. It's not the result we were expecting. Because calling an async function will always return a promise.
// Because by the time we are running this code the data has not arrived. We will still have that pending promsise
// The work around to get this data (the obj instead of promise ) is to use a regular promises
// We take this promise that is returned and stored in this variable and on that we call then( method). Then in the then method we get access to the resolved value which we can call last
// const lastPost = getLastPost();
// console.log(lastPost);
// lastPost.then(last => console.log(last));
/// Doing this it's not very clean

// ❗To solve this we use the top-level await
const lastPost2 = await getLastPost();
console.log(lastPost2);
// In situation like this top-level await can get very useful

//❗Another implication of using top-level await
// If one module imports a module which has a top-level await then the importing module will wait for the imported module to finish the blocking code

/////////////////////////////////////////////////////////////
//❗Module Patern OLd Way

//The main goal of module patern is to encapsulate functionality to have private data, and to expose a public API.
// The best way of achieving that is by using a functions, because functions give us private data by default and allow us to return values which can become our public API
///Implementation:
// We start by writing a function. Usualy we write an IIFE(imediatly invoked function expression). The reason is because we don't have to call it separatley, and we can ensure that it's called once
// The purpose of this function it's to crete a new scope and returns just once.
//All this data are private because it is inside of the scope of the function
// Now we have to return some of the stuff in order to return a public API .( to have access)
// For that we return am object which contains the stuff that we want to make public here
// To restore this returned obj we assigned the result of running the IIFE to a new variable ShoppingCart2
// To have acces to all of the data it's because of the closures
// Closures = alow a function to have acces to all the variables that were present at it's birth place.
// IIFE function is  the birth place of the addToCart function
// This is the reason why this works not because the cart it's in the object

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 239;
  const totalQuantity = 23;
  const addToCart = function (product, quantity) {
    cart.push(product, quantity);
    console.log(`${quantity} ${product} added to the cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };
  return {
    addToCart, // The addToCart function was created here
    cart,
    totalPrice,
    totalQuantity,
  };
})();
ShoppingCart2.addToCart('apple', 5);
ShoppingCart2.addToCart('melon', 1);
console.log(ShoppingCart2);

//the data that we want private stay private
// We can't do this :
console.log(ShoppingCart2.shippingCost); // they are undefined

//////////////////////////////////
///////////////////////////////////////////////////////////
//
//❗ NPM Node Package Manager

//NPM its both a software on our computer and a package repository
// We need a way to manage our dependencies in a modern way with NPM

// npm -v = to open NPM

// npm init = In each project in which we want to use NPM we need to initializing it
// This will ask us some questions in order to create a  package.json file
// We press enter to all the deafults
// And we create a file , that file stores the entire configuration of our project

// Now let's install the leaflet library with NPM // We go on leaflet downloads page on Using a javascript package manager npm install leaflet
// Now we get at depandencies leaflet version

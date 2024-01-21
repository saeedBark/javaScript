document.addEventListener("DOMContentLoaded", function() {
   // Wait for the DOM to be fully loaded

   // Get the "Changer" button and the "Base de données" cell
   var changerButton = document.querySelector('button');
   var baseDeDonneesCell = document.querySelector('td');

   // Add a click event listener to the "Changer" button
   changerButton.addEventListener("click", function() {
     // Change the background color of the "Base de données" cell to red
     baseDeDonneesCell.style.backgroundColor = 'red';
   });
 });
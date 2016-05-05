# Arnaud Bourdillon.

   Drag and drop shopping cart.
   W3C validated, cross browser checked (firefox, chrome, safari), responsive page. 
   
   

# Technology used 

HTML5, CSS3, Bootstrap, javascript, ES6, JQuery, JQuery UI, Angular.js

# Contents 

1. Main title
2. Carousel with offer display
3. Section with draggable items and dropable zone
4. Modal when checkout button is press
5. review + item description update 
			   
# Application features 

1. Carousel automated. Pictures can be displayed faster on click
2. Products are draggable towards the dropable zone. Description and item price are displayed on hover
3. Item quantity, name and price are added on a list when dropped in the basket
4. Items in the basket can be removed individually or user can empty the basket
5. Number of items, once added to the basket can be updated manually.
6. User input are verified for each field (only positive integer numbers are accepted).
7. If user input is incorrect, checkout button is disabled and an alert helper is displayed.
8. If user input is correct, user can proceed to checkout.
9. On checkout, a modal appears with the summary of the order and an helper to display if the user enjoys the offer or not.
10. In the modal, update basket button closes the modal and allows the user to modify his order.
11. In the modal, proceed to payment button reloads entirely the page.

# Design choice/Discount 

1. Main application is done with JQuery.
2. Layout and design done with bootstrap.
3. Discount computed as such :
	i. We retrieve the number of items in each field (bread, milk, butter)
	ii. We compute the number of items to which we apply the discount in each field.
	iii. From it we compute the price minus the price of the number of items discounted.
4. Added a condition (for the user comfort) in which if the number of milk selected by the user is a multiple of 3, we add automatically and for free a milk in the basket. Therefore if the user select 3 milks, 4 will be put in the basket for the same price. If he selects 4 milks, the price will be the same as 3.



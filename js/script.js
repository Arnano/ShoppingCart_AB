$(function () {
	
	// ============================================= Improved styling on events =======================================
	// ================================================================================================================

	// === Initially, the validating message and the validation buttons are hiden

	$('#checkout').hide();
	$('#clear').hide();
	$('#fieldCheck').hide();

	// === Adding small effect on hover for the buttons

	$('button').on('mouseover', function () {
		$(this).css('box-shadow', '5px 5px 5px black');
	});

	$('button').on('mouseout', function () {
		$(this).css('box-shadow', 'none');
	});

	// === We desactivate the image links on user click
	
	$('.clear a').on('click', function (e) {
		e.preventDefault();
	});

	// === Display or hide on hovering the description of the products.
	
	$('a').mouseover(function () {
		$('h3', this).css("visibility", "visible");
		$('h4', this).css("visibility", "visible");
	});

	$('a').mouseout(function () {
		$('h3', this).css("visibility", "hidden");
		$('h4', this).css("visibility", "hidden");
	});
	
	// ============================================= Drag and drop ====================================================
	// ================================================================================================================


	// === We make the products draggable towards the basket on the right.
	
	$("#product li").draggable({
		revert: true,
		containment: '.container',
		snap: 'basket',
		helper: 'clone',

		drag: function () {
			$(this).addClass("active");
			$(this).closest("#product").addClass("active");
		},

		stop: function () {
			$(this).removeClass("active").closest("#product").removeClass("active");
		}
	});

	// === We make the basket a droppable zone for the products.
	
	$(".basket").droppable({
		activeClass: "active",
		hoverClass: "hover",
		helper: 'clone',
		tolerance: "touch",
		
		drop: function (event, ui) {

			var basket = $(this),
				move = ui.draggable,
				itemId = basket.find("ul li[data-id='" + move.attr("data-id") + "']");

			if (itemId.html() != null) {
				itemId.find("input").val(parseInt(itemId.find("input").val()) + 1);
			} else {
				addBasket(basket, move);
				move.find("input").val(parseInt(move.find("input").val()) + 1);
			}
			
			verifyInput();	// We also verify the validity of the field on drop

		}
	});
	
	// ============================================= Functions ========================================================
	// ================================================================================================================

	// === Function to add a product to the basket

	function addBasket(basket, move) {

		basket.find("ul").append('<li data-id="' + move.attr("data-id") + '" class="form-group row">' + '<div class="col-sm-3">' + '<input class="count form-control input-sm" value="1" type="number" min="1" step="1" >' + '</div>' + '<span class="name col-sm-5">' + move.find("h3").html() + '</span>' + '<span class="price col-sm-1">' + move.find("h4").html() + '</span>' + '<span class="col-sm-1">&pound;</span>' + '<button class="delete pull-right"><span class="glyphicon glyphicon-remove" style="color:red"></span> </button>');


		if (typeof $('.basket_list ul li') !== "undefined") {	
			$('#checkout').fadeIn('fast');
			$('#clear').fadeIn('fast');
		}

	}
	
	// === Function to check the validity of the form count

	function verifyInput() {

		// --- Set up the boolean for the first field
		function testItemOne() {
			if (typeof $('li[data-id="1"] .count').val() !== "undefined") { // We verify only if the field is defined
				
				if ($('li[data-id="1"] .count').val() <= 0 || $('li[data-id="1"] .count').val().length === 0 || $('li[data-id="1"] .count').val() % 1 !== 0) {
					return false;
					
				} else {
					return true;
				}
				
			} else {
				return true; // If field is undefined we consider it checked
			}
		}

		// --- Set up the boolean for the second field
		function testItemTwo() {
			if (typeof $('li[data-id="2"] .count').val() !== "undefined") { // We verify only if the field is defined
				
				if ($('li[data-id="2"] .count').val() <= 0 || $('li[data-id="2"] .count').val().length === 0 || $('li[data-id="2"] .count').val() % 1 !== 0) {
					return false;
					
				} else {
					return true;
				}
				
			} else {
				return true; // If field is undefined we consider it checked
			}
		}

		// --- Set up the boolean for the third field
		function testItemThree() {
			if (typeof $('li[data-id="3"] .count').val() !== "undefined") { // We verify only if the field is defined
				
				if ($('li[data-id="3"] .count').val() <= 0 || $('li[data-id="3"] .count').val().length === 0 || $('li[data-id="3"] .count').val() % 1 !== 0) {
					return false;
					
				} else {
					return true;
				}
				
			} else {
				return true; // If field is undefined we consider it checked
			}
		}

		// --- Now we enable the checkout button or not depending on the validity of the fields and we show the alert if non valid

		if (!testItemOne() || !testItemTwo() || !testItemThree()) {
			$('#checkout').attr('disabled', true);
			$('#fieldCheck').fadeIn('fast');
			
		} else {
			$('#checkout').attr('disabled', false);
			$('#fieldCheck').fadeOut('fast');
		}

	}
	
	// === Function to clear all items from the basket

	function emptyBasket() {

		$('.basket ul li').fadeOut('fast', function () {
			$('.basket ul li').remove();
		});
		$('#checkout').fadeOut('fast');
		$('#clear').fadeOut('fast');
		$('#fieldCheck').fadeOut('fast');
	}
	
	// === Function to compute the discount when we checkout

	function applyDiscount() {

		// === Local variables to help clarifying the conditions for discount

		
		var discountMilkNumber,
			discountBreadNumber,
			numberMilk = $('li[data-id="1"] .count').val(),
			numberButter = $('li[data-id="2"] .count').val(),
			numberBread = $('li[data-id="3"] .count').val(),
			totalPrice,
			totalDiscountPrice,
			priceMilk = $('li[data-id="1"] .price').text(),
			priceButter = $('li[data-id="2"] .price').text(),
			priceBread = $('li[data-id="3"] .price').text(),
			priceDiscountedBread,
			priceDiscountedMilk,
			totalSavings,
			nameProductMilk = $('li[data-id="1"] .name').text(),
			nameProductButter = $('li[data-id="2"] .name').text(),
			nameProductBread = $('li[data-id="3"] .name').text(),
			numberProductsAll;

		// === Condition on the milk to get the discount 

		if (typeof numberMilk === 'undefined') { // Set the values if the user doesn't take milk
			numberMilk = 0;
			discountMilkNumber = 0;
			priceMilk = 1.15;
			
		} else if (numberMilk % 3 === 0) { // Add a milk in the basket for free when user select multiple of 3
			numberMilk++;
			
				if (numberMilk % 4 === 0) { // Main condition to check if the user is eligible for a discount
					discountMilkNumber = numberMilk / 4;
				
				} else if (numberMilk % 4 !== 0) { // If not multiple of 4, the lower rounded value gives discounted milk num 
					discountMilkNumber = Math.floor(numberMilk / 4);
				}
			
		} else if (numberMilk % 4 === 0) { // Repeat the main condition if first number is not a multiple of three
			discountMilkNumber = numberMilk / 4;
			
		} else if (numberMilk % 4 !== 0) {
			discountMilkNumber = Math.floor(numberMilk / 4);
			
		} else {
			discountMilkNumber = 0;
		}

		// === Conditions on the number of butter to get the number of bread discount

		if (typeof numberButter === 'undefined') {
			numberButter = 0;
			discountBreadNumber = 0;
			priceButter = 0.80;
			
		} else {
			if (numberButter >= 2) {
				if (numberButter % 2 === 0) {
					discountBreadNumber = numberButter - (numberButter / 2);
					
				} else if (numberButter % 2 !== 0) {
					discountBreadNumber = (numberButter - 1) - ((numberButter - 1) / 2);
				}
				
			} else {
				discountBreadNumber = 0;
			}
		}

		// === We check if there is any bread in the basket
		
		if (typeof numberBread === 'undefined') {
			numberBread = 0;
			priceBread = 1.00;
		} else if (discountBreadNumber > numberBread) { // In case user wants 10 butters and 1 bread for example
			discountBreadNumber = numberBread;
		}
		
		

		// === We compute the totals (normal, discount and savings)

		totalPrice = numberMilk * priceMilk + numberBread * priceBread + numberButter * priceButter;
		priceDiscountedBread = numberBread * priceBread - discountBreadNumber * (priceBread / 2);
		priceDiscountedMilk = priceMilk * numberMilk - priceMilk * discountMilkNumber;
		totalDiscountPrice = priceDiscountedBread + priceDiscountedMilk + numberButter * priceButter;
		totalSavings = totalPrice - totalDiscountPrice;
		numberProductsAll = parseInt(numberMilk) + parseInt(numberBread) + parseInt(numberButter);


		// === Data presentation for the checkout process. Since only a small amount of data is needed here,
		// === any loop is unecessary and we can use our local variables for ease.

		$('#checkoutModal tr[data-id="m"] td:eq(0)').replaceWith('<td> Milk </td>');
		$('#checkoutModal tr[data-id="m"] td:eq(1)').replaceWith('<td>' + numberMilk + '</td>');
		$('#checkoutModal tr[data-id="m"] td:eq(2)').replaceWith('<td> &pound; ' + priceMilk + '</td>');
		$('#checkoutModal tr[data-id="m"] td:eq(3)').replaceWith('<td> &pound; ' + (priceMilk * numberMilk).toFixed(2) + '</td>');
		$('#checkoutModal tr[data-id="m"] td:eq(4)').replaceWith('<td> &pound; ' + (priceDiscountedMilk).toFixed(2) + '</td>');

		$('#checkoutModal tr[data-id="bu"] td:eq(0)').replaceWith('<td> Butter </td>');
		$('#checkoutModal tr[data-id="bu"] td:eq(1)').replaceWith('<td>' + numberButter + '</td>');
		$('#checkoutModal tr[data-id="bu"] td:eq(2)').replaceWith('<td> &pound; ' + priceButter + '</td>');
		$('#checkoutModal tr[data-id="bu"] td:eq(3)').replaceWith('<td> &pound; ' + (priceButter * numberButter).toFixed(2) + '</td>');
		$('#checkoutModal tr[data-id="bu"] td:eq(4)').replaceWith('<td> &pound; ' + (priceButter * numberButter).toFixed(2) + '</td>');

		$('#checkoutModal tr[data-id="br"] td:eq(0)').replaceWith('<td> Bread </td>');
		$('#checkoutModal tr[data-id="br"] td:eq(1)').replaceWith('<td>' + numberBread + '</td>');
		$('#checkoutModal tr[data-id="br"] td:eq(2)').replaceWith('<td> &pound; ' + priceBread + '</td>');
		$('#checkoutModal tr[data-id="br"] td:eq(3)').replaceWith('<td> &pound; ' + (priceBread * numberBread).toFixed(2) + '</td>');
		$('#checkoutModal tr[data-id="br"] td:eq(4)').replaceWith('<td> &pound; ' + (priceDiscountedBread).toFixed(2) + '</td>');

		$('#checkoutTotal tr[data-id="tot"] td:eq(0)').replaceWith('<td>' + numberProductsAll + '</td>');
		$('#checkoutTotal tr[data-id="tot"] td:eq(1)').replaceWith('<td> &pound; ' + (totalPrice).toFixed(2) + '</td>');
		$('#checkoutTotal tr[data-id="tot"] td:eq(2)').replaceWith('<td> &pound; ' + (totalDiscountPrice).toFixed(2) + '</td>');
		
		
		$('#totalAll span:eq(1)').replaceWith('<span> <strong> &pound; ' + (totalDiscountPrice).toFixed(2) + '</strong></span>');
		$('#totalAll span:eq(3)').replaceWith('<span> <strong> &pound; ' + (totalSavings).toFixed(2) + '</strong></span>');
		
		// === We show the helper message for the discounts or not
		
		if (discountMilkNumber >= 1 || discountBreadNumber >= 1) {
		
			$('.updatedAlert').replaceWith('<div class="updatedAlert alert alert-info fade in"> You have ' + discountMilkNumber + ' free milk(s) and ' + discountBreadNumber + ' bread(s) half price in your basket</div>');
			
		} else {
			
			$('.updatedAlert').replaceWith('<div class="updatedAlert alert alert-warning fade in"> Buy at least 3 milks or 2 butters if you wish to enjoy our offer !</div>');
		}
			
	}
	
	// === Small function to add a smooth scrolling on navigation
	
	$('header a').on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 1000, function(){
			window.location.hash = hash;
		});
	});

	
	// ============================================= Main events ========================================================
	// ==================================================================================================================

	// === We check the validity of each field on keyup if the user modifies them
	
	$('body').on('keyup', '.basket ul li .count', function () {
		verifyInput();
	});

	// === When we checkout, we compute the discount and open the modal with all infos

	$('#checkout').on("click", function () {
		applyDiscount();
	});

	// === To remove separately each items or empty the basket

	$('body').on('click', '.basket ul li button.delete', function () {
		if ($('.basket ul li').size() === 1) { // Check if it is the only product and if so empty the basket
			emptyBasket();
		} else {
			$(this).closest("li").fadeOut('fast', function () {
				$(this).closest("li").remove(); // If not remove only this product
				verifyInput();	// We check the validity of the remaining fields
			});
		}
	});

	// === To clear entirely the basket

	$('#clear').on('click', function () {
		emptyBasket();
	});
	
	// === For the purpose of this program, the payment button reload entirely the page.

	$('#reloadPage').on('click', function () {
		window.location.reload(true);
	});
	

});
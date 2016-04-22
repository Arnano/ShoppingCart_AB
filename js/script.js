$(function () {
	
	
	$('#checkout').hide(); // === We hide some elements 
	$('#clear').hide();
	$('.basket_list p').hide();

	// jQuery UI Draggable
	$("#product li").draggable({

		// brings the item back to its place when dragging is over
		revert: true,
		containment: '.container',
		snap: 'basket',
		helper: 'clone',

		// once the dragging starts, we decrease the opactiy of other items
		// Appending a class as we do that with CSS
		drag: function () {
			$(this).addClass("active");
			$(this).closest("#product").addClass("active");
		},

		// removing the CSS classes once dragging is over.
		stop: function () {
			$(this).removeClass("active").closest("#product").removeClass("active");
		}
	});

	// jQuery UI Droppable
	$(".basket").droppable({

		// The class that will be appended to the to-be-dropped-element (basket)
		activeClass: "active",

		// The class that will be appended once we are hovering the to-be-dropped-element (basket)
		hoverClass: "hover",
		helper: 'clone',

		// The acceptance of the item once it touches the to-be-dropped-element basket
		// For different values http://api.jqueryui.com/droppable/#option-tolerance
		tolerance: "touch",
		drop: function (event, ui) {

			var basket = $(this),
				move = ui.draggable,
				itemId = basket.find("ul li[data-id='" + move.attr("data-id") + "']");

			// To increase the value by +1 if the same item is already in the basket
			if (itemId.html() != null) {
				itemId.find("input").val(parseInt(itemId.find("input").val()) + 1);
			} else {
				// Add the dragged item to the basket
				addBasket(basket, move);

				// Updating the quantity by +1" rather than adding it to the basket
				move.find("input").val(parseInt(move.find("input").val()) + 1);
			}

		}
	});

	function addBasket(basket, move) {

		basket.find("ul").append('<li data-id="' + move.attr("data-id") + '" class="form-group row">' + '<div class="col-sm-4">' + '<input class="count form-control input-sm" value="1" type="number" min="1" step="1">' + '</div>' + '<span class="name col-sm-3">' + move.find("h3").html() + '</span>' + '<span class="price col-sm-3">' + move.find("h4").html() + '</span>'
			//+ '<button class="delete btn btn-sm btn-danger pull-right">rem</button>'
			+ '<button class="delete pull-right"><span class="glyphicon glyphicon-remove" style="color:red"></span> </button>'
		);


		if (typeof $('.basket_list ul li') !== "undefined") {
			$('#checkout').fadeIn('fast');
			$('#clear').fadeIn('fast');
			$('.basket_list p').fadeIn('fast');
		}

		/*if (typeof $('li[data-id="1"]') !== "undefined" || typeof $('li[data-id="2"]') !== "undefined" || typeof $('li[data-id="3"]') !== "undefined") {
			$('#checkout').show();
			$('#clear').show();
		}*/

	}


	function applyDiscount() {

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
			totalSavings;

		// === Condition on the milk to get the discount 

		if (typeof numberMilk === 'undefined') {
			numberMilk = 0;
			discountMilkNumber = 0;
		} else {
			if (numberMilk >= 4) {
				if (numberMilk % 4 === 0) {
					discountMilkNumber = numberMilk / 4;
				} else if (numberMilk % 4 !== 0) {
					discountMilkNumber = Math.floor(numberMilk / 4);
				}
			} else {
				discountMilkNumber = 0;
			}
		}

		// === Conditions on the number of butter to get the number of bread discount

		if (typeof numberButter === 'undefined') {
			numberButter = 0;
			discountBreadNumber = 0;
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
		}

		totalPrice = numberMilk * priceMilk + numberBread * priceBread + numberButter * priceButter;
		priceDiscountedBread = numberBread * priceBread - discountBreadNumber * (priceBread / 2);
		priceDiscountedMilk = priceMilk * numberMilk - priceMilk * discountMilkNumber;
		totalDiscountPrice = priceDiscountedBread + priceDiscountedMilk + numberButter * priceButter;
		totalSavings = totalPrice - totalDiscountPrice;


		alert(numberMilk);
		alert(numberBread);
		alert(priceMilk);
		alert(totalPrice);
		alert(totalDiscountPrice);
	}

	function emptyBasket() {

		$('.basket ul li').fadeOut('fast', function () {
			$('.basket ul li').remove();
		});
		$('.basket_list p').fadeOut('fast');
		$('#checkout').fadeOut('fast');
		$('#clear').fadeOut('fast');
	}

	// !!!!!!!!!! TODO add a function to verify the validity of the fields

	$('#checkout').live("click", function () {
		applyDiscount();
	});

	$(".basket ul li button.delete").live("click", function () {
		if ($('.basket ul li').size() === 1){ // Check if it is the only product and if so empty the basket
			emptyBasket();
		} else {
			$(this).closest("li").remove();	  // If not remove only this product
		}
	});


	$('#clear').live('click', function () {
		emptyBasket();
	});





});
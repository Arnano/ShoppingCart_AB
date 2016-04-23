$(function () {
	
	
	// === Display or hide on hovering the description of the products.
	$('a').mouseover(function() {
		$('h3', this).css("visibility", "visible");
		$('h4', this).css("visibility", "visible");
	});

	$('a').mouseout(function() {
		$('h3', this).css("visibility", "hidden");
		$('h4', this).css("visibility", "hidden");
	});
	
	// === We initially hide the buttons for checkout and clear.
	$('#checkout').hide();  
	$('#clear').hide();

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

		}
	});
	
	// === FUNCTIONS
	
	// === Function to add a product to the basket

	function addBasket(basket, move) {

		basket.find("ul").append('<li data-id="' + move.attr("data-id") + '" class="form-group row">'
								 + '<div class="col-sm-3">' + '<input class="count form-control input-sm" value="1" type="number" min="1" step="1">' + '</div>' 
								 + '<span class="name col-sm-5">' + move.find("h3").html() + '</span>' 
								 + '<span class="price col-sm-1">' + move.find("h4").html() + '</span>' 
								 + '<span class="col-sm-1">&pound;</span>' 
								 + '<button class="delete pull-right"><span class="glyphicon glyphicon-remove" style="color:red"></span> </button>'
		);


		if (typeof $('.basket_list ul li') !== "undefined") {
			$('#checkout').fadeIn('fast');
			$('#clear').fadeIn('fast');
		}

	}

	// === Function to compute the discount when we checkout

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
	
	// === Function to clear all items from the basket

	function emptyBasket() {

		$('.basket ul li').fadeOut('fast', function () {
			$('.basket ul li').remove();
		});
		$('#checkout').fadeOut('fast');
		$('#clear').fadeOut('fast');
	}

	// !!!!!!!!!! TODO add a function to verify the validity of the fields
	
	// === When we checkout, we open the modal with all infos

	$('#checkout').on("click", function () {
		applyDiscount();
	});
	
	// === To remove separately each items or empty the basket

	$(".basket ul li button.delete").on("click", function () {
	//$(".basket ul li button").on("click", function () {
	//$('.removes').on("click", function () {
		if ($('.basket ul li').length === 0){ // Check if it is the only product and if so empty the basket
		//if ($('.basket ul li').length == 0){ // Check if it is the only product and if so empty the basket
			emptyBasket();
		} else {
			//$(this).closest("li").remove();	  // If not remove only this product
		}
	});

	
	// === To empty entirely the basket
	
	$('#clear').on('click', function () {
		emptyBasket();
	});

});
$(function () {

	var findMilk,
		findButter,
		findBread,
		discountMilkNumber = 0,
		discountBreadNumber = 0,
		priceDisMilk = 1.15,
		priceDisBread = 1.00,
		sum = 0,
		sumDiscounted = 0,
		savings = 0,
		products = {product: []};

	// ============================================= Improved styling on events =======================================
	// ================================================================================================================

	// === We desactivate the image links on user click

	$('.clear a').on('click', function (e) {
		e.preventDefault();
	});

	$('.data-ng-class a').on('click', function (e) {
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

	// ============================================= Functions ========================================================
	// ================================================================================================================

	function findProduct(name, product) {
		for (var i = 0; i < product.length; i++) {
			if (product[i].id === name) {
				return product[i];
			}
		}
	}

	function addToCart(products, name, price) {

		for (var i = 0; i < products.product.length; i++) {
			if (products.product[i].id === name) {
				products.product[i].quantity += 1;
				return; // So that we don't push items if they exist.
			}
		}

		products.product.push({
			id: name,
			quantity: 1,
			cost: price
		});

	}

	function checkDiscount() {

		var isMilk = false,
			isButter = false,
			isBread = false;

		// Permits to check if product is present

		for (var i = 0; i < products.product.length; i++) {
			if (products.product[i].id === "Milk") {
				isMilk = true;
			} else if (products.product[i].id === "Butter") {
				isButter = true;
			} else if (products.product[i].id === "Bread") {
				isBread = true;
			}
		}

		// If there is milk, check for discount

		if (isMilk) {
			findMilk = findProduct("Milk", products.product); // we access attributes values of the found item
			if (findMilk.quantity % 4 === 0) {
				discountMilkNumber = findMilk.quantity / 4;
			} else if (findMilk.quantity % 4 !== 0) {
				discountMilkNumber = Math.floor(findMilk.quantity / 4);
			} else {
				discountMilkNumber = 0;
			}

			$('#display tbody tr[data-id="m"] td:eq(0)').replaceWith('<td>' + findMilk.quantity + '</td>');
			$('#display tbody tr[data-id="m"] td:eq(1)').replaceWith('<td>' + findMilk.id + '</td>');
			$('#display tbody tr[data-id="m"] td:eq(2)').replaceWith('<td>' + Math.round((findMilk.cost * findMilk.quantity)*1e2)/1e2 + '</td>');
		}

		if (isButter) {
			findButter = findProduct("Butter", products.product);
			$('#display tbody tr[data-id="bu"] td:eq(0)').replaceWith('<td>' + findButter.quantity + '</td>');
			$('#display tbody tr[data-id="bu"] td:eq(1)').replaceWith('<td>' + findButter.id + '</td>');
			$('#display tbody tr[data-id="bu"] td:eq(2)').replaceWith('<td>' + Math.round((findButter.cost * findButter.quantity)*1e2)/1e2 + '</td>');
		}

		if (isBread) {
			findBread = findProduct("Bread", products.product);
			$('#display tbody tr[data-id="br"] td:eq(0)').replaceWith('<td>' + findBread.quantity + '</td>');
			$('#display tbody tr[data-id="br"] td:eq(1)').replaceWith('<td>' + findBread.id + '</td>');
			$('#display tbody tr[data-id="br"] td:eq(2)').replaceWith('<td>' + Math.round((findBread.cost * findBread.quantity)*1e2)/1e2 + '</td>');
		}

		// If there is butter and bread, check for discount

		if (isButter && isBread) {
			findButter = findProduct("Butter", products.product);
			findBread = findProduct("Bread", products.product);

			if (findButter.quantity >= 2) {
				if (findButter.quantity % 2 === 0) {
					discountBreadNumber = findButter.quantity - findButter.quantity / 2;
				} else if (findButter.quantity % 2 !== 0) {
					discountBreadNumber = (findButter.quantity - 1) - ((findButter.quantity - 1) / 2);
				}
			}

			if (discountBreadNumber > findBread.quantity) {
				discountBreadNumber = findBread.quantity;
			}

		}
	}

	// === Function to clear all items from the basket

	function emptyBasket() {

		for (var i = 0; i < products.product.length; i++) {
			delete products.product[i];
		}

		sum = 0;
		sumDiscounted = 0;
		savings = 0;
	}

	// ============================================= Main events ========================================================
	// ==================================================================================================================

	$('.addCart').on('click', function () {
		var itemName = $(this).parent().find('h3').html(),
			itemPrice = $(this).parent().find('h4 span:eq(1)').html(),
			roundedSum,
			roundedSumDiscounted;
		
		$('#sidebar').fadeIn('fast');

		addToCart(products, itemName, itemPrice);
		checkDiscount();
		sum += parseFloat(itemPrice);
		roundedSum = Math.round(sum * 1e2) / 1e2;

		if (typeof discountMilkNumber === "undefined") {
			discountMilkNumber = 0;
		} else if (typeof discountBreadNumber === "undefined") {
			discountBreadNumber = 0;
		}

		sumDiscounted = roundedSum - (discountMilkNumber * priceDisMilk + discountBreadNumber * priceDisBread / 2);
		roundedSumDiscounted = Math.round(sumDiscounted * 1e2) / 1e2;
		
		savings = Math.round((roundedSum - roundedSumDiscounted) * 1e2) / 1e2;

		$('#resTot p:eq(0) span').replaceWith('<span class="pull-right"> &pound; ' + roundedSum + '</span>');
		$('#resTot p:eq(1) span').replaceWith('<span class="pull-right">&pound; ' + roundedSumDiscounted + '</span>');
		$('#resTot p:eq(2) span').replaceWith('<span class="pull-right">&pound; ' + savings + '</span>');
	});
	
	// Smooth scrolling
	
	$('header a').on('click', function (e) {
		e.preventDefault();
		var hash = this.hash;

		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 1000, function () {
			window.location.hash = hash;
		});
	});
	
	$('[data-toggle="tooltip"]').tooltip()


});
(function () { 
	
	var app = angular.module('items', []);

	app.controller('ItemsController', function () { 
		this.products = basketContents; 

	});
	
	app.controller('PanelController', function() {
		this.tab = 1;
		this.selectTab = function(setTab) {
			this.tab = setTab;
		};
		this.isSelected = function(checkTab){
			return this.tab === checkTab;	
		};
	});
	
	app.controller('ReviewController', function() {
		this.review = {}; // assign the property review to an object
		this.addReview = function(product) {
			product.reviews.push(this.review);
			this.review = {};	// clear the form
		};
	});

	var basketContents = [
		{
			name: 'Bottle of milk',
			price: 1.15,
			description: 'Milk is a pale liquid produced by the mammary glands of mammals. It is the primary source of nutrition for infant mammals before they are able to digest other types of food. Early-lactation milk contains colostrum, which carries the mother\'s antibodies to its young and can reduce the risk of many diseases. It contains many other nutrients including protein and lactose. As an agricultural product, milk is extracted from mammals during or soon after pregnancy. Dairy farms produced about 730 million tonnes of milk in 2011, from 260 million dairy cows. India is the world\'s largest producer of milk, and is the leading exporter of skimmed milk powder, yet has little to no other milk product exports.',
			images: 'images/milk1.jpg',
			reviews:[
				{
					note : 8,
					body : 'This milk is extremely good. I will keep buying it and enjoying it as for the price the quality is awesome. I recommend this product to everybody.',
					author : 'arnaud.bourdillon@yahoo.fr'
				},
				{
					note : 6,
					body : 'I wasn\'t so convinced with this milk. The taste is not that great and the quantity remains poor for the price',
					author : 'a.c.bourdillon@cranfield.ac.uk'
				}
			]
		},
		{
			name: 'Butter',
			price: 0.80,
			description: 'Butter is a solid dairy product made by churning fresh or fermented cream or milk, to separate the butterfat from the buttermilk. It is generally used as a spread on plain or toasted bread products and a condiment on cooked vegetables, as well as in cooking, such as baking, sauce making, and pan frying. Butter consists of butterfat, milk proteins and water. Most frequently made from cows\' milk, butter can also be manufactured from the milk of other mammals, including sheep, goats, buffalo, and yaks. Salt such as dairy salt, flavorings and preservatives are sometimes added to butter. Rendering butter produces clarified butter or ghee, which is almost entirely butterfat.',
			images: 'images/butter1.jpg',
			reviews:[
				{
					note : 8,
					body : 'This butter is extremely good. I will keep buying it and enjoying it as for the price the quality is awesome. I recommend this product to everybody.',
					author : 'arnaud.bourdillon@yahoo.fr'
				},
				{
					note : 6,
					body : 'I wasn\'t so convinced with this butter. The taste is not that great and the quantity remains poor for the price',
					author : 'a.c.bourdillon@cranfield.ac.uk'
				}
			]
		},
		{
			name: 'Bread',
			price: 1.00,
			description: 'Bread is a staple food prepared from a dough of flour and water, usually by baking. Throughout recorded history it has been popular around the world and is one of the oldest artificial foods, having been of importance since the dawn of agriculture. There are many combinations and proportions of types of flour and other ingredients, and also of different traditional recipes and modes of preparation of bread. As a result, there are wide varieties of types, shapes, sizes, and textures of breads in various regions. Bread may be leavened by many different processes ranging from the use of naturally occurring microbes (for example in sourdough recipes) to high-pressure artificial aeration methods during preparation or baking.',
			images: 'images/bread1.jpg',
			reviews:[
				{
					note : 8,
					body : 'This bread is extremely good. I will keep buying it and enjoying it as for the price the quality is awesome. I recommend this product to everybody.',
					author : 'arnaud.bourdillon@yahoo.fr'
				},
				{
					note : 6,
					body : 'I wasn\'t so convinced with this bread. The taste is not that great and the quantity remains poor for the price',
					author : 'a.c.bourdillon@cranfield.ac.uk'
				}
			]
		}
	];


})();
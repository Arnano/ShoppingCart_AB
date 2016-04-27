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
			//this.review = {createdOn : Date.now()}; // we add a property createOn to the review when added
			product.reviews.push(this.review);
			this.review = {};	// clear the form
		};
	});

	var basketContents = [
		{
			name: 'Bottle of milk',
			price: 1.15,
			description: 'Bread is a staple food prepared from a dough of flour and water, usually by baking. Throughout recorded history it has been popular around the world and is one of the oldest artificial foods, having been of importance since the dawn of agriculture. There are many combinations and proportions of types of flour and other ingredients, and also of different traditional recipes and modes of preparation of bread. As a result, there are wide varieties of types, shapes, sizes, and textures of breads in various regions. Bread may be leavened by many different processes ranging from the use of naturally occurring microbes (for example in sourdough recipes) to high-pressure artificial aeration methods during preparation or baking.',
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
			description: 'Wikipedia reference',
			images: 'images/Butter.jpg',
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
			description: 'Wikipedia reference',
			images: 'images/Bread.jpg',
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
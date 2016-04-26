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
			name: 'Milk',
			price: 1.15,
			description: 'Bread is a staple food prepared from a dough of flour and water, usually by baking. Throughout recorded history it has been popular around the world and is one of the oldest artificial foods, having been of importance since the dawn of agriculture. There are many combinations and proportions of types of flour and other ingredients, and also of different traditional recipes and modes of preparation of bread. As a result, there are wide varieties of types, shapes, sizes, and textures of breads in various regions. Bread may be leavened by many different processes ranging from the use of naturally occurring microbes (for example in sourdough recipes) to high-pressure artificial aeration methods during preparation or baking. However, some products are left unleavened, either for preference, or for traditional or religious reasons. Many non-cereal ingredients may be included, ranging from fruits and nuts to various fats. Commercial bread in particular commonly contains additives, some of them non-nutritional, to improve flavor, texture, color, shelf life, or ease of manufacturing.',
			images: '../images/Milk.jpg',
			reviews:[
				{
					note : 8,
					body : 'My review',
					author : 'arnaud.bourdillon@yahoo.fr'
				},
				{
					note : 6,
					body : 'another review',
					author : 'arnaud.bourdillon@yahoo.fr'
				}
			]
		},
		{
			name: 'Butter',
			price: 0.80,
			description: 'Wikipedia reference',
			images: '../images/Butter.jpg',
			reviews:[
				{
					note : 8,
					body : 'My review',
					author : 'arnaud.bourdillon@yahoo.fr'
				},
				{
					note : 6,
					body : 'another review',
					author : 'arnaud.bourdillon@yahoo.fr'
				}
			]
		},
		{
			name: 'Bread',
			price: 1.00,
			description: 'Wikipedia reference',
			images: '../images/Bread.jpg',
			reviews:[
				{
					note : 8,
					body : 'My review',
					author : 'arnaud.bourdillon@yahoo.fr'
				},
				{
					note : 6,
					body : 'another review',
					author : 'arnaud.bourdillon@yahoo.fr'
				}
			]
		}
	];


})();
(function () { 
	
	var app = angular.module('items', []);

	app.controller('ItemsController', function () { 
		this.products = basketContents; 

	});

	var basketContents = [
		{
			name: 'Milk',
			price: 1.15,
			description: 'Wikipedia reference',
			images: '../images/Milk.jpg'
		},
		{
			name: 'Butter',
			price: 0.80,
			description: 'Wikipedia reference',
			images: '../images/Butter.jpg'
		},
		{
			name: 'Bread',
			price: 1.00,
			description: 'Wikipedia reference',
			images: '../images/Bread.jpg'
		}
	];


})();
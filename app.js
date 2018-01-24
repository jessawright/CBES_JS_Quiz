/*
	Simple static grocery list program.
	Using express - app.get will be the entry point.
*/

var path = require('path')
var express = require('express');
var groceryList = require('./groceries.json')
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

function readExpirationDates(groceries) {
	var eventsArray = [];
  	var loopCounter;
  	for (loopCounter = 0; loopCounter < groceries.length; loopCounter++) {
  		eventsArray.push('\'' + groceries[loopCounter].expiration + '\'');
  	}
  	return eventsArray;
}

function formatGroceryText(name, price, expiration) {
	var formattedName = name;
	var formattedPrice = '';
	/* A.
	The next line originally read:
	if (price === 0) {
	Since we are comparing a string (from groceries.json) to a number, the strict equality (===) will always evaluate false. Using standard equality (==) gets what we want: a comparison of numerical values after the sting from groceries.json is converted to a number.
	*/
	if (price == 0) {
		formattedPrice = 'FREE!';
	} else {
		formattedPrice = '$' + price;
	}

	var msec = Date.parse(expiration);
	var newDate =  new Date(msec);
	var formattedExpiration = `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`
	var formattedResult = formattedName + ': ' + formattedPrice + ' - Expires On: ' + formattedExpiration;
	return formattedResult;
}

function createGroceryHTML(groceries) {
	var groceryHTML = '';
	var loopCounter;
	for(loopCounter = 0; loopCounter < groceries.length; loopCounter++) {
		var currentGrocery = groceries[loopCounter];
		var groceryText = formatGroceryText(currentGrocery.name, currentGrocery.price, currentGrocery.expiration);
		groceryHTML += (`<div id="grocery-list">${groceryText}</div>`);
	}

	return groceryHTML;
}

function calculateCosts(groceries) {
	var costs = {
		"total": 0,
		"average": 0
	}
	var loopCounter;
	for(loopCounter = 0; loopCounter < groceries.length; loopCounter++) {
		var currentGrocery = groceries[loopCounter];
		costs.total = costs.total + parseFloat(currentGrocery.price, 10);
	}
	costs.average = costs.total/loopCounter;
	return costs;
}

//Entry point in the code
app.get('/', function (req, res) {
	try {
			var groceries = groceryList.groceries;
			var expirationEvents = readExpirationDates(groceries);
			var listOfGroceries = createGroceryHTML(groceries);
			var groceryCosts = calculateCosts(groceries);
			groceryCount = groceries.length;
			var html = ('<link rel="stylesheet" type="text/css" href="css/site.css">');
			html += ('<link rel="stylesheet" type="text/css" href="css/pikaday.css">');
			html += ('<div id="welcome">Welcome</div>');
			html += ('<div id="grocery-list">Grocery List</div><br>');
			html += listOfGroceries;
			html += (`<br>
				  <input type="text" id="datepicker">`);

			html += (`<script src="pikaday/pikaday.js"></script>
						    <script>

						    var picker = new Pikaday(
						    {
						    	defaultDate: new Date(2019, 00, 13),
						    	setDefaultDate: true,
						        field: document.getElementById('datepicker'),
						        firstDay: 1,
						        ${expirationEvents.length ? 'events:[' + expirationEvents + '],' : ''}
						        minDate: new Date(2019, 00, 01),
						        maxDate: new Date(2020, 11, 31),
						        yearRange: [2000,2020]
						    });

						    </script>`);

			html += (`<div>Total Number of Groceries on List is ${groceryCount}</div>`);
			html += (`<div>Total Cost of Groceries on List is $${groceryCosts.total.toFixed(2)}</div>`);
			html += (`<div>Average Cost of Groceries on List is $${groceryCosts.average.value.toString().toFixed(2)}</div>`);
	}
	catch(e) {
		console.log(e);
	}
  	res.send(html);
  	var groceryCount;
});

app.listen(3007, function () {
  	console.log('Running on port 3007');
});

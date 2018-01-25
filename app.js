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

	//if (price === 0) {
	if (price == 0) {
		/*
			A.
			I changed the line above. Since we are comparing a string (from
			groceries.json) to a number, the strict equality (===) 	will always
			evaluate false. Using standard equality (==) gets what we want: a
			comparison of numerical values after the sting from groceries.json is
			converted to a number.
		*/
		formattedPrice = 'FREE!';
	} else {
		formattedPrice = '$' + price;
	}

	var msec = Date.parse(expiration);
	var newDate =  new Date(msec);

	//var formattedExpiration = `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`
	var formattedExpiration = `${("0" + (newDate.getMonth() + 1)).slice(-2)}-${("0" + newDate.getDate()).slice(-2)}-${newDate.getFullYear()}`
		/*
			B.
			I changed the line above. When the integer value of the month or day was
			a single digit, this did not match the requested date format including
			two digit months and days (MM-DD-YYYY). To fix that, I added a leading
			zero to the month/day regardless of the length of the integer, then
			sliced off the last two digits of the result. This results in two digits
			that include the leading zero when necessary and discard it when not. I
			did this for both the month and the day, because those values both
			sometimes need the leading zero, even though this exercise does not
			actually include any dates with single digit integer days.
		*/
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
	/*
		I added sales tax to this calculation by adding a "tax" entry to the object,
		adding a list of alcohols to check grocery items against, and adding a
		conditional statement to determine the tax rate to apply to each item.
	*/
function calculateCosts(groceries) {
	var costs = {
		"total": 0,
		"average": 0,
		"tax": 0
	}
	var loopCounter;
	var alcoholList = ["Wine", "Beer", "Spririts", "Cough Syrup"];
	for(loopCounter = 0; loopCounter < groceries.length; loopCounter++) {
		var currentGrocery = groceries[loopCounter];
		var taxRate = ((alcoholList.includes(currentGrocery.name) ? .11 : .0975));
		costs.total = costs.total + parseFloat(currentGrocery.price, 10);
		costs.tax += currentGrocery.price * taxRate;
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
			/* Added line to display the total tax on the groceries on the list */
			html += (`<div>Total Tax on Groceries on List is $${groceryCosts.tax.toFixed(2)}</div>`)
			//html += (`<div>Average Cost of Groceries on List is $${groceryCosts.average.value.toString().toFixed(2)}</div>`);
			html += (`<div>Average (pre-tax) Cost of Groceries on List is $${groceryCosts.average.toFixed(2)}</div>`);
				/*
					C.
					I changed the line above, removing "value.toString()." I'm not sure
					what ".value" is meant to do, but, if it successfully returned a
					thing and ".toString()" was a valid method for it, ".toString()"
					would return a string, and the method ".toFixed(2)" requires a
					number, so it would throw a TypeError because a string is not a number.
				*/

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

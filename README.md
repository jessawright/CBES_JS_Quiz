# CBES_JS_Quiz

Please Fork this quiz into your own repository, upload your answers into your repo, and send us the link!

# Installation
-------------------------
1 - Download & Install Node (Only using this for npm and running the program) https://nodejs.org/en/download/
2 - Run "npm install" in the directory where you placed the code

# Run
-------------------------
1 - Run "node app.js" in the directory where you placed the code
2 - Navigate to http://localhost:3007/ in the browser of your choice

# Expected Behavior
-------------------------
This very simple grocery list functions as follows...
 - Imports a collection of groceries from a .json file
 - Displays those items to the page
   - If a item costs nothing it will display the cost as "FREE!"
   - Costs are displayed with a $
   - Dates are displayed as MM-DD-YYYY (does not include datepicker)
 - A date is shown in an input box
 - Clicking in that input box will open a date picker
 - That date picker will highlight dates where groceries are to expire in red
 - Displays the total number of items in the grocery list
 - Displays the total cost of items in the grocery list
 - Displays the average cost of items in the grocery list
 - Exceptions are logged to the node/cmd console


# Questions/Tasks
---------------------------
1 - Add a new item to the grocery list .json, have it expire on 1/21/2019
2 - There are a couple of pieces of the expected behavior that are not performing as described above. What are they?
3 - Fix the issues you found in item 2.
4 - The variable groceryCount is declared at the last line of app.get, why does it still work?
5 - Add code that calculates a 9.75% sales tax on all groceries, and an 11% sales tax on alcohol (reflect this on the page somehow).

Feel free to add styles to the CSS to make this look better!
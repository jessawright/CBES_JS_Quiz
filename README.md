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


# Answers
---------------------------
1 - Cookies are item 4, cost $19.95, and expire 1/21/2019.

2 - Expected behavior that isn't happening:
 - A. Items that cost nothing (Eggs) don't display as "FREE!"
 - B. Dates are not displayed as MM-DD-YYYY (single digit months fail to get a leading zero).
 - C. The average cost of the items in the grocery list is not displayed.

3 - Issue fixes are noted in the code with comments. I tried to make them easy to read. A. starts at line 27, B starts at line 45, and C starts at line 135.

4 - The variable groceryCount still works, despite being declared in the last line of app.get because it is hoisted. When Javascript compiles, function and variable declarations go to the top (are hoisted to the top) of their respective scopes, and things proceed chronologically from there. It makes no functional difference where groceryCount is declared as long as it is in the the same scope.

5 - Code added. The code addition starts at line 74 and the display addition starts at line 133.

CSS - I was conflicted about how to handle this, so I made two branches.
  - Master Branch - I handled this conservatively here, with styling that only required minimal tweaks to the HTML.
    - Retagged some of the HTML to make it more semantic and accessible (ex. `<div id="welcome">Welcome</div>` became an h1).
    - Got rid of some `<br>` since they appeared intended to add whitespace to the display, which is better done with CSS (maybe I am wrong about that?).
    - Deleted unused CSS in site.css. (I left pikaday.css alone.)
    - Adjusted some of the spacing and typography to give it better visual hierarchy.
  - Fun Branch - I had fun, I tinkered with the HTML as much as I wanted, edited wording, and generally played around.
    





# TODO
 ---------------------------
 - Double check that the line references in README are still correct before I send the link.
 - Edit some of the header info before I send the link.

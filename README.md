# Child Growth Chart and Tracker
## A Code Louisville FSJS Final Project

**Intro**

The project contained in this repository
is a growth chart tracker.

This application uses CRUD functions.

Skills used to create this application include:
HTML, CSS, and JavaScript MEAN Stack.

**Description**
This is an application that tracks the growth of
a child. Users can *CREATE* an entry by clicking the Add Chart button
and then filling out and submitting the form. Users can view *READ* a
previous entry by clicking the view button. If a user wishes to *UPDATE* an
entry, they will do so by clicking the edit button, which will toggle the form.
Simply make updates to the form and click submit. A user can *DELETE* an entry
by clicking the delete button. For the purposes of this project, the entry will
be "soft deleted".


### Project Requirments
1. Responsive
2. Written primarily using JavaScript meanstack path
 (mongo/express/anything/node)
3. Implements both front-end component using html, css, JavaScript, and front-end JavaScript framework/library
 (Jquery or Angular are good choices)
4. Implements a back-end component using node.js and build/use a NoSQL database with MongoDB
5. Implements all 4 CRUD functions on your database
 (create, read, update, and delete)
6. Has comments
7. Includes a readme file that includes:
  1. Brief description of project's purpose and functionality
  2. Detailed steps on how to start the application and any prerequisites to run it.
   (for example if the project requires using a package manager like NPM, you must include any requirements needed to run it and the steps needed to view and gets started using.)
8. Project code is on your Github in it's own repository

**To access the application on your local machine**
In order to view and access/use this application on your local machine, you must first download/clone the project onto your own machine.

1. After cloning install the necessary dependencies:
    npm install

2. After necessary dependencies are installed you will be able to view this application on:
    http://localhost:5000/

3. Software needed to operate this application will be a command prompt to run the express server, a browser to view the html content, and the necessary dependencies installed through npm. You will also need to have the .env file which contains the required login and password information to access and use the database. Simply place the .env file in the root folder to be able to use the database.

**To access the application on your local machine**
To begin using the application simple click the add button. This will bring forth a form in which you can enter your child's stats.

After you have filled in the form, click the submit button and your data will be displayed in the table.

You may make as many entries as you wish.

If you wish to edit an entry, click the edit button displayed to the left of the entry. The form will display once again with your previous data already entered. Make your changes and click submit. Your entry will be updated and displayed back in the table.

If you wish to delete an entry, click the delete button displayed to the left of the entry and next to the edit button. By clicking the delete button your entry will be deleted (soft delete) and no longer be visible to you.

You may also view a single list item from the table by clicking the view button. To dismiss the data provided in the list, click the close button.

**Future Goals for this Project**
Although this project currently meets all the standards for the project requirements, it is my goal to continue to work on and improve this project.
Future functions will include a calculating ability that will provide the user with whether their child's stats are average, or above or below average.
You may note that in the code you will see sections of code commented out for the future build of this project.
Furthermore, the desired outcome of this project would be not only to provide the averages of a child's weight and height, but to project those results on a dynamic chart that can be updated by the user.

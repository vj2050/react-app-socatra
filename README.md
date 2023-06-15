# Overview:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

## Objective of the Project:

This application calls the Socrata API and displays a table of results. The Dataset used is from Seattle about Food Establishment inspections. 

Implemented pagination functionality and have shown atleast 10 results in a table per page along with additional options for displaying 25 or 50 results per page.

Allowed users to filter the results by name, zip_code, and inspection_result by implementing a filtering feature to filter out the records based on these three searchable parameters. Implemented exact match for inspection_result and case insensitive 'includes' function to filter the results based on name and zip_code.

Implemented a Pie Chart using Chart.js library to create a visualization that counts the number of restaurant inspections by inspection_result.

## Steps to Run the Project:

Make sure you have Node and npm installed. 

In the project directory, you can run:

### `npm install`

This command will install all the dependencies listed in the package.json that we need to execute this project.

### `npm start`

This command will run the application locally. Open http://localhost:3000 to view it in your browser.

### Additional information about the components of the application:

Once the application is up and running and you can view it in the browser, you can initially see the table consisting all the results from the Seattle about Food Establishment inspections Data.

You can see a search bar on the top of the table where you can provide searchable parameters in the search bar in order to filter the results based on these parameters and view the table as well as the pie chart based on these filtered results.

On the top of the search bar, you can see a pie chart, a visualization of the inspection results presented in the table. One can hover over the pie chart to see statistical information such as the count of each of the insepction result category for the filtered results.




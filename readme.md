# fsl-candidate-api

> Code for the API used on Fitshipper's Frontend hiring challenge.

# Instructions:

Fitshipper is an application that helps US based users quickly and cheaply mail USPS packages. You will be building a UI to create, read, update, and delete US based addresses. 

You should use modern React (hooks, not Classes) and Tailwind CSS to style the application. We ask that you spend no more than 2 hours on the challenge. It is not expected you will finish the entire challenge, but we'd like to see how far you can get in the allotted time.  

Your work should be in a Github repo. When you are done, email the link with the repo to: @larson@fitshipper.com

There is an `Addresses` API available at [https://fsl-candidate-api-vvfym.ondigitalocean.app](url). You can view the API docs [here](https://fsl-candidate-api-vvfym.ondigitalocean.app/documentation/json).  

## Task 1
Retrieve all addresses and display them in a table. The addresses table should be filterable and sortable by the `Address 1`, `City`, and `State` fields. Something something pagination.

## Task 2
Clicking on an address should bring you to a form which allows you to edit the address. The form will have 2 views, a "fields" view and a "textbox" view. You should be able to toggle between the 2 views, and the same data should be available in both views. If you update and save an address via the fields, the address should change in the textbox and vice versa.
![CleanShot 2022-01-10 at 22 50 24](https://user-images.githubusercontent.com/1128711/148894927-ed4790c7-2bec-455e-a254-9716989d6300.gif)

## Task 3
Using as much of the code as possible from the previous task, create a form for a user to create a new address. 

## Task 4 
An address should have a delete button. Please only delete addresses you create. 

## License

Copyright © Fitshipper

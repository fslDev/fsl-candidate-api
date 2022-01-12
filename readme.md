# Fitshipper Front End Hiring Challenge

## Instructions:

You will be building a UI to `CREATE`, `READ`, `UPDATE`, and `DELETE` US based `addresses`. 

There is an `Addresses` API available at [https://fsl-candidate-api-vvfym.ondigitalocean.app](url).

You can view the API docs [here](https://fsl-candidate-api-vvfym.ondigitalocean.app/documentation/json).  

You should use modern React (hooks, not Classes) and [Tailwind CSS](https://tailwindcss.com/) to style the application.

We ask that you spend no more than 2 hours on the challenge. It is not expected you will finish the entire challenge, but we'd like to see how far you can get in the allotted time.  

Your work should be in a Github repo. When you are done, email the link with the repo to: `larson@fitshipper.com`


### Task 1
Retrieve all `addresses` and display them in a table. The `addresses` table should be filterable and sortable by the `Address 1`, `City`, and `State` fields.

The table with `addresses` should be paginated. Every page should display 5 records from the API.
 - (Bonus:) Change the number of records displayed to 5, 10 and 25 records per page.

We recommend you use [react-table](https://github.com/tannerlinsley/react-table).

### Task 2
Clicking on an `address` should bring you to a form which allows you to `UPDATE` the `address`. The form will have 2 views, a `Fields` view and a `Freeform` view. You should be able to toggle between the 2 views, and the same data should be available in both views even without saving. 

Clicking the `Save Address` Button will `UPDATE` the `address`. 

The textbox format will always be as follows:

`name` <br>
`address1` `address2` <br>
`city`, `state` `zip` <br>

<img width="416" alt="CleanShot 2022-01-11 at 15 09 27@2x" src="https://user-images.githubusercontent.com/1128711/149036046-65b6b57c-07dd-4ab0-b232-ca76d242a2eb.png"><img width="415" alt="CleanShot 2022-01-11 at 15 07 42@2x" src="https://user-images.githubusercontent.com/1128711/149036043-9d16d683-496e-4fa8-a870-d72603b4b735.png">


### Task 3
Reusing as much of the component/code as possible from the previous task (Updating an `address`), create a form for a user to `CREATE` a new `address`. 

### Task 4 
From the table view, you should be able to `DELETE` an `address`. 

## License

Copyright © Fitshipper

# make-it-train

## Created using HTML, CSS, Bootstrap, JavaScript, jQuery, Firebase, Moment.js

## Instructions

- using the provided form enter the following:
  - Train Name
  - Destination
  - First Train Time (in HH:mm format --must be military time)
  - Frequency of train (in Minutes)
- click submit button to update the page.

## Code Review

using an event listener for the submit button, input values are pushed to Firebase and stored. Each time a new item is pushed to the database, the database listens for a change in added children, and displays the new entry in the table display. The application is fairly simple as it consists of 2 paheses. phase one gathers and stores the data, will phase to reads the stored data and displays it the the page for the user.

## Deployed Project

link to deployed version of this project:
https://gmocore.github.io/make-it-train/

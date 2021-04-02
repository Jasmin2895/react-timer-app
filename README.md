# React Timer App

This is a task scheduler application which helps to specify time intervals in which a task can be scheduled. It also has a feature to validate time against the provided time intervals and show that is the time valid.

## Installation

To setup and run the app locally we can use the following commands:

`npm i`

`npm start`

## How does this app work?

This has two pages one to create and add time interval at the route `/` and another page to validate time against different time inetervals at route `/config`.

On Main page you can add the time range in the input field which accepts the specified format. On config page you can validate the specified time against the given time intervals.

## Task II

In order tos shift the logic to server side we would need the following API.

1. A POST API to save the defined time ranges on the database.
2. A GET API to fetch the time ranges from the database.
3. POST API to save the list of validated time slots added by the user to database.
4. GET API to retrieve the list of validated time slots from the database.

When the user add the time range a POST api call should be made to save the time range. The number of API calls can be large so we can define a limit on the Frontend for the maximum number of time slots that can be added or check on the backend to ensure that maximum time slots added. GET API for time range will be used to fetch the list of time slots on main and config page.

For config screen we can have a API to save the users list of validated time slots since the number of API calls can be many in this case so we can have a cap limit on Frontend which makes use of **debouncing concept** to make limited API calls to save the validated time slots. If not keeping any cap limit we can use **throttling concept** for making API calls in this case.

Time Range which is currently stored as a Array of strings in localstorage can be passed as UTC string to backend which will be easier to store in DB and also would avoid issues related to different timezones. Similarly user Time slots are stores as string array along with their available status can be passed as collection with time converted to UTC format.

LHL Midterm - PinQuest: The number 1 pinterest clone
=========

## Features

The following steps are only for _one_ of the group members to perform.

* users are be able to save an external URL along with a title and description
* users are be able to search for already-saved resources created by any user
* users are be able to categorize any resource under a topic
* users are be able to comment on any resource
* users are be able to rate any resource
* users are be able to like any resource
* users are be able to view all their own resources on one page ("My Pins")
* users are be able to view all their favorited resources on one page ("Favorites")
* users are be able to register, log in, log out and update their profile

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Install postresql
3. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
4. Install dependencies: `npm i`
5. Fix to binaries for sass: `npm rebuild node-sass`
6. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Final Product


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

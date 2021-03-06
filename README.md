# Vocab-Project

The base code for this project comes from the result of projects finished during [The Complete 2022 Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/) taught by Dr. Angela Yu. 

The goal is to create a practical vocabulary app using MERN that will be of use to my students learning English, Portuguese and Spanish. I want to provide an application which will display some of the vocabulary that I have discussed as well as let students save and delete their own vocabulary notes to their local machine.

## Initial Setup

The first step is to take the code from two previously completed projects. One project was written in Node.js and Express and the other implemented React. After the initial upload to GitHub, we need to see if we can get the information from our previously created API and connect it to the React portion of the App.

## Connecting React code to Node 

As this is a new skill that I have never previously worked on, I have to do some research to find different ways to build a MERN application. The method I settled on is running multiple scripts through the package.json file. 

This step was made possible by using the [concurrently](https://www.npmjs.com/package/concurrently) package from npm. 

After connecting the two ends, it is now possible to send information from the React side to the backend, but in the final version of this application, the users should not be able to send information to the backend as everything will be stored on their local devices. So, the next step is getting the information from the backend and displaying it using React.

## Displaying the Database information

In order to display the data from the backend, I implement a simple fetch algorithm within a useEffect Hook. The algorithm targets the database and looks for the data. When data is found, it is converted to a readable format and then the useState Hook is triggered to display the information.

The information from the database was then styled and moved to it's relative location.

## What I Learned from this Project

- package.json scripts
- package.json proxy
- useEffect React Hook
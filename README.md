# Enthire-Assignment

## Client
Move to client directory and run command npm install to install react dependencies and run npm start
Client side excalidraw skeleton app is taken from [code sandbox](https://codesandbox.io/s/excalidraw-ehlz3).
onChange function is on line 168 in App.js and debouncing function is used for api call in every 10 seconds. Any change done on editor will be reflected in uploads folder with same name as room variable in server directory.



## Server
Move to server directory and run command npm install to install node dependencies and run nodemon start for server.
Routes file contains two routes, one for uploading image and other for retrieving file names.
All the images are save in uploads folder. 
data.json file in server folder contains array of uploaded filenames.

# tracer-people

Created for the "React, Redux, and You" presentation.

This project contains two versions of a React app. Both look and act the same, but one is React only, and the other uses React + Redux. Both use functional components and hooks. The project also includes a Node server that serves both apps and provides an API that retrieves and updates data in a sqlite database.

## Building

`npm run build` will build the project, and `npm run watch` will build and automatically watch for changes. Resulting files are output to the `static` directory.

`npm start` will run the server.

## Running

Once the files are built and the server is running, `http://localhost:9000/react.html` will load the React only version, and `http://localhost:9000/react-redux.html` will load the React Redux version.

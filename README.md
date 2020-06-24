# Getting Started Locally

## Setting up the package manager
If you haven't already Install Node.js and NPM, follow this link and install Node (npm included)
https://nodejs.org/en/


## Working with GIT
In Terminal, make a folder for this project and open the folder in VS Code.

In the folder you just made in VS Code, go to Terminal > New Terminal and run the following command:

`git clone https://github.com/garretthaas/covid-dashboard/tree/master`

Once you see the repository files on your local computer, run the following commands in the same Terminal. Make sure to replace name-of-your-branch with your name, e.g. h0plyn.

`git checkout -b name-of-your-branch`

`git push origin name-of-your-branch`

`git branch`

All your changes will be done on this new branch. To commit your code use terminal.

add your changes: `git add .`

commit your changes: `git commit -m 'brief note on what you changed'`

push to your branch: `git push origin name-of-your-branch`

## Running the site locally

Then in the project folder in VS Code, go into Terminal and run:

`npm install` 

once, the install is done, you can watch and run the local server with the following commands:

To watch for scss changes:

`npm run styles`

To Launch the local server:

`npm run server`
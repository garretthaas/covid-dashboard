# Getting Started Locally

## Setting up the package manager
If you haven't already Install Node.js and NPM, follow this link and install Node (npm included)
https://nodejs.org/en/


## Working with GIT
Make a folder for this project somewhere on your computer. I keep them in a "sites" folder in my "User" folder. Open the project folder you just made in VS Code.

1. In VS Code go to Terminal > New Terminal.
2. Then go to Terminal > Split Terminal.
3. Do that so you have 4 Terminal windows open.
4. In the first terminal window run the following command:

`git clone https://github.com/garretthaas/covid-dashboard/tree/master`

Once you see the repository files on your local computer, run the following commands in the same Terminal window. Make sure to replace `name-of-your-branch` with your name, e.g. h0plyn.

`git checkout -b name-of-your-branch`

`git push origin name-of-your-branch`

`git branch`

All your changes will be done on this new branch. This new branch is your own. You can't mess up the master branch by working on your branch. 

Now, change the h1 tag in the index.html file and save. Next you will add, commit, and push your code changes to the repository branch you just made. To commit your code use the first Terminal Window again.

Add your changes: `git add .`

then commit your changes: `git commit -m 'brief note on what you changed'`

finally, push to your branch: `git push origin name-of-your-branch`

## Running the site locally

Go back to the first Terminal window in VS Code and run:

`npm install` 

Wait for the install to finish.

This is where the other 3 terminal windows come into play...

In terminal window 2, launch the local server with:

`npm run server`

In terminal window 3 watch for scss changes with:

`npm run styles`

In terminal window 4 watch for javascript / js module changes with:

`npm run scripts`

Keep using terminal window 1 for git commands. 

Having 4 different terminal windows for this is unideal and these commands need to be refactored. Ideally, we will have a single `npm run watch` command, but I don't know how to do that yet. For now this will have to do. Appreciate your flexibility working with this.

If you run into errors message me on slack.

-g
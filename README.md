![Neadz logo](http://res.cloudinary.com/dqgfi8kqd/image/upload/c_scale,w_50/v1523349213/logo_mail.png)

# Neadz

Front Project built with Angular

## Getting Started

### NPM Registry

In order to be able to start the front project. You will need to add our private registry on npm.
To do so, you will need to add this line on your **.bash_profile** or **.profile**, depending if you are using bash or sh.


If you do not want to restart your Terminal Application or Computer, you can run :
`source ~/.bash_profile` or `source ~/.profile`

### Install

Now you can install your dependencies peacefully.

`npm install`

## Development server

To run the dev server :

`npm run start` 

Navigate to `http://localhost:4200/`.

The app will automatically reload if you change any of the source files.

## Lint

Some rules have been set on the project. **Before** doing a merge request, don't forget to run the command :

`npm run lint`

And then to fix your problems. 

## Build

Building is also important in order to be sure that nothing is broken.

For Dev build :
`npm run build`

For Prod build :
`npm run build:prod`

The build artifacts will be stored in the `dist/` directory.

## GIT

We are using the Git Flow Process.

### Feature

Each new functionalities needs to be implemented through a branch on `origin/feature/your_branch_name`.

Each time you will push your local to the remote, a pipeline will be run with 2 jobs :

* Lint
* Build

### Merge Feature

In order to merge your feature to develop, you will need to create a merge request.

The merge request to be approved has to go through 3 validation process :

* *Jobs Validation*

		Your merge request needs to pass the 2 jobs **build** & **lint**. Otherwise it won't be accepted.

* User validation

		Your merge request need to be read and accepted by someone else.

* Update Branch

		Your merge request need to be up to date compared to develop. If not it won't be possible to merge it.

		In order to update it, be sure that your local develop is up to date from the remote :

		%> git checkout develop

		%> git pull
		
		Then you can rebase your branch from develop :
		
		%> git checkout feature/your_branch_name
		
		%> git rebase develop feature/your_branch_name
		
		%> git push --force-with-lease


### Rebase VS Merge

In order to get a nice git history, merge are reserved for features being merged to develop. Or for new releases that will be merged on develop / master.

In all other cases, you should rebase your branch. Rebasing will not create a merge commit. It will only apply the missing commit into your branch. 

Follow **Update Branch**, to update your branch from develop.

If two developpers works on the same branch, you should also rebase the work of your collegue. Be careful when you do a git pull. By default git pull will create a merge commit.

Run `git pull --rebase` to fetch and rebase modification from your collegue on your local branch

## Protractor

First things first : install protractor on your computer :
```
npm install -g protractor
```
Then it install you a command named 'webdriver-manager', run 
```
webdriver-manager update
webdriver-manager start
```
Once it started in a new console run
```
protractor conf.js
```
Please note that before running this command you want to be sure to have all the browsers needed installed,
so far you need : 
- Google Chrome
- Mozilla Firefox 


## Further help

To get more help, ask for Yacine Salhi ;p

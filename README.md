# SOS App Angular

This protect aims to provide a flexible and maintainable feedback system for SOS.

**Getting Started:**
- Angular
    - [Lab:  Getting started with a basic Angular app ](https://angular.io/start)
    - [Lab: Tour of Heroes app and tutorial](https://angular.io/tutorial)
- Ionic
    - [Lab: Ionic Tutorial](https://ionicframework.com/docs/v3/intro/tutorial/)

**Useful Resources:**
- [Angular Docs](https://angular.io/docs)
- [Ionic Framework Docs](https://ionicframework.com/docs)
    - [Ionic Components Docs](https://ionicframework.com/docs/components)
    - [Ionic CSS Utilies Docs](https://ionicframework.com/docs/layout/css-utilities)

**Table of contents**
- [SOS App Angular](#sos-app-angular)
    - [Installing Git](#installing-git)
    - [Installing Node](#installing-node)
    - [Installing Angular](#installing-angular)
    - [Installing Ionic](#installing-ionic)

## Installing Git
Git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

**MacOS**: https://git-scm.com/download/mac
1. Git is bundled with Xcode so we will install that now
2. Open the App Store
3. Search for `Xcode`
4. Click Install

**Windows**: https://git-scm.com/download/win
1. You may want to change the default text editor (Vim is hard)
1. All other default installer settings are fine

**Linux (Debian-Based Systems)**
1. If you haven't recently, in your terminal, run `sudo apt update && sudo apt upgrade`
2. Install git from the repositories with `sudo apt install git`

## Installing Node & npm
- Node is a run-time environment that includes everything needed to execute a JavaScript program
- npm (node package manager) is an application & repository for developing and sharing JavaScript code
- Node: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

**Linux (Debian-Based Systems)**
1. If you haven't recently, in your terminal, run `sudo apt update && sudo apt upgrade`
2. Install node from the repositories with `sudo apt install nodejs`

**Windows**
1. https://nodejs.org/dist/v12.19.0/node-v12.19.0-x64.msi
1. Use installer defaults
1. To verify
    1. `Windows key + r` keyboard shortcut
    1. Type `cmd` and hit `enter`
    1. Enter `node -v` to verify node installation
    1. Enter `npm -v` to verify npm installation

## Installing Angular
Angular: https://angular.io/guide/setup-local#install-the-angular-cli

**Linux (Debian-Based Systems)**
1. In your terminal, run `npm install -g @angular/cli`

**Windows**
1. `Windows key + r` keyboard shortcut
1. Type `cmd` and hit `enter`
1. Enter `npm install -g @angular/cli`
1. Use default installation options (will NOT share usage data by default)

## Installing Ionic
Ionic: https://ionicframework.com/docs/intro/cli#install-the-ionic-cli

**Linux (Debian-Based Systems)**
1. In your terminal, run `npm install -g @ionic/cli`

**Windows**
1. `Windows key + r` keyboard shortcut
1. Type `cmd` and hit `enter`
1. Enter `npm install -g @ionic/cli`

## Clone the Repository

**Windows**
1. Create a projects folder if you don't already have one and go to it in Command Prompt
    1. `Windows key + r` keyboard shortcut
    1. Type `cmd` and hit `enter key`
    1. Type `cd c:\ && mkdir appdev && cd appdev` and hit `enter key`
1. Type `git clone https://github.com/SOScodeteam/SOS_App_Angular`
1. In your projects folder you should now have a folder called SOS_App_Angular

**MacOS**
1. Create a folder named appdev on Desktop. Open terminal.app and navigate to appdev.  
    1. Navigate to desktop: Run `cd Desktop`
    1. Navigate to appdev: Run `cd appdev`
    1. Run `git clone https://github.com/SOScodeteam/SOS_App_Angular`

## Run the app

**Windows**
1. Within `cmd`
1. Go to the project dir `cd c:\appdev\SOS_App_Angular`
1. And run `npm install @ionic/app-scripts@latest --save-dev` to make sure all plugin requirements are installed
1. Then start the service with `ionic serve`

**MacOS**
1. After cloning the respository.  In the terminal navigate to the SOS_App_Angular folder.
1. Navigate to SOS_App_Angular: Run `cd SOS_App_Angular`
1. Run `npm install @ionic/app-scripts@latest --save-dev`
1. Run `ionic serve`
1. Note: This app works best using Google Chrome.

## Quick git usage

First browse to the `SOS_App_Angular` project folder

**Create new local branch**
1. `git checkout -b $NEW_BRANCH`

**Use remote branch**
1. `git checkout --track origin/$REMOTE_BRANCH`

**Publish to github remote branch**
1. `git add $FILE` where $FILE is anything you've edited (set $FILE to `-A` to add all changed files)
1. `git commit -m "$MESSAGE"` where $MESSAGE is a summary of changes
1. `git push -u origin`
1. git will prompt for github credentials

**Update development branch from master**
1. In the SOS_App_Angular folder
1. Run `git checkout <name of branch>`
1. Run `git pull origin master`
1. Resolve any conflicts
1. Run `git add .`
1. Run `git commit -m "merged"`
1. Run `git push`

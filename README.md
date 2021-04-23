# TipTracker

<p align="center">
    <img src="docs/tip-tracker-logo.png" alt="TipTracker Logo" />
</p>

TipTracker is an app that allows users to strategically select the most profitable shifts.

This is the first wage and tip-tracking app on the market that not only allows users to store shifts and calculate their total profit but also utilizes machine learning backed analytics to empower the user to strategically select the most profitable shifts to maximize their earnings.

View the application - [tiptracker.vercel.app](https://tiptracker.vercel.app)


## Release Notes
> ### v1.0.1 (02/05/2021)
> - Initial web application infrastructure has been created to allow access to TipTracker via url or locally.
> - A Calendar component has been added for the Work Calendar screen.
> - A modal to view, add, edit, and delete shift data has been added.
> ### v1.0.2 (02/26/2021)
> - Work shifts can now be logged, edited, deleted from the Work Calendar Screen.
> - The interface for the Work Summary Screen has been created.
> - Login and Registration pages have been added. Users can now register an account and login to the application.
> - Security measures have been implemented to protect user login and registration information.
>  - Unauthenticated visitors are prevented from visiting protected pages.
>  - Data from Work Summary Screen can be exported to a `csv` file.
>  - The interface for the Upcoming Work Schedule has been created.
>  #### Bug Fixes
>  - The layout of the Work Calendar Screen has been reworked to be compatiable with smaller screen sizes.
>  ### v1.0.3 (03/12/2021)
>  - An initial prototype interface for the Analytics Screen has been created.
>  - The work summary for selected date range can now be viewed on the Work Summary Screen.
>  - Data pipeline has been added using database hooks to process shift data for Machine Learning model.
>  #### Bug Fixes
>  - The timezone difference issue has been fixed when saving shift data.
>  ### v1.0.4 (04/02/2021)
>  - The interface for the Analytics Screen has been updated with improved keys and color scheme.
>  - The interface for the User Profile has been created.
>  - Deployed microservice for Machine Learning model and integrated with the app.
>  #### Bug Fixes
>   - Fixed the hourly wages display on Work Summary Screen.
>   - Updated UI elements to have consistency between screens.
>   ### v1.1.0 (04/23/2021)
>   - The User Profile information can now be edited.
>   - The Upcoming Work Schedule information can now be created, edited, and deleted.
>   -  Analytics of past worked shifts and future work shifts can now be viewed on the Analytics Screen.
>   -  Data visualizations for past worked shifts and future work shifts have been added to the Analytics Screen.
>   - Data Visualization for earnings distribution and trends have been added to the Home Screen.

## Prototype
Mockup for the application can be found at [Adobe XD](https://xd.adobe.com/view/c908069f-5a1f-4986-9a9e-ffe590407367-9c5b/?fullscreen)
If you have Adobe XD installed, you can download the XD file from [here](https://github.com/JIA-0302/TipTracker/blob/main/docs/TipTracker.xd).

## Install Notes

### Pre-requisites
The following tools, software, and technologies are needed to run the application:
<ol>

<li> <b>Install Node.js</b>

  Node.js is a JavaScript runtime that allows us to run Next.js application. <br />
  For this project, please download 14.x LTS version from [here](https://nodejs.org/en/) and perform installation.<br />
  To verify the installation, run the following command:

  ```
  $ node -v
    v14.16.1
  ```

  If sucessful, it should dislay the version number (eg: `v14.16.1` shown above). If there are errors performing installation, some helpful guides are listed below:

  - [Installing Node.js on Windows 10](https://stackoverflow.com/questions/27344045/installing-node-js-and-npm-on-windows-10)
  - [Installing Node.js on Mac](https://treehouse.github.io/installation-guides/mac/node-mac.html)

</li>


 <li> <b>Install npm (Node Package manager)</b>

 We are using `npm` to install and manage "packages" (dependencies). <br />
 Node.js installs NPM by default. To verify if NPM is already installed, run the following command:

 ```
$ npm -v
6.14.11
 ```
If successful, it should display the version (eg: `6.14.11` shown above)
 However, if it is missing, download npm from [here](https://www.npmjs.com/get-npm) (this includes all the installation guide).

 </li>

 <li> <b>Docker</b> (Optional)

Docker allows to easily use Docker images to setup database required for this application.

**Note:** This step is recommended but optional. If you skip this pre-requisite, make sure to complete the next pre-requisite.

Docker Desktop can be downloaded from [here](https://www.docker.com/products/docker-desktop). It is available for Windows, Mac, and Linux.

 </li>

<li> <b>Install and configure MySQL</b>

The primary database used in the application is `MySQL 5.7`. <br />
Please download MySQL from [here](https://dev.mysql.com/downloads/mysql/5.7.html).
This installer contains all detailed instruction to setup the database. It is set to start the database on Startup by default.

**Note:**
  - This step can be skipped if you are using your own remote MySQL database.
  - This step can be skipped if you have installed Docker

</li>

<li> <b>MongoDB</b>

We are using `MongoDB` to store data for our Machine Learning model to power our Analytics feature. <br />
If you do not have a MongoDB database, MongoDB provides free cloud database service [here](https://www.mongodb.com/cloud/atlas/signup).

</li>

</ol>

### Download Instructions

Simply clone this repository to get all the required source code. 

You can also download a ZIP file from [here](https://github.com/JIA-0302/TipTracker/archive/refs/heads/main.zip)

### Installing dependent libraries

**NOTE:** Make sure you have Node.js and npm installed. See pre-requisites for installation instructions.

From the root directory of the project run the following command:

```
npm install
```

This will automatically install all the dependent libraries listed in `package.json` file. A new folder `node_modules` will be created with all these libraries.

### Setup
1. Run `npm install`
    * This installs all the required dependencies. You can download Node.js and npm from https://www.npmjs.com/get-npm.
    <br />

2. Setup environment variables.
    * Run `npm run secrets:login` and `npm run secrets:sync`. Contact in Teams for the password.
    * This will create `.env.local` file with all necessary environment variables for development environment.
    * See `.env.example` on how the environment variables are set.
    * After adding the environment variables, it can be accessed in the code using `process.env.<NEW_VARIABLE_KEY>`


    <br />

3. Run `npm run dev`

The web app should now be accessible at `http://localhost:3000`.

To enable the Analytics functionality, we need to add a [different repo](https://github.com/JIA-0302/Analytics). This is already included as submodule in this repo.
1. Load the submodule `git submodule update --init`
2. Run `git submodule update --remote` in the future to ensure you have the latest data
3. For more information on running the service, view instructions [here](https://github.com/JIA-0302/Analytics#setup).


### API Routes
All API routes should be created under `/pages/api/`.
The documentation for existing API endpoints can be found [here](docs/api-routes.md). If you are adding new endpoints, please update the documentation.

### Testing
#### Manual Testing Tips
1. Use devtools/web inspector to view in different devices and viewports locally. Guide for [Chrome Devtools](https://developers.google.com/web/tools/chrome-devtools/device-mode).

2. When a new PR is created, Vercel bot will automatically deploy your changes and post a comment on your PR with Preview link.  This link can be accessed from anywhere.
It is generally formatted as `https://tiptracker-git-<branch_name>.nepal-6d48a0.vercel.app/`.

#### Automated Testing
We will be using React Testing libraries and Jest to automate testing. This enables us to make changes to existing components confidently. 


### Committing Changes
Create a Pull request against `main` branch to make any changes. You must request a review and you cannot merge it to `main` until it is approved.

After it is approved, perform `Squash and merge`. This combines all the Pull Request commits into a single commit in the `main` branch. This helps us have a clean commit log in the `main` branch.

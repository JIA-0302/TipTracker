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
>
> <hr/>
>
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
>  - Unused icons from Navigation bar has been removed.
>
> <hr/>
>
>  ### v1.0.3 (03/12/2021)
>  - An initial prototype interface for the Analytics Screen has been created.
>  - The work summary for selected date range can now be viewed on the Work Summary Screen.
>  - Data pipeline has been added using database hooks to process shift data for Machine Learning model.
>  #### Bug Fixes
>  - The timezone difference issue has been fixed when saving shift data.
>
> <hr/>
>
>  ### v1.0.4 (04/02/2021)
>  - The interface for the Analytics Screen has been updated with improved keys and color scheme.
>  - The interface for the User Profile has been created.
>  - Microservice for Machine Learning model has been integrated with the app.
>  #### Bug Fixes
>   - Display the hourly wages on the Work Summary Screen accurately.
>   - UI elements have been updated to have consistency between screens.
>   - Data processing pipeline has been updated to split the shifts accurately.
>
> <hr/>
>
>   ### v1.1.0 (04/23/2021)
>   - The User Profile information can now be edited.
>   - The Upcoming Work Schedule information can now be created, edited, and deleted.
>   -  Analytics of past worked shifts and future work shifts can now be viewed on the Analytics Screen.
>   -  Data visualizations for past worked shifts and future work shifts have been added to the Analytics Screen.
>   - Data Visualization for earnings distribution and trends have been added to the Home Screen.
>  #### Bug Fixes
>   - Correct week on the Past/Future Analytics Page is shown when the first day of the week is selected on the previous screen.


## Install Guide

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

Docker allows to easily use Docker images to setup database required for this application. <br />
Docker Desktop can be downloaded from [here](https://www.docker.com/products/docker-desktop). It is available for Windows, Mac, and Linux.

**Note:** This step is recommended but optional. If you skip this pre-requisite, make sure to complete the next pre-requisite.

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

<li> <b>MySQL Workbench</b>

This is used to visual database tool to easily access the MySQL database. You can download it directly from [here](https://dev.mysql.com/downloads/workbench/). It is availabe for most Operating Systems.

</li>

<li> <b>Git</b> (Optional)

This is a version control system to track changes to files. It can be downloaded from [here](https://git-scm.com/downloads).

**NOTE:** This is not required if you are using downloading the project as ZIP file instead of cloning the repository.

</li>

</ol>

<br />

### Download Instructions

The source code can be downloaded any one of the steps:

1. Cloning the repository

    To clone the repository using HTTPS, run the following command from the desired directory:
    ```
    $ git clone https://github.com/JIA-0302/TipTracker.git
    ```
    This will download all the source code from the repository.
    
    If you want to run the Future Analytics feature, you need to load the submodules as follows:
    ```
    $ git submodule update --init
    $ git submodule update --remote
    ```

2. Download the ZIP file from [here](https://github.com/JIA-0302/TipTracker/archive/refs/heads/main.zip)

<br />

### Installing dependent libraries

**NOTE:** Make sure you have Node.js and npm installed. See pre-requisites for installation instructions.

From the root directory of the project, run the following command:

```
$ npm install
```

All of the required depended libraries are listed in `package.json` file. Running this command will automatically install all of these libraries. A new directory called `node_modules` will be created with all of these libraries.

<br />

### Build Instructions

1. Setup environment variables

    - Create a new file `.env.local` in the root directory
    - Copy all the contents of `.env.example` into `.env.local`
    - Replace all the required fields (`xxxxxxx`) specific to your configurations.
    
    ```
    # These variables can be accessed in the app from `process.env.`
    # Example, to retreive MongoDB Url, use `process.env.MONGODB_URL`

    # MongDB connection string
    MONGODB_URL=xxxxxxxx

    # MySQL Database
    DB_HOSTNAME=xxxxxxxx
    DB_NAME=xxxxxxxx
    DB_USERNAME=xxxxxxxx
    DB_PASSWORD=xxxxxxxx
    DB_PORT=3306

    # Authentication
    BYCRYPT_SALT_ROUNDS=10
    NEXTAUTH_URL=http://localhost:3000

    # ML Pipeline
    SHIFT_INTERVAL_MINUTES=30
    ML_SERVICE_URL=http://localhost:5000
    ML_ACCESS_TOKEN=xxxxxxxx

    # Validator (required to run the nightly validator to have consistency between databases)
    VALIDATOR_AUTH_TOKEN=xxxxxxxx # This is optional

    ```

    Note, these variables can be set directly. However, by using `.env.local`, these variables are only available during runtime of the application and is easier to manage.

    In production environment, make sure to update `http://localhost:*` with the url of the deployed application. 

2. Build the application
    To build the application, simply run the following command:

    ```
    $ npm run build
    ```

    This instruction will create production ready build for the application.

<br />

### Installation Guide
1. Start the MySQL server.
    - If using Docker, simply run `docker-compose up` from the root directory. This will start the database locally.
    - If using MySQL directly, verify in the Task Manager that it is running. If not, you can open `\bin\mysqld` file on the installation directory. For more instructions on running the database, view [here](https://dev.mysql.com/doc/refman/8.0/en/windows-start-command-line.html).

2. Setup the database schema
    - **NOTE:** This step can be run only once. If you already setup the schema previously, no action is needed.
    - Open `MySQL Workbench` and [connect to the MySQL server](https://dev.mysql.com/doc/workbench/en/wb-migration-wizard-connection.html).
    - Go to `File -> Run SQL Script` to run the following scripts:
      - `/scripts/database/schema.sql`: This will setup all required schema in the database
      - `/scripts/database/db-seed.sql`: This will populate the database with required database.

<br />

### Run Instructions
    
Run the following command from the root directory:
```
$ npm run start
```

The output of the command will be as follows:
```
> tiptracker@0.1.0 start D:\...\TipTracker
> next start

Loaded env from D:\...\TipTracker\.env.local
ready - started server on http://localhost:3000
```

This will start the application at `http://localhost:3000` by default. Simply visit this URL on your browser to view the application.

For cases when the application runs on a different port number, the appropriate URL will be shown above accordingly.

<br />

### Troubleshooting

Some common errors are documented below:

1. `Error: connect ECONNREFUSED 127.0.0.1:3306`

    This typically means the MySQL database is not running. See installation guide [here](#installation-guide) to start the database.

    Also ensure the [environment variables](#build-instructions) for MySQL database has been set properly.

2. `module not found. Error: Cannot resolve module ...`

    This means one of the dependent library was not installed. To fix this issue run the following command:

    ```
    $ npm install
    ```

    This will automatically install all the missing dependencies and also update existing packages if required.

    If the error still persists, run the following command:
    ```
    $ rm package-lock.json
    $ rm -r node-modules
    $ npm install
    ```

    This will remove all of the existing dependencies and perform a fresh install.

3. `Port 3000 is already in use`

    By default, Next.js starts the server on port number 3000. Since only one process can run on a port number, we cannot run this new processing to this occupies port. To fix this issue there are two approaches:
      - Kill other process running on port number 3000
        - For Windows, view instructions [here](https://stackoverflow.com/questions/39632667/how-do-i-kill-the-process-currently-using-a-port-on-localhost-in-windows).
        - For Mac and Linux, view instructions [here](https://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac)

      - Run the application on a different port

        To run application in a different unoccupied port, run the following command:
        ```
        $ next -p <PORT_NUMBER>
        ```
        Note, the application will now be available on the specified port number.

4. `Error: connect ECONNREFUSED 127.0.0.1:5000`

    This typically means the Flask application for Machine Learning is not running. See run instructions [here](https://github.com/JIA-0302/Analytics#setup) to start the application.    


<br /><br />
## Developers Guide

### Setup
1. Run `npm install`
    * This installs all the required dependencies. You can download Node.js and npm from https://www.npmjs.com/get-npm.
    <br />

2. Setup environment variables.
    * Create `.env.local` file to store all necessary environment variables for development environment.
    * Copy contents from `.env.example` to `.env.local.` It has default environment variables set.
    * Replace all occurence of `xxxxxxx` with values specific to your configuration.
    * After adding the environment variables, it can be accessed in the code using `process.env.<NEW_VARIABLE_KEY>`

    <br />

3. Run `npm run dev`

The web app should now be accessible at `http://localhost:3000`.

To enable the Analytics functionality, we need to add a [different repo](https://github.com/JIA-0302/Analytics). This is already included as submodule in this repo.
1. Load the submodule `git submodule update --init`
2. Run `git submodule update --remote` in the future to ensure you have the latest data
3. For more information on running the service, view instructions [here](https://github.com/JIA-0302/Analytics#setup).

### Prototype
Mockup for the application can be found at [Adobe XD](https://xd.adobe.com/view/c908069f-5a1f-4986-9a9e-ffe590407367-9c5b/?fullscreen)
If you have Adobe XD installed, you can download the XD file from [here](https://github.com/JIA-0302/TipTracker/blob/main/docs/TipTracker.xd).

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

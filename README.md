# TipTracker

<p align="center">
    <img src="docs/tip-tracker-logo.png" alt="TipTracker Logo" />
</p>

TipTracker is an app that allows users to strategically select the most profitable shifts.

## Release Notes
> ## v1.0 (02/05/2021)
> - Initial web application infrastructure has been created to allow access to TipTracker via url or locally.
> - The interface for the Work Calendar Screen and the interfaces for creating, deleting, and editing shifts have been created.
> # Bugs
> - The layout of the Work Calendar Screen has not been optimized for smaller screen sizes.
> ## v1.1 (02/25/2021)
> - Work shifts can now be logged, edited, deleted from the Work Calendar Screen.
> - The interface for the Work Summary Screen has been created.
> - Login and Registration pages have been added. Users must register an account and login in order to use TipTracker.
> - Security measures have been implemented to protect user login and registration information.
>  # Bug Fixes
>  - The layout of the Work Calendar Screen has been reworked to be compatiable with smaller screen sizes.
>  ## v1.2 (03/2/2021)
>  - An initial prototype interface for the Analytics Screen has been created.
>  - The work summary of a particular week can now be viewed on the Work Summary Screen.
>  ## v1.3 (04/02/2021)
>  - The interface for the Analytics Screen has been reworked and updated.
>  The interface for the User Profile and Upcomming Work Schedule has been created.
>   ## v1.4 (04/23/2021)
>   - The summary of a work week can now be downloaded as csv file from the Work Summary Screen.
>   - The User Profile information can now be edited.
>   - The Upcomming Work Schedule information can now be created, edited, and deleted.
>   -  Analytics of past worked shifts and future work shifts can now be viewed on the Analytics Screen.
>   -  Data visualizations for past worked shifts and future work shifts have been added to the Analytics Screen.
>   - The Home Screen has been reworked and updated.

## Prototype
Mockup for the application can be found at [Adobe XD](https://xd.adobe.com/view/c908069f-5a1f-4986-9a9e-ffe590407367-9c5b/?fullscreen)
If you have Adobe XD installed, you can download the XD file from [here](https://github.com/JIA-0302/TipTracker/blob/main/docs/TipTracker.xd).

## Development

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

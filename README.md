# TipTracker

<p align="center">
    <img src="docs/tip-tracker-logo.png" alt="TipTracker Logo" />
</p>

TipTracker is an app that allows users to strategically select the most profitable shifts.

## Prototype
Mockup for the application can be found at [Adobe XD](https://xd.adobe.com/view/c908069f-5a1f-4986-9a9e-ffe590407367-9c5b/?fullscreen)
If you have Adobe XD installed, you can download the XD file from [here](https://github.com/JIA-0302/TipTracker/blob/main/app-docs/TipTracker.xd).

## Running the application
1. Run `npm install`
    <sub><sup>This installs all the required dependencies. You can download Node.js and npm from https://www.npmjs.com/get-npm.</sup></sub>

2. Setup configurations*
    <sub><sup>*No additional configuration required for now</sup></sub>

3. Run `npm run dev`

The website should now be accessible at `http://localhost:3000`.

## Instructions for Docker Image
1. Run `docker save -o <path to copied image file> mysql`
    <sub><sup>This saves after local changes made</sup><sub>

2. Run `docker load -i <path to copied image file>`
    <sub><sup>This loads the docker image after downloading it</sup><sub>

3. Run `docker run --name=<name for container> -e MYSQL_ROOT_PASSWORD=<replace with MYSQL PASS> -d mysql`
    <sub><sup>This runs the docker image as a container after loading it</su
    
## Two ways to view Mobile app version on Desktop
1. Use chrome devtools to view in different devices (https://developers.google.com/web/tools/chrome-devtools/device-mode)

2. The nice thing about integrating with Vercel is it creates a preview of the PR changes. For this PR, the URL is https://tiptracker-git-frontend-add-website-layout.nepal-6d48a0.vercel.app/ You can open that link from any device you want

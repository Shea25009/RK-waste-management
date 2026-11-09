# Development Setup Guide

This document explains how contributors set up the RK’s Waste Management project using GitHub, Git for Windows and Visual Studio Code.

## Software Required

- Git for Windows
- Visual Studio Code
- A GitHub account with collaborator access

## Clone the Repository

Open a terminal in Visual Studio Code and run:

    git clone https://github.com/Shea25009/RK-waste-management.git
    cd RK-waste-management
    code .

    ## Configure Git Identity

Before making a commit, configure Git with your own name and verified GitHub email address:

    git config user.name "Your Name"
    git config user.email "your-verified-github-email"

    ## Working Safely

Create a personal branch before editing project files:

    git switch -c your-branch-name

Do not push directly to `main`. Commit changes on your own branch and submit a pull request for review by the team leader.

## Running the Website

Open `index.html` in Visual Studio Code. Use the Live Server extension or open the file in a web browser to preview the website locally.

Before submitting changes, test the navigation links and the Waste Finder feature.
# Mailer Scheduling Application

This project is a web-based application designed to facilitate the scheduling of mailers. It allows users to select mailers and recipient lists, specify a date and time for sending, and manage scheduled mailings efficiently.

## LIVE: https://mail-automation-neeraj-demtech.netlify.app/

## Table of Contents

* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [API Endpoints](#api-endpoints)
* [Acknowledgements](#acknowledgements)

## Features

* **Mailer Selection:** Choose from a list of available mailers fetched dynamically from the server.
* **Recipient List Selection:** Select recipient lists dynamically fetched from the server.
* **Scheduling:** Specify the date and time for sending the mailer.
* **Responsive Design:** The scheduling form adapts to different screen sizes for optimal usability.
* **Modal Interface:** The scheduling form is presented in a modal that can be triggered based on URL hash.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Neeraj-2311/mail-automation-assignment.git
   ```

2. **Navigate to project directory:**
   ```bash
   cd mailer-scheduling-app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

These commands will set up the project on your local machine.

## Usage

After installation, you can use the application as follows:

1. Access the application: Open your browser and navigate to http://localhost:3000
2. Open the scheduling modal: Click on "New Schedule" button it will redirect you to http://localhost:3000/#create-schedule to open the scheduling modal automatically
3. Schedule a mailer:
   * Select a mailer from the dropdown
   * Select a recipient list from the dropdown
   * Choose the desired date and time
   * Click the "Schedule Mail" button to submit

## API Endpoints

The application interacts with the following API endpoints:

* `GET /api/get-mailers`: Fetches the list of available mailers
* `GET /api/get-lists`: Fetches the list of recipient lists
* `POST /api/schedule-mail`: Submits the scheduling information to the server

## Acknowledgements

* Next.js - The React framework used
* Tailwind CSS - For styling the application
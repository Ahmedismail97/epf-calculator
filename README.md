# EPF Third Schedule Calculator

This project is a React-based web application that calculates EPF (Employees Provident Fund) contributions based on the Third Schedule rules in Malaysia.

## Table of Contents

- [EPF Third Schedule Calculator](#epf-third-schedule-calculator)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Usage Examples](#usage-examples)
    - [Example 1: Malaysian Employee](#example-1-malaysian-employee)
    - [Example 2: Non-Malaysian Employee (Permanent Resident)](#example-2-non-malaysian-employee-permanent-resident)
    - [Example 3: Non-Malaysian Employee (Non-Citizen)](#example-3-non-malaysian-employee-non-citizen)

## Features

- Calculate EPF contributions for both Part A and Part B of the Third Schedule
- Support for Malaysian and non-Malaysian employees
- Bonus inclusion calculation
- Form validation and error handling
- Responsive design

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

To install the EPF Third Schedule Calculator, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/epf-third-schedule-calculator.git
   ```

2. Navigate to the project directory:
   ```
   cd epf-third-schedule-calculator
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application

To run the EPF Third Schedule Calculator, follow these steps:

1. Start the development server:
   ```
   npm start
   ```

2. Open your web browser and visit `http://localhost:3000`

The application should now be running and accessible through your web browser.


## Usage Examples

Here are some examples of how to use the EPF Third Schedule Calculator:

### Example 1: Malaysian Employee

- Wage: RM 3000
- Nationality: Malaysian
- Age: 30
- Bonus Included: No

Expected Result:
- Employer's Share: RM 390
- Employee's Share: RM 330
- Section Type: Part A

### Example 2: Non-Malaysian Employee (Permanent Resident)

- Wage: RM 4500
- Nationality: Non-Malaysian
- Residency Status: Permanent Resident
- Age: 35
- Bonus Included: Yes

Expected Result:
- Employer's Share: RM 585
- Employee's Share: RM 495
- Section Type: Part A

### Example 3: Non-Malaysian Employee (Non-Citizen)

- Wage: RM 6000
- Nationality: Non-Malaysian
- Residency Status: Non-Citizen
- Age: 40
- Contribution Start Date: 2020-01-01
- Bonus Included: No

Expected Result:
- Employer's Share: RM 570
- Employee's Share: RM 0
- Section Type: Part B
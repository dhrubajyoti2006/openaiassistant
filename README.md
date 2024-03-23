# UI5 with OpenAI Assistant Project Overview

This project integrates frontend development using UI5 Tooling 3.0 with a backend built on Express.js in Node.js. The frontend provides a user interface, while the backend handles server-side logic and API requests to OpenAI's Assistant APIs. This setup enables the application to leverage advanced AI capabilities provided by OpenAI directly from the UI5 frontend.

## Project Description

The UI is crafted with UI5, offering a rich user experience and interactive elements. The backend, developed with Express.js, serves as the bridge between the UI5 frontend and OpenAI's Assistant APIs. By incorporating these APIs, the application gains access to powerful language understanding and generation capabilities, enhancing its functionality.

### Getting Started with OpenAI

To interact with OpenAI's Assistant APIs, you must have a Plus account with OpenAI and generate an API key. This key enables authenticated requests to OpenAI, allowing your application to utilize AI-driven responses and data processing.

#### Setting Up Your OpenAI API Key

After obtaining your OpenAI API key, you'll need to configure the backend project to use this key for API requests:

1. Within the `api` directory of this monorepo, create a file named `.env`.
2. Add the following content to the `.env` file, replacing `<Your API Key Here>` with your actual OpenAI API key:

    ```
    OPENAI_API_KEY=<Your API Key Here>
    ```

This step ensures that your backend application can securely and successfully call OpenAI's Assistant APIs.

## Getting Started

To run this project, you'll need Node.js installed on your machine. If Node.js isn't already installed, you can download it from [https://nodejs.org/](https://nodejs.org/).

### Prerequisites

- Node.js (Refer to the `package.json` files of both projects for the required version)
- NPM (Automatically comes with Node.js)

### Project Structure

The monorepo is structured as follows:

- `/ui` - Contains the UI5 frontend project.
- `/api` - Contains the Express.js backend API project, including the integration with OpenAI's Assistant APIs.

## Running the Projects

### Starting the API Project

Start the backend project first to ensure the UI project can communicate with it:

1. Navigate to the `api` directory:

    ```sh
    cd api
    ```

2. Install the necessary dependencies:

    ```sh
    npm install
    ```

3. Start the backend server:

    ```sh
    npm run start-server
    ```

You should see a message indicating the server is running, typically along with the port number.

### Starting the UI Project

After the backend server is running, start the UI project:

1. Open a new terminal and navigate to the `ui` directory:

    ```sh
    cd ui
    ```

2. Install the necessary dependencies:

    ```sh
    npm install
    ```

3. Start the UI project:

    ```sh
    npm run start
    ```

The UI project will compile and launch in your default web browser. If it doesn't automatically open, you can manually navigate to the provided URL (usually [http://localhost:8085/index.html](http://localhost:8085/index.html)).

## Additional Information

For detailed information on the UI project, refer to the README within the `/ui` directory. For specifics about the API project and its endpoints, including OpenAI Assistant API integration, check the README within the `/api` directory.

## Support

For support, please consult the individual README files for contact information or submit an issue in the monorepo's issue tracker.

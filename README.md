# AgriQuest - Sustainable Farming App

This is a Next.js application built with Firebase Studio that gamifies sustainable farming practices. It uses generative AI with Genkit to provide personalized missions for farmers.

## Running the Project in VS Code

You can easily run and edit this project using Visual Studio Code or any other code editor. Follow these steps to get your local development environment set up.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Step 1: Install Dependencies

Open a terminal in your project's root directory and run the following command to install all the necessary packages:

```bash
npm install
```

### Step 2: Set Up Environment Variables

Your project needs API keys and configuration settings to connect to Firebase and the AI services.

1.  **Rename the `.env.local.example` file to `.env.local`**.
2.  **Fill in your Firebase credentials** as you did before.
3.  **Add your Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

Your `.env.local` file should look like this:

```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_KEY_HERE"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_DOMAIN_HERE"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID_HERE"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_BUCKET_HERE"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID_HERE"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID_HERE"

# Genkit AI Config
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
```

### Step 3: Run the Development Servers

This project requires two processes to run simultaneously:
1.  The **Next.js app** (the user interface).
2.  The **Genkit AI server** (the AI backend).

You will need to open **two separate terminals** in VS Code to run them.

**In your first terminal, run the Next.js app:**

```bash
npm run dev
```

This will start the web application, usually on `http://localhost:9002`.

**In your second terminal, run the Genkit AI server:**

```bash
npm run genkit:watch
```

This starts your local AI server and will automatically restart it if you make any changes to your AI flows.

### Step 4: Open in Your Browser

Once both servers are running, open your browser and navigate to `http://localhost:9002`. You should see the AgriQuest application running, and all features, including the AI mission generator, will be fully functional.

Now you are all set to continue building and experimenting with your project on your local machine!

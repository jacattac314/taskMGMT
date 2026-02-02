/**
 * George's Homework Helper - Main Entry Point
 *
 * This file starts the app and renders the HomeworkChecker component.
 *
 * To run with a bundler (like Vite or Create React App):
 * 1. npm install react react-dom
 * 2. Import and use HomeworkChecker
 *
 * The app flow is simple:
 * 1. George opens the app
 * 2. George enters his homework question and answer
 * 3. ChatGPT checks it
 * 4. George sees feedback + a learning lesson!
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import HomeworkChecker from './HomeworkChecker.jsx';

// Get the root element from the HTML
const container = document.getElementById('root');

// Create a React root and render the app
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <HomeworkChecker />
    </React.StrictMode>
);

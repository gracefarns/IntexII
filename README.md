# Movie Streaming Platform with Recommendation Engines

A full-stack movie streaming application built in 4 days that leverages machine learning models to provide personalized movie recommendations for each user.

## Overview

This project combines a modern React frontend with a .NET backend to deliver an intelligent movie discovery platform. The application integrates machine learning algorithms to analyze user preferences and viewing history, generating tailored movie recommendations that enhance the user experience.

## Features

- **User Authentication**: Secure user registration and login system
- **Movie Discovery**: Browse and search through a comprehensive movie catalog
- **Personalized Recommendations**: ML-powered recommendation engine that learns from user interactions
- **User Ratings**: Rate movies to improve recommendation accuracy
- **Genre-Based Filtering**: Filter movies by genre and user preferences

## Tech Stack

### Frontend

- React with TypeScript
- Vite build tool
- Modern CSS styling
- HTTP API integration

### Backend

- .NET Core Web API
- Entity Framework Core for data persistence
- Multiple database contexts for separated concerns
- Authentication and role-based authorization

## Project Structure

```
IntexII/
├── backend/
│   └── RootkitAuth.API/
│       ├── Controllers/
│       ├── Data/
│       ├── Services/
│       └── Program.cs
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── api/
    │   └── context/
    └── vite.config.ts
```

# Copilot Instructions for RizzMeter App

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React Native app built with Expo that allows users to submit their "rizz" (pickup lines, flirt attempts) and get rated by friends, strangers, or AI. The app features social elements, gamification, and AI-powered analysis.

## Tech Stack
- **Frontend**: React Native with Expo
- **Navigation**: React Navigation v6
- **UI Components**: React Native Paper + custom components
- **State Management**: React Context + hooks
- **AI Integration**: OpenAI GPT-4 API
- **Storage**: Expo SecureStore for sensitive data, AsyncStorage for general data
- **Media**: Expo AV for audio/video, Expo Camera for capture

## Key Features
1. **Rizz Submissions**: Text, voice, video submissions with categorization
2. **Rating System**: 5-point scale (0-5) with emoji indicators
3. **AI Analysis**: GPT-4 powered rizz breakdown and suggestions
4. **Leaderboards**: City, school, global rankings
5. **Rizz Games**: Daily challenges and head-to-head competitions
6. **Rizz Academy**: Educational content for improving social skills

## Code Style Guidelines
- Use functional components with hooks
- Implement proper TypeScript typing where applicable
- Follow React Native best practices for performance
- Use consistent naming conventions (camelCase for variables, PascalCase for components)
- Implement proper error handling and loading states
- Use secure storage for API keys and sensitive data

## Security Considerations
- Store OpenAI API key securely using Expo SecureStore
- Implement input validation for all user submissions
- Use proper authentication and authorization
- Sanitize user-generated content before display

## File Organization
- `src/components/`: Reusable UI components
- `src/screens/`: Screen components for navigation
- `src/services/`: API calls and business logic
- `src/utils/`: Helper functions and constants
- `src/navigation/`: Navigation configuration
- `src/context/`: React Context providers

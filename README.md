# RizzMeter App 🔥

A social and AI-powered React Native app that lets users submit their "rizz" (pickup lines, flirt attempts, DMs), get rated by friends, strangers, or AI, compete on leaderboards, and learn to improve their social game.

## 📱 Features

### Core Features
- **Rizz Submissions**: Submit text, voice, or video pickup lines
- **Rating System**: 5-point "Rizz Scale" from "Dry as a saltine" to "God-tier Game"
- **AI Analysis**: GPT-4 powered rizz breakdown and improvement suggestions
- **Leaderboards**: Weekly rankings by city, school, and global
- **Rizz Games**: Daily challenges and head-to-head competitions
- **Rizz Academy**: Educational content for improving social skills

### Key Components
- **Home Screen**: Dashboard with recent submissions and daily challenges
- **Submit Screen**: Create and submit new rizz with category selection
- **Leaderboards**: Rankings and user statistics
- **Profile**: User stats, settings, and API key management
- **AI Analysis**: Detailed feedback with scoring and suggestions
- **Games**: Interactive challenges and learning modules

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation v6
- **UI Components**: React Native Paper + custom components
- **State Management**: React Context + hooks
- **AI Integration**: OpenAI GPT-4 API
- **Storage**: 
  - Expo SecureStore for sensitive data (API keys)
  - AsyncStorage for general app data
- **Media**: Expo AV, Camera, Media Library (for future features)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RizzMeterApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `a` for Android emulator, `i` for iOS simulator

### Setting up OpenAI API

1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
2. In the app, go to Profile → Add/Update API Key
3. Enter your API key securely (stored in Expo SecureStore)
4. Now you can use AI analysis features!

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── RizzCard.js     # Display and rate rizz submissions
│   └── StatsCard.js    # User statistics display
├── screens/            # Screen components
│   ├── HomeScreen.js   # Main dashboard
│   ├── SubmitScreen.js # Create new submissions
│   ├── LeaderboardScreen.js # Rankings and stats
│   ├── ProfileScreen.js # User profile and settings
│   ├── AIAnalysisScreen.js # AI feedback display
│   ├── RizzGamesScreen.js # Games and challenges
│   ├── RizzAcademyScreen.js # Learning modules
│   ├── RizzDetailScreen.js # Detailed submission view
│   └── AuthScreen.js   # Authentication (placeholder)
├── services/           # Business logic and API calls
│   └── OpenAIService.js # AI integration
├── context/            # React Context providers
│   ├── UserContext.js  # User state management
│   └── RizzContext.js  # Submissions and app data
├── navigation/         # Navigation configuration
│   └── AppNavigator.js # Main navigation setup
└── utils/              # Helper functions and constants
    └── theme.js        # App theme and styling
```

## 🎯 Key Features Explained

### Rizz Rating Scale
- **0** ❌ "Dry as a saltine"
- **1** 😬 "Cringe-core"  
- **2** 😏 "Mid rizz"
- **3** 🔥 "Smooth"
- **4** 💯 "Certified Rizzler"
- **5** 💋 "God-tier Game"

### Categories
- **Bold** 💪 - Confident and direct approaches
- **Funny** 😂 - Humor-based pickup lines
- **Cringe** 😬 - Intentionally cheesy or awkward
- **Sweet** 🥰 - Romantic and heartfelt
- **Risqué** 😈 - Flirty and suggestive

### AI Analysis Features
- **Tone Analysis**: Identifies the style (Romantic, Playful, Confident, etc.)
- **Scoring**: Cleverness, Boldness, and Overall effectiveness (1-10)
- **Suggestions**: Constructive feedback for improvement
- **Response Simulation**: AI roleplay to test effectiveness

## 🔧 Development

### Available Scripts
- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator (macOS only)
- `npm run web` - Run in web browser

### Adding New Features
1. Create components in `src/components/`
2. Add screens to `src/screens/` and update navigation
3. Use Context for state management
4. Follow the established theme and styling patterns

## 🎨 Design System

The app uses a consistent design system with:
- **Primary Color**: Purple (#6200ee)
- **Accent Color**: Pink (#ff4081)
- **Rizz Scale Colors**: Red to Purple gradient based on rating
- **Material Design**: React Native Paper components
- **Custom Cards**: Elevated cards with consistent spacing

## 🔐 Security & Privacy

- **API Keys**: Securely stored using Expo SecureStore
- **User Data**: Local storage with AsyncStorage (no external servers)
- **Input Validation**: All user inputs are validated and sanitized
- **Content Guidelines**: Emphasis on respectful communication

## 🚀 Deployment

### Building for Production
```bash
# Android
expo build:android

# iOS (requires macOS and Apple Developer account)
expo build:ios
```

### App Store Submission
The app includes educational content and promotes healthy communication to comply with app store guidelines.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📱 Future Features

- [ ] Voice and video submissions
- [ ] Real-time chat for rizz advice
- [ ] Advanced AI personality types
- [ ] Social media integration
- [ ] Push notifications
- [ ] Premium subscription features
- [ ] More game modes and challenges

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Expo team for the amazing React Native framework
- React Native Paper for beautiful Material Design components
- The dating app community for inspiration

---

**Remember**: The best rizz comes from being genuinely interested in others and treating everyone with respect! 💙

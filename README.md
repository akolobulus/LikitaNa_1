# LikitaNa - Your Padi for Good Health

![LikitaNa Logo](./images/log.png)

## Overview

LikitaNa is an AI-powered multilingual health assistant designed to provide accessible healthcare information and guidance to Nigerian users. The name "LikitaNa" combines "Likita" (doctor in Hausa) with "Na" (ownership), signifying "Your Doctor" or your health companion.

## Features

- **Multilingual AI Chatbot**: Get health advice in 5 Nigerian languages (English, Hausa, Yoruba, Igbo, and Pidgin)
- **Health Center Locator**: Find nearby health facilities with geolocation support
- **Health Tips & Education**: Access a library of health information and preventive care tips
- **Achievements System**: Track your health learning progress with badges and achievements
- **Offline Support**: Progressive Web App (PWA) capabilities for areas with limited connectivity

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Node.js, Express
- **State Management**: React Context API, TanStack Query
- **AI Integration**: OpenAI GPT-4o for intelligent health responses
- **Routing**: wouter for lightweight client-side routing

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/akolobulus/likitana.git
   cd likitana
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:

   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

## Usage

- **Chat Interface**: Begin a conversation by selecting your preferred language and typing your health-related question
- **Health Centers**: Allow location access to find nearby health facilities
- **Health Tips**: Browse through health tips categorized by topic
- **Health Achievements**: Complete learning objectives to earn badges

## Deployment

LikitaNa is designed to be deployed as a Progressive Web App (PWA), making it accessible on various devices with offline capabilities.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- **Developer**: Akolo Bulus
- **GitHub**: [akolobulus](https://github.com/akolobulus)
- **LinkedIn**: [Akolo Bulus](https://www.linkedin.com/in/akolo-bulus)

## Acknowledgments

- OpenAI for providing the GPT API that powers the multilingual health advice
- Ministry of Health Nigeria for health information resources
- All contributors and early users providing feedback

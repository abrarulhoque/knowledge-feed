# Knowledge Feed

A TikTok-style infinite scroll web application that generates educational content using AI. Replace your mindless scrolling with meaningful learning!

## Features

- Infinite scroll interface similar to TikTok/Instagram Reels
- AI-generated educational content
- Smooth animations and transitions
- Mobile-friendly design
- Snap scrolling for native app-like feel

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- React Intersection Observer
- OpenAI GPT-4

## Setup

1. Clone the repository:

```bash
git clone https://github.com/abrarulhoque/knowledge-feed.git
cd knowledge-feed
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## How it Works

The app uses a Cloudflare Worker to securely make API calls to OpenAI's GPT-4. As you scroll, new educational content is automatically generated and displayed in a card format. Each piece of content alternates between different educational themes like science, psychology, history, and self-improvement.

## Contributing

Feel free to open issues and pull requests for any improvements you'd like to add.

## License

MIT

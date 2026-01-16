# Real-Time AI Chatbot with Streaming

## Project Overview
This project is a **Real-Time AI Chatbot** built using **Next.js 14**, **JavaScript**, and **Tailwind CSS**. It provides **real-time streaming AI responses** using **Server-Sent Events (SSE)** and integrates with the **Groq LLM API (Llama model)** for AI-generated responses.  

The application demonstrates a clean, responsive chat interface suitable for web and mobile devices.

---

## Features Implemented 

### Core Features
- Functional chat interface:
  - Distinction between **user and AI messages**
  - Display **timestamps** for each message
  - **Auto-scroll** to latest message
- Input area:
  - Text input field
  - Send button
  - **Enter key** to send
  - Input disabled while AI is responding
- Real-time **streaming AI responses** (token/chunk by chunk)
- **Typing indicator** while AI is generating response
- **Message persistence** using `localStorage`
- **Clear chat** functionality
- Responsive UI using **Tailwind CSS**

### Optional / Bonus Features (not implemented)
- Copy message to clipboard  
- Markdown rendering in AI responses  
- Dark/light theme toggle  
- Animated typing indicator  

---

## Tech Stack & Libraries

- **Frontend Framework:** Next.js 14 (App Router)  
- **Language:** JavaScript (ES6+)  
- **Styling:** Tailwind CSS  
- **Real-Time Communication:** Server-Sent Events (SSE)  
- **AI Integration:** Groq LLM API (Llama model)  

---

## Setup Instructions

1. **Clone the repository:**
     git clone [https://github.com/<your-username>/<repo-name>.git](https://github.com/himanshirawat/ai-chatbot.git)
     cd ai-chatbot
2. **Install dependencies:**
     npm install
3. **Create .env file (based on .env.example)**
4. **Run the development server:**
     npm run dev

## Demo Video Link 
https://drive.google.com/file/d/1L-GLLymgqn2I8SRTWZ_24xbpdcvE2ZPN/view?usp=sharing


## Site Live Link
https://ai-chatbot-azure-six.vercel.app/

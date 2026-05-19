# Personal Portfolio Website

## Overview
This is a modern, responsive portfolio website built with Next.js, React, Tailwind CSS, and Framer Motion. The portfolio showcases my professional skills, projects, education, services, and experience, with a contact form integrated through EmailJS for direct communication.

## Live Demo
[View Live Portfolio](https://portfolio-ten-lime-87.vercel.app/)

## Features
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Modern UI/UX**: Clean, professional design with smooth animations using Framer Motion
- **Dynamic Content**: Showcases projects, skills, education, and professional experience
- **Contact Form**: Integrated EmailJS for direct communication without a backend
- **Performance Optimized**: Built with Next.js for optimal loading
- **Folder-based Routing**: Organized structure using Next.js file-system based routing

## Tech Stack
- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Email Service**: [EmailJS](https://www.emailjs.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## Installation

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn

### Setup Instructions
1. Clone the repository
```bash
git clone https://github.com/woafi/portfolio-website.git
cd portfolio
```

2. Install dependencies
```bash
npm install framer-motion swiper npx shadcn@latest add input button scroll-area  sheet select tabs textarea tooltip
# or
yarn install framer-motion swiper npx shadcn@latest add input button scroll-area  sheet select tabs textarea tooltip
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables for EmailJS:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure
```
portfolio-website/
├── components/         # React components
│   ├── layout/         # Layout components
│   ├── sections/       # Page sections
│   └── ui/             # Reusable UI components
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   ├── projects/       # Project details pages
│   └── ...
├── public/             # Static assets
│   ├── images/         # Image files
│   └── resume/         # Resume files
├── styles/             # Global styles
├── utils/              # Utility functions
├── .env.local          # Environment variables
└── next.config.js      # Next.js configuration
```

## Key Features Explained

### Home Page
The landing page introduces the portfolio owner with an animated hero section, featuring a brief introduction and call-to-action buttons.

### Projects Section
Showcases completed projects with:
- Project thumbnails
- Brief descriptions
- Technologies used
- Links to live demos and GitHub repositories
- Detailed individual project pages

### Skills Section
Visual representation of technical skills and proficiency levels, categorized by:
- Programming languages
- Frameworks & libraries
- Tools & platforms
- Soft skills

### Education & Experience
Timeline-based sections displaying:
- Educational background with institutions and qualifications
- Work experience with roles and responsibilities
- Notable achievements

### Services
Overview of professional services offered, including:
- Web development
- UI/UX design

### Contact Form
EmailJS-powered contact form allowing visitors to:
- Send messages directly from the website
- Receive confirmation emails
- Submit without page reloads using async handling

## Deployment
The site is deployed on Vercel, which offers:
- Continuous deployment from GitHub
- Preview deployments for pull requests
- Analytics and performance monitoring


## Contact
For any inquiries, please reach out through:
- Email: your.email@example.com
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Portfolio: [your-portfolio-url.vercel.app](https://your-portfolio-url.vercel.app)
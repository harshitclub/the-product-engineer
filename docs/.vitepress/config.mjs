import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'The Product Engineer',
  description: 'The Product Engineer: From Code to Scaled Architecture',
  cleanUrls: true,
  lastUpdated: true,
  appearance: false, // Default Light Mode

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0' }],
    ['meta', { name: 'theme-color', content: '#4f46e5' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'The Product Engineer' }],
    ['meta', { property: 'og:description', content: 'From Code to Scaled Architecture — Comprehensive full-stack engineering handbook.' }]
  ],

  vite: {
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000
    },
    server: {
      fs: {
        strict: true
      }
    }
  },

  themeConfig: {
    siteTitle: 'The Product Engineer',
    
    notFound: {
      title: 'PAGE NOT FOUND',
      quote: 'The requested engineering chapter might have moved or the session refreshed.',
      linkLabel: 'Return to Hub',
      linkText: 'Take me back to Home'
    },
    
    search: {
      provider: 'local',
      options: {
        placeholder: 'Search engineering notes...'
      }
    },

    nav: [
      { text: 'Frontend', link: '/frontend/' },
      { text: 'Backend', link: '/backend/' },
      { text: 'Database', link: '/database/' },
      { text: 'DevOps', link: '/devops/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Interview', link: '/interview/' },
      { text: 'Extra', link: '/extra/' }
    ],

    sidebar: {
      '/database/': [
        {
          text: 'Database Hub',
          collapsed: false,
          items: [
            { text: 'Overview & Curriculum', link: '/database/' }
          ]
        },
        {
          text: 'PostgreSQL Track',
          collapsed: false,
          items: [
            { text: '1. PostgreSQL & Docker Master Guide', link: '/database/postgresql/' },
            { text: '2. Project: College Management Database', link: '/database/postgresql/college-database-project' },
            { text: '3. Node.js, Express & Sequelize with Dockerized PostgreSQL', link: '/database/postgresql/sequelize-express-guide' }
          ]
        },
        {
          text: 'Redis Track',
          collapsed: false,
          items: [
            { text: 'Complete Redis & Caching Guide', link: '/database/redis/' }
          ]
        }
      ],
      '/backend/': [
        {
          text: 'Backend Hub',
          collapsed: false,
          items: [
            { text: 'Overview & Curriculum', link: '/backend/' }
          ]
        },
        {
          text: 'Node.js Track',
          collapsed: false,
          items: [
            { text: '1. Node.js Basics & Web Server', link: '/backend/nodejs/01-nodejs-basics-and-server' },
            { text: '2. Intermediate Node.js & Core Modules', link: '/backend/nodejs/02-nodejs-intermediate-guide' }
          ]
        }
      ],
      '/frontend/': [
        {
          text: 'Frontend Hub',
          collapsed: false,
          items: [
            { text: 'Overview & Curriculum', link: '/frontend/' }
          ]
        },
        {
          text: 'HTML',
          collapsed: false,
          items: [
            { text: 'Complete HTML & Semantic Guide', link: '/frontend/html/' }
          ]
        },
        {
          text: 'CSS',
          collapsed: false,
          items: [
            { text: 'Complete CSS & Design Guide', link: '/frontend/css/' }
          ]
        },
        {
          text: 'JavaScript Track',
          collapsed: false,
          items: [
            { text: 'Overview & Roadmap', link: '/frontend/javascript/' },
            { text: '1. Core Fundamentals & DOM', link: '/frontend/javascript/javascript-fundamentals' },
            { text: '2. Modern ES6+ (React Bridge)', link: '/frontend/javascript/modern-javascript-for-react' },
            { text: '3. Async JS & Node Bridge', link: '/frontend/javascript/async-javascript-and-apis' }
          ]
        },
        {
          text: 'React.js Track',
          collapsed: false,
          items: [
            { text: 'Overview & Roadmap', link: '/frontend/react/' },
            { text: '1. Vite Setup & Core Essentials', link: '/frontend/react/01-setup-and-core-essentials' },
            { text: '2. State, Events & Form Handling', link: '/frontend/react/02-state-and-events' },
            { text: '3. Lifecycle & API Fetching', link: '/frontend/react/03-lifecycle-and-api-fetching' },
            { text: '4. React Router DOM (Routing)', link: '/frontend/react/04-react-router-dom' }
          ]
        },
        {
          text: 'Next.js Track',
          collapsed: false,
          items: [
            { text: 'Overview & Roadmap', link: '/frontend/nextjs/' },
            { text: '1. Setup, Routing & Layouts', link: '/frontend/nextjs/01-routing-and-layouts' },
            { text: '2. Server vs. Client Components', link: '/frontend/nextjs/02-server-and-client-components' },
            { text: '3. Data Fetching & APIs', link: '/frontend/nextjs/03-data-fetching-and-apis' },
            { text: '4. Server Actions, SEO & Full Project', link: '/frontend/nextjs/04-mutations-seo-and-production' }
          ]
        }
      ],
      '/devops/': [
        {
          text: 'DevOps Hub',
          collapsed: false,
          items: [
            { text: 'Overview & Curriculum', link: '/devops/' }
          ]
        },
        {
          text: 'Git & GitHub',
          collapsed: false,
          items: [
            { text: 'Complete Git & GitHub Guide', link: '/devops/git/' }
          ]
        },
        {
          text: 'Docker',
          collapsed: false,
          items: [
            { text: 'Docker & Containerization Guide', link: '/devops/docker/' }
          ]
        }
      ],
      '/projects/': [
        {
          text: 'Projects Hub',
          collapsed: false,
          items: [
            { text: 'Projects Overview', link: '/projects/' }
          ]
        },
        {
          text: 'LinkPulse Project',
          collapsed: false,
          items: [
            { text: 'Overview & Architecture', link: '/projects/linkpulse/overview' }
          ]
        },
        {
          text: 'LinkPulse Backend Guide',
          collapsed: false,
          items: [
            { text: 'Backend Overview', link: '/projects/linkpulse/backend/' },
            { text: '1. Architecture & Docker Setup', link: '/projects/linkpulse/backend/01-architecture-and-setup' },
            { text: '2. Database & Sequelize Models', link: '/projects/linkpulse/backend/02-database-and-models' },
            { text: '3. Redis & BullMQ Queues', link: '/projects/linkpulse/backend/03-redis-caching-and-queues' },
            { text: '4. Validation & Rate Limiter', link: '/projects/linkpulse/backend/04-validation-and-middlewares' },
            { text: '5. Controllers & API Routes', link: '/projects/linkpulse/backend/05-controllers-and-routes' },
            { text: '6. Server Entry & API Testing', link: '/projects/linkpulse/backend/06-server-and-testing' }
          ]
        },
        {
          text: 'LinkPulse Frontend Guide',
          collapsed: false,
          items: [
            { text: 'Frontend Overview', link: '/projects/linkpulse/frontend/' },
            { text: '1. Next.js Setup & Styling', link: '/projects/linkpulse/frontend/01-nextjs-setup-and-structure' },
            { text: '2. API Service Layer', link: '/projects/linkpulse/frontend/02-api-service-layer' },
            { text: '3. Core UI Components', link: '/projects/linkpulse/frontend/03-components-and-forms' },
            { text: '4. Analytics & Dashboard', link: '/projects/linkpulse/frontend/04-analytics-modal-and-dashboard' },
            { text: '5. Full-Stack Run & Testing', link: '/projects/linkpulse/frontend/05-run-and-test-fullstack' }
          ]
        },
        {
          text: 'PulseWatch Project',
          collapsed: false,
          items: [
            { text: 'Overview & Architecture', link: '/projects/pulsewatch/overview' }
          ]
        },
        {
          text: 'PulseWatch Backend Guide',
          collapsed: false,
          items: [
            { text: 'Backend Overview', link: '/projects/pulsewatch/backend/' },
            { text: '1. Architecture & Docker Setup', link: '/projects/pulsewatch/backend/01-architecture-and-setup' },
            { text: '2. Database & Sequelize Models', link: '/projects/pulsewatch/backend/02-database-and-models' },
            { text: '3. Redis & BullMQ Worker', link: '/projects/pulsewatch/backend/03-redis-and-bullmq-worker' },
            { text: '4. Authentication & JWT', link: '/projects/pulsewatch/backend/04-auth-and-jwt' },
            { text: '5. Monitor Routes & Caching', link: '/projects/pulsewatch/backend/05-monitor-routes-and-caching' },
            { text: '6. Server Bootstrap & Testing', link: '/projects/pulsewatch/backend/06-server-and-testing' }
          ]
        },
        {
          text: 'PulseWatch Frontend Guide',
          collapsed: false,
          items: [
            { text: 'Frontend Overview', link: '/projects/pulsewatch/frontend/' },
            { text: '1. Next.js Setup & Styling', link: '/projects/pulsewatch/frontend/01-nextjs-setup-and-styling' },
            { text: '2. API Service Layer', link: '/projects/pulsewatch/frontend/02-api-service-layer' },
            { text: '3. Landing & Auth Pages', link: '/projects/pulsewatch/frontend/03-landing-and-auth-pages' },
            { text: '4. Dashboard & History Modal', link: '/projects/pulsewatch/frontend/04-dashboard-and-modals' },
            { text: '5. Full-Stack Run & Testing', link: '/projects/pulsewatch/frontend/05-run-and-test-fullstack' }
          ]
        }
      ],
      '/interview/': [
        {
          text: 'Interview Hub',
          collapsed: false,
          items: [
            { text: 'Overview & Question Bank', link: '/interview/' }
          ]
        },
        {
          text: 'HTML Interview',
          collapsed: false,
          items: [
            { text: '100 Theoretical Questions', link: '/interview/html/html-theoretical-questions' },
            { text: '100 Practical & Coding Questions', link: '/interview/html/html-practical-questions' }
          ]
        },
        {
          text: 'CSS Interview',
          collapsed: false,
          items: [
            { text: '100 Theoretical Questions', link: '/interview/css/css-theoretical-questions' },
            { text: '100 Practical & Coding Questions', link: '/interview/css/css-practical-questions' }
          ]
        },
        {
          text: 'JavaScript Interview',
          collapsed: false,
          items: [
            { text: '100 Theoretical Questions', link: '/interview/javascript/javascript-theoretical-questions' },
            { text: '100 Practical & Coding Questions', link: '/interview/javascript/javascript-practical-questions' }
          ]
        },
        {
          text: 'React.js Interview',
          collapsed: false,
          items: [
            { text: '100 Theoretical Questions', link: '/interview/reactjs/react-theoretical-questions' },
            { text: '100 Practical & Coding Questions', link: '/interview/reactjs/react-practical-questions' }
          ]
        },
        {
          text: 'Node.js & Express Interview',
          collapsed: false,
          items: [
            { text: '100 Theoretical Questions', link: '/interview/nodejs/nodejs-express-theoretical-questions' },
            { text: '100 Practical & Coding Questions', link: '/interview/nodejs/nodejs-express-practical-questions' }
          ]
        },
        {
          text: 'DBMS & SQL Interview',
          collapsed: false,
          items: [
            { text: '100 Core DBMS Questions', link: '/interview/dbms/dbms-interview-questions' }
          ]
        }
      ],
      '/extra/': [
        {
          text: 'Extra Tracks',
          collapsed: false,
          items: [
            { text: 'Overview & Curriculum', link: '/extra/' }
          ]
        },
        {
          text: 'AI & Prompt Engineering',
          collapsed: false,
          items: [
            { text: 'AI Hub Overview', link: '/extra/ai/' },
            { text: 'Prompt Engineering for Beginners', link: '/extra/ai/prompt-engineering-for-beginners' }
          ]
        },
        {
          text: 'System Design',
          collapsed: false,
          items: [
            { text: 'System Design Hub', link: '/extra/system-design/' },
            { text: 'System Design Fundamentals', link: '/extra/system-design/system-design-fundamentals' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/harshitclub' }
    ],

    footer: {
      message: 'Created by <a href="https://github.com/harshitclub" target="_blank" rel="noopener noreferrer">Harshit Kumar</a> • <a href="https://linkedin.com/in/harshitclub" target="_blank" rel="noopener noreferrer">LinkedIn</a>',
      copyright: 'The Product Engineer: From Code to Scaled Architecture'
    }
  }
});

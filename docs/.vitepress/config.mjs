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
      { text: 'DevOps', link: '/devops/' },
      { text: 'Interview', link: '/interview/' }
    ],

    sidebar: {
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
          text: 'React.js',
          collapsed: true,
          items: [
            { text: 'Introduction to React.js', link: '/frontend/react/introduction-to-react' }
          ]
        },
        {
          text: 'Next.js',
          collapsed: true,
          items: [
            { text: 'Introduction to Next.js', link: '/frontend/nextjs/introduction-to-nextjs' }
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

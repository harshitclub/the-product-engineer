import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'The Product Engineer',
  description: 'The Product Engineer: From Code to Scaled Architecture',
  cleanUrls: true,
  lastUpdated: true,
  appearance: false, // Default Light Mode

  themeConfig: {
    siteTitle: 'The Product Engineer',
    
    search: {
      provider: 'local',
      options: {
        placeholder: 'Search engineering notes...'
      }
    },

    nav: [
      { text: 'Frontend', link: '/frontend/' }
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
          collapsed: true,
          items: [
            { text: 'Introduction to HTML', link: '/frontend/html/introduction-to-html' },
            { text: 'Document Structure', link: '/frontend/html/html-document-structure' },
            { text: 'Elements', link: '/frontend/html/html-elements' },
            { text: 'Attributes', link: '/frontend/html/html-attributes' },
            { text: 'Headings', link: '/frontend/html/html-headings' },
            { text: 'Paragraphs', link: '/frontend/html/html-paragraphs' },
            { text: 'Text Formatting', link: '/frontend/html/html-text-formatting' },
            { text: 'Links', link: '/frontend/html/html-links' },
            { text: 'Images', link: '/frontend/html/html-images' },
            { text: 'Lists', link: '/frontend/html/html-lists' },
            { text: 'Tables', link: '/frontend/html/html-tables' },
            { text: 'Block Elements', link: '/frontend/html/html-block-elements' },
            { text: 'Inline Elements', link: '/frontend/html/html-inline-elements' },
            { text: 'Div and Span', link: '/frontend/html/html-div-and-span' },
            { text: 'Semantic Elements', link: '/frontend/html/html-semantic-elements' },
            { text: 'Forms', link: '/frontend/html/html-forms' },
            { text: 'Inputs & Controls', link: '/frontend/html/html-inputs' },
            { text: 'Audio & Video Media', link: '/frontend/html/html-media' },
            { text: 'Iframes', link: '/frontend/html/html-iframe' },
            { text: 'Metadata & Head', link: '/frontend/html/html-metadata' },
            { text: 'Accessibility (a11y)', link: '/frontend/html/html-accessibility' },
            { text: 'SEO Best Practices', link: '/frontend/html/html-seo' },
            { text: 'Industry Best Practices', link: '/frontend/html/html-best-practices' }
          ]
        },
        {
          text: 'CSS',
          collapsed: true,
          items: [
            { text: 'Introduction to CSS', link: '/frontend/css/introduction-to-css' },
            { text: 'Adding CSS to HTML', link: '/frontend/css/adding-css-to-html' },
            { text: 'CSS Syntax', link: '/frontend/css/css-syntax' },
            { text: 'CSS Selectors', link: '/frontend/css/css-selectors' },
            { text: 'Specificity & Cascade', link: '/frontend/css/css-specificity' },
            { text: 'CSS Colors', link: '/frontend/css/css-colors' },
            { text: 'CSS Units', link: '/frontend/css/css-units' },
            { text: 'Box Model', link: '/frontend/css/css-box-model' },
            { text: 'Width & Height', link: '/frontend/css/css-width-and-height' },
            { text: 'Margin & Padding', link: '/frontend/css/css-margin-and-padding' },
            { text: 'Borders & Outlines', link: '/frontend/css/css-borders' },
            { text: 'Backgrounds', link: '/frontend/css/css-backgrounds' },
            { text: 'Text Styling', link: '/frontend/css/css-text' },
            { text: 'Typography & Fonts', link: '/frontend/css/css-fonts' },
            { text: 'Display Property', link: '/frontend/css/css-display' },
            { text: 'Positioning', link: '/frontend/css/css-position' },
            { text: 'Overflow Management', link: '/frontend/css/css-overflow' },
            { text: 'Z-Index & Stacking', link: '/frontend/css/css-z-index' },
            { text: 'Flexbox Layout', link: '/frontend/css/css-flexbox' },
            { text: 'Grid Layout', link: '/frontend/css/css-grid' },
            { text: 'Responsive Design', link: '/frontend/css/css-responsive-design' },
            { text: 'Media Queries', link: '/frontend/css/css-media-queries' },
            { text: 'Pseudo-Classes', link: '/frontend/css/css-pseudo-classes' },
            { text: 'Pseudo-Elements', link: '/frontend/css/css-pseudo-elements' },
            { text: 'Transforms', link: '/frontend/css/css-transforms' },
            { text: 'Transitions', link: '/frontend/css/css-transitions' },
            { text: 'Custom Properties (Variables)', link: '/frontend/css/css-custom-properties' },
            { text: 'CSS Functions (calc, clamp)', link: '/frontend/css/css-functions' },
            { text: 'Shadows & Elevation', link: '/frontend/css/css-shadows' },
            { text: 'Gradients', link: '/frontend/css/css-gradients' },
            { text: 'List Styling', link: '/frontend/css/css-lists' },
            { text: 'Table Styling', link: '/frontend/css/css-tables' },
            { text: 'Form Controls', link: '/frontend/css/css-forms' },
            { text: 'CSS Debugging', link: '/frontend/css/css-debugging' },
            { text: 'Industry Best Practices', link: '/frontend/css/css-best-practices' }
          ]
        },
        {
          text: 'JavaScript',
          collapsed: true,
          items: [
            { text: 'Introduction to JavaScript', link: '/frontend/javascript/introduction-to-javascript' }
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

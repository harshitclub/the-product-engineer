import DefaultTheme from 'vitepress/theme';
import Home from './Home.vue';
import FrontendHub from './FrontendHub.vue';
import DevOpsHub from './DevOpsHub.vue';
import InterviewHub from './InterviewHub.vue';
import './custom.css';

// Auto-heal stale dynamic chunk imports after tab inactivity or server rebuilds
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();
    window.location.reload();
  });
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Home', Home);
    app.component('FrontendHub', FrontendHub);
    app.component('DevOpsHub', DevOpsHub);
    app.component('InterviewHub', InterviewHub);
  }
};


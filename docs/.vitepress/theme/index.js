import DefaultTheme from 'vitepress/theme';
import Home from './Home.vue';
import FrontendHub from './FrontendHub.vue';
import BackendHub from './BackendHub.vue';
import DatabaseHub from './DatabaseHub.vue';
import DevOpsHub from './DevOpsHub.vue';
import InterviewHub from './InterviewHub.vue';
import ProjectsHub from './ProjectsHub.vue';
import ExtraHub from './ExtraHub.vue';
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
    app.component('BackendHub', BackendHub);
    app.component('DatabaseHub', DatabaseHub);
    app.component('DevOpsHub', DevOpsHub);
    app.component('InterviewHub', InterviewHub);
    app.component('ProjectsHub', ProjectsHub);
    app.component('ExtraHub', ExtraHub);
  }
};


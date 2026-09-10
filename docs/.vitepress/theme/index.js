import DefaultTheme from 'vitepress/theme';
import Home from './Home.vue';
import FrontendHub from './FrontendHub.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Home', Home);
    app.component('FrontendHub', FrontendHub);
  }
};

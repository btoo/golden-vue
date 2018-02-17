import GoldenLayout from 'golden-layout';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld';
import '../node_modules/golden-layout/src/css/goldenlayout-base.css';
import '../node_modules/golden-layout/src/css/goldenlayout-dark-theme.css';


import App from './App';
import router from './router';

Vue.config.productionTip = false;

const goldenLayout = new GoldenLayout({
  settings: {
    hasHeaders: true,
    showPopoutIcon: false,
    showCloseIcon: false,
    showMaximiseIcon: false,
  },
  dimensions: { borderWidth: 2 },
  content: [{
    type: 'row',
    content: [
      {
        type: 'component',
        componentName: 'template',
        // componentState: { vueTemplate: sidebar },
        componentState: { vueTemplate: App },
      },
      {
        type: 'component',
        componentName: 'template',
        // componentState: { vueTemplate: IOTDashboard },
        componentState: { vueTemplate: HelloWorld },
      },
    ],
  }],
}, '#app');

const VueApp = {
  // el:'#app',
  router,
  // store,
  // render: h => h(App),
  components: { App },
  template: '<App/>',
  data: {
    title: 'Vue + Golden Layout',
    somevalue: 'Hello Vue :-)',
  },
  methods: {
    resetLayout() {
      localStorage.removeItem('savedState');
      // console.log('reset', window.location.reload);
      window.location.reload(true);
    },
  },
};

goldenLayout.registerComponent('template', (container, state) => {
  const html = `<div id="${state.templateId}"></div>`;
  container.getElement().html(html);
  setTimeout(() => {
    VueApp.el = `#${state.templateId}`;
    VueApp.render = h => h(state.vueTemplate);

    /* eslint-disable no-new */
    new Vue(VueApp);
  });
});

//  Initialize GL
goldenLayout.init();

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>',
// });

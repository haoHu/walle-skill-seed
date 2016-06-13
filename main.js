"use strict";
requirejs.config({
  env: 'node',
  //把node自身的require方法传递给requirejs
  nodeRequire: require,
  baseUrl: __dirname + '/',
  paths: {
    jquery: "bower_components/jquery/dist/jquery",
    lodash: "bower_components/lodash/dist/lodash",
    // text: "bower_components/text/text",
    text: "bower_components/text/text",
    css: "bower_components/require-css/css",
    domReady: "bower_components/domReady/domReady",
    avalon: "bower_components/avalon/dist/avalon.shim",
    material: "bower_components/bootstrap-material-design/dist/js/material",
    ripples: "bower_components/bootstrap-material-design/dist/js/ripples",
    swiper: "bower_components/swiper/dist/js/swiper.jquery",

    // 工程自身改造的路由相关代码
    // 改写mmHistory
    walleHistory: "src/routes/walleHistory",
    // 改写mmRouter
    walleRouter: "src/routes/walleRouter",
    // 复用mmPromise
    wallePromise: "src/routes/wallePromise",
    // 工程的路由控制
    routes: "src/routes/routes",
    rootViewModel: "src/index"
  },
  // 声明加载优先级
  priority: ['text', 'css'],
  shim: {
    jquery: {
      exports: 'jQuery'
    },
    avalon: {
      exports: 'avalon',
      deps: ['jquery']
    },
    lodash: {
      exports: '_'
    },
    material: {
      deps: ['jquery', 'ripples']
    },
    swiper: {
      deps: ['jquery']
    },
    ripples: {
      deps: ['jquery']
    }
  }
});

requirejs(['avalon', 'domReady!', 'material', 'swiper', 'routes'], function() {
  $(function() {
    $.material.init();
  });
  console.log("avalon loaded, begin build root VM and loading other modules");

  // 设置UI组件库的名字
  // 可以自定义UI组件库的名称
  avalon.library("eva", {
    $init: function() {},
    $childReady: function() {},
    $ready: function() {},
    $dispose: function() {}
  });

});

define(["avalon"], function(avalon) {
  "use strict";
  // 初始化templateCache
  // 设定空模板的cache缓存
  avalon.templateCache.empty = "&nbsp;";
  var rootViewModel = avalon.define({
    $id: "root",
    name: "rootcontroller",
    page: "empty",
    // 当前路由的参数作为全局变量保存在root controller中，方便使用
    // 当前路由的path
    currentPath: "",
    // 当前路由参数
    params: {},
    // 当前路由的search字段
    query: {},
    // 当前路由回调参数
    args: "[]",
    // 当前路由匹配正则
    pathRegExp: null,
    pageLoaded: function() {
      // console.log(arguments);
    },
    pageRendered: function() {
      // console.log(arguments);
      if (avalon.vmodels.root.page == "home_index") {
        // TODO 探索jibo实例化的方式，哪种方式最适合项目开发
        initJiboFace();
      }
    }
  });
  function initJiboFace() {
    let jibo = require('jibo');
    let Status = jibo.bt.Status;

    jibo.init('face', function(err) {
      if (err) {
        return console.error(err);
      }
      // Load and create the behavior tree
      let root = jibo.bt.create(__dirname + '/behaviors/main');
      root.start();

      // Listen for the jibo main update loop
      jibo.timer.on('update', function(elapsed) {
        // If the tree is in progress, keep updating
        if (root.status === Status.IN_PROGRESS) {
          root.update();
        }
      });
    });
  }
  // requirejs(['routes']);
  console.log(rootViewModel);
  return rootViewModel;
});

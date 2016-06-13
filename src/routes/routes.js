define(["lodash", "walleRouter", "rootViewModel"], function(_) {
  "use strict";
  var root = avalon.vmodels.root;
  function callback() {
    root.currentPath = this.path;
    root.params = this.params;
    root.args = "[" + [].slice.call(arguments).join(",") + "]";
    root.query = this.query;
    root.pathRegExp = this.regexp;
    // js路径变量
    var jsPath = "./src/modules/";
    // 页面路径变量
    var pagePath = "";
    var paths = this.path.split("/").slice(1);
    console.log("[PagePath]", this.path, '=>', this.paths);
    // 获取路由path中参数部分的字段集合
    var pv = _.values(this.params);
    // var pv = Object.keys(this.params);
    // 路由去中心化
    // 依据路由的path，获取需要加载的js路径
    // 以及需要使用的页面路径
    // path的设计结构
    // /[ModuleName]/{act}/{param1}/{param2}
    // 推荐路由设计
    // /[ModuleName]/[act]/[id]/[other param1]/[other param2]/...
    if (!paths[0]) {
      // 如果第一次加载页面，没有给出路由，默认跳转指向首页
      avalon.router.navigate("home");
      return;
    }
    jsPath += paths[0] + "/" + paths[0];
    pagePath = paths[0] + "_index";
    console.log("[JsPath]", jsPath);
    requirejs([jsPath], function() {
      // 将pagePath作为模块页面模板的id，赋值给root controller 下面的page属性
      root.page = pagePath;
    });

  }

  // TODO 添加页面路由
  avalon.router.get("/", callback);
  avalon.router.get("/home", callback);
  avalon.router.get("/music", callback);
  avalon.router.error(function() {
    console.log("没有对应路由，自动重定向回指定页面");
    avalon.router.redirect("#!/home");
  });
  avalon.history.start();
  avalon.scan(document.body, root);

});

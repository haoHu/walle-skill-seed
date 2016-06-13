define(["avalon", "text!./home.html"], function(avalon, tpl) {
  "use strict";
  var faceId = 'face';
  // 模板缓存赋值--模板html
  avalon.templateCache.home_index = tpl || '';
  var homeVM = avalon.define({
    $id: "home",
    faceId: faceId,
    pageLoaded: function() {
      console.log(arguments);
    },
    pageRendered: function() {
      console.log(arguments);
    },
    loadhome: function() {
      initJiboFace();
    },
    clickfn: function(e) {
      console.info(e);
      avalon.router.navigate("music");
    // avalon.router.redirect("#!/music");
    }
  });
  console.log(global);
  function initJiboFace() {
    let jibo = require('jibo');
    let Status = jibo.bt.Status;

    jibo.init(faceId, function(err) {
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


});

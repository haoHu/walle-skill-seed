define(["avalon", "text!./music.html"], function(avalon, tpl) {
  "use strict";
  var jibo = require('jibo');
  let Status = jibo.bt.status;
  avalon.templateCache.music_index = tpl || '';
  var musicVM = avalon.define({
    $id: "music",
    clickfn1: function(e) {
      console.log(e);
      avalon.router.navigate("home");
    // avalon.router.redirect("#!/music");
    }
  });


});

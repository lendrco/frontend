define([], function(){
      var currentView = null;
      var el = "#content";
      var region = {};
      var name='';

      var closeView = function (view) {
	  if (view && view.close) {
	      view.undelegateEvents();
	      view.close();
	  }
      };
      
      var openView = function (view) {
	  view.render();
	  $(el).html(view.el);
	  if (view.onShow) {
	      view.onShow();
	  }
      };

      region.show = function (view, viewName) {
	  closeView(currentView);
	  currentView = view;
	  openView(currentView);
	  name = viewName;
      };

      region.getView = function(){
	  return currentView;
      };

      region.getViewName = function(){
	  return name;
      };

      region.hasView = function(){
          if(currentView != null){
	      return true;
	  }
	  return false;
      };

      return region;
});

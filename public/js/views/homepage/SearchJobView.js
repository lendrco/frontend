define([
	'Underscore',
	'Backbone',
	'views/homepage/MapView',
	'views/homepage/MapListView',
	'views/homepage/MapSideView'
	], function(_, Backbone, Body, Bottom, Side){

     var view = Backbone.View.extend({
         initialize: function () 
	 {
	     _.bindAll(this, 'render', 'close', 'onShow');
	     this.children= {
		 body: new Body(),
		 bottom: new Bottom(),
		 side: new Side()
             };
	 },

         render: function () 
	 {
	     var leftPanel = $('<div class="span10"  style="border-right:1px solid grey"></div>');
	     leftPanel.append(this.children.body.render().el);
	     leftPanel.append($('<br>'));
	     leftPanel.append(this.children.bottom.render().el);
	     this.$el.append(leftPanel);

	     var rightPanel = $('<div class="span2"></div>');
	     rightPanel.append(this.children.side.render().el);
	     this.$el.append(rightPanel);

	     $(this.el).hide();
             return this;
	 },

	 close: function(){
	     this.children.body.close();
	     this.children.bottom.close();
	     this.children.side.close();

	     this.remove();
	     this.unbind();
	 },

	 onShow: function(){
	     $(this.el).show();
	 }
     });
     return view;
       
});

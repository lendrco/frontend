define([
	'jQuery',
	'Underscore',
	'views/homepage/IndexView'
	], function($, _, BodyView)
{

     var view = Backbone.View.extend({

         initialize: function () 
	 {
	     _.bindAll(this, 'render', 'close', 'onShow');
	     this.children = {
		 body: new BodyView()
             };
	     
	 },

         render: function () 
	 {
	     this.$el.append(this.children.body.render().el);
	     $(this.el).hide();
             return this;
	 },

	 close: function()
	 {
	     this.children.body.close();
	     this.remove();
	     this.unbind();
	 },

	 onShow: function(){
	     $(this.el).show();
	 }
     });
     return view;
       
});

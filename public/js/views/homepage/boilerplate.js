define([
	'jQuery',
	'Underscore',
    'Backbone'], function($, _, Backbone){

     var view = Backbone.View.extend({
	 className: 'row',

         initialize: function () {
		 _.bindAll(this, 'render', 'close', 'onShow');
	     this.children= {

             };
	 },

         render: function () {
	     $(this.el).hide();
             return this;
	 },

	 close: function(){
	     this.remove();
	     this.unbind();
	 },

	 onShow: function(){
	     $(this.el).show();
	 }
     });
     return view;
       
});

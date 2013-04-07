define(['text!templates/index.html'], function(indexTemplate) 
{
    var indexView = Backbone.View.extend({
	    events: {
		'click #start-btn': 'showAction',
		'click #connect-btn': 'getConnect'
	    },
	    
	    initialize: function(){
	    },

	    render: function() {
		this.$el.html(indexTemplate);
		// this.$title = this.$('#title');
		// this.$location = this.$('#location');
		return this;
	    },
	    
	    close: function(){
		this.remove();
		this.unbind();
	    },

            getConnect: function(e){
		e.preventDefault();
                console.log("connection clicked");
		this.$('#show2').hide();
		this.$('#show3').show();

		/*
		$.ajax({
		    type: "POST",
		    url: "some.php",
success: function(data, textStatus, jqXHR){
			    $.fancybox.hideActivity();
			    //console.log("Loaded signals");
			    this.loaded(data);
			    options.success(data, 'success', null);
			},

			error: function(jqXHR, textStatus, errorThrown){
			    $.fancybox.hideActivity();
			    //console.log("Call to load signals failed");
			    //console.log(errorThrown);
			    options.error(this, jqXHR, null);
			},
			context: this
		});
		*/
	    },

	    showAction: function(e){
		e.preventDefault();
		console.log("btn clicked");
		this.$('#show1').hide();
		this.$('#show2').show();
		/*
		var title = this.$title.val().trim();
		var location = this.$location.val().trim();
		window.JoblyRouter.navigate("jobs?title="+title+"&location="+location, 
                                            { trigger : true});
		*/
		return this;
	    }
	});
    
    return indexView;
});
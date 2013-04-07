define([], function() 
{
    // this is nasty, need to find a better way to clean up 
    var template = _.template([
  '<div class="navbar navbar-fixed-top">',
  '<div class="navbar-inner">',
  '<div class="container">',
  '          <a class="brand" href="/">Lendr.co</a>',
  '          <div class="nav-collapse collapse" style="float:right">',
  '              <ul class="nav">',
  '                  <li class="home-menu active"><a href="#">about</a></li>',
  '                  <li class="howitworks-menu"><a href="#howitworks">how it works</a></li>',
  '                  <li class="contact-menu"><a href="#contactus">contactus</a></li>',
  '              </ul>',
  '          </div>',
  '      </div>',
  '  </div>',
  '</div>'].join(''));

    var headerView = Backbone.View.extend({

	    initialize: function () {
	    },
	    
	    render: function () {
		$(this.el).html(template());
		return this;
	    },

	    close: function(){
		this.remove();
		this.unbind();
	    },
	    
	    select: function(menuItem) {
		$('.nav li').removeClass('active');
		$('.' + menuItem).addClass('active');
	    }
	});
    
	return headerView;
    });
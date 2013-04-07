define(['Underscore'], function (_) {
    var serviceDateTemplate = _.template('<%=month%>-<%=day%>-<%=year%>');
    var displayDateTemplate = _.template('<%=month%> <%=day%>, <%=year%>');
    var chartDateTemplate = _.template('<%=month%>/<%=day%>/<%=year%>');
    var signalDateTemplate = _.template('<%=year%>-<%=month%>-<%=day%>');
    var monthName = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
 
    var dob_regex = /^([0-9]){2}(\/){1}([0-9]){2}(\/)([0-9]){4}$/;   // DD/MM/YYYY
    var email_regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;  // email address
    var username_regex = /^[\w.-]+$/;  // allowed characters: any word . -, ( \w ) represents any word character (letters, digits, and the underscore _ ), equivalent to [a-zA-Z0-9_]
    var text_regex = /^[a-zA-Z.0-9- ]+$/;
    var num_regex = /^\d+$/; // numeric digits only
    var search_regex = "/hello/"; 
    var password_regex = /^[A-Za-z\d]{6,8}$/;  // any upper/lowercase characters and digits, between 6 to 8 characters in total
    var phone_regex = /^\(\d{3]\) \d{3}-\d{4}$/;  // (xxx) xxx-xxxx  
    var question_regex = /\?$/; // ends with a question mark

    return {
        validate: function(input, type){
            if(type == 'text'){
                return input.match(text_regex);
            }else if(type == 'username'){
                return input.match(username_regex);
            }else if(type == 'email'){
                return input.match(email_regex);
            }else if(type == 'num'){
                return input.match(num_regex);
            }
            return false;
        },

        formatDate:  function(d) {
            return serviceDateTemplate({
                year : d.getFullYear(),
		// there is inconsistent of month usage in system
	        // need to fix
		month : d.getMonth() + 1,
                day : d.getDate()
            });
	},

        displayDate:  function(d) {
            return displayDateTemplate({
                year : d.getFullYear(),
		month : monthName[d.getMonth()],
                day : d.getDate()
            });
	},

	signalDateToChartDate: function(d) {
	    var component = d.split("-");
	    return chartDateTemplate({
		    year : component[0],
		month : component[1],
		day : component[2]
	    });
 	},

	formatSignalDate: function(d) {
	    return signalDateTemplate({
		year : d.getFullYear(),
                month : d.getMonth() + 1,
                day : d.getDate()
            });
        },

	    // sorting the multi-dimension data array,
	    // assuming the first member is the date
	sortDateAscent :function (date1, date2) {
		// This is a comparison function that will result in dates being sorted in
		// ASCENDING order. As you can see, JavaScript's native comparison operators
		// can be used to compare dates. This was news to me.
		if (date1[0] > date2[0]) return 1;
		if (date1[0] < date2[0]) return -1;
		return 0;
	    }


     };
    
});
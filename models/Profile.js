module.exports = function(app, mongoose) {
    var schemaOptions = {
	toJSON: {
	    virtuals: true
	},
	toObject: {
	    virtuals: true
	}
    };

    var ProfileSchema = new mongoose.Schema({
	    id: {type: mongoose.Schema.ObjectId },
	    profile:{type: String},
	    added:     { type: Date },     // When the contact was added
	    updated:   { type: Date }      // When the contact last updated

	}, schemaOptions);

    var Profile = mongoose.model('Profile', ProfileSchema);

    var registerCallback = function(err) {
	if (err) {
	    return console.log(err);
	};
	return console.log('Profile was created');
    };

    var addUser = function(id, profile, date) {
	console.log('add user ' + id);
	var profile = new Profile({
		id: id,
		profile: profile,
		added: date,
		updated: date
	    });
	profile.save(registerCallback);
	console.log('Save command was sent');
    };


    return {
	addUser: addUser,
	Profile: Profile
    }
}

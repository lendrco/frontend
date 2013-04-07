module.exports = function(app, mongoose) {
    var schemaOptions = {
	toJSON: {
	    virtuals: true
	},
	toObject: {
	    virtuals: true
	}
    };

    var FriendSchema = new mongoose.Schema({
	    id: {type: String},
	    friendID:{type: String},
	    added:     { type: Date },     // When the contact was added
	}, schemaOptions);

    FriendSchema.index({id: 1, friendID: 1}, {unique: true});    
    var Friend = mongoose.model('Friend', FriendSchema);

    var registerCallback = function(err) {
	if (err) {
	    return console.log(err);
	};
	return console.log('Friend was created');
    };

    var addFriend = function(id, friend, date) {
	// console.log('add friend for ' + id);
	var friend = new Friend({
		id: id,
		friend: friend,
		added: date,
	    });
	friend.save(registerCallback);
	// console.log('Save command was sent');
    };


    return {
	addFriend: addFriend,
	Friend: Friend
    }
}

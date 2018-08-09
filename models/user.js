var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://ds147979.mlab.com:47979/accounts', {
    auth: {
      user: 'Admin',
      password: 'PAWSCareisNi$e'
    }
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
var db = mongoose.connection;


//Users Schema
var UsersSchema = mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		index: true
	},
	password: {
		type: String
    },
	email:{
		type: String
	//	required: true
	},
	profileimage:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var User = module.exports = mongoose.model('User',UsersSchema)

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query,callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err,isMatch) {
		callback(null, isMatch);
	});
}




module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
	
}
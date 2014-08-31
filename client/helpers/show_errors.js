ErrorsAPI = new Meteor.Collection(null); // Makes a local collection

throwError = function(msg) {
		ErrorsAPI.insert({message: msg, seen: false});
	};


clearErrors = function () {
	ErrorsAPI.remove({seen:true});
}
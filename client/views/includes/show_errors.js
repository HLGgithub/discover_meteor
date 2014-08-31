Template.showErrors.helpers({
	errors: function () {
		return ErrorsAPI.find();
	}
});


// The rendered callback(?) only gets called 
// when the user reloads...
//
Template.showErrors.rendered = function () {
    
    // 'this' data context only gets set when there 
	// are records in the Errors data collection 
	// (see showErrors template, which calls the helper at the top of this file)
	// 
	var errData = this.data;

    if(!errData)
    {
        console.log("There are no post submission errors");
    }
    else
    {

        //	Wait untl the showErrors template is rendered
        //	before marking it (and the associated error) as seen
        //	using the defer function
        //	
        Meteor.defer(function () 
                        {	
                            ErrorsAPI.update(errData._id, {$set: {seen: true}});	
                        }
                    );
    }	
};
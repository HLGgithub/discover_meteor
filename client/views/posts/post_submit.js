Template.postSubmit.events({
	'submit form': function (e) {
		e.preventDefault();

		var post = {
					url: $(e.target).find('[name=url]').val(),
					title: $(e.target).find('[name=title]').val(),
					message: $(e.target).find('[name=message]').val()
				   }

		// Since post here is just a plain old object, it won't know
		// what the inserted post id is unless we store the result
		// of the insert call. 
		//		   
//		post._id = PostsAPI.insert(post);



		// Instead of allowing local inserts, we will perform the insert
		// on the server
		//
		

		Meteor.call('remotePost', post, function toDoAfterPosting(err, id)
		{
			if (err)
				{
				//return alert("Error - could not submit post to server: " + err.reason);
				
				throwError(err.reason);

				// If the error is that a duplicate link has been posted already....
				//
				if(err.error == 302)
					{
						// ..Redirect to the duplicate page
						//
						Router.go('postPage', {_id: err.details});
					}
				}
			else // no error
				Router.go('postPage', {_id: id});
	});

		
	}
});
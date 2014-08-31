Template.postEdit.events({
	'submit form': function (e) 
	{
		e.preventDefault();

		var currentPostId = this._id;

		var postProperties = {
					url: $(e.target).find('[name=url]').val(),
					title: $(e.target).find('[name=title]').val(),
					message: $(e.target).find('[name=message]').val()
				   }

		// Since the only posts the user can edit are those that s/he created, 
		// we will perform the updates locally
		//
		PostsAPI.update(currentPostId, {$set: postProperties}, function (err) {
			
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				// Notice that the data context is set by referencing '_id', not 'id', since
				// we are referencing the _id created by mongodb
				//
				Router.go('postPage', {_id: currentPostId});
			}
		});		

		
	},

	'click .delete': function (e) 
	{

		e.preventDefault();

		if(confirm("Delete this post?"))
		{
			var currentPostId = this._id;
			/*
			PostsAPI.remove(currentPostId);
			Router.go('postsList');
			*/

			PostsAPI.remove({_id: currentPostId}, function (err) 
			{
			
			if(err)
				{
					alert(err.reason);
				}
			else
				{
					Router.go('postsList');
				}
			});

		}
	}

});
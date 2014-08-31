// This works because we've subscribed in main.js (which runs after everything)
// 
// SEE: http://stackoverflow.com/questions/19826804/understanding-meteor-publish-subscribe/21853298#21853298 
//
// Locally, the minimongo db will call this collection, "posts", and we will access via the PostsAPI object.
// On the server, the mongo db will call this collection, "posts", and we will access via the PostsAPI object over there. 
//
// MyCollection = new Meteor.Collection('collection-name-in-mongo')
//
// QUESTION: How does this call interact with the record set / cursor of our subscription?
// HYPOTHESIS: Meteor knows that our cursor from our subscription belongs to the mongo collection we link it to 
// (i.e., posts, which is actually created here when this line is run on the serve
// SEE: http://docs.meteor.com/#meteor_collection
//
// If there's no "autopublish" package, meteor will check its subscriptions to see if any subscriptions exist for the collection
// we are trying to connect to.
//
PostsAPI = new Meteor.Collection('posts');

/*
This code is for when we were just implementing security locally

PostsAPI.allow({
	insert: function (userId, doc) {
		// only allow posting if user is logged in
		//
		// If userId is not undefined, or 0, !userId = false 
		// If userId is undefined, or 0, !userId = true

		return !!userId;
	}

*/

PostsAPI.allow({

	update: ownsDocument,
	remove: ownsDocument
	});

PostsAPI.deny({
	
	update: function (userId, doc, fields) {
		// State that we are denying updates to all fields EXCEPT title, url, and message
		// by testing the fields being updated to see if there are any besides those three:
		//
		return ((_.without(fields, 'title', 'url', 'message')).length > 0); // if this returns true, then YES, we will DENY the update 
	}
});

// Now, we are implementing security on the server via Method calls
//
Meteor.methods({
	remotePost: function (submittedPost) {

		var authorizedUser = Meteor.user();
		var redundantPost = PostsAPI.findOne({url: submittedPost.url});

		// Ensure the user is logged in
		if (!authorizedUser)
			throw new Meteor.Error(401, 'You must be logged in to submit a post');

		// Ensure the post has a title
		if (!submittedPost.title)
			throw new Meteor.Error(422, 'Please enter a title');

		// Ensure that their are no previous posts with the same (non-empty) link
		//
		if (redundantPost && submittedPost.url)
			throw new Meteor.Error(302, 'The link you have entered has already been posted', redundantPost._id);

//		newPost = submittedPost;
		
		// Construct a full-fledged post that has a time-stamp, and which is attached to the user
		//
		var filteredPost = _.pick(submittedPost, 'title', 'url', 'message');
		var newPost = _.extend(filteredPost, {
												userId: authorizedUser._id,
												author: authorizedUser.username,
												dateSubmitted: new Date().getTime(),
           										commentsCount: 0
											 });
		
		var postId = PostsAPI.insert(newPost);
		return postId;

	}
});

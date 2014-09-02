
// The posts_subscription sends information related to the PostsAPI- including the fact that we've named the collection "posts". 
// So when /collections/posts.js defines:
//       PostsAPI = new Meteor.Collection('posts');
// We are defining the object that will manage our interactions with the  mongo collection named'posts'.
// 
// By publishing a record set, we define how data is to be filtered by subscribing clients. 
// The function in the publish call is run every time a client subscribes to the collection being managed by the PostsAPI
//
//  See: http://www.meteorpedia.com/read/Understanding_Meteor_Publish_and_Subscribe
// 


// NOTE: Publications automatically re-publish whenever the user logs out

Meteor.publish('posts_subscription', function() {
	return PostsAPI.find();
});

Meteor.publish('comments_subscription', function(filterByPostId) {
    return CommentsAPI.find({postId: filterByPostId});
});

Meteor.publish('notifications_subscription', function(){
  
  // Can't call Meteor.userId here or in a Meteor.methods because the 
  // connection hasn't been established yet, and the user is attached
  // to the connection... so we use "this" instead
  //
  // console.log("Meteor.userId is " + Meteor.userId());
     console.log("this.userId is " + this.userId);
 
  return NotificationsAPI.find({userId: this.userId}); // Here we limit the notifications returned to just the current user
});
NotificationsAPI = new Meteor.Collection('notifications');

NotificationsAPI.allow({
    update: ownsDocument 
});

//Meteor.methods({
    createCommentNotification = function(comment){
        var post = PostsAPI.findOne(comment.postId);
        
        // If someone else made the comment beside the user who made the post
        // add the notification
        //
        if (comment.userId !== post.userId) {
            NotificationsAPI.insert({
                userId: post.userId,
                postId: post._id,
                commentId: comment._id,
                commenterName: comment.author,
                read: false
            });
        }
    };
//});
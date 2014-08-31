CommentsAPI = new Meteor.Collection('comments');

Meteor.methods({
    submitComment: function(commentObj) {
        
        var user = Meteor.user();
        var post = PostsAPI.findOne(commentObj.postId);
        
        
        //console.log("Post we found is " + post._id);
        
        // Ensure the user is loggedin
        // 
        if (!user)
            throw new Meteor.Error(401, "You need to login to make comments");       
        
        // This should be checked for before we sent it to the server...! But,
        // the server checks anyways in case someone else tries to invoke this methos
        // without checking for an empty body in the client.
        //
        if (!commentObj.body)
            throw new Meteor.Error(422, "Please write some content...");
        
        if (!post)
            throw new Meteor.Error(422, "The computer thinks this comment doesn't have a post to go along with it...");
        
        // Format the comment object by first ensuring that the postId and body fields
        // are listed in the right order, then add userId, author, and submitted date
        // 
        formattedCommentObj = _.extend(_.pick(commentObj, 'postId', 'body'),
                            {
                                userId:user._id,
                                author:user.username,
                                submitted: new Date().getTime()
                            }
                       );
        
        // Update the post with the number of comments
        // 
        PostsAPI.update(commentObj.postId, {$inc: {commentsCount:1} })
        
        formattedCommentObj._id = CommentsAPI.insert(formattedCommentObj);
        
        createCommentNotification(formattedCommentObj);
        
        return formattedCommentObj._id;
    }
    
});
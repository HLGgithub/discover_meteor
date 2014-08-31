Template.postPage.helpers({
    comments: function(){
        return CommentsAPI.find({
            						// this is the data context
            						// whenever we are looking at a post
            						// page- which is going to be a
            						// Post document as returned by
            						// the PostsAPI iterator, thanks to what we
            						// put in router.js (see the 'data' part of
            						// this.route('postPage')....)
            						//
                                    postId: this._id
                                }); 
    }
});
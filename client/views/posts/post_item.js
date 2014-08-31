Template.postItem.helpers({
	ownPost: function () {
		var currentPostUserId = this.userId;

		// Need to have parenthesis here!
		//
		return currentPostUserId == Meteor.userId();
	}, 
	domain: function () {
		var anchorTag = document.createElement('a');
		anchorTag.href = this.url;
		return anchorTag.hostname;
	}
    
    /*,
     *
     * For now, we've denormalized the relationship between posts and comment counts, 
     * by adding commentCount to Post objects.
     * 
     */
   
    /*
    commentsCount: function() {
        return CommentsAPI.find({postId: this._id}).count();
        
        // Future: Replace the above with:
        // 
	 	// return CommentsCountCacheAPI.find({postId: this._id}).count();

    }
    */
});
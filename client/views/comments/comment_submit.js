Template.commentSubmit.events({
    'submit form': function(e, template){
        e.preventDefault();
     
        var $body = $(e.target).find('[name=body]');
        
        // Form the comment to pass
        // 
        var comment = {
            postId: template.data._id,
            body: $body.val()
        };
        
        Meteor.call('submitComment', comment, function(error, commentId){
            if(error){
                throwError(error);
            } else {
                // reset the comment box
                //
                $body.val(''); 
            }
            
        });
    }
    
});


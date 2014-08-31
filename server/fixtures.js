if (PostsAPI.find().count() === 0) {
	var now = new Date().getTime();
        
    // Create two users

    // tomID gets set to the result of the insert, which
    // will be the _id of the resulting mongo document
    //
    var tomId = Meteor.users.insert({
                                        profile: {name: 'Tom Coleman'}
                                    });

    var tom = Meteor.users.findOne(tomId);

    var sachaId = Meteor.users.insert({
                                        profile: {name: 'Sacha Greif'} 
                                      });

    var sacha = Meteor.users.findOne(sachaId);

    var telescopePostId = PostsAPI.insert({
        title: 'Introducing Telescope',
        userId: sachaId, // should also be able to use sachaId, which should be the same
        author: sacha.profile.name,
        url: 'http://sachagreif.com/introducing-telescope/',
        submitted: now - 7 * 3600 * 1000,
        commentsCount: 2
    });
    
    CommentsAPI.insert({
            postId: telescopePostId,
            userId: tom._id, // should also be able to use tomId, which should be the same
            author: tom.profile.name,
            submitted: now - 5 * 3600 * 1000,
            body: 'Interesting project Sacha, how can I get involved???'
        });
        
    CommentsAPI.insert({
            postId: telescopePostId,
            userId: sacha._id,
            author: sacha.profile.name,
            submitted: now - 3 * 3600 * 1000,
            body: 'Hell yeah dude!!'
        });


    PostsAPI.insert({
        title: 'Meteor',
        userId: tom._id,
        author: tom.profile.name,
        url: 'http://meteor.com',
        submitted: now - 10 * 3600 * 1000,
        commentsCount: 0
    });

    PostsAPI.insert({
        title: 'The Meteor Book',
        userId: tom._id,
        author: tom.profile.name,
        url: 'http://themeteorbook.com',
        submitted: now - 12 * 3600 * 1000,
        commentsCount: 0
    });

}
Template.notifications.helpers({
    notificationCount: function(){
        return NotificationsAPI.find({userId:Meteor.userId(), read: false}).count();
    },
    
    // Provide a list of the notifications associated to the current user
    //
    notifications: function(){
        return NotificationsAPI.find({userId:Meteor.userId(), read: false});

    }
});


Template.notification.helpers({
    notificationPostPath: function() {
        return Router.routes.postPage.path({_id: this.postId});
    }
});

Template.notification.events({
    
    // Mark the notification as read
    // 
    'click a': function(){
      NotificationsAPI.update(this._id, {$set: {read: true}});
    }
  
});
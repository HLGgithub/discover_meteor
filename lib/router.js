// Configure the default layout template (i.e., the highest level template)
//
Router.configure({
		layoutTemplate: 'layout', // defined in layout.html
		loadingTemplate: 'loading', // may not need this, since we are using the 'onBeforeAction' ?
		waitOn: function () {
			return [ 
                	Meteor.subscribe('posts_subscription'),
                	Meteor.subscribe('notifications_subscription')
                
               // Since we don't want to pre-load ALL our comments
               // when we land on the home page, we'll handle the subscribe
               // whenever we're routed to a specific post
               // 
               // 	Meteor.subscribe('comments_subscription')
           		   ];
		}
	});

// Naming the route 'postsList' (the same name as an existing template) tells the router what to (by default) put in the {{<yield}} partial at the '/' route
//
Router.map( function() {
	this.route('postsList', {path: '/'}); // If we didn't add the path explicitly here, the route would be created at '/postsList'
	this.route('postPage',  {path: '/posts/:_id',

							 // How to pass this id to the template? Instead of giving it directly to the template, overlay a data context. That is,
							 // set the data context so that when the template at this route loads, it will only refer to the following
							 // data:
							 //
							 data: function() {
										  	  //console.log("Post being viewed is: " + PostsAPI.findOne(this.params._id));
										  	  return PostsAPI.findOne(this.params._id);

											  },
                             waitOn: function() {
                                                 return Meteor.subscribe('comments_subscription', this.params._id);
                                  	           }
							}
			  );
	
	this.route('postSubmit', {path: '/submit'});

	this.route('postEdit', {path:'/edit/:_id', 
							data: function () {
								return PostsAPI.findOne(this.params._id);
							}	

		});	

	});

// The docs say to include "pause" as a parameter:
//  ... = function (pause) { ....
// But who is providing this?
// I suppose meteor will pass this parameter to any 
// onBeforeAction besides the loading one
// which will correctly pause according to the application's needs
//
var requireLogin = function (pause) {
	if (! Meteor.user()) 
	{
		if (Meteor.loggingIn())
			this.render(this.loadingTemplate)
		else
			this.render('accessDenied');

		pause();		
	}
}

/*
The code after this comment is shorthand for the following code:

this.route('postsShow', {
  waitOn: function () {
    return Meteor.subscribe('post', this.params._id);
  },

  action: function () {
    if (this.ready())
      this.render();
    else
      this.render('loading');
  }
});

 */
Router.onBeforeAction('loading');

Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

// If we don't wrap into a function, Meteor tries to compile the function- but this fails because the function is not available on the server.
// By wrapping it into a function, we allow meteor to see a "valid" function during compile time, then once our client is ready to run its
// onBeforeAction during navigation, it can run this function normally since it will have it defined by then via the client/views/includes/show_errors.js
// file.
//
Router.onBeforeAction(function () {clearErrors();} );


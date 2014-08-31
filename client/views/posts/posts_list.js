/*

var postsData = [
	{
		title: 'Some cool book',
		author: 'A cool author',
		url: 'http://www.google.com'

	},
	{
	title: 'Introducing Telescope',
	author: 'Sacha Greif',
	url: 'http://sachagreif.com/introducing-telescope/'
	},
	{
	title: 'Meteor',
	author: 'Tom Coleman',
	url: 'http://meteor.com'
	},
	{
	title: 'The Meteor Book',
	author: 'Tom Coleman',
	url: 'http://themeteorbook.com'
	}

];

*/



Template.postsList.helpers({

	// Posts.find() works because of the work done on both the client AND server in /collections/posts.js
	// along with the work done to subscribe the whole client application (after all other code runs, by virtue of putting the
	// subscription in main.js) to what we publish on the server in /server/publication.js. 
	//
	posts: function() {
		return PostsAPI.find({}, {
									sort: {dateSubmitted: -1}
								 });
	}
});
Template.header.helpers({
	pageTitle: function () {
		Session.set('pageTitle', 'My Star Foundry');

		return Session.get('pageTitle');
	}
});
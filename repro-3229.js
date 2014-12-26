if (Meteor.isClient) {
  Template.hello.helpers({
    dataUri: function () {
      return Session.get('data-uri');
    }
  });

  Template.hello.events({
    'click button': function () {
      navigator.camera.getPicture(function (fileUri) {
        Session.set('data-uri', fileUri);
      }, function (error) {
      }, {
        destinationType: Camera.DestinationType.FILE_URI
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

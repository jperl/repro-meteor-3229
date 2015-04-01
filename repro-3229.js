if (Meteor.isClient) {
  Template.hello.helpers({
    dataUri: function () {
      return Session.get('data-uri');
    }
  });

  Template.hello.events({
    'click button': function () {
      var uri = 'https://d14jjfgstdxsoz.cloudfront.net/meteor-logo.png';

      window.requestFileSystem(LocalFileSystem.TEMPORARY, 0,
        function (fileSystem) {
          var fileTransfer = new FileTransfer();

          var filename = fileSystem.root.toURL() + uri.substr(uri.lastIndexOf('/') + 1);

          fileTransfer.download(
            uri,
            filename,
            function (entry) {
              var fileUrl = entry.toURL();
              console.log('download complete: ', fileUrl);
              Session.set('data-uri', fileUrl);
            },
            function (error) {
              console.log('download error source ' + error.source);
              console.log('download error target ' + error.target);
              console.log('upload error code' + error.code);
            }
          );
        });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

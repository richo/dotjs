// $.ajax({
//   url: 'https://localhost:3131/'+location.hostname.replace(/^www\./,'')+'.js',
//   dataType: 'text',
//   success: function(d){
//     $(function(){ eval(d) })
//   },
//   error: function(){
//     console.log('no dotjs server found at localhost:3131')
//   }
// })

(function() {
var size = 1024 * 1024 * 8; // 8 Meg allocation
var rfs = window.requestFileSystem || window.webkitRequestFileSystem;
rfs(window.UNLIMITED, size, function(fs) { // Success
  fs.root.getFile('test_unique_filename', {create: true}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
        debugger;
        console.log('Write completed.');
      };

      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      };

      // Create a new Blob and write it to log.txt.
      var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});

      fileWriter.write(blob);
      debugger;

    }, function(e) { console.log(e); });

  }, function(e) { console.log(e); });

},function(err) { // Error
  var msg = '';
  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  }
  console.log('Error: ' + msg);

});
})();

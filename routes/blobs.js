
/*
 * GET home page.
 */


var azure = require('azure');
var azureStorage = require('azure-storage');

var accessKey = 'zVqqqQ2EIeZJZf8XRSB8gYsDBC+NGHaiXJtH9bY/Ig8EfZDL7rATFntlDOZTWE3x093UltvxTKSxbbQS0CdLDQ==';
var storageAccount = 'localafdemo8443';
var containerName = 'recognizer-bill';


var blobService = azureStorage.createBlobService(storageAccount, accessKey);

var blobs = [];
function aggregateBlobs(err, result, cb) {
    if (err) {
        cb(er);
    } else {
        blobs = blobs.concat(result.entries);
        if (result.continuationToken !== null) {
            blobService.listBlobsSegmented(
                containerName,
                result.continuationToken,
                aggregateBlobs);
        } else {
            cb(null, blobs);
        }
    }
}

exports.blobs = function (request, response) {

    blobService.listBlobsSegmented(containerName, null, function (err, result) {
        aggregateBlobs(err, result, function (err, blobs) {
            if (err) {
                console.log("Couldn't list blobs");
                console.error(err);
            } else {
                console.log(blobs);
                response.render('blobs', {
                    error: err,
                    container: containerName,
                    blobs: result
                });
            }
        });
    });
   
}
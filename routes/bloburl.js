const http = require("http");
const pdf = require("pdf-poppler");
const path = require("path");

exports.bloburl = function (request, response)
{
    //Change File path before executing this code.
    let filePath = "D:\\Azure-Storage-NodeJS-master\\Pdf\\";
    let fileInput = filePath + "reciptgenerate3.pdf";

    let opts = {
        format: "jpeg",
        out_dir: path.dirname(fileInput),
        out_prefix: path.basename(fileInput, path.extname(fileInput)),
        page: null,
    };

    pdf
        .convert(fileInput, opts)
        .then((res) => {
            console.log("Successfully converted");
        })
        .catch((error) => {
            console.error(error);
        });
}

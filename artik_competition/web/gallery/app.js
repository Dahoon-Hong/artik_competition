
var http =  require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');
    imageDir = '/home/ubuntu/web/gallery/data/';
 
//create http server listening on port 3333
http.createServer(function (req, res) {
    //use the url to parse the requested url and get the image name
    var query = url.parse(req.url,true).query;
        pic = query.image;
 
    if (typeof pic === 'undefined') {
        getImages(imageDir, function (err, files) {
            var docLists = '<ul>';
            for (var i=files.length-1; i>=0; i--) {
         //       imageLists += '<li><a href="/?image=' + files[i] + '">' + files[i] + '</li>';
		docLists += '<li align="center">' + files[i] + '<br>';
		docLists += '<img src="/?image=' + files[i]+'" width="640" height="480"> </li>';
		docLists += '<p>  </p>';
		docLists += '<hr>';
            }
            docLists += '</ul>';

	    var c_stat = fs.readFileSync(imageDir+'status.json');
	    var p_stat = JSON.parse(c_stat);
            res.writeHead(200, {'Content-type':'text/html'});
	    res.write('<!DOCTYPE HTML>');
	    res.write('<meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />');
	    res.write('<html><h1 align="center">Your Smart Pot</h1> <title>Smart Pot</title><head>');
	    res.write('</head><body>');
	    res.write('<table align="center" border=1><tr> <th colspan="5"><h2>Status</h2></th></tr>');
	    res.write('<tr><td>Water level</td><td>Illumination</td><td>Soil_Humidity</td><td>Humidity</td><td>Temperature</td></tr>');

	    res.write('<tr align="center">')
            if(p_stat.water == false)
                res.write('<td><font color="red">BAD</font></td>')
            else
                res.write('<td><font color="green">GOOD</font></td>')
	    if(p_stat.illumination == false)
                res.write('<td><font color="red">BAD</font></td>')
            else
                res.write('<td><font color="green">GOOD</font></td>')
	    if(p_stat.humidity_soil == false)
                res.write('<td><font color="red">BAD</font></td>')
            else
                res.write('<td><font color="green">GOOD</font></td>')
	    if(p_stat.humidity == false)
                res.write('<td><font color="red">BAD</font></td>')
            else
                res.write('<td><font color="green">GOOD</font></td>')
	    if(p_stat.temperature == false)
                res.write('<td><font color="red">BAD</font></td>')
            else
                res.write('<td><font color="green">GOOD</font></td>')
 
	    res.write('</tr></table>');
	    res.write('<hr>');
            res.write(docLists);
	    res.write('</body></html>');
	    res.end();
        });
    } else {
        //read the image using fs and send the image content back in the response
        fs.readFile(imageDir + pic, function (err, content) {
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'})
                console.log(err);
                res.end("No such image");    
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200,{'Content-type':'image/jpg'});
                res.end(content);
            }
        });
    }
 
}).listen(8880);
console.log("Server running at 8880 /");
 
//get the list of jpg files in the image dir
function getImages(imageDir, callback) {
    var fileType = '.jpg',
        files = [], i;
    fs.readdir(imageDir, function (err, list) {
        for(i=0; i<list.length; i++) {
            if(path.extname(list[i]) === fileType) {
                files.push(list[i]); //store the file name into the array files
            }
        }
        callback(err, files);
    });
}

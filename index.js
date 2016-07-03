ID = 0;

var express = require('express');
var fs = require('fs');
var router = express();
var bodyParser=require('body-parser');
router.use(bodyParser.json());

fs.exists('./items.json', function (exists) {
    if (!exists)
        fs.open('./items.json', 'a', function (err, fd) {
            if (err)
                console.log('创建失败');
            else {
                fs.writeFile('items.json', '[]', function (err) {
                    if (err)
                        throw err;
                });
            }
        });
});

router.post('/products', function (req, res) {
    var data = JSON.parse(fs.readFileSync("./items.json"));
    ID = ID + 1;
    var items=req.body;
    items.id=ID;
    data.push(items);
    fs.writeFile("items.json",JSON.stringify(data),function(err){
        if(err)
            throw err;
        else
            res.send("成功插入");
    });
});



var server = router.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example router listening at http//%s:%s', host, port);
});


module.exports = router;
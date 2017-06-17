let fs = require('fs');
let path = require('path');

function testA() {

    let buf = '테스트';

    fs.writeFile(path.join(__dirname, '/sample.txt'), buf, function(err) {
        if(err) throw err;
        console.log('쓰기 완료');

        fs.readFile(path.join(__dirname, '/sample.txt'), 'utf8', function(err, result){
            if(err) throw err;
            console.log("읽기 : " + result);
        });
    });
}


let asy = require('async');

function testB() {
    let buf = '테스트';

    asy.waterfall([
            function(cb) {
                fs.writeFile(path.join(__dirname, '/sample.txt'), buf, function(err) {
                    if (err) throw err;
                    else {
                        console.log('쓰기 완료');
                        cb(null);
                    }
                });
            },
            function(cb) {
                fs.readFile(path.join(__dirname, '/sample.txt'), 'utf8', function(err, result){
                    if(err) throw err;
                    else {
                        console.log("읽기 : " + result);
                        cb(null);
                    }
                });
            }
        ],
        function(err, result){
            console.log("완료");
        });
}

let co = require('co');

function testC() {
    let buf = '테스트';

    co(function *(){
        yield write(buf);
        yield read();
    }).then((result) => {
        console.log('완료');
});
}

async function testD() {

    let buf = '테스트';
    await write(buf);
    await read();
    console.log('완료');
}

let read = () => {
    return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '/sample.txt'), 'utf8', function(err, result){
            if(err) reject(err);
            else {
                console.log("읽기 : " + result);
                resolve();
            }
        });
});
};

let write = (buf) => {
    return new Promise((resolve, rejct) => {
            fs.writeFile(path.join(__dirname, '/sample.txt'), buf, function(err) {
            if (err) reject(err);
            else {
                console.log('쓰기 완료');
                resolve();
            }
        });
});
};




testA();
testB();
testC();
testD();


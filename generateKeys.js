const openpgp = require('openpgp');
const fs = require('fs');
var options = {
    userIds: [{ name: 'Borja', email: 'Borja@example.com' }],
    numBits: 2048,
    passphrase: 'secret',
};
var pubKey, privKey;
openpgp.generateKey(options)
.then(key => {
    privKey = key.privateKeyArmored;
    pubKey = key.publicKeyArmored;
    console.log('Key generated');
    fs.writeFile('public2.key', pubKey, (err) => {
        if (err) throw err;
    });
    fs.writeFile('private2.key', privKey, (err) => {
        if (err) throw err;
    });
});
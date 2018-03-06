const openpgp = require('openpgp');
const fs = require('fs');
const file = fs.readFileSync('./testdoc.txt', 'utf-8');
const pubkey = fs.readFileSync('./public1.key', 'utf-8');

console.log('File before verify: ', file);
openpgp.verify({
    message: openpgp.cleartext.readArmored(file), // parse armored message
    publicKeys: openpgp.key.readArmored(pubkey).keys   // for verification
})
.then((verified) => {
    validity = verified.signatures[0].valid; // true
    if (validity) {
        console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
    } else {
        console.error('sign false!');
    }
});
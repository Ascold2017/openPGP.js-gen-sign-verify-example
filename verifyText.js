const openpgp = require('openpgp');
const fs = require('fs');
const file = fs.readFileSync('./testdoc.pdf');
const sig = fs.readFileSync('./testdoc.pdf.sig', 'utf-8');
const pubkey = fs.readFileSync('./public1.key', 'utf-8');
openpgp.config.aead_protect = true;
console.log(typeof file);
options = {
    message: openpgp.message.fromBinary(file), // input as Message object
    signature: openpgp.signature.readArmored(sig), // parse detached signature
    publicKeys: openpgp.key.readArmored(pubkey).keys   // for verification
};

openpgp.verify(options).then(function(verified) {
    validity = verified.signatures[0].valid; // true
    if (validity) {
        console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
    }
});
  
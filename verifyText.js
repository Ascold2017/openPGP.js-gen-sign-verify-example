const openpgp = require('openpgp');
const fs = require('fs');
const file = fs.readFileSync('./testdoc.pdf');
const sig = fs.readFileSync('./testdoc.pdf.sig', 'utf-8');
const pubkey = fs.readFileSync('./public2.key', 'utf-8');
openpgp.config.aead_protect = true;
const sigs = sig.split('-next-\n');
const lastSig = sigs[sigs.length - 1];


const pubKeyObj = openpgp.key.readArmored(pubkey).keys[0];

options = {
    message: openpgp.message.fromBinary(file), // input as Message object
    signature: openpgp.signature.readArmored(lastSig), // parse detached signature
    publicKeys: openpgp.key.readArmored(pubkey).keys   // for verification
};

openpgp.verify(options).then(function(verified) {
    validity = verified.signatures[0].valid; // true
    if (validity) {
        console.log(`signed by key id ${verified.signatures[0].keyid.toHex()}
        ${pubKeyObj.getPrimaryUser().user.userId.userid}`);
    }
});
  
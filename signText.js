const openpgp = require('openpgp');
const fs = require('fs');
const file = fs.readFileSync('./testdoc.pdf');
let privkey = fs.readFileSync('./private2.key', 'utf-8'); //encrypted private key
let passphrase = 'secret'; //what the privKey is encrypted with
openpgp.config.aead_protect = true;

const privKeyObj = openpgp.key.readArmored(privkey).keys[0];

privKeyObj.decrypt(passphrase);

openpgp.sign({
    data: file, // input as String (or Uint8Array)
    privateKeys: privKeyObj, // for signing
    detached: true,
    date: Date.now(),
})
.then(signed => {
    fs.readFile('./testdoc.pdf.sig', 'utf-8', (err, file) => {
        fs.writeFileSync('./testdoc.pdf.sig', err ? signed.signature : file + '-next-\n' + signed.signature );
    });
    
});
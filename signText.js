const openpgp = require('openpgp');
const fs = require('fs');
const file = fs.readFileSync('./testdoc.txt', 'utf-8');

console.log('File before sign: ', file);

let privkey = fs.readFileSync('./private1.key', 'utf-8'); //encrypted private key
let passphrase = 'secret'; //what the privKey is encrypted with
 
const privKeyObj = openpgp.key.readArmored(privkey).keys[0];

privKeyObj.decrypt(passphrase);

openpgp.sign({
    data: file, // input as String (or Uint8Array)
    privateKeys: privKeyObj // for signing
})
.then((signed) => {
    // '-----BEGIN PGP SIGNED MESSAGE ... END PGP SIGNATURE-----'
    fs.writeFileSync('./testdoc.txt', signed.data);
});
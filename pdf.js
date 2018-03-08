const pdfjs = require('pdfjs-dist');


pdfjs.getDocument('testdoc2.pdf')
.then(function(pdf) {
    // you can now use *pdf* here
    pdf.fingerprint = '123';
    console.log(pdf.fingerprint);
   pdf.getStats()
   .then(data => console.log(data));
});
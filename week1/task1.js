const { Transform } = require('stream');

class ReverseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        try {
            const inputString = chunk.toString('utf8');
            const resultString = inputString.trim().split('').reverse().join('')
            callback(null, `${resultString}\n`);
        } catch (err) {
            callback(err);
        }
    }
}

process.stdin
    .pipe(new ReverseTransform())
    .on('error', err => console.error(err))
    .pipe(process.stdout);
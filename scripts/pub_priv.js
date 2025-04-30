const eccrypto = require('eccrypto');

async function testEncryption() {
    try {
        // Your test keys (remove 0x prefix for eccrypto)
        const privateKey = Buffer.from('031d893578c7508e824ef3fed9fe58eb1338724b0459ae1e532b7d98d7568c02', 'hex');
        const publicKey = Buffer.from('04ab62568c27a5dfe2c7a330ce383e6f1ba687a405c5519a4ce08f8bdf043513337b6379b364b39086942aee2f5989ee7fbc5d4ee2ce07413f4aa16d29d8c3af65', 'hex');

        // Encrypt
        const msg = "rrrrrrSecret message";
        const encrypted = await eccrypto.encrypt(publicKey, Buffer.from(msg));
        // console.log(encrypted.ciphertext.toString('hex'));
                console.log("Encrypted:", {
            iv: encrypted.iv.toString('hex'),
                    ciphertext: encrypted.ciphertext.toString('hex'),
                    ephemPublicKey: encrypted.ephemPublicKey.toString('hex'),
                    mac: encrypted.mac.toString('hex')
        });

        // Decrypt
        const decrypted = await eccrypto.decrypt(privateKey, encrypted);
        console.log("Decrypted:", decrypted.toString());
    } catch (error) {
        console.error("Error:", error);
    }
}

testEncryption();




// const elliptic = require('elliptic');
// const ec = new elliptic.ec('secp256k1');
//
// // From private key
// const privateKey = Buffer.from('fee1258d3bbce0f3b737f77ce3a5da8d5e7377764ddeab00bf30874211466261', 'hex');
// const key = ec.keyFromPrivate(privateKey);
// const publicKey = Buffer.from(key.getPublic(false, 'hex'), 'hex'); // false = uncompressed (with 04 prefix)
//
// console.log('Public key:', publicKey.toString('hex'));



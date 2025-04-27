const eccrypto = require('eccrypto');

async function testEncryption() {
    try {
        // Your test keys (remove 0x prefix for eccrypto)
        const privateKey = Buffer.from('0a3b20017d630888cd656caffdbfa69e663649db68e0e11ed46fbc68af6a022f', 'hex');
        const publicKey = Buffer.from('0465d16fa32d68e1e3e941dbfdc4bc3c338f8b454a830cce9663d5721ea3f6f4ab1c52d17aa97db8451622b0172e278d761e171bedc7d7a9b7963806f082adc6af', 'hex');

        // Encrypt
        const msg = "rrrrrrSecret message";
        const encrypted = await eccrypto.encrypt(publicKey, Buffer.from(msg));
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



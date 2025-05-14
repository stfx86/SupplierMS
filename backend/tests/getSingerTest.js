const  { getFirstSigner } = require( "./../src/config/contracts");

async function m() {

    const signer =await getFirstSigner();
    console.log("signer:",signer);
    
}
m();
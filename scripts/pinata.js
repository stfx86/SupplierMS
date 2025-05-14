const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwOGRjZTY5NC0wYzZlLTRhMTAtYTJhYy05NDI3NWZjNmE1YmIiLCJlbWFpbCI6Im11c3RhcGhhYmVubmFzc2VyOEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYjJkMDFhM2Q0ZWEyZDA5MWUwZDMiLCJzY29wZWRLZXlTZWNyZXQiOiIxY2ExMGYwMDAwNmU4ZTRmZDg5MmExZGZhNWVkMmIyODI3NTRhZjZmMjcyZjBhYzFjNzFlYWQ2YTRhYWEwMGM3IiwiZXhwIjoxNzc4NzI0MDc1fQ.nw_U8HAHc8K0DOmQdweX9BmcymG61EiBuBkQHeK9FrY';

const data = new FormData();
data.append('file', fs.createReadStream('./p.png'));
async function n() {
    
    
  await   axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
        maxBodyLength: Infinity,
        headers: {
            'Authorization': `Bearer ${JWT}`,
            ...data.getHeaders()
        }
    })
    .then(res => console.log('Pinned to IPFS:', res.data))
    .catch(err => console.error('Error pinning:', err.response?.data || err.message));
}

n();

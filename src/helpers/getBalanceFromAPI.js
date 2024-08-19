import axios from "axios";

export default async function getBalance(publicKey, coin) {
    if (coin === "Solana") {
        try {
            const response = await axios.post("https://solana-mainnet.g.alchemy.com/v2/oSUEhMSyYUX16bQ4Y2XoURHyJAKiZ0_k", {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getBalance",
                "params": [publicKey]
            });
            // console.log(response.data);
            const balance = parseInt(response.data.result.value);
            return balance/1e9;
        } catch (err) {
            console.error("Error fetching balance:", err);
            throw err;
        }
    } else if(coin == "Etherium"){
        try {
            const response = await axios.post("https://eth-mainnet.g.alchemy.com/v2/oSUEhMSyYUX16bQ4Y2XoURHyJAKiZ0_k", {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "eth_getBalance",
                "params": [publicKey, "latest"]
            });
            // console.log(response.data);
            const balance = parseInt(response.data.result);
            // console.log((parseInt(balance, 16))/1e18);
            return (parseInt(balance, 16))/(1e18);
        } catch (err) {
            console.error("Error fetching balance:", err);
            throw err;
        }
    }else {
        throw new Error("Unsupported coin type");
    }
}

// getBalance("0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97", "Etherium")
// getBalance("8LT35hFGacMr2QoFZco1kKkGzVirtapV13E4Td8HUXoM", "Solana")
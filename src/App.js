import './App.css';

import { useState } from 'react'
import { ethers } from 'ethers'
import Token from './artfacts/contracts/Token.sol/Token.json'

const tokenAddress = "0xD6e92F1dA7d5533CebDA4ce0d67C24009ef117d0"


function App() {
    // Store greeting in local state
    const [userAccount, setUserAccount] = useState()
    const [amount, setAmount] = useState()

    // request access to user's metamask account
    async function requestAccount() {
        await window.ethereum.request({
            method: 'eth_requestAccounts'
        })
    }

    async function getBalance() {
        if (typeof window.ethereum !== 'undefined') {
            const [account] = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })
            const provider = new ethers.providers.Web3Provider(window.ethereum)

            const contract = new ethers.Contract(tokenAddress, Token.abi, provider)

            const balance = await contract.balanceOf(account)
            console.log('Balance: ', balance.toString())
        }
    }

    async function sendCoins() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum)

            const signer = provider.getSigner()
            const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
            const transaction = await contract.transfer(userAccount, amount)
            await transaction.wait()
            console.log(`${amount} Coins successfully sent to ${userAccount}`);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={getBalance}>Get Balance</button>
                <button onClick={sendCoins}>Send coins</button>
                <input onChange={
                    e => setUserAccount(e.target.value)
                }
                    placeholder="Account ID"
                />
                <input onChange={e => setAmount(e.target.value)} placeholder="amount" />
            </header>
        </div>
    )
}

export default App;

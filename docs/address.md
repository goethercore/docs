# Address

All the address methods can be gotten from this import

```go
import (
	"encoding/json"
	"fmt"
	"log"
	"github.com/goethercore/goether/internals/address"
	"github.com/goethercore/goether/types"
	"github.com/goethercore/goether/utils"
)
```

## Generate Wallet

The `address.CreateWallet()` function is responsible for generating a new wallet address from the `github.com/goethercore/goether/internals/address` call.

You need to unmarshals the JSON response into a `types.Wallet` struct to get the generated wallet address.

- Example:

```go

func createAddress(){
	err,value:=address.CreateWallet()
	if err != nil{
		fmt.Println( err)
	}
	var walletData types.Wallet
	if err := json.Unmarshal([]byte(value), &walletData); err != nil {
		log.Println("error unmarshaling", err)

	}
	fmt.Println( walletData.Address)
}
```

- `Returns`
  The reponse data returned looks like this

```json
{0x1f2ae21640923bc1746b872aef916a380798be4f  0x0cfe45433d07bd6dd2aaed8241da294cd17111babc94d2d2340112e1c076598c}
```

and it can be accessed with the Wallet type as `walletData.Address` for the wallet address and `wallet.PrivateKey`

## Get A Wallet Balance

The `address.GetBalance()` function is responsible for retrieving the balance of a given wallet using the `github.com/goethercore/goether/internals/address` call.

> Parameters
> : This function takes 2(two) parameters directly. both as strings respectively and in this order:

- `rpc`: Represents the RPC client used for communication.
- `wallet`: Represents the wallet whose balance is to be retrieved.

- Example Usage

```go


var rpc = "https://polygon-mumbai.g.alchemy.com/v2/**************"
var walletAddress = "0xe9a406f1bb9C0bb1D8Fb8Af3eE50b3C37d1F0Eb2"
func getAWalletBalance() {

	value, err := address.GetBalance(rpc, walletAddress)

	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(value)

}
```

- `Returns`
  This function returns the response as string 

```shell
0.991
```

## Sending Transactions

This method is the way to transfer token native to that chain whose `rpc` you are using,
To write to the blockchain you require access to a private key which controls some account.
In most cases, you will need to parse the private keys directly to the function parameter.

> Parameters
> : This function takes 4(four) parameters directly. both as strings respectively and in this order:

- `rpc`: This parameter represents the RPC endpoint of the blockchain network to which you want to send the transaction.
- `privateKey`: A string representing the private key associated with the sending account. Ensure that you securely handle and manage private keys.
- `receipent`: The recipient address to which you want to send the tokens.
- `amount`: The amount of tokens to send. In the provided example, it is hardcoded to `0.056`. Adjust this value according to your requirements.

```go
var rpc = "https://polygon-mumbai.g.alchemy.com/v2/**************"
var  privateKey = "cb5b800d6310735c8cdd2abc2681cd00ab4b20e4348fd4c1a4b4454df9512172"
var amount = "0.05"
var reciever = "0xC1B9271024a8512A73481230b94bFbe60E131054"
func SendCoin() {
	value, err :=address.Transfer(rpc, privateKey, amount,reciever)
		if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(value)

}

```

- `Returns`
  This function returns the transaction hash.
  ```bash
  Transaction sent: 0x87fdb25c3aa556a98c56389bf718653aa80d06edd2710368f738e5d2325f036e
  ```

## Address Nonce

The `address.GetAddressTransactionCount()` function retrieves the transaction count (nonce) associated with a specific address on the blockchain using the `github.com/goethercore/goether/internals/address` package.

> Parameters
> : This function takes 2(two) parameters directly. both as strings respectively and in this order:

- `rpc`: This parameter represents the RPC endpoint of the blockchain network from which you want to retrieve the transaction count.
- `wallet`: The address for which you want to retrieve the transaction count.

```go

func AddressTransactionCount() {
	result, err := address.GetAddressTransactionCount(rpc, wallet)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Ether balance: %s\n", result)
}
```

- `Returns`
  This function returns the NONCE of the address

```shell
390
```

## Get Transaction Receipt

The `address.GetTransactionByHash()` function retrieves the transaction count (nonce) associated with a specific address on the blockchain using the `github.com/goethercore/goether/internals/address` package.

> Parameters
> : This function takes 2(two) parameters directly. both as strings respectively and in this order:

- `rpc`: This parameter represents the RPC endpoint of the blockchain network from which you want to retrieve the transaction count.
- `hash`: The address for which you want to retrieve the transaction count.

Once a Transaction has been submitted to the blockchain, it is placed in the memory pool (mempool) until a validator decides to include it.
A transaction's changes are only made once it has been included in the blockchain, at which time a receipt is available by the transaction hash , which includes details about the transaction, such as which block it was included in, the actual fee paid, gas used, all the events that it emitted and whether it was successful or reverted.

```go
var rpc = "https://polygon-mumbai.g.alchemy.com/v2/**************"
var hash="0x0d75b253ef3cdf09c528d4cc47fb5256c1e43d3d9c8d2ddc4c16b65f3cdfcf74"
// Get Transaction hash
func GetTransactionByHash() {
	result, err := address.GetTransactionByHash(rpc, hash)
	if err != nil {
		panic(err)
	}
	fmt.Printf("TxHash: %s\n", result)
}

```

It can be Unmarshalled into the `types.TransactionData` struct from `"github.com/goethercore/goether/types"` to access all properties.

- `Returns`
  This `address.GetTransactionByHash()` function returns the transaction data as []byte.
- example result

```json
{
  "blockHash": "0x25b96a0ae11d01181d59b19ad9bc11bafc488d1187fd44bf178e08a82bcc6b5a",
  "blockNumber": "0x2cedf19",
  "from": "0xe9a406f1bb9c0bb1d8fb8af3ee50b3c37d1f0eb2",
  "gas": "0x5208",
  "gasPrice": "0x59682f10",
  "hash": "0x0d75b253ef3cdf09c528d4cc47fb5256c1e43d3d9c8d2ddc4c16b65f3cdfcf74",
  "input": "0x",
  "nonce": "0x184",
  "to": "0xc1b9271024a8512a73481230b94bfbe60e131054",
  "transactionIndex": "0x1",
  "value": "0x0",
  "v": "0x27125",
  "r": "0x5b960590b98d08572cbceeef6d413764859d7baa0296336c9d52db407a311aea",
  "s": "0x725fe36934853d6cdb929d60bc3f27f55298441bf93db7d2e76767981c082484"
}
```

## Get Transaction Confirmation

The `address.GetTransactionConfirmations()` function retrieves amount of confirmations a transaction has recieved using the `github.com/goethercore/goether/internals/address` package.

> Parameters
> : This function takes 2(two) parameters directly. both as strings respectively and in this order:

- `rpc`: This parameter represents the RPC endpoint of the blockchain network from which you want to retrieve the transaction count.
- `hash`: The address for which you want to retrieve the transaction count.

```go
func GetTransactionConfirmation() {
	result, err := address.GetTransactionConfirmations(rpc, hash)

	if err != nil {
		panic(err)
	}
	fmt.Printf("tx Confirmation: %s\n", result)
}
```

- `Returns`
  This `address.GetTransactionConfirmations()` function returns the transaction data values as a json.
  ```json
  {
    "To": "0xc1b9271024a8512a73481230b94bfbe60e131054",
    "From": "0xe9a406f1bb9c0bb1d8fb8af3ee50b3c37d1f0eb2",
    "Confirmations": "3225",
    "Amount": "0.000000000000000000"
  }
  ```

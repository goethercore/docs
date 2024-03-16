# User Interactions

## Address


> Generate Wallet Address
> 
The  `address.CreateWallet()` function is responsible for generating a new wallet address from the `github.com/goethercore/goether/internals/address` call.

 You need to unmarshals the JSON response into a `types.Wallet` struct to get the generated wallet address.

- Example:

```go

import (
	"encoding/json"
	"fmt"
	"log"
	"github.com/goethercore/goether/internals/address"
	"github.com/goethercore/goether/types"
	"github.com/goethercore/goether/utils"
)

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
{0xc29af6f4d99cd41fb6885a71993bb2f1420b4edd 0x04c6f26150c83b95936b0804efebeeaf843a556c908d3bc595cb05453d6063de66414f37c1dffef17d3b8bb15cca8c2410df4a5d7e228137ce9bdf0d405e6b4421 e494b6fcb3384fe241cfffec2595ecfe4df857e5301cc975644bcc15f200ae5f}
```
and it can be accessed with the Wallet type as ```walletData.Address``` for the wallet address and ```wallet.PrivateKey```
or  ```wallet.PublicKey```


```Sending Transactions```
This method is the way to transfer token native to that chain whose ```rpc``` you are using,
To write to the blockchain you require access to a private key which controls some account. 
In most cases, you will need to parse the private keys directly to the function parameter.

```go
func SendCoin() {

	privateKey := ""
	receipent := wallet

	address.Transfer(rpc, privateKey, receipent, 0.056)

}

```
--- 

` GetWalletBalance()`

The `GetWalletBalance()` function is responsible for retrieving the balance of a given wallet using the `address.GetBalance()` function from the `github.com/goethercore/goether/internals/address` package root. It prints out the balance of the wallet to the console.

Parameters
: This function does not take any parameters directly. However, it relies on the following variables:
- `rpc`: Represents the RPC client used for communication.
- `wallet`: Represents the wallet whose balance is to be retrieved.

## Returns
This function does not return any values directly. However, it prints out the balance of the specified wallet to the console. If there's an error during the retrieval process, the function will panic with the encountered error.

## Example Usage
```go
// Example usage assuming 'rpc' and 'wallet' variables are defined elsewhere

```go

import (
	"fmt"
	"github.com/goethercore/goether/internals/address"
)

func GetWalletBalance() {
	result, err := address.GetBalance(rpc, wallet)
	if err != nil {
		panic(err)
	}
	fmt.Printf("balance: %s\n", result)

}

```

## Transactions

```go
func AddressTransactionCount() {
	result, err := address.GetAddressTransactionCount(rpc, wallet)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Ether balance: %s\n", result)
}
```


```Receipt```

Once a Transaction has been submitted to the blockchain, it is placed in the memory pool (mempool) until a validator decides to include it.

A transaction's changes are only made once it has been included in the blockchain, at which time a receipt is available, which includes details about the transaction, such as which block it was included in, the actual fee paid, gas used, all the events that it emitted and whether it was successful or reverted.

```go
// Get Transaction hash
func GetTransactionByHash() {
	result, err := address.GetTransactionByHash(rpc, hash)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Ether balance: %s\n", result)
}

// Get Transaction hash
func GetTransactionConfirmation() {
	result, err := address.GetTransactionConfirmations(rpc, hash)

	if err != nil {
		panic(err)
	}
	fmt.Printf("tx Confirmation: %s\n", result)
}
```


```go

func BlockByHash() {
	result, err := block.GetBlockByHash(rpc, "0x499d2f7bcd2c37e869f6721edb690105d19275e2ae25911c7d81b75305075dcd")
	if err != nil {
		panic(err)
	}
	fmt.Printf("Ether balance: %s\n", result)
}

// Get block transaction count
func GetBlockTransactionCounts() {
	result, err := address.GetAddressTransactionCount(rpc, hash)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Ether balance: %s\n", result)
}

// latest block example
func LatestBlock() {
	result, err := block.GetLatestBlock(rpc)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Latest Block: %s\n", result)
}
```



```go
// Reading mempool for transactions and get quequed and pending transactions
func MemPoolWithStatus() {
	result, err := mempool.GetMemPoolTransactionsWithStatus(rpc)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Pool: %s\n", result)
}
```

```go
func ContractmemPool() {
	poolCh := make(chan string)
	go mempool.ContractTransactionsMempool(wssRPC, "0x202a60A75892CB0EB352fCe2cce5c57EfBFc3CB1", poolCh)
	for value := range poolCh {

		var poolData types.MempoolData
		if err := json.Unmarshal([]byte(value), &poolData); err != nil {
		}
		amount,_ := utils.ConvertToEtherDecimal(poolData.Value, 18)

		log.Printf("Found a transaction: Amount: %s from: %s to %s\n", amount, poolData.From, poolData.To)
	}
}
```
```go
func StreamMemPool() {
	poolCh := make(chan string)
	go mempool.StreamMempoolTransactions(wssRPC, poolCh)
	for value := range poolCh {
		var poolData types.MempoolData
		if err := json.Unmarshal([]byte(value), &poolData); err != nil {
		}
		amount, err := utils.DecodeBig(poolData.Value)
		if err != nil {
			continue
		}

		log.Printf("Found a transaction: Amount: %s from: %s to %s\n", amount, poolData.From, poolData.To)

	}
}

```
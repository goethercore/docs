# User Interactions

## Address

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

```Get Balance```
To write to the blockchain you require access to a private key which controls some account. In most cases, those private keys are not accessible directly to your code, and instead you make requests via a Signer, which dispatches the request to a service (such as MetaMask) which provides strictly gated access and requires feedback to the user to approve or reject operations.

```go

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

## Blocks

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

## Contracts

A Contract is a meta-class, which means that its definition its derived at run-time, based on the ABI it is passed, which then determined what methods and properties are available on it.



```Read-only methods (i.e. view and pure)```

A read-only method is one which cannot change the state of the blockchain, but often provide a simple interface to get important data about a Contract.



```go
func ReadContract() {

	abi := map[string]string{
		"decimals":      "function decimals()",
		"symbol":        "function symbol() view returns (string)",
		"name":          "function name()",
		"totalSupply":   "function totalSupply()",
		"balanceOf":     "function balanceOf(address)",
		"transfer":      "function transfer(address to, uint256 value) external returns (bool)",
		"TransferEvent": "event Transfer(address from, address to, uint256 value)",
	}
	

	// For functions with argument
	 data2 := map[string]interface{}{
	 	"functionName": "transfer",
	 	"args":         []interface{}{wallet,20}, // corrected syntax
	}

	result, err := contract.Call(rpc, abi, DAIContract, wallet, data)

	if err != nil {
		panic(err)
	}
	res, err := utils.HexToText(result)
	println(res)
}
```



```go
func MutateContract() {

	abi := map[string]string{
		"decimals":      "function decimals()",
		"symbol":        "function symbol() view returns (string)",
		"name":          "function name()",
		"totalSupply":   "function totalSupply()",
		"balanceOf":     "function balanceOf(address)",
		"transfer":      "function transfer(address to, uint256 value) external returns (bool)",
		"TransferEvent": "event Transfer(address from, address to, uint256 value)",
	}
	// For functions without an argument
	data := map[string]interface{}{
		"functionName": "name",
		"args":         []interface{}{}, // corrected syntax
	}

	result, err := contract.Call(rpc, abi, DAIContract, wallet, data)

	if err != nil {
		panic(err)
	}
	res, err := utils.HexToText(result)
	println(res)
}
```


## MemPool


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
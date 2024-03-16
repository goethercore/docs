# Contract

## ABI

````go
	abi := map[string]string{
		"decimals":      "function decimals()",
		"symbol":        "function symbol() view returns (string)",
		"name":          "function name()",
		"totalSupply":   "function totalSupply()",
		"balanceOf":     "function balanceOf(address)",
		"transfer":      "function transfer(address to, uint256 value) external returns (bool)",
		"TransferEvent": "event Transfer(address from, address to, uint256 value)",
	}


	```

## Read-Only

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
````

## Mutate

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

# Contract

All the contract methods can be gotten from this import

```go
import (
	"encoding/json"
	"fmt"
	"log"
	"github.com/goethercore/goether/internals/contract"
	"github.com/goethercore/goether/types"
	"github.com/goethercore/goether/utils"
)
```

functions that return decimals or int can be decoded with

```go
	resultStr,_ := utils.ConvertHexToBigInt( result)

	denominatorStr := "1"
	//setting the precision to 18 is not compulsory, but it defaults to 18
	ethbalance, _ := utils.DivideLargeNumbers(resultStr.String(), denominatorStr,1)
	println(ethbalance)
```

functions that returns string can be decoded with

```go
    res, _ := utils.HexToText(result)
	println(res)
```

## ABI

```go
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



`Read-only methods (i.e. view and pure)`

A read-only method is one which cannot change the state of the blockchain, but often provide a simple interface to get important data about a Contract.

The `contract.Call` function is responsible for retrieving data of a given contract using the `github.com/goethercore/goether/internals/contract` call.

> Parameters
> : This function takes 5(five) parameters directly. both as strings respectively and in this order:

- `rpc`: An RPC (Remote Procedure Call) client instance to interact with the blockchain network.
- `abi`: A map containing the ABI (Application Binary Interface) of the smart contract. The ABI defines the structure of the contract including its functions and events.
- c`ontractAddress`: The address of the smart contract deployed on the blockchain network.
- `wallet`: The address of the wallet or account from which the contract interaction is initiated.
- `data`: A map containing information required to execute specific functions defined in the smart contract ABI.


- Example of Get balance which is a readonly
```go

func readContract() {
var contractAddress="0x202a60A75892CB0EB352fCe2cce5c57EfBFc3CB1"
var walletAddress = "0xe9a406f1bb9C0bb1D8Fb8Af3eE50b3C37d1F0Eb2"
var rpc = "https://polygon-mumbai.g.alchemy.com/v2/**************"
	abi := map[string]string{
		"decimals":      "function decimals()",
		"symbol":        "function symbol()",
		"name":          "function name()",
		"totalSupply":   "function totalSupply()",
		"balanceOf":     "function balanceOf(address)",
		"transfer":      "function transfer(address to, uint256 value) external returns (bool)",
		"TransferEvent": "event Transfer(address from, address to, uint256 value)",
	}

	// For functions with argument
	data := map[string]interface{}{
		"functionName": "balanceOf",
		"args":         []interface{}{"0xe9a406f1bb9C0bb1D8Fb8Af3eE50b3C37d1F0Eb2"}, // corrected syntax
	}

	result, _ := contract.Call(rpc, abi, contractAddress, walletAddress, data)
	resultStr, _ := utils.ConvertHexToBigInt(result)

	denominatorStr := "1000000000000000000"
	//setting the precision to 18 is not compulsory, but it defaults to 18
	ethbalance, _ := utils.DivideLargeNumbers(resultStr.String(), denominatorStr, 18)
	println(ethbalance)
}
```

- Example of get contract token name which is also a read only, this function requires no parameter, so the data field remains empty

```go

	abi := map[string]string{
		"decimals":      "function decimals()",
		"symbol":        "function symbol()",
		"name":          "function name()",
		"totalSupply":   "function totalSupply()",
		"balanceOf":     "function balanceOf(address)",
		"transfer":      "function transfer(address to, uint256 value) external returns (bool)",
		"TransferEvent": "event Transfer(address from, address to, uint256 value)",
	}

	// For functions with argument
	data := map[string]interface{}{
		"functionName": "name",
		"args":         []interface{}{}, // corrected syntax
	}

	result, _ := contract.Call(rpc, abi, contractAddress, walletAddress, data)
    res, _ := utils.HexToText(result)
	println(res)

```

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

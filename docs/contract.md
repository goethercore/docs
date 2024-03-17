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

## ABI (Application Binary Interface)

In Goether, the ABI (Application Binary Interface) encoding is designed to be human-readable. To define your ABI, you create a map where the keys represent function names and the values represent the function definitions including parameter types where necessary.

Example of a Simple ABI Definition:

```go
abi := map[string]string{
    "balanceOf": "function balanceOf(address)",
}
```

**Comprehensive ABI Map Example:**
You can encapsulate all your function definitions within a single ABI map construct. Below is an example ABI map containing various function definitions:

```go
abi := map[string]string{
    "decimals":      "function decimals()",
    "symbol":        "function symbol() view returns (string)",
    "name":          "function name()",
    "totalSupply":   "function totalSupply()",
    "balanceOf":     "function balanceOf(address)",
    "transfer":      "function transfer(address to, uint256 value)",
    "TransferEvent": "event Transfer(address from, address to, uint256 value)",
}
```

This ABI map provides a clear and concise representation of the functions available within the smart contract, making it easy to understand and interact with.

## Function Data

When interacting with functions that require arguments within the smart contract ABI, you define the function data as a map. This map includes the function name and its corresponding arguments.

The data parameter, which is a map of string interface, follows a key-value structure. The first key, "functionName", must be of type string and it's value represents the name of the function you want to call as defined in your ABI key. The corresponding value is the function definition key in your ABI.

Example of Function Data with Arguments:

```go
data := map[string]interface{}{
    "functionName": "balanceOf",
    "args":         []interface{}{"0xe9a406f1bb9C0bb1D8Fb8Af3eE50b3C37d1F0Eb2"},
}
```

In this example:

- `functionName`: must remain as `"functionName"` as key and the value is the key of the function you want to call as defined in your ABI .
- `args`: Contains an array of arguments required by the function. Each argument is specified as an element within the array.
  Here, the balanceOf function is being called with the argument "0xe9a406f1bb9C0bb1D8Fb8Af3eE50b3C37d1F0Eb2", which represents the address for which the balance is being queried.

> Arguements value order:
> When defining `args` value they must follow the same order as the parameters in the contract parameters
> such that a transfer function defined as `function Transfer(address to,uint256 value)` should have args value as:
 ```go 
 "args":[]interface{}{"0xe9a406f1bb9C0bb1D8Fb8Af3eE50b3C37d1F0Eb2,10"}
 ``` 
 where address comes first and value comes second

## Read-Only


A read-only method is one which cannot change the state of the blockchain, but often provide a simple interface to get important data about a Contract.

The `contract.Read` function is responsible for retrieving data of a given contract using the `github.com/goethercore/goether/internals/contract` call.

> Parameters
> : This function takes 5(five) parameters directly. both as strings respectively and in this order:

- `rpc`: An RPC (Remote Procedure Call) client instance to interact with the blockchain network.
- `abi`: A map containing the ABI (Application Binary Interface) of the smart contract. The ABI defines the structure of the contract including its functions and events.
- `contractAddress`: The address of the smart contract deployed on the blockchain network.
- `wallet`: The address of the wallet or account from which the contract interaction is initiated.
- `data`: A map containing information required to execute specific functions defined in the smart contract ABI.

- Example of Get balance which is a readonly

```go

func readContract() {
var contractAddress="0x202a60A75892CB0EB352fCe2cce5c57EfBFc3CB1"
var walletAddress = "0xe9a406f1bb9C0bb1D8Fb8Af3eE50b3C37d1F0Eb2"
var rpc = "https://polygon-mumbai.g.alchemy.com/v2/**************"

   //ABI definition
	abi := map[string]string{
		"balanceOf":     "function balanceOf(address)"
	}

	/**
	* Function key functionName - (balaceOf) as defined as
	* the ABI key for function balanceOf(address) method in the ABI of your abi
	* and contract.
	* Function key args- is a slice of interfaces, each object in the interface should be ordered
	* the same way as each parameter in the contract function
	*/
	data := map[string]interface{}{
		"functionName": "balanceOf",
		"args":         []interface{}{"0xe9a406f1bb9C0bb1D8Fb8Af3eE50b3C37d1F0Eb2"}, // corrected syntax
	}

    // Call the Read function of goether method
	result, _ := contract.Read(rpc, abi, contractAddress, walletAddress, data)
	//Convert Hex decimal value to bigInt
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
		"name":          "function name()",
		"balanceOf":     "function balanceOf(address)"
	}

	/**
	* Function data with function name - (name) as defined as
	* the ABI key for function name() method in the ABI of your abi
	* and contract.
	*/
	data := map[string]interface{}{
		"functionName": "name",
		"args":         []interface{}{}, // corrected syntax
	}

	result, _ := contract.Call(rpc, abi, contractAddress, walletAddress, data)
    res, _ := utils.HexToText(result)
	println(res)

```

## Write State

A write method is one which changes the state of the blockchain, but often provide a simple interface State-Modifying call data about a Contract.

The `contract.Write` function is responsible for altering the state of a data of a given contract using the `github.com/goethercore/goether/internals/contract` call.

> Parameters
> : This function takes 5(five) parameters directly. both as strings respectively and in this order:

- `rpc`: An RPC (Remote Procedure Call) client instance to interact with the blockchain network.
- `privateKey`: The private key of the wallet or account from which the contract interaction is initiated.
- `abi`: A map containing the ABI (Application Binary Interface) of the smart contract. The ABI defines the structure of the contract including its functions and events.
- `contractAddress`: The address of the smart contract deployed on the blockchain network.
- `data`: A map containing information required to execute specific functions defined in the smart contract ABI.

- Example of Transfer which is a State-Modifying Function

```go
var amt = 5
var rpc = "https://polygon-mumbai.g.alchemy.com/v2/**************"
var contractAddress="0x202a60A75892CB0EB352fCe2cce5c57EfBFc3CB1"
var privateKey="cbad43450ab9a433cc202a60A75892CB0EB352fCe2cce5c57EfBFc3CB1"
var reciever = "0xC1B9271024a8512A73481230b94bFbe60E131054"
func mutateContract() {

	abi := map[string]string{
		"decimals":      "function decimals()",
		"symbol":        "function symbol()",
		"name":          "function name()",
		"totalSupply":   "function totalSupply()",
		"balanceOf":     "function balanceOf(address)",
		"transfer":      "function transfer(address to, uint256 value)",
		"TransferEvent": "event Transfer(address from, address to, uint256 value)",
	}

	/**
	* Function key functionName - (transfer) as defined as
	* the ABI key for function transfer(address to, uint256 value) method in the ABI of your abi
	* and contract.
	* Function key args- is a slice of interfaces, each object in the interface should be ordered
	* the same way as each parameter in the contract function
	*/
	data := map[string]interface{}{
		"functionName": "transfer",
		"args":         []interface{}{reciever, amt}, // corrected syntax
	}
    /**
    * The Write function params takes RPCURL, your private key, 
    * the ABI, your contract address, the data
    */
	result, _ := contract.Write(rpc, privateKey, abi, contractAddress, data)
    
    res, _ := utils.HexToText(result)
	println(res)
}
```

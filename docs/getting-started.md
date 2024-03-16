# Getting Started

To get started with goether, you'll need to initially have setup your the Go environments.

`install goether :`

```go
ayoseun@MacBook-Pro Golang- Geth-lte tutorial % go get github.com/goethercore/goether
```

In Goether, all functionalities are accessible through its reference type in respective root of the goether import object. Additionally, exports for utils are inferred from the util object file to simplify selective importing.

In this documentation, it's assumed that all exports from ethers have been imported in the code examples. However, you're free to import the necessary objects in any manner you prefer.

Importing:

```go
import (
"github.com/goethercore/goether"
)
```

Importing specific items

```go
import (
"github.com/goethercore/goether/internals/mempool"
)
```

## Some Common Terminology

To begin, it is useful to have a basic understanding of the types of objects available and what they are responsible for, at a high level.

### Provider

A Provider is a read-only connection to the blockchain, which allows querying the blockchain state, such as account, block or transaction details, querying event logs or evaluating read-only code using call.

If you are coming from Web3.js, you are used to a Provider offering both read and write access. In Ethers, all write operations are further abstracted into another Object, the Signer.

### Signer

A Signer wraps all operations that interact with an account. An account generally has a private key located somewhere, which can be used to sign a variety of types of payloads.

The private key may be located in memory (using a Wallet) or protected via some IPC layer, such as MetaMask which proxies interaction from a website to a browser plug-in, which keeps the private key out of the reach of the website and only permits interaction after requesting permission from the user and receiving authorization.

### Transaction

To make any state changes to the blockchain, a transaction is required, which requires a fee to be paid, where the fee covers the associated costs with executing the transaction (such as reading the disk and performing maths) and storing the updated information.

If a transaction reverts, a fee must still be paid, since the validator still had to expend resources to try running the transaction to determine that it reverted and the details of its failure are still be recorded.

Transactions include sending ether from one user to another, deploying a Contract or executing a state-changing operation against a Contract.

### Contract

A Contract is a program that has been deployed to the blockchain, which includes some code and has allocated storage which it can read from and write to.

It may be read from when it is connected to a Provider or state-changing operations can be called when connected to a Signer.

### Receipt

Once a Transaction has been submitted to the blockchain, it is placed in the memory pool (mempool) until a validator decides to include it.

A transaction's changes are only made once it has been included in the blockchain, at which time a receipt is available, which includes details about the transaction, such as which block it was included in, the actual fee paid, gas used, all the events that it emitted and whether it was successful or reverted.

## Interfacing with the Blockchain

When developing applications that interact with the Ethereum blockchain, it's essential to connect to the network to perform various tasks such as querying data, executing transactions, or deploying smart contracts.

### Reading Wallet Balance

This code snippet demonstrates how to retrieve the balance of a specific Ethereum wallet address.

```go
import (
	"fmt"
	"github.com/goethercore/goether/internals/address"
)

var (
	rpc = "0x9e4cc336022fd3fdae0f5ad25b758f040f30040a73a45fca1be9e440bac91902"
	wallet = "0xa6f79B60359f141df90A0C745125B131cAAfFD12"
)


func GetWalletBalance(rpc, wallet) {
	result, err := address.GetBalance(rpc, wallet)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Balance of wallet %s: %s\n", wallet, result)
}

```

Importing Libraries: The code imports necessary libraries required for interacting with the Ethereum blockchain and handling wallet addresses.

Defining Function GetWalletBalance: This function takes two parameters:

rpc: A JsonRpcProvider url must be of type `String` representing the connection to the Ethereum blockchain.

wallet: A string parameter representing the Ethereum wallet address for which you want to retrieve the balance.

Printing Balance: If the balance retrieval is successful, the function prints the wallet address and its corresponding balance to the console using fmt.Printf.

Most calls require an rpc as string, which is a `http` url or `wss` for transaction mempool calls

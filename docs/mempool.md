# MemPool

All the mempool methods can be gotten from this import

```go
import (
	"encoding/json"
	"fmt"
	"log"
	"github.com/goethercore/goether/internals/mempool"
	"github.com/goethercore/goether/types"
	"github.com/goethercore/goether/utils"
)
```

## Stream Mempool Transaction
The `mempool.StreamMempoolTransactions()` function streams mempool transactions using the `github.com/goethercore/goether/internals/mempool` from a specified RPC endpoint. It initializes a channel to receive transaction data and starts a goroutine to continuously listen for incoming data.



> Parameters
> : This function takes 2(two) parameters directly. both as strings respectively and in this order:

- `rpc`: An RPC (Remote Procedure Call) client instance to interact with the blockchain network.
- `channel`: Accepts an unbuffered channels to recieve the stream.

`Description`:
This function connects to the specified WebSocket endpoint (rpc) and continuously listens for mempool transactions. Each incoming transaction is decoded and printed to the console, displaying the sender, amount, and recipient of the transaction.
- Example 

```go
func ListenMempool() {
	poolCh := make(chan string)
	var rpc = "wss://polygon-mumbai.g.alchemy.com/v2/***************"

	go mempool.StreamMempoolTransactions(rpc, poolCh)
	for value := range poolCh {
		var poolData types.MempoolData
		if err := json.Unmarshal([]byte(value), &poolData); err != nil {
			log.Println("error unmarshaling", err)
			continue
		}
		amount, err := utils.DecodeBig(poolData.Value)

		if err != nil {
			log.Println("error decoding hex value", err)
		}
		fmt.Printf("Transaction From: %s of %s to %s \n", poolData.From, amount, poolData.To)

	}
}

```


## Stream Contract Mempool Transaction
The `mempool.ContractMempoolTransactions()` function streams mempool transactions of a contract using the `github.com/goethercore/goether/internals/mempool` from a specified RPC endpoint. It initializes a channel to receive transaction data and starts a goroutine to continuously listen for incoming data.



> Parameters
> : This function takes 3(three) parameters directly. both as strings respectively and in this order:

- `rpc`: An RPC (Remote Procedure Call) client instance to interact with the blockchain network which must be a websocket url.
- `contractAddress`: The contract address of the contract at which you want to monitor
- `channel`: Accepts an unbuffered channel to recieve the stream.

`Description`:
This function connects to the specified WebSocket endpoint (rpc) and continuously listens fora contracts mempool transactions. Each incoming transaction is decoded and printed to the console, displaying the sender, amount, and recipient of the transaction.
- Example 

```go
func ListenContractMempoolTransactions() {
	poolCh := make(chan string)
	var rpc = "wss://polygon-mumbai.g.alchemy.com/v2/***************"

	go mempool.ContractMempoolTransactions(rpc,contractAddress, poolCh)
	for value := range poolCh {
		var poolData types.MempoolData
		if err := json.Unmarshal([]byte(value), &poolData); err != nil {
			log.Println("error unmarshaling", err)
			continue
		}
		amount, err := utils.DecodeBig(poolData.Value)

		if err != nil {
			log.Println("error decoding hex value", err)
		}
		fmt.Printf("Transaction From: %s of %s to %s \n", poolData.From, amount, poolData.To)

	}
}

```



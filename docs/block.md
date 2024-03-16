# Blocks

All the address methods can be gotten from this import

```go
import (
	"encoding/json"
	"fmt"
	"log"
	"github.com/goethercore/goether/internals/block"
	"github.com/goethercore/goether/types"
	"github.com/goethercore/goether/utils"
)
```

## Get Block By Hash

The `block.GetBlockByHash()` function is responsible for getting a block by it's hash from the `github.com/goethercore/goether/internals/block` call.

- Example:

```go

func getBlockByHash() {

	result,err:=block.GetBlockByHash(rpc,hash)

		if err != nil {
		panic(err)
	}
	fmt.Printf("tx Confirmation: %s\n", result)

}
```

It can be Unmarshalled into the `types.BlockData` struct from `"github.com/goethercore/goether/types"` to access all properties.

- `Returns`
  The reponse data returned looks like this

```json
{
  "difficulty": "0x6",
  "extraData": "0xd88301020883626f7289676f312e32302e3134856c696e757800000000000000c680c4c0c0c0c054bc5d8f9130a514fe30e9d4e5585bc6249f1b95e7ad68ca0160c1d7fd733df50e57f5f0452d4e57a3ba75255ce5b206a091a3a2aeb9b3b964692b8e0393cecc01",
  "gasLimit": "0x1bc8722",
  "gasUsed": "0x2f8a8",
  "hash": "0xad37be067e06b8c3e2fd741805fac0f82dcad15de5019bd8d0bd2ace73061259",
  "logsBloom": "0x40000000000000028000000000000000000000000000000000000000100000000000000000000004000080100000000000008000000000000000000400008000000000000000000000000000000000800400000500000001000100000000200000000000000000000000200002000000800000200000000090000000000000000000000200000000000000200040000000000000000000000000000000000000200000000000000020000100000000000001220000000000100002001010004000008008000201000001200000020000000000002000808000108000000000000000004000000000002000000020000000000000000000000000000000100000",
  "miner": "0x0000000000000000000000000000000000000000",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "0x0000000000000000",
  "number": "0x2ce9b2d",
  "parentHash": "0xf2a53e9f62e513dbe887ffa3725ba8cf2cb909f4a159020b5695b9f4e4ff8fdc",
  "receiptsRoot": "0xb8c252baaf482bcbde63c90ba7a528979c018f0f7a6d65f716bad5c89bc460d6",
  "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  "size": "0x844",
  "stateRoot": "0xaac25b7d1c5bbf5bc94a6b1e476bebf4d66ff2ac4771af218106c0c5a5641c7a",
  "timestamp": "0x65f4d1e7",
  "totalDifficulty": "0x113b14f1",
  "transactions": [
    "0xfd2dba409573fea43b4c8d6a9e4042d59e1683a3308e55e44d44d728f2df8610",
    "0x52adfce73931a04b4b638dae4f50040e9f65724961ef6dd83730b09a767421fd",
    "0x95d6ce6edf9c63d6c0b1907ed4053e3bd0cecc77e0394d4133522b611aa98c7a",
    "0xbe9356036e31e4de4c34ae48591f2c096520e34a660f8a235d9ff54c5aaaf813"
  ],
  "transactionsRoot": "0x8ef614b9540bb1e19782f2b8d3fdad6b6dcb627962500d96a4def3ae91bf5e62",
  "uncles": []
}
```


## Get Block Transactions Count

The `block.GetBlockTransactionCount()` function is responsible for getting a block by it's hash from the `github.com/goethercore/goether/internals/block` call.

- Example:

```go

func getAllBlockTransactionsCount() {

	result,err:=block.GetBlockTransactionCount(rpc,blockHash)

		if err != nil {
		panic(err)
	}
	fmt.Printf("tx Count: %s\n", result)

}
```

It can be Unmarshalled into the `types.BlockData` struct from `"github.com/goethercore/goether/types"` to access all properties.

- `Returns`
  The reponse data returned looks like this
```bash
tx Count: 4
```

## Get Latest Block 

The `block.GetLatestBlock()` function is responsible for the number of the lastest added block using the `github.com/goethercore/goether/internals/block` call.

- Example:

```go

func getLatestBlock() {

	result,err:=block.GetLatestBlock(rpc)

		if err != nil {
		panic(err)
	}
	fmt.Printf("block: %s\n", result)

}
```

It can be Unmarshalled into the `types.BlockData` struct from `"github.com/goethercore/goether/types"` to access all properties.

- `Returns`
  The reponse data returned looks like this
```bash
block: 47115710
```
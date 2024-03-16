
# MemPool


## Stream Mempool transaction

```go
func ListenMempool() {
	poolCh := make(chan string)
	var rpc = "wss://polygon-mumbai.g.alchemy.com/v2/A7mvet09ATzDQmzbzQ8RNcn8X9lpTUR2"

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

```go
func ListenSmartContractMempoolTx() {
	poolCh := make(chan string)
   var contractAddress="0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
	var rpc = "wss://polygon-mainnet.g.alchemy.com/v2/*************"

	go mempool.ContractMempoolTransactions(rpc,contractAddress, poolCh)
	for value := range poolCh {
		var poolData types.MempoolData
		if err := json.Unmarshal([]byte(value), &poolData); err != nil {
			log.Println("error unmarshaling", err)
			continue
		}
		amount, err := utils.ConvertHexToBigInt(poolData.Value)

		if err != nil {
			log.Println("error decoding hex value", err)
		}
		fmt.Printf("Transaction From: %s of %s to %s \n", poolData.From, amount, poolData.To)

	}
}

- `Returns`
  The reponse data returned looks like this
  ```json
  Transaction From: 0x5fb184b266ed8132e94880c94d7f6b1033e24f67 of 226673.591177742970257408 to 0xa28663b53fb7e4c2b37293f1ac7bfb02976cad93 
  ```


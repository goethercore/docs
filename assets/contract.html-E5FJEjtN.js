import{_ as n,o as s,c as a,a as t}from"./app-BIaLq1pg.js";const e={},o=t(`<h1 id="contract" tabindex="-1"><a class="header-anchor" href="#contract"><span>Contract</span></a></h1><p>All the contract methods can be gotten from this import</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;encoding/json&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;github.com/goethercore/goether/internals/contract&quot;</span>
	<span class="token string">&quot;github.com/goethercore/goether/types&quot;</span>
	<span class="token string">&quot;github.com/goethercore/goether/utils&quot;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>functions that return decimals or int can be decoded with</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code>	resultStr<span class="token punctuation">,</span><span class="token boolean">_</span> <span class="token operator">:=</span> utils<span class="token punctuation">.</span><span class="token function">ConvertHexToBigInt</span><span class="token punctuation">(</span> result<span class="token punctuation">)</span>

	denominatorStr <span class="token operator">:=</span> <span class="token string">&quot;1&quot;</span>
	<span class="token comment">//setting the precision to 18 is not compulsory, but it defaults to 18</span>
	ethbalance<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> utils<span class="token punctuation">.</span><span class="token function">DivideLargeNumbers</span><span class="token punctuation">(</span>resultStr<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> denominatorStr<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>ethbalance<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>functions that returns string can be decoded with</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code>    res<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> utils<span class="token punctuation">.</span><span class="token function">HexToText</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="abi" tabindex="-1"><a class="header-anchor" href="#abi"><span>ABI</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code>	abi <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">&quot;decimals&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;function decimals()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;symbol&quot;</span><span class="token punctuation">:</span>        <span class="token string">&quot;function symbol() view returns (string)&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span>          <span class="token string">&quot;function name()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;totalSupply&quot;</span><span class="token punctuation">:</span>   <span class="token string">&quot;function totalSupply()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;balanceOf&quot;</span><span class="token punctuation">:</span>     <span class="token string">&quot;function balanceOf(address)&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;transfer&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;function transfer(address to, uint256 value) external returns (bool)&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;TransferEvent&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;event Transfer(address from, address to, uint256 value)&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token string">\`\`</span><span class="token string">\`

## Read-Only

A Contract is a meta-class, which means that its definition its derived at run-time, based on the ABI it is passed, which then determined what methods and properties are available on it.



\`</span>Read<span class="token operator">-</span>only methods <span class="token punctuation">(</span>i<span class="token punctuation">.</span>e<span class="token punctuation">.</span> view and pure<span class="token punctuation">)</span><span class="token string">\`

A read-only method is one which cannot change the state of the blockchain, but often provide a simple interface to get important data about a Contract.

The \`</span>contract<span class="token punctuation">.</span>Call<span class="token string">\` function is responsible for retrieving data of a given contract using the \`</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>goethercore<span class="token operator">/</span>goether<span class="token operator">/</span>internals<span class="token operator">/</span>contract<span class="token string">\` call.

&gt; Parameters
&gt; : This function takes 5(five) parameters directly. both as strings respectively and in this order:

- \`</span>rpc<span class="token string">\`: An RPC (Remote Procedure Call) client instance to interact with the blockchain network.
- \`</span>abi<span class="token string">\`: A map containing the ABI (Application Binary Interface) of the smart contract. The ABI defines the structure of the contract including its functions and events.
- c\`</span>ontractAddress<span class="token string">\`: The address of the smart contract deployed on the blockchain network.
- \`</span>wallet<span class="token string">\`: The address of the wallet or account from which the contract interaction is initiated.
- \`</span>data<span class="token string">\`: A map containing information required to execute specific functions defined in the smart contract ABI.


- Example of Get balance which is a readonly
\`</span><span class="token string">\`\`</span><span class="token keyword">go</span>

<span class="token keyword">func</span> <span class="token function">readContract</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">var</span> contractAddress<span class="token operator">=</span><span class="token string">&quot;0x202a60A75892CB0EB352fCe2cce5c57EfBFc3CB1&quot;</span>
<span class="token keyword">var</span> walletAddress <span class="token operator">=</span> <span class="token string">&quot;0xe9a406f1bb9C0bb1D8Fb8Af3eE50b3C37d1F0Eb2&quot;</span>
<span class="token keyword">var</span> rpc <span class="token operator">=</span> <span class="token string">&quot;https://polygon-mumbai.g.alchemy.com/v2/**************&quot;</span>
	abi <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">&quot;decimals&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;function decimals()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;symbol&quot;</span><span class="token punctuation">:</span>        <span class="token string">&quot;function symbol()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span>          <span class="token string">&quot;function name()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;totalSupply&quot;</span><span class="token punctuation">:</span>   <span class="token string">&quot;function totalSupply()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;balanceOf&quot;</span><span class="token punctuation">:</span>     <span class="token string">&quot;function balanceOf(address)&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;transfer&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;function transfer(address to, uint256 value) external returns (bool)&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;TransferEvent&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;event Transfer(address from, address to, uint256 value)&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// For functions with argument</span>
	data <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token string">&quot;functionName&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;balanceOf&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;args&quot;</span><span class="token punctuation">:</span>         <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token string">&quot;0xe9a406f1bb9C0bb1D8Fb8Af3eE50b3C37d1F0Eb2&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// corrected syntax</span>
	<span class="token punctuation">}</span>

	result<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> contract<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span>rpc<span class="token punctuation">,</span> abi<span class="token punctuation">,</span> contractAddress<span class="token punctuation">,</span> walletAddress<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
	resultStr<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> utils<span class="token punctuation">.</span><span class="token function">ConvertHexToBigInt</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>

	denominatorStr <span class="token operator">:=</span> <span class="token string">&quot;1000000000000000000&quot;</span>
	<span class="token comment">//setting the precision to 18 is not compulsory, but it defaults to 18</span>
	ethbalance<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> utils<span class="token punctuation">.</span><span class="token function">DivideLargeNumbers</span><span class="token punctuation">(</span>resultStr<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> denominatorStr<span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>ethbalance<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Example of get contract token name which is also a read only, this function requires no parameter, so the data field remains empty</li></ul><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code>
	abi <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">&quot;decimals&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;function decimals()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;symbol&quot;</span><span class="token punctuation">:</span>        <span class="token string">&quot;function symbol()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span>          <span class="token string">&quot;function name()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;totalSupply&quot;</span><span class="token punctuation">:</span>   <span class="token string">&quot;function totalSupply()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;balanceOf&quot;</span><span class="token punctuation">:</span>     <span class="token string">&quot;function balanceOf(address)&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;transfer&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;function transfer(address to, uint256 value) external returns (bool)&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;TransferEvent&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;event Transfer(address from, address to, uint256 value)&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// For functions with argument</span>
	data <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token string">&quot;functionName&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;args&quot;</span><span class="token punctuation">:</span>         <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// corrected syntax</span>
	<span class="token punctuation">}</span>

	result<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> contract<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span>rpc<span class="token punctuation">,</span> abi<span class="token punctuation">,</span> contractAddress<span class="token punctuation">,</span> walletAddress<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
    res<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> utils<span class="token punctuation">.</span><span class="token function">HexToText</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mutate" tabindex="-1"><a class="header-anchor" href="#mutate"><span>Mutate</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">MutateContract</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	abi <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">&quot;decimals&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;function decimals()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;symbol&quot;</span><span class="token punctuation">:</span>        <span class="token string">&quot;function symbol() view returns (string)&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span>          <span class="token string">&quot;function name()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;totalSupply&quot;</span><span class="token punctuation">:</span>   <span class="token string">&quot;function totalSupply()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;balanceOf&quot;</span><span class="token punctuation">:</span>     <span class="token string">&quot;function balanceOf(address)&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;transfer&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;function transfer(address to, uint256 value) external returns (bool)&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;TransferEvent&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;event Transfer(address from, address to, uint256 value)&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// For functions without an argument</span>
	data <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token string">&quot;functionName&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;args&quot;</span><span class="token punctuation">:</span>         <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>wallet<span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// corrected syntax</span>

	<span class="token punctuation">}</span>

	result<span class="token punctuation">,</span> err <span class="token operator">:=</span> contract<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span>rpc<span class="token punctuation">,</span> abi<span class="token punctuation">,</span> DAIContract<span class="token punctuation">,</span> wallet<span class="token punctuation">,</span> data<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	res<span class="token punctuation">,</span> err <span class="token operator">:=</span> utils<span class="token punctuation">.</span><span class="token function">HexToText</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),p=[o];function i(c,u){return s(),a("div",null,p)}const r=n(e,[["render",i],["__file","contract.html.vue"]]),d=JSON.parse('{"path":"/contract.html","title":"Contract","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"ABI","slug":"abi","link":"#abi","children":[]},{"level":2,"title":"Mutate","slug":"mutate","link":"#mutate","children":[]}],"git":{"updatedTime":1710595411000,"contributors":[{"name":"Ayo Solomon","email":"48213053+Ayoseun@users.noreply.github.com","commits":2}]},"filePathRelative":"contract.md"}');export{r as comp,d as data};

import{_ as n,o as s,c as a,a as t}from"./app-D8-EVrBQ.js";const p={},e=t(`<h1 id="contract" tabindex="-1"><a class="header-anchor" href="#contract"><span>Contract</span></a></h1><h2 id="abi" tabindex="-1"><a class="header-anchor" href="#abi"><span>ABI</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code>	abi <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
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



\`</span><span class="token string">\`\`</span>Read<span class="token operator">-</span>only methods <span class="token punctuation">(</span>i<span class="token punctuation">.</span>e<span class="token punctuation">.</span> view and pure<span class="token punctuation">)</span><span class="token string">\`\`</span><span class="token string">\`

A read-only method is one which cannot change the state of the blockchain, but often provide a simple interface to get important data about a Contract.



\`</span><span class="token string">\`\`</span><span class="token keyword">go</span>
<span class="token keyword">func</span> <span class="token function">ReadContract</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	abi <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">&quot;decimals&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;function decimals()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;symbol&quot;</span><span class="token punctuation">:</span>        <span class="token string">&quot;function symbol() view returns (string)&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span>          <span class="token string">&quot;function name()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;totalSupply&quot;</span><span class="token punctuation">:</span>   <span class="token string">&quot;function totalSupply()&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;balanceOf&quot;</span><span class="token punctuation">:</span>     <span class="token string">&quot;function balanceOf(address)&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;transfer&quot;</span><span class="token punctuation">:</span>      <span class="token string">&quot;function transfer(address to, uint256 value) external returns (bool)&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;TransferEvent&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;event Transfer(address from, address to, uint256 value)&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>


	<span class="token comment">// For functions with argument</span>
	 data2 <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
	 	<span class="token string">&quot;functionName&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;transfer&quot;</span><span class="token punctuation">,</span>
	 	<span class="token string">&quot;args&quot;</span><span class="token punctuation">:</span>         <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>wallet<span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// corrected syntax</span>
	<span class="token punctuation">}</span>

	result<span class="token punctuation">,</span> err <span class="token operator">:=</span> contract<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span>rpc<span class="token punctuation">,</span> abi<span class="token punctuation">,</span> DAIContract<span class="token punctuation">,</span> wallet<span class="token punctuation">,</span> data<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	res<span class="token punctuation">,</span> err <span class="token operator">:=</span> utils<span class="token punctuation">.</span><span class="token function">HexToText</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mutate" tabindex="-1"><a class="header-anchor" href="#mutate"><span>Mutate</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">MutateContract</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

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
		<span class="token string">&quot;args&quot;</span><span class="token punctuation">:</span>         <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// corrected syntax</span>
	<span class="token punctuation">}</span>

	result<span class="token punctuation">,</span> err <span class="token operator">:=</span> contract<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span>rpc<span class="token punctuation">,</span> abi<span class="token punctuation">,</span> DAIContract<span class="token punctuation">,</span> wallet<span class="token punctuation">,</span> data<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	res<span class="token punctuation">,</span> err <span class="token operator">:=</span> utils<span class="token punctuation">.</span><span class="token function">HexToText</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),o=[e];function i(c,u){return s(),a("div",null,o)}const r=n(p,[["render",i],["__file","contract.html.vue"]]),d=JSON.parse('{"path":"/contract.html","title":"Contract","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"ABI","slug":"abi","link":"#abi","children":[]},{"level":2,"title":"Mutate","slug":"mutate","link":"#mutate","children":[]}],"git":{"updatedTime":1710589924000,"contributors":[{"name":"Ayo Solomon","email":"48213053+Ayoseun@users.noreply.github.com","commits":1}]},"filePathRelative":"contract.md"}');export{r as comp,d as data};

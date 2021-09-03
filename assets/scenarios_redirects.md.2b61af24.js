import{o as s,c as n,a as e,b as a,d as t,e as p}from"./app.3865ee6a.js";const c='{"title":"Working with Redirects","description":"","frontmatter":{},"headers":[{"level":2,"title":"Asserting on Expected Redirect Responses","slug":"asserting-on-expected-redirect-responses"}],"relativePath":"scenarios/redirects.md","lastUpdated":1630650764440}',o={},r=a("h1",{id:"working-with-redirects"},[a("a",{class:"header-anchor",href:"#working-with-redirects","aria-hidden":"true"},"#"),t(" Working with Redirects")],-1),i=a("h2",{id:"asserting-on-expected-redirect-responses"},[a("a",{class:"header-anchor",href:"#asserting-on-expected-redirect-responses","aria-hidden":"true"},"#"),t(" Asserting on Expected Redirect Responses")],-1),l=a("p",null,"Alba comes with some out of the box assertions to declaratively check expected redirects.",-1),u=p('<p><a id="snippet-sample_asserting_redirects"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token return-type class-name">Task</span> <span class="token function">asserting_redirects</span><span class="token punctuation">(</span><span class="token class-name">IAlbaHost</span> system<span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token keyword">return</span> system<span class="token punctuation">.</span><span class="token function">Scenario</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>\n    <span class="token punctuation">{</span>\n        <span class="token comment">// should redirect to the url</span>\n        _<span class="token punctuation">.</span><span class="token function">RedirectShouldBe</span><span class="token punctuation">(</span><span class="token string">&quot;/redirect&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// should redirect permanently to the url</span>\n        _<span class="token punctuation">.</span><span class="token function">RedirectPermanentShouldBe</span><span class="token punctuation">(</span><span class="token string">&quot;/redirect&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/alba/blob/master/src/Alba.Testing/Samples/Redirects.cs#L7-L19" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_asserting_redirects" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p>',3);o.render=function(a,t,p,c,o,d){return s(),n("div",null,[r,i,l,e(" snippet: sample_asserting_redirects "),u])};export{c as __pageData,o as default};

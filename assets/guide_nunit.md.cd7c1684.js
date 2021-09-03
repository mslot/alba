import{o as n,c as s,a,b as t,d as p,e}from"./app.3865ee6a.js";const o='{"title":"Integrating with NUnit","description":"","frontmatter":{},"relativePath":"guide/nunit.md","lastUpdated":1630650764444}',c={},l=t("h1",{id:"integrating-with-nunit"},[t("a",{class:"header-anchor",href:"#integrating-with-nunit","aria-hidden":"true"},"#"),p(" Integrating with NUnit")],-1),i=t("p",null,[p("When using Alba within "),t("a",{href:"./.html"},"NUnit testing projects"),p(", you probably want to reuse the "),t("code",null,"IAlbaHost"),p(" across tests and test fixtures because "),t("code",null,"AlbaHost"),p(" is relatively expensive to create (it's bootstrapping your whole application more than Alba itself is slow). To do that with NUnit, you could track a single "),t("code",null,"AlbaHost"),p(" on a static class like this one:")],-1),u=e('<p><a id="snippet-sample_nunit_application"></a></p><div class="language-cs"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">SetUpFixture</span></span><span class="token punctuation">]</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Application</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">// Make this lazy so you don&#39;t build it out</span>\n    <span class="token comment">// when you don&#39;t need it.</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">readonly</span> <span class="token class-name">Lazy<span class="token punctuation">&lt;</span>IAlbaHost<span class="token punctuation">&gt;</span></span> _host<span class="token punctuation">;</span>\n\n    <span class="token keyword">static</span> <span class="token function">Application</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        _host <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Lazy<span class="token punctuation">&lt;</span>IAlbaHost<span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Program\n            <span class="token punctuation">.</span><span class="token function">CreateHostBuilder</span><span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Empty</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">StartAlba</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">IAlbaHost</span> AlbaHost <span class="token operator">=&gt;</span> _host<span class="token punctuation">.</span>Value<span class="token punctuation">;</span>\n\n    <span class="token comment">// Make sure that NUnit will shut down the AlbaHost when</span>\n    <span class="token comment">// all the projects are finished</span>\n    <span class="token punctuation">[</span>OneTimeTearDown<span class="token punctuation">]</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Teardown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>_host<span class="token punctuation">.</span>IsValueCreated<span class="token punctuation">)</span>\n        <span class="token punctuation">{</span>\n            _host<span class="token punctuation">.</span>Value<span class="token punctuation">.</span><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/alba/blob/master/src/NUnitSamples/UnitTest1.cs#L11-L41" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_nunit_application" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p><p>Then reference the <code>AlbaHost</code> in tests like this sample:</p>',4),k=e('<p><a id="snippet-sample_nunit_scenario_test"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">sample_integration_fixture</span>\n<span class="token punctuation">{</span>\n    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Test</span></span><span class="token punctuation">]</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name">Task</span> <span class="token function">happy_path</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> Application<span class="token punctuation">.</span>AlbaHost<span class="token punctuation">.</span><span class="token function">Scenario</span><span class="token punctuation">(</span>_ <span class="token operator">=&gt;</span>\n        <span class="token punctuation">{</span>\n            _<span class="token punctuation">.</span>Get<span class="token punctuation">.</span><span class="token function">Url</span><span class="token punctuation">(</span><span class="token string">&quot;/fake/okay&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            _<span class="token punctuation">.</span><span class="token function">StatusCodeShouldBeOk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><sup><a href="https://github.com/JasperFx/alba/blob/master/src/NUnitSamples/UnitTest1.cs#L43-L56" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_nunit_scenario_test" title="Start of snippet">anchor</a></sup>\x3c!-- endSnippet --\x3e</p>',3);c.render=function(t,p,e,o,c,r){return n(),s("div",null,[l,i,a(" snippet: sample_NUnit_Application "),u,a(" snippet: sample_NUnit_scenario_test "),k])};export{o as __pageData,c as default};

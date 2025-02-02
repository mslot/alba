# Integrating with NUnit

When using Alba within [NUnit testing projects](), you probably want to reuse the `IAlbaHost` across tests and test fixtures because
`AlbaHost` is relatively expensive to create (it's bootstrapping your whole application more than Alba itself is slow). To do that with NUnit, you could
track a single `AlbaHost` on a static class like this one:

<!-- snippet: sample_NUnit_Application -->
<a id='snippet-sample_nunit_application'></a>
```cs
[SetUpFixture]
public class Application
{
    // Make this lazy so you don't build it out
    // when you don't need it.
    private static readonly Lazy<IAlbaHost> _host;

    static Application()
    {
        _host = new Lazy<IAlbaHost>(() => Program
            .CreateHostBuilder(Array.Empty<string>())
            .StartAlba());
    }

    public static IAlbaHost AlbaHost => _host.Value;

    // Make sure that NUnit will shut down the AlbaHost when
    // all the projects are finished
    [OneTimeTearDown]
    public void Teardown()
    {
        if (_host.IsValueCreated)
        {
            _host.Value.Dispose();
        }
    }
}
```
<sup><a href='https://github.com/JasperFx/alba/blob/master/src/NUnitSamples/UnitTest1.cs#L11-L41' title='Snippet source file'>snippet source</a> | <a href='#snippet-sample_nunit_application' title='Start of snippet'>anchor</a></sup>
<!-- endSnippet -->

Then reference the `AlbaHost` in tests like this sample:

<!-- snippet: sample_NUnit_scenario_test -->
<a id='snippet-sample_nunit_scenario_test'></a>
```cs
public class sample_integration_fixture
{
    [Test]
    public Task happy_path()
    {
        return Application.AlbaHost.Scenario(_ =>
        {
            _.Get.Url("/fake/okay");
            _.StatusCodeShouldBeOk();
        });
    }
}
```
<sup><a href='https://github.com/JasperFx/alba/blob/master/src/NUnitSamples/UnitTest1.cs#L43-L56' title='Snippet source file'>snippet source</a> | <a href='#snippet-sample_nunit_scenario_test' title='Start of snippet'>anchor</a></sup>
<!-- endSnippet -->

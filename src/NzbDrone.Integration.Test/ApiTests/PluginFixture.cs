using System.Threading;
using FluentAssertions;
using NUnit.Framework;
using NzbDrone.Common.Serializer;
using NzbDrone.Core.Lifecycle.Commands;
using NzbDrone.Core.Messaging.Commands;
using NzbDrone.Core.Plugins.Commands;
using NzbDrone.Integration.Test.Client;
using RestSharp;

namespace NzbDrone.Integration.Test.ApiTests
{
    [TestFixture]
    [Category("Plugin")]
    [Category("Integration")]
    public class PluginFixture : IntegrationTest
    {
        private string _dummyPluginPath;

        [OneTimeSetUp]
        public void Setup()
        {
            _dummyPluginPath = System.IO.Path.Combine(System.IO.Path.GetTempPath(), "Melodarr.Plugin.Mock.zip");
            var mockPluginBase64 = "TVqQAAMAAAAEAAAA//8AALgAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAA4fug4AtAnNIbgBTM0hVGhpcyBwcm9ncmFtIGNhbm5vdCBiZSBydW4gaW4gRE9TIG1vZGUuDQ0KJAAAAAAAAABQRQAATAEDAOeDkNcAAAAAAAAAAOAAIiALATAAAAoAAAAGAAAAAAAACigAAAAgAAAAQAAAAAAAEAAgAAAAAgAABAAAAAAAAAAEAAAAAAAAAACAAAAAAgAAAAAAAAMAYIUAABAAABAAAAAAEAAAEAAAAAAAABAAAAAAAAAAAAAAALUnAABPAAAAAEAAADADAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAwAAADcJgAAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAACAAAAAAAAAAAAAAACCAAAEgAAAAAAAAAAAAAAC50ZXh0AAAAEAgAAAAgAAAACgAAAAIAAAAAAAAAAAAAAAAAACAAAGAucnNyYwAAADADAAAAQAAAAAQAAAAMAAAAAAAAAAAAAAAAAABAAABALnJlbG9jAAAMAAAAAGAAAAACAAAAEAAAAAAAAAAAAAAAAAAAQAAAQgAAAAAAAAAAAAAAAAAAAADpJwAAAAAAAEgAAAACAAUAcCAAAGwGAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABpyAQAAcCoacgsAAHAqGnIVAABwKh4CKA8AAAoqAAAAQlNKQgEAAQAAAAAADAAAAHY0LjAuMzAzMTkAAAAABQBsAAAAGAIAACN+AACEAgAAcAIAACNTdHJpbmdzAAAAAPQEAAA4AAAAI1VTACwFAAAQAAAAI0dVSUQAAAA8BQAAMAEAACNCbG9iAAAAAAAAAAIAAAFHFKABCQAAAAD6ATMAFgAAAQAAABAAAAACAAAABAAAAA8AAAAOAAAAAQAAAAMAAAADAAAAAQAAAAIAAAAAAL0BAQAAAAAABgAaARoCBgCFARoCBgBKAAcCDwA6AgAABgCHAKMBBgAwAOUBBgBsAeUBBgDjAOUBBgCgAOUBBgC9AOUBBgA6AeUBBgBwAOUBBgACARoCBgBTARoCBgBeABoCCgDeAUkCAAAAAAEAAAAAAAEAAQABABAAXwLaAUEAAQABAFAgAAAAAMYICgApAAEAVyAAAAAAxgj3ASkAAQBeIAAAAADGCMwBKQABAGUgAAAAAIYYAQIGAAEACQABAgEAEQABAgYAGQABAgoAKQABAhAAMQABAhUAOQABAhAAQQABAhAASQABAhAAUQABAhAAWQABAhAAYQABAhAAaQABAgEAcQABAhsAeQABAhsAgQABAgYAJwBjACQBLgALADEALgATADoALgAbAFkALgAjAGIALgArAKIALgAzAOMALgA7APMALgBDAAABLgBLAA0BLgBTAOMALgBbAOMAQwBrABgBQwBzAB4BAgABAAAADgAtAAAA+wEtAAAA0AEtAAIAAQADAAIAAgAFAAIAAwAHAASAAAABAAAAAAAAAAAAAAAAANoBAAAKAAAAAAAAAAAAAAAgABMAAAAAAAoAAAAAAAJiAAAAAAAAIgAAAAAAAAAAPE1vZHVsZT4AZ2V0X05hbWUAU3lzdGVtLlJ1bnRpbWUATWVsb2RhcnIuQ29yZQBBc3NlbWJseU1ldGFkYXRhQXR0cmlidXRlAERlYnVnZ2FibGVBdHRyaWJ1dGUATnVsbGFibGVBdHRyaWJ1dGUAQXNzZW1ibHlUaXRsZUF0dHJpYnV0ZQBUYXJnZXRGcmFtZXdvcmtBdHRyaWJ1dGUAQXNzZW1ibHlGaWxlVmVyc2lvbkF0dHJpYnV0ZQBBc3NlbWJseUluZm9ybWF0aW9uYWxWZXJzaW9uQXR0cmlidXRlAEFzc2VtYmx5Q29uZmlndXJhdGlvbkF0dHJpYnV0ZQBSZWZTYWZldHlSdWxlc0F0dHJpYnV0ZQBDb21waWxhdGlvblJlbGF4YXRpb25zQXR0cmlidXRlAEFzc2VtYmx5UHJvZHVjdEF0dHJpYnV0ZQBOdWxsYWJsZUNvbnRleHRBdHRyaWJ1dGUAQXNzZW1ibHlDb21wYW55QXR0cmlidXRlAFJ1bnRpbWVDb21wYXRpYmlsaXR5QXR0cmlidXRlAFN5c3RlbS5SdW50aW1lLlZlcnNpb25pbmcATW9ja1BsdWdpbi5kbGwAZ2V0X0dpdGh1YlVybABNb2NrUGx1Z2luAFN5c3RlbS5SZWZsZWN0aW9uAGdldF9Pd25lcgAuY3RvcgBTeXN0ZW0uRGlhZ25v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";
            using (var fileStream = new System.IO.FileStream(_dummyPluginPath, System.IO.FileMode.Create))
            using (var archive = new System.IO.Compression.ZipArchive(fileStream, System.IO.Compression.ZipArchiveMode.Create, true))
            {
                var entry = archive.CreateEntry("Melodarr.Plugin.Mock.dll");
                using (var entryStream = entry.Open())
                {
                    var bytes = System.Convert.FromBase64String(mockPluginBase64);
                    entryStream.Write(bytes, 0, bytes.Length);
                }
            }
        }

        [Test]
        [Order(0)]
        [Category("PluginInstall")]
        public void should_install_plugin()
        {
            PostAndWaitForCompletion(new InstallPluginCommand
            {
                GithubUrl = $"file://{_dummyPluginPath}"
            });

            PostAndWaitForRestart(new RestartCommand());

            WaitForRestart();

            var plugins = Plugins.All();
            plugins.Should().HaveCount(1);
            plugins[0].Name.Should().Be("Mock");
        }

        [Test]
        [Order(1)]
        [Category("PluginUninstall")]
        public void should_uninstall_plugin()
        {
            var plugins = Plugins.All();
            plugins.Should().HaveCount(1);
            plugins[0].Name.Should().Be("Mock");

            PostAndWaitForCompletion(new UninstallPluginCommand
            {
                GithubUrl = $"file://{_dummyPluginPath}"
            });

            PostAndWaitForRestart(new RestartCommand());

            WaitForRestart();

            plugins = Plugins.All();
            plugins.Should().BeEmpty();
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            if (System.IO.File.Exists(_dummyPluginPath))
            {
                System.IO.File.Delete(_dummyPluginPath);
            }

            var request = new RestRequest("system/shutdown");
            request.Method = Method.POST;
            request.AddHeader("Authorization", ApiKey);
            RestClient.Execute(request);
        }

        private SimpleCommandResource PostAndWaitForCompletion<T>(T command)
            where T : Command, new()
        {
            var request = new RestRequest("command");
            request.Method = Method.POST;
            request.AddHeader("Authorization", ApiKey);
            request.AddJsonBody(command);

            var result = RestClient.Execute(request);
            var resource = Json.Deserialize<SimpleCommandResource>(result.Content);

            var id = resource.Id;

            id.Should().NotBe(0);

            for (var i = 0; i < 50; i++)
            {
                if (resource?.Status == CommandStatus.Completed)
                {
                    return resource;
                }

                var get = new RestRequest($"command/{id}");
                get.AddHeader("Authorization", ApiKey);

                result = RestClient.Execute(get);

                TestContext.Progress.WriteLine("Waiting for command to finish : {0}  [{1}] {2}\n{3}", result.ResponseStatus, result.StatusDescription, result.ErrorException?.Message, result.Content);

                resource = Json.Deserialize<SimpleCommandResource>(result.Content);
                Thread.Sleep(500);
            }

            Assert.Fail("Command failed");
            return resource;
        }

        private SimpleCommandResource PostAndWaitForRestart<T>(T command)
            where T : Command, new()
        {
            var request = new RestRequest("command");
            request.Method = Method.POST;
            request.AddHeader("Authorization", ApiKey);
            request.AddJsonBody(command);

            var result = RestClient.Execute(request);
            var resource = Json.Deserialize<SimpleCommandResource>(result.Content);

            var id = resource.Id;

            id.Should().NotBe(0);

            for (var i = 0; i < 50; i++)
            {
                if (resource?.Status == CommandStatus.Completed)
                {
                    return resource;
                }

                var get = new RestRequest($"command/{id}");
                get.AddHeader("Authorization", ApiKey);

                result = RestClient.Execute(get);

                TestContext.Progress.WriteLine("Waiting for command to finish : {0}  [{1}] {2}\n{3}", result.ResponseStatus, result.StatusDescription, result.ErrorException?.Message, result.Content);

                resource = Json.Deserialize<SimpleCommandResource>(result.Content);
                Thread.Sleep(500);
            }

            Assert.Fail("Command failed");
            return resource;
        }

        private void WaitForRestart()
        {
            for (var i = 0; i < 60; i++)
            {
                var request = new RestRequest("system/status");
                request.AddHeader("Authorization", ApiKey);
                request.AddHeader("X-Api-Key", ApiKey);

                var statusCall = RestClient.Get(request);

                if (statusCall.ResponseStatus == ResponseStatus.Completed)
                {
                    TestContext.Progress.WriteLine($"Melodarr {Port} is started. Running Tests");
                    return;
                }

                TestContext.Progress.WriteLine("Waiting for Melodarr to start. Response Status : {0}  [{1}] {2}", statusCall.ResponseStatus, statusCall.StatusDescription, statusCall.ErrorException.Message);

                Thread.Sleep(500);
            }

            Assert.Fail("Timed out waiting for restart");
        }

        [Test]
        [Category("External")]
        public void should_install_plugin_from_github()
        {
            // Extracted from the main flow to isolate network/third-party dependency failures
            Assert.Ignore("Defunct target: ta264/Melodarr.Plugin.Deemix. Needs a reliable external test target repository before enabling.");

            PostAndWaitForCompletion(new InstallPluginCommand
            {
                GithubUrl = "https://github.com/ta264/Melodarr.Plugin.Deemix"
            });

            // Note: External installation asserts would follow here.
        }
    }
}

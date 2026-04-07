using System;
using System.Linq;
using FluentAssertions;
using Moq;
using NUnit.Framework;
using NzbDrone.Common.EnvironmentInfo;
using NzbDrone.Common.Extensions;
using NzbDrone.Common.Http;
using NzbDrone.Common.Serializer;
using NzbDrone.Core.Test.Framework;
using NzbDrone.Core.Update;

namespace NzbDrone.Core.Test.UpdateTests
{
    [TestFixture]
    [Category("Updates"), Category("External"), Category("Integration")]
    public class UpdatePackageProviderFixture : CoreTest<UpdatePackageProvider>
    {
        [SetUp]
        public void Setup()
        {
            Mocker.GetMock<IPlatformInfo>().SetupGet(c => c.Version).Returns(new Version("9.9.9"));

            var factoryMock = Mocker.GetMock<NzbDrone.Common.Http.IHttpRequestBuilderFactory>();
            factoryMock.Setup(c => c.Create()).Returns(new NzbDrone.Common.Http.HttpRequestBuilder("http://test.com/"));

            Mocker.GetMock<NzbDrone.Common.Cloud.IMelodarrCloudRequestBuilder>()
                  .SetupGet(c => c.Services)
                  .Returns(factoryMock.Object);
        }

        [Test]
        public void no_update_when_version_higher()
        {
            var responseContent = new UpdatePackageAvailable { Available = false }.ToJson();
            Mocker.GetMock<IHttpClient>()
                  .Setup(c => c.Get<UpdatePackageAvailable>(It.IsAny<HttpRequest>()))
                  .Returns(new HttpResponse<UpdatePackageAvailable>(new HttpResponse(new HttpRequest(""), new HttpHeader(), responseContent)));

            Subject.GetLatestUpdate("nightly", new Version(10, 0)).Should().BeNull();
        }

        [Test]
        public void finds_update_when_version_lower()
        {
            NotBsd();
            var responseContent = new UpdatePackageAvailable { Available = true, UpdatePackage = new UpdatePackage { Version = new Version(0, 2) } }.ToJson();
            Mocker.GetMock<IHttpClient>()
                  .Setup(c => c.Get<UpdatePackageAvailable>(It.IsAny<HttpRequest>()))
                  .Returns(new HttpResponse<UpdatePackageAvailable>(new HttpResponse(new HttpRequest(""), new HttpHeader(), responseContent)));

            Subject.GetLatestUpdate("nightly", new Version(0, 1)).Should().NotBeNull();
        }

        [Test]
        public void should_get_master_if_branch_doesnt_exit()
        {
            var responseContent = new UpdatePackageAvailable { Available = true, UpdatePackage = new UpdatePackage { Version = new Version(0, 3) } }.ToJson();
            Mocker.GetMock<IHttpClient>()
                  .Setup(c => c.Get<UpdatePackageAvailable>(It.IsAny<HttpRequest>()))
                  .Returns(new HttpResponse<UpdatePackageAvailable>(new HttpResponse(new HttpRequest(""), new HttpHeader(), responseContent)));

            Subject.GetLatestUpdate("invalid_branch", new Version(0, 2)).Should().NotBeNull();
        }

        [Test]
        public void should_get_recent_updates()
        {
            NotBsd();
            const string branch = "nightly";

            var dummyUpdates = new System.Collections.Generic.List<UpdatePackage>
            {
                new UpdatePackage
                {
                    Hash = "abcdef",
                    FileName = "Melodarr.develop.0.5.zip",
                    ReleaseDate = new DateTime(2015, 1, 1),
                    Branch = branch,
                    Changes = new UpdateChanges
                    {
                        New = new System.Collections.Generic.List<string> { "Feature" },
                        Fixed = new System.Collections.Generic.List<string> { "Bug" }
                    }
                }
            };

            var responseContent = dummyUpdates.ToJson();
            Mocker.GetMock<IHttpClient>()
                  .Setup(c => c.Get<System.Collections.Generic.List<UpdatePackage>>(It.IsAny<HttpRequest>()))
                  .Returns(new HttpResponse<System.Collections.Generic.List<UpdatePackage>>(new HttpResponse(new HttpRequest(""), new HttpHeader(), responseContent)));

            var recent = Subject.GetRecentUpdates(branch, new Version(0, 1), null);

            recent.Should().NotBeEmpty();
            recent.Should().OnlyContain(c => c.Hash.IsNotNullOrWhiteSpace());
            recent.Should().OnlyContain(c => c.FileName.Contains("Melodarr.develop.0"));
            recent.Should().OnlyContain(c => c.ReleaseDate.Year >= 2014);
            recent.Where(c => c.Changes != null).Should().OnlyContain(c => c.Changes.New != null);
            recent.Where(c => c.Changes != null).Should().OnlyContain(c => c.Changes.Fixed != null);
            recent.Should().OnlyContain(c => c.Branch == branch);
        }
    }
}

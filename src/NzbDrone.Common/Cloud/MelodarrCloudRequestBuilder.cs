using NzbDrone.Common.Http;

namespace NzbDrone.Common.Cloud
{
    public interface IMelodarrCloudRequestBuilder
    {
        IHttpRequestBuilderFactory Services { get; }
        IHttpRequestBuilderFactory Search { get; }
        IHttpRequestBuilderFactory InternalSearch { get; }
    }

    public class MelodarrCloudRequestBuilder : IMelodarrCloudRequestBuilder
    {
        public MelodarrCloudRequestBuilder()
        {
            Services = new HttpRequestBuilder("https://lidarr.servarr.com/v1/")
                .CreateFactory();

            Search = new HttpRequestBuilder("https://api.lidarr.audio/api/v0.4/{route}")
                .KeepAlive()
                .CreateFactory();
        }

        public IHttpRequestBuilderFactory Services { get; }

        public IHttpRequestBuilderFactory Search { get; }

        public IHttpRequestBuilderFactory InternalSearch { get; }
    }
}

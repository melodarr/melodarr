using System;
using System.Collections.Generic;
using NLog;
using NzbDrone.Common.Http;
using NzbDrone.Core.Configuration;
using NzbDrone.Core.MetadataSource;
using NzbDrone.Core.Parser;
using NzbDrone.Core.ThingiProvider;

namespace NzbDrone.Core.ImportLists.MelodarrLists
{
    public class MelodarrLists : HttpImportListBase<MelodarrListsSettings>
    {
        public override string Name => "Melodarr Lists";

        public override ImportListType ListType => ImportListType.Other;
        public override TimeSpan MinRefreshInterval => TimeSpan.FromMinutes(15);

        public override int PageSize => 10;

        private readonly IMetadataRequestBuilder _requestBuilder;

        public MelodarrLists(IHttpClient httpClient, IImportListStatusService importListStatusService, IConfigService configService, IParsingService parsingService, IMetadataRequestBuilder requestBuilder, Logger logger)
            : base(httpClient, importListStatusService, configService, parsingService, logger)
        {
            _requestBuilder = requestBuilder;
        }

        public override IEnumerable<ProviderDefinition> DefaultDefinitions
        {
            get
            {
                yield return GetDefinition("iTunes Top Albums", GetSettings("itunes/album/top"));
                yield return GetDefinition("iTunes New Albums", GetSettings("itunes/album/new"));
                yield return GetDefinition("Apple Music Top Albums", GetSettings("apple-music/album/top"));
                yield return GetDefinition("Apple Music New Albums", GetSettings("apple-music/album/new"));
                yield return GetDefinition("Billboard Top Albums", GetSettings("billboard/album/top"));
                yield return GetDefinition("Billboard Top Artists", GetSettings("billboard/artist/top"));
                yield return GetDefinition("Last.fm Top Artists", GetSettings("lastfm/artist/top"));
            }
        }

        private ImportListDefinition GetDefinition(string name, MelodarrListsSettings settings)
        {
            return new ImportListDefinition
            {
                EnableAutomaticAdd = false,
                Name = name,
                Implementation = GetType().Name,
                Settings = settings
            };
        }

        private MelodarrListsSettings GetSettings(string url)
        {
            var settings = new MelodarrListsSettings { ListId = url };

            return settings;
        }

        public override IImportListRequestGenerator GetRequestGenerator()
        {
            return new MelodarrListsRequestGenerator(_requestBuilder) { Settings = Settings };
        }

        public override IParseImportListResponse GetParser()
        {
            return new MelodarrListsParser(Settings);
        }
    }
}

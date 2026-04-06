using System.Collections.Generic;
using Melodarr.Api.V1.Tracks;
using Melodarr.Http.REST;
using NzbDrone.Core.DecisionEngine;
using NzbDrone.Core.Qualities;

namespace Melodarr.Api.V1.ManualImport
{
    public class ManualImportUpdateResource : RestResource
    {
        public string Path { get; set; }
        public string Name { get; set; }
        public int? ArtistId { get; set; }
        public int? AlbumId { get; set; }
        public int? AlbumReleaseId { get; set; }
        public List<TrackResource> Tracks { get; set; }
        public List<int> TrackIds { get; set; }
        public QualityModel Quality { get; set; }
        public string ReleaseGroup { get; set; }
        public int IndexerFlags { get; set; }
        public string DownloadId { get; set; }
        public bool AdditionalFile { get; set; }
        public bool ReplaceExistingFiles { get; set; }
        public bool DisableReleaseSwitching { get; set; }

        public IEnumerable<Rejection> Rejections { get; set; }
    }
}

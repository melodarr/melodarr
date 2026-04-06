using System.Collections.Generic;

namespace Melodarr.Api.V1.Albums
{
    public class AlbumsMonitoredResource
    {
        public List<int> AlbumIds { get; set; }
        public bool Monitored { get; set; }
    }
}

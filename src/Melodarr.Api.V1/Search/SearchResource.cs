using Melodarr.Api.V1.Albums;
using Melodarr.Api.V1.Artist;
using Melodarr.Http.REST;

namespace Melodarr.Api.V1.Search
{
    public class
    SearchResource : RestResource
    {
        public string ForeignId { get; set; }
        public ArtistResource Artist { get; set; }
        public AlbumResource Album { get; set; }
    }
}

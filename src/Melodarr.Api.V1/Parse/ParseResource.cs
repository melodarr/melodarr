using System.Collections.Generic;
using Melodarr.Api.V1.Albums;
using Melodarr.Api.V1.Artist;
using Melodarr.Api.V1.CustomFormats;
using Melodarr.Http.REST;
using NzbDrone.Core.Parser.Model;

namespace Melodarr.Api.V1.Parse
{
    public class ParseResource : RestResource
    {
        public string Title { get; set; }
        public ParsedAlbumInfo ParsedAlbumInfo { get; set; }
        public ArtistResource Artist { get; set; }
        public List<AlbumResource> Albums { get; set; }
        public List<CustomFormatResource> CustomFormats { get; set; }
        public int CustomFormatScore { get; set; }
    }
}

using System.Collections.Generic;
using Melodarr.Http;
using Microsoft.AspNetCore.Mvc;
using NzbDrone.Core.MediaFiles;

namespace Melodarr.Api.V1.Tracks
{
    [V1ApiController("rename")]
    public class RenameTrackController : Controller
    {
        private readonly IRenameTrackFileService _renameTrackFileService;

        public RenameTrackController(IRenameTrackFileService renameTrackFileService)
        {
            _renameTrackFileService = renameTrackFileService;
        }

        [HttpGet]
        public List<RenameTrackResource> GetTracks(int artistId, int? albumId)
        {
            if (albumId.HasValue)
            {
                return _renameTrackFileService.GetRenamePreviews(artistId, albumId.Value).ToResource();
            }

            return _renameTrackFileService.GetRenamePreviews(artistId).ToResource();
        }
    }
}

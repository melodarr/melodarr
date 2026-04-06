using System.Collections.Generic;
using Melodarr.Http;
using Melodarr.Http.REST;
using Microsoft.AspNetCore.Mvc;
using NzbDrone.Core.Tags;

namespace Melodarr.Api.V1.Tags
{
    [V1ApiController("tag/detail")]
    public class TagDetailsController : RestController<TagDetailsResource>
    {
        private readonly ITagService _tagService;

        public TagDetailsController(ITagService tagService)
        {
            _tagService = tagService;
        }

        public override TagDetailsResource GetResourceById(int id)
        {
            return _tagService.Details(id).ToResource();
        }

        [HttpGet]
        [Produces("application/json")]
        public List<TagDetailsResource> GetAll()
        {
            var tags = _tagService.Details().ToResource();

            return tags;
        }
    }
}

using FluentValidation;
using Melodarr.Http;
using NzbDrone.Common.Extensions;
using NzbDrone.Core.Configuration;
using NzbDrone.Core.Validation;

namespace Melodarr.Api.V1.Config
{
    [V1ApiController("config/metadataprovider")]
    public class MetadataProviderConfigController : ConfigController<MetadataProviderConfigResource>
    {
        public MetadataProviderConfigController(IConfigService configService)
            : base(configService)
        {
            SharedValidator.RuleFor(c => c.MetadataSource).IsValidUrl().When(c => !c.MetadataSource.IsNullOrWhiteSpace());
        }

        protected override MetadataProviderConfigResource ToResource(IConfigService model)
        {
            return MetadataProviderConfigResourceMapper.ToResource(model);
        }
    }
}

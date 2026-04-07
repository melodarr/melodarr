using FluentValidation;
using NzbDrone.Core.Annotations;
using NzbDrone.Core.Validation;

namespace NzbDrone.Core.ImportLists.MelodarrLists
{
    public class MelodarrListsSettingsValidator : AbstractValidator<MelodarrListsSettings>
    {
    }

    public class MelodarrListsSettings : IImportListSettings
    {
        private static readonly MelodarrListsSettingsValidator Validator = new MelodarrListsSettingsValidator();

        public MelodarrListsSettings()
        {
            BaseUrl = "";
        }

        public string BaseUrl { get; set; }

        [FieldDefinition(0, Label = "List Id", Advanced = true)]
        public string ListId { get; set; }

        public NzbDroneValidationResult Validate()
        {
            return new NzbDroneValidationResult(Validator.Validate(this));
        }
    }
}

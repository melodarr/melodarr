using System;
using System.Collections.Generic;
using Melodarr.Api.V1.Albums;
using Melodarr.Api.V1.Artist;
using Melodarr.Api.V1.CustomFormats;
using Melodarr.Api.V1.Tracks;
using Melodarr.Http.REST;
using NzbDrone.Core.CustomFormats;
using NzbDrone.Core.History;
using NzbDrone.Core.Qualities;

namespace Melodarr.Api.V1.History
{
    public class HistoryResource : RestResource
    {
        public int AlbumId { get; set; }
        public int ArtistId { get; set; }
        public int TrackId { get; set; }
        public string SourceTitle { get; set; }
        public QualityModel Quality { get; set; }
        public List<CustomFormatResource> CustomFormats { get; set; }
        public int CustomFormatScore { get; set; }
        public bool QualityCutoffNotMet { get; set; }
        public DateTime Date { get; set; }
        public string DownloadId { get; set; }

        public EntityHistoryEventType EventType { get; set; }

        public Dictionary<string, string> Data { get; set; }

        public AlbumResource Album { get; set; }
        public ArtistResource Artist { get; set; }
        public TrackResource Track { get; set; }
    }

    public static class HistoryResourceMapper
    {
        public static HistoryResource ToResource(this EntityHistory model, ICustomFormatCalculationService formatCalculator)
        {
            if (model == null)
            {
                return null;
            }

            var customFormats = formatCalculator.ParseCustomFormat(model, model.Artist);
            var customFormatScore = model.Artist?.QualityProfile?.Value?.CalculateCustomFormatScore(customFormats) ?? 0;

            return new HistoryResource
            {
                Id = model.Id,

                AlbumId = model.AlbumId,
                ArtistId = model.ArtistId,
                TrackId = model.TrackId,
                SourceTitle = model.SourceTitle,
                Quality = model.Quality,
                CustomFormats = customFormats.ToResource(false),
                CustomFormatScore = customFormatScore,

                // QualityCutoffNotMet
                Date = model.Date,
                DownloadId = model.DownloadId,

                EventType = model.EventType,

                Data = model.Data

                // Episode
                // Series
            };
        }
    }
}

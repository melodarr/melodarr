using System.Collections.Specialized;
using System.Linq;
using NLog;
using NzbDrone.Common.Disk;
using NzbDrone.Common.Processes;
using NzbDrone.Core.Configuration;
using NzbDrone.Core.CustomFormats;
using NzbDrone.Core.Download;
using NzbDrone.Core.Parser.Model;
using NzbDrone.Core.Tags;

namespace NzbDrone.Core.MediaFiles
{
    public interface IImportScript
    {
        public ScriptImportDecision TryImport(string sourcePath, string destinationFilePath, LocalTrack localTrack, TrackFile trackFile, TransferMode mode, DownloadClientItem downloadClientItem = null);
    }

    public class ImportScriptService : IImportScript
    {
        private readonly IConfigFileProvider _configFileProvider;
        private readonly IAudioTagService _audioTagService;
        private readonly IProcessProvider _processProvider;
        private readonly IConfigService _configService;
        private readonly ITagRepository _tagRepository;
        private readonly ICustomFormatCalculationService _customFormatCalculationService;
        private readonly Logger _logger;

        public ImportScriptService(IProcessProvider processProvider,
                                   IAudioTagService audioTagService,
                                   IConfigService configService,
                                   IConfigFileProvider configFileProvider,
                                   ITagRepository tagRepository,
                                   ICustomFormatCalculationService customFormatCalculationService,
                                   Logger logger)
        {
            _processProvider = processProvider;
            _audioTagService = audioTagService;
            _configService = configService;
            _configFileProvider = configFileProvider;
            _tagRepository = tagRepository;
            _customFormatCalculationService = customFormatCalculationService;
            _logger = logger;
        }

        public ScriptImportDecision TryImport(string sourcePath, string destinationFilePath, LocalTrack localTrack, TrackFile trackFile, TransferMode mode, DownloadClientItem downloadClientItem = null)
        {
            var artist = localTrack.Artist;
            var album = localTrack.Album;
            var downloadClientInfo = downloadClientItem?.DownloadClientInfo;
            var downloadId = downloadClientItem?.DownloadId;

            if (!_configService.UseScriptImport)
            {
                return ScriptImportDecision.DeferMove;
            }

            var environmentVariables = new StringDictionary
            {
                { "Melodarr_SourcePath", sourcePath },
                { "Melodarr_DestinationPath", destinationFilePath },
                { "Melodarr_InstanceName", _configFileProvider.InstanceName },
                { "Melodarr_ApplicationUrl", _configService.ApplicationUrl },
                { "Melodarr_TransferMode", mode.ToString() },
                { "Melodarr_Artist_Id", artist.Id.ToString() },
                { "Melodarr_Artist_Name", artist.Name },
                { "Melodarr_Artist_Path", artist.Path },
                { "Melodarr_Artist_MBId", artist.ForeignArtistId },
                { "Melodarr_Artist_Tags", string.Join("|", artist.Tags.Select(t => _tagRepository.Get(t).Label)) },
                { "Melodarr_Album_Id", album.Id.ToString() },
                { "Melodarr_Album_Title", album.Title },
                { "Melodarr_Album_MBId", album.ForeignAlbumId },
                { "Melodarr_Album_ReleaseDate", album.ReleaseDate?.ToString("yyyy-MM-dd") ?? string.Empty },
                { "Melodarr_Album_Genres", string.Join("|", album.Genres) },
                { "Melodarr_TrackFile_TrackCount", localTrack.Tracks.Count.ToString() },
                { "Melodarr_TrackFile_TrackIds", string.Join(",", localTrack.Tracks.Select(t => t.Id)) },
                { "Melodarr_TrackFile_TrackNumbers", string.Join(",", localTrack.Tracks.Select(t => t.TrackNumber)) },
                { "Melodarr_TrackFile_TrackTitles", string.Join("|", localTrack.Tracks.Select(t => t.Title)) },
                { "Melodarr_TrackFile_Quality", localTrack.Quality.Quality.Name },
                { "Melodarr_TrackFile_QualityVersion", localTrack.Quality.Revision.Version.ToString() },
                { "Melodarr_TrackFile_ReleaseGroup", localTrack.ReleaseGroup ?? string.Empty },
                { "Melodarr_TrackFile_SceneName", localTrack.SceneName ?? string.Empty },
                { "Melodarr_Download_Client", downloadClientInfo?.Name ?? string.Empty },
                { "Melodarr_Download_Client_Type", downloadClientInfo?.Type ?? string.Empty },
                { "Melodarr_Download_Id", downloadId ?? string.Empty }
            };

            // Audio-specific MediaInfo (no video properties for music files)
            if (localTrack.FileTrackInfo?.MediaInfo != null)
            {
                var mediaInfo = localTrack.FileTrackInfo.MediaInfo;
                environmentVariables.Add("Melodarr_TrackFile_MediaInfo_AudioChannels", mediaInfo.AudioChannels.ToString());
                environmentVariables.Add("Melodarr_TrackFile_MediaInfo_AudioCodec", mediaInfo.AudioFormat ?? string.Empty);
                environmentVariables.Add("Melodarr_TrackFile_MediaInfo_AudioBitRate", mediaInfo.AudioBitrate.ToString());
                environmentVariables.Add("Melodarr_TrackFile_MediaInfo_AudioSampleRate", mediaInfo.AudioSampleRate.ToString());
                environmentVariables.Add("Melodarr_TrackFile_MediaInfo_BitsPerSample", mediaInfo.AudioBits.ToString());
            }

            // CustomFormats for music files
            var customFormats = _customFormatCalculationService.ParseCustomFormat(localTrack);
            environmentVariables.Add("Melodarr_TrackFile_CustomFormat", string.Join("|", customFormats.Select(x => x.Name)));

            _logger.Debug("Executing external script: {0}", _configService.ScriptImportPath);

            var processOutput = _processProvider.StartAndCapture(_configService.ScriptImportPath, $"\"{sourcePath}\" \"{destinationFilePath}\"", environmentVariables);

            _logger.Debug("Executed external script: {0} - Status: {1}", _configService.ScriptImportPath, processOutput.ExitCode);
            _logger.Debug("Script Output: \r\n{0}", string.Join("\r\n", processOutput.Lines));

            switch (processOutput.ExitCode)
            {
                case 0: // Copy complete
                    return ScriptImportDecision.MoveComplete;
                case 2: // Copy complete, file potentially changed, should try renaming again
                    trackFile.MediaInfo = _audioTagService.ReadTags(destinationFilePath).MediaInfo;
                    trackFile.Path = null;
                    return ScriptImportDecision.RenameRequested;
                case 3: // Let Lidarr handle it
                    return ScriptImportDecision.DeferMove;
                default: // Error, fail to import
                    throw new ScriptImportException("Moving with script failed! Exit code {0}", processOutput.ExitCode);
            }
        }
    }
}

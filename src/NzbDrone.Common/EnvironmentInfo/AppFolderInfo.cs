using System;
using System.IO;
using System.Reflection;
using NLog;
using NzbDrone.Common.Instrumentation;

namespace NzbDrone.Common.EnvironmentInfo
{
    public interface IAppFolderInfo
    {
        string AppDataFolder { get; }
        string TempFolder { get; }
        string StartUpFolder { get; }
    }

    public class AppFolderInfo : IAppFolderInfo
    {
        private readonly Environment.SpecialFolder _dataSpecialFolder = Environment.SpecialFolder.CommonApplicationData;

        private static readonly Logger Logger = NzbDroneLogger.GetLogger(typeof(AppFolderInfo));

        public AppFolderInfo(IStartupContext startupContext)
        {
            if (OsInfo.IsNotWindows)
            {
                _dataSpecialFolder = Environment.SpecialFolder.ApplicationData;
            }

            if (startupContext.Args.TryGetValue(StartupContext.APPDATA, out var argsAppDataFolder))
            {
                AppDataFolder = argsAppDataFolder;
                Logger.Info("Data directory is being overridden to [{0}]", AppDataFolder);
            }
            else
            {
                var fallbackMelodarr = Path.Combine(Environment.GetFolderPath(_dataSpecialFolder, Environment.SpecialFolderOption.DoNotVerify), "Melodarr");
                AppDataFolder = MigrateLegacyParentFolder(fallbackMelodarr);
            }

            MigrateLegacyDatabase(AppDataFolder);

            StartUpFolder = new FileInfo(Assembly.GetExecutingAssembly().Location).Directory.FullName;
            TempFolder = Path.GetTempPath();
        }

        public string AppDataFolder { get; }

        public string StartUpFolder { get; }

        public string TempFolder { get; }

        private string MigrateLegacyParentFolder(string targetMelodarrPath)
        {
            var legacyLidarrPath = Path.Combine(Environment.GetFolderPath(_dataSpecialFolder, Environment.SpecialFolderOption.DoNotVerify), "Lidarr");

            if (!Directory.Exists(targetMelodarrPath) && Directory.Exists(legacyLidarrPath))
            {
                try
                {
                    Logger.Info("Attempting to migrate legacy Lidarr config folder to Melodarr...");
                    Directory.Move(legacyLidarrPath, targetMelodarrPath);
                    Logger.Info("Successfully migrated legacy folder to: {0}", targetMelodarrPath);
                    return targetMelodarrPath;
                }
                catch (Exception ex)
                {
                    Logger.Warn(ex, "Could not rename legacy Lidarr folder to Melodarr. Falling back to using legacy path.");
                    return legacyLidarrPath; // Fallback to ensure we don't break install
                }
            }

            return targetMelodarrPath;
        }

        private void MigrateLegacyDatabase(string resolvedAppDataFolder)
        {
            if (!Directory.Exists(resolvedAppDataFolder))
            {
                return;
            }

            var melodarrDbPath = Path.Combine(resolvedAppDataFolder, "melodarr.db");
            var lidarrDbPath = Path.Combine(resolvedAppDataFolder, "lidarr.db");

            if (!File.Exists(melodarrDbPath) && File.Exists(lidarrDbPath))
            {
                try
                {
                    Logger.Info("Found legacy lidarr.db in AppData. Migrating database names to melodarr.db...");

                    var legacyFiles = new[] { "", "-journal", "-shm", "-wal" };
                    foreach (var ext in legacyFiles)
                    {
                        var source = Path.Combine(resolvedAppDataFolder, $"lidarr.db{ext}");
                        var target = Path.Combine(resolvedAppDataFolder, $"melodarr.db{ext}");
                        if (File.Exists(source))
                        {
                            File.Move(source, target);
                        }
                    }

                    Logger.Info("Database names successfully migrated.");
                }
                catch (Exception ex)
                {
                    Logger.Warn(ex, "Failed to migrate legacy lidarr.db name. Manual intervention may be required.");
                }
            }
        }
    }
}

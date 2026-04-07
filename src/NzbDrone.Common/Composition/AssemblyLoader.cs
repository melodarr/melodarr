using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.Loader;
using NzbDrone.Common.EnvironmentInfo;

namespace NzbDrone.Common.Composition
{
    public static class AssemblyLoader
    {
        private static readonly string[] BaseAssemblies =
        {
            "Melodarr.Host",
            "Melodarr.Core",
            "Melodarr.SignalR",
            "Melodarr.Api.V1",
            "Melodarr.Http"
        };

        private static readonly string[] UpdateAssemblies = { "Melodarr.Update" };

        static AssemblyLoader()
        {
            AppDomain.CurrentDomain.AssemblyResolve += new ResolveEventHandler(ContainerResolveEventHandler);
            RegisterSQLiteResolver();
        }

        public static List<Assembly> LoadBaseAssemblies()
        {
            return Load(BaseAssemblies);
        }

        public static List<Assembly> LoadUpdateAssemblies()
        {
            return Load(UpdateAssemblies);
        }

        private static List<Assembly> Load(IList<string> assemblies)
        {
            var toLoad = assemblies.ToList();
            toLoad.Add("Melodarr.Common");

            var platformAssembly = OsInfo.IsWindows ? "Melodarr.Windows" : "Melodarr.Mono";

            var startupPath = AppDomain.CurrentDomain.BaseDirectory;

            var loaded = toLoad
                .Select(x => AssemblyLoadContext.Default.LoadFromAssemblyPath(Path.Combine(startupPath, $"{x}.dll")))
                .ToList();

            var platformPath = Path.Combine(startupPath, $"{platformAssembly}.dll");
            if (File.Exists(platformPath))
            {
                loaded.Add(AssemblyLoadContext.Default.LoadFromAssemblyPath(platformPath));
            }

            return loaded;
        }

        private static Assembly ContainerResolveEventHandler(object sender, ResolveEventArgs args)
        {
            var resolver = new AssemblyDependencyResolver(args.RequestingAssembly.Location);
            var assemblyPath = resolver.ResolveAssemblyToPath(new AssemblyName(args.Name));

            if (assemblyPath == null)
            {
                return null;
            }

            return AssemblyLoadContext.Default.LoadFromAssemblyPath(assemblyPath);
        }

        public static void RegisterSQLiteResolver()
        {
            var sqliteAssembly = AssemblyLoadContext.Default.LoadFromAssemblyPath(
                Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "System.Data.SQLite.dll"));

            try
            {
                NativeLibrary.SetDllImportResolver(sqliteAssembly, LoadSqliteNativeLib);
            }
            catch (InvalidOperationException)
            {
            }
        }

        private static IntPtr LoadSqliteNativeLib(string libraryName, Assembly assembly, DllImportSearchPath? dllImportSearchPath)
        {
            Console.WriteLine($"[ASSEMBLY LOADER] Requested libraryName: {libraryName}");

            if (OsInfo.IsLinux && libraryName == "sqlite3")
            {
                return NativeLibrary.Load("libsqlite3.so.0", assembly, dllImportSearchPath);
            }

            if (OsInfo.IsOsx && libraryName.Contains("SQLite", StringComparison.OrdinalIgnoreCase))
            {
                if (NativeLibrary.TryLoad("libsqlite3.dylib", assembly, dllImportSearchPath, out var handle))
                {
                    Console.WriteLine("[ASSEMBLY LOADER] Successfully loaded libsqlite3.dylib!");
                    return handle;
                }
            }

            return NativeLibrary.Load(libraryName, assembly, dllImportSearchPath);
        }
    }
}

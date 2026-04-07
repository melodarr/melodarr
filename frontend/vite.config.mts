import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

export default defineConfig({
  root: ".", // because package.json script runs "vite build frontend --config frontend/vite.config.ts" which sets cwd to frontend.
  build: {
    outDir: "../_output/UI",
    emptyOutDir: false,
    target: "esnext",
    commonjsOptions: {
      include: [/node_modules/, /src\/Styles\/Variables\/.+\.js$/]
    }
  },
  resolve: {
    alias: {
      "jquery": "jquery/dist/jquery.min",
      "react-middle-truncate": "react-middle-truncate/lib/react-middle-truncate",
      "Activity": path.resolve(__dirname, "./src/Activity"),
      "AddArtist": path.resolve(__dirname, "./src/AddArtist"),
      "Album": path.resolve(__dirname, "./src/Album"),
      "App": path.resolve(__dirname, "./src/App"),
      "Artist": path.resolve(__dirname, "./src/Artist"),
      "Calendar": path.resolve(__dirname, "./src/Calendar"),
      "Commands": path.resolve(__dirname, "./src/Commands"),
      "Components": path.resolve(__dirname, "./src/Components"),
      "Content": path.resolve(__dirname, "./src/Content"),
      "Diag": path.resolve(__dirname, "./src/Diag"),
      "FirstRun": path.resolve(__dirname, "./src/FirstRun"),
      "Helpers": path.resolve(__dirname, "./src/Helpers"),
      "InteractiveImport": path.resolve(__dirname, "./src/InteractiveImport"),
      "InteractiveSearch": path.resolve(__dirname, "./src/InteractiveSearch"),
      "Organize": path.resolve(__dirname, "./src/Organize"),
      "Parse": path.resolve(__dirname, "./src/Parse"),
      "Quality": path.resolve(__dirname, "./src/Quality"),
      "Retag": path.resolve(__dirname, "./src/Retag"),
      "Search": path.resolve(__dirname, "./src/Search"),
      "Settings": path.resolve(__dirname, "./src/Settings"),
      "Shared": path.resolve(__dirname, "./src/Shared"),
      "Store": path.resolve(__dirname, "./src/Store"),
      "Styles": path.resolve(__dirname, "./src/Styles"),
      "System": path.resolve(__dirname, "./src/System"),
      "Track": path.resolve(__dirname, "./src/Track"),
      "TrackFile": path.resolve(__dirname, "./src/TrackFile"),
      "UnmappedFiles": path.resolve(__dirname, "./src/UnmappedFiles"),
      "Utilities": path.resolve(__dirname, "./src/Utilities"),
      "Wanted": path.resolve(__dirname, "./src/Wanted"),
      "typings": path.resolve(__dirname, "./src/typings")
    }
  },
  plugins: [
    react(),
    {
      name: 'cjs-variables',
      enforce: 'pre',
      transform(code, id) {
        if (id.includes('Styles/Variables') && id.endsWith('.js')) {
          return {
            code: code.replace('module.exports =', 'export default'),
            map: null
          };
        }
      }
    },
    viteStaticCopy({
      targets: [
        { src: "src/Content/Fonts/*.*", dest: "Content/Fonts" },
        { src: "src/Content/Images/Icons/*.*", dest: "Content/Images/Icons" },
        { src: "src/Content/Images/*.*", dest: "Content/Images" },
        { src: "src/Content/robots.txt", dest: "Content" },
        { src: "src/Content/manifest.json", dest: "Content" },
        { src: "src/Content/browserconfig.xml", dest: "Content" }
      ]
    })
  ]
});

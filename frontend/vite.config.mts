import { defineConfig, createLogger } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

const customLogger = createLogger();
const originalWarn = customLogger.warn;
customLogger.warn = (msg, options) => {
  if (msg.includes("doesn't exist at build time, it will remain unchanged to be resolved at runtime")) {
    return;
  }
  originalWarn(msg, options);
};

export default defineConfig({
  customLogger,
  root: ".", // because package.json script runs "vite build frontend --config frontend/vite.config.ts" which sets cwd to frontend.
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "esnext",
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // React core + DOM
          if (id.includes('/react-dom/') || id.includes('/react/')) {
            return 'vendor-react';
          }
          // State management
          if (id.includes('/redux/') || id.includes('/react-redux/') ||
              id.includes('/redux-thunk/') || id.includes('/reselect/')) {
            return 'vendor-state';
          }
          // Routing
          if (id.includes('/react-router/') || id.includes('/react-router-dom/')) {
            return 'vendor-router';
          }
          // SignalR real-time
          if (id.includes('/@microsoft/signalr/')) {
            return 'vendor-signalr';
          }
          // Heavy utilities
          if (id.includes('/lodash/') || id.includes('/moment/') || id.includes('/jquery/')) {
            return 'vendor-utils';
          }
          // Virtualized rendering
          if (id.includes('/react-virtualized/')) {
            return 'vendor-table';
          }
          // Drag and drop
          if (id.includes('/react-dnd/') || id.includes('/react-dnd-html5-backend/') ||
              id.includes('/dnd-core/')) {
            return 'vendor-dnd';
          }
        }
      },
      // Suppress known benign warnings from third-party packages
      onwarn(warning, defaultHandler) {
        // SignalR: misplaced /*#__PURE__*/ annotations
        if (warning.code === 'INVALID_ANNOTATION' && warning.id?.includes('signalr')) return;
        // react-virtualized: stale flow-type proptype export
        if (warning.code === 'MISSING_EXPORT' && warning.id?.includes('react-virtualized')) return;
        defaultHandler(warning);
      }
    },
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
        { src: "src/Content/browserconfig.xml", dest: "Content" },
        { src: "login.html", dest: "." },
        { src: "oauth.html", dest: "." }
      ]
    })
  ]
});

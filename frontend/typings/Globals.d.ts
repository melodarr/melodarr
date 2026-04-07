declare module '*.module.css';

interface Window {
  Melodarr: {
    apiKey: string;
    instanceName: string;
    theme: string;
    urlBase: string;
    version: string;
    isProduction: boolean;
  };
  Lidarr: Window['Melodarr'];
}

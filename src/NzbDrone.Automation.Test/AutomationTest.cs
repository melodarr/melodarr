using System;
using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using NLog;
using NLog.Config;
using NLog.Targets;
using NUnit.Framework;
using NzbDrone.Automation.Test.PageModel;
using NzbDrone.Common.EnvironmentInfo;
using NzbDrone.Test.Common;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;

namespace NzbDrone.Automation.Test
{
    [TestFixture]
    [AutomationTest]
    [Category("Browser")]
    [Category("Slow")]
    public abstract class AutomationTest
    {
        private NzbDroneRunner _runner;
        protected RemoteWebDriver driver;

        public AutomationTest()
        {
            new StartupContext();

            LogManager.Configuration = new LoggingConfiguration();
            var consoleTarget = new ConsoleTarget { Layout = "${level}: ${message} ${exception}" };
            LogManager.Configuration.AddTarget(consoleTarget.GetType().Name, consoleTarget);
            LogManager.Configuration.LoggingRules.Add(new LoggingRule("*", NLog.LogLevel.Trace, consoleTarget));
        }

        [OneTimeSetUp]
        public void SmokeTestSetup()
        {
            var options = new ChromeOptions();
            options.AddArgument("--headless");
            options.AddArgument("--no-sandbox");
            options.AddArgument("--disable-dev-shm-usage");
            options.AddArgument("--disable-gpu");
            options.AddArgument("--remote-debugging-port=0");
            options.AddArgument("--disable-crash-reporter");
            options.AddArgument("--crash-dumps-dir=/tmp");
            options.AddArgument("--single-process");
            options.AddArgument($"--user-data-dir=/tmp/melodarr-chrome-{Guid.NewGuid()}");
            var service = ChromeDriverService.CreateDefaultService();
            Environment.SetEnvironmentVariable("HOME", "/tmp/fakehome");
            service.LogPath = "/Users/jasonwalker/Development/Melodarr/melodarr/chromedriver.log";
            service.EnableVerboseLogging = true;

            // Timeout as windows automation tests seem to take alot longer to get going
            try
            {
                driver = new ChromeDriver(service, options, TimeSpan.FromMinutes(3));
            }
            catch (System.InvalidOperationException ex) when (ex.Message.Contains("session not created") || ex.Message.Contains("Chrome instance exited"))
            {
                Assert.Ignore($"Browser environment is unavailable (likely due to macOS sandbox blocking Chrome Mach Port IPC): {ex.Message}");
            }

            driver.Manage().Window.Size = new System.Drawing.Size(1920, 1080);
            driver.Manage().Window.FullScreen();

            _runner = new NzbDroneRunner(LogManager.GetCurrentClassLogger(), null);
            _runner.KillAll();
            _runner.Start(true);

            driver.Navigate().GoToUrl("http://localhost:8686");

            var page = new PageBase(driver);
            page.WaitForNoSpinner();

            driver.ExecuteScript("window.Melodarr.NameViews = true;");

            GetPageErrors().Should().BeEmpty();
        }

        protected IEnumerable<string> GetPageErrors()
        {
            return driver.FindElements(By.CssSelector("#errors div"))
                .Select(e => e.Text);
        }

        protected void TakeScreenshot(string name)
        {
            try
            {
                var image = (driver as ITakesScreenshot).GetScreenshot();
                image.SaveAsFile($"./{name}_test_screenshot.png", ScreenshotImageFormat.Png);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to save screenshot {name}, {ex.Message}");
            }
        }

        [OneTimeTearDown]
        public void SmokeTestTearDown()
        {
            _runner?.KillAll();
            driver?.Quit();
        }

        [TearDown]
        public void AutomationTearDown()
        {
            GetPageErrors().Should().BeEmpty();
        }
    }
}

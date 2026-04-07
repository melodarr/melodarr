FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Install NodeJS and Yarn for the frontend build
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update && apt-get install -y nodejs \
    && npm install -g yarn

# Copy source and build
COPY . .
RUN rm -f global.json
RUN ./build.sh --backend --frontend --packages -f net8.0 -r linux-x64

# Package the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# The build.sh script outputs to _artifacts/net8.0/linux-x64/Lidarr (the output dir still uses the Lidarr name during the packaging phase)
COPY --from=build /source/_artifacts/linux-x64/net8.0/Lidarr/ /app/

# Expose standard port and set data directory mount point
EXPOSE 8686
VOLUME /config

ENTRYPOINT ["dotnet", "Melodarr.dll", "-nobrowser", "-data=/config"]

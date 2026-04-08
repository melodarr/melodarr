FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /source

# Install NodeJS and Yarn for the frontend build
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update && apt-get install -y nodejs \
    && corepack enable

# Copy source and build
COPY . .
RUN rm -f global.json
RUN ./build.sh --backend --frontend --packages -f net10.0 -r linux-x64

# Package the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

# The build.sh script outputs to _artifacts/net10.0/linux-x64/Melodarr
COPY --from=build /source/_artifacts/linux-x64/net10.0/Melodarr/ /app/

# Expose standard port and set data directory mount point
EXPOSE 8687
VOLUME /config

ENTRYPOINT ["dotnet", "Melodarr.dll", "-nobrowser", "-data=/config"]

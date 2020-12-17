# Intro
This Repo is telco-sandbox(SMS, VoiceOTP, Vericall, EmailOTP) APIs for API Marketplace https://developer.thebigbox.id

# Run on Production
## Deploy using docker Image
Using docker image from docker repository:
```shell
$ docker run -d -p 80:80 oeoen/thebigbox-api-telco-sandbox
```
to deploy production mode on docker:
```shell
$ cd /path/to/this/repo/misc/docker
$ docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d
```

# Run Development mode
```shell
$ cd /path/to/this/repo/misc/docker
$ docker-compose up -d
```
HTTP Proxy configuration for browser/network to localhost:82, and open in your browser https://telco-sandbox.internal

# Environment Variables
| Variables   |      Values      |  Description |
|----------|:-------------:|------:|
| DSN |  default: `in-memory` or **redis-connection-string**| Database connection, use `in-memory` or redis connection string |
| LISTEN_PORT |    default `0.0.0.0`   |   Listen host for running this application |
| LISTEN_HOST | default `80` |    Listen PORT for running this application |
| DEFAULT_SENDER | default `TELKOM` |    Default SENDER ID for SMS APIs Sandbox |
    

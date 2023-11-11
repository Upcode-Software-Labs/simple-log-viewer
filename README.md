# Minimalist Log Viewer UI

A minimalist log viewer for reduced network footprint.

### Benefits

- Easy to install
- Simple UI to see desired logs
- Minimal CPU/Memory footprints in the server
- On-demand usage

## How to run in local

### Set environment variables

`export SIMPLE_LOG_UI_LOG_FILE_PATH=/tmp/logs/test.log`

`export SIMPLE_LOG_UI_PORT=3000`

### Start the server

`npm start`

### Access the UI

Browse `http://localhost:3000/`

## How to run in server

### Set environment variables

`export SIMPLE_LOG_UI_LOG_FILE_PATH=<path to read the file>`

`export SIMPLE_LOG_UI_PORT=<port>`

### Install the package

`npm install -g minimalist-log-viewer`

### Access the UI

Browse `http://<server-ip>:<port>/` if you have exposed the port <port> to the world.
Map the domain and do a proper reverse proxy configuration.

- [Apache httpd](https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html)
- [Nginx](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

### How to run as a Daemon with PM2

#### Install PM2

- Follow [Install PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) or else `npm install pm2@latest -g` in short.
- Create a file `ecosystem.config.js` inside the server at a suitable location
- Set the environmental varibales inside `ecosystem.config.js`

  ```
    module.exports = {
        apps : [
            {
                name: "minimalist-log-viewer",
                script: "minimalist-log-viewer",
                watch: true,
                env: {
                    "SIMPLE_LOG_UI_LOG_FILE_PATH": "<Path to your file>",
                    "SIMPLE_LOG_UI_PORT": <port>,
                    }
            }
        ]
    }
  ```

  Modify the values according to your need.

  example:

  ```
   module.exports = {
       apps : [
           {
               name: "minimalist-log-viewer",
               script: "minimalist-log-viewer",
               watch: true,
               env: {
                   "SIMPLE_LOG_UI_LOG_FILE_PATH": "/var/logs/tomcat/temp/spring.log",
                   "SIMPLE_LOG_UI_PORT": 3000,
                   }
           }
       ]
   }
  ```

- `pm2 start minimalist-log-viewer --env ecosystem.config.js`
- Verify with `pm2 info minimalist-log-viewer`

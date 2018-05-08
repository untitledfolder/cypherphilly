# Default Configuration Files

Here are some basic configuration files for several of the services use in
`CypherPhilly`. These can help get an environment setup quickly.

## Back-end

### Ubuntu systemd

Ubuntu's `systemd` is the service Ubuntu uses to manage `daemon`s. By running
the back-end as a server `daemon`, it becomes much easier to handle server
restarts and logging.

The example file is:

`cypherphilly.service`

The file goes in this directory:

`/lib/systemd/system/`

After setting it up to run your server and have updated to the proper port, run
this to always start the service during boot-up: 

`sudo systemctl enable myforever.service`

Once you've got this complete, run this to update `systemd`:

`sudo systemctl daemon-reload`

### NGINX

There is a default configuration for hosting via NGINX as well. Just set `root`
to where the front-end code is located, set the `server_name` to what you are
hosting this as (or nothing for just the IP), and set the `proxy_pass` to the
host/port info for your back-end.

Example configuration file:

`cypherphilly-nginx`

## Database

There are instructions for installing `neo4j` in the install directory. There
is an example configuration file, which essentially just sets the broadcast to
`0.0.0.0` so that it runs outside of `localhost`.

Example configuration file:

`neo4j.conf`

# Setting Up Neo4j

This assumes you are setting up `Neo4j` on an Ubuntu server.

I'm ignoring SSL and security for this....

## Setup Java

```
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update

sudo apt-get install oracle-java8-installer
```

## Setup Neo4j

```
wget -O - https://debian.neo4j.org/neotechnology.gpg.key | sudo apt-key add -
echo 'deb http://debian.neo4j.org/repo stable/' | sudo tee -a /etc/apt/sources.list.d/neo4j.list
sudo apt-get update

sudo apt-get install neo4j=3.3.1
```

## Configure Neo4j

```
sudo vim /etc/neo4j/neo4j.conf
```

Uncomment/Update:

```
...
dbms.connectors.default_listen_address=0.0.0.0
...
dbms.connector.bolt.listen_address=0.0.0.0:7687
...
dbms.connector.http.listen_address=0.0.0.0:7474
```

## Starting Neo4j

```
sudo service neo4j start
```

## Setup NodeJS

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
nvm install node
```

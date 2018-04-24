#!/bin/bash

echo "Setting up Neo4j"
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
wget -O - https://debian.neo4j.org/neotechnology.gpg.key | sudo apt-key add -

echo 'deb http://debian.neo4j.org/repo stable/' | sudo tee -a /etc/apt/sources.list.d/neo4j.list

sudo apt-get update
sudo apt-get install neo4j=3.3.1

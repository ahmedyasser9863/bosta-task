#!/bin/bash

# Install PostgreSQL
sudo apt update
sudo apt install -y postgresql postgresql-contrib

# Set password for the default user
sudo -u postgres psql -c "ALTER USER postgres PASSWORD $password;"

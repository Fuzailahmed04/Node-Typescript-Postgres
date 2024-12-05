#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Enable debug mode if DEBUG is set to true
if [ "$DEBUG" = "true" ]; then
    set -x
fi

# Load environment variables from the .env file if it exists
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "No .env file found. Please create one."
    exit 1
fi

# Start the Docker Compose services in detached mode
docker-compose up -d



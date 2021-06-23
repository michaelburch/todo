#!/bin/sh
set -eu

envsubst '${API_URL}' < /etc/nginx/conf.d/app.conf > /etc/nginx/nginx.conf

exec "$@"
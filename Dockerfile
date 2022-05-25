FROM kong:latest

USER root
RUN apk add --update nodejs npm python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install --unsafe -g kong-pdk@0.5.3
COPY js-plugins /usr/local/kong/js-plugins
COPY kong.yml /kong.yml

EXPOSE 8000

ENV KONG_DATABASE=off
ENV KONG_DECLARATIVE_CONFIG=/kong.yml
ENV KONG_PROXY_ACCESS_LOG=/dev/stdout
ENV KONG_PROXY_ERROR_LOG=/dev/stderr

ENV KONG_PLUGINSERVER_NAMES=js
ENV KONG_PLUGINSERVER_JS_SOCKET=/usr/local/kong/js_pluginserver.sock
ENV KONG_PLUGINSERVER_JS_START_CMD="/usr/bin/kong-js-pluginserver -v --plugins-directory /usr/local/kong/js-plugins"
ENV KONG_PLUGINSERVER_JS_QUERY_CMD="/usr/bin/kong-js-pluginserver --plugins-directory /usr/local/kong/js-plugins --dump-all-plugins"

ENV KONG_PLUGINS=bundled,jwt-to-headers,filter-list,jwt-claim-sub-split

ENV KONG_LOG_LEVEL=debug

USER kong

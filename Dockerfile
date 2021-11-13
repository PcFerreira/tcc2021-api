FROM netdata/netdata
ARG netdataconfig:/etc/netdata
ARG netdatalib:/var/lib/netdata
ARG netdatacache:/var/cache/netdata
ARG /etc/passwd:/host/etc/passwd:ro
ARG /etc/group:/host/etc/group:ro
ARG /proc:/host/proc:ro
ARG /sys:/host/sys:ro
ARG /etc/os-release:/host/etc/os-release:ro

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./


RUN apk add --update npm

RUN npm install

# Bundle app source
COPY . .

EXPOSE 19999 3000

RUN ["chmod", "+x", "start.sh"]
ENTRYPOINT ["/usr/src/app/start.sh"]


#CMD [ "node", "server.js" ]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
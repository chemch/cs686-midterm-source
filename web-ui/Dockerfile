# base image
FROM node:20

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy app
COPY . .

# build app
RUN npm run build

# set and expose port
EXPOSE 6666

# start app
CMD ["npm", "run", "start"]
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

# set and expose port
ENV PORT=4444
EXPOSE 4444
ENV HOST=localhost

# Copy the wait-for-it script
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

CMD ["npm", "run", "start"]

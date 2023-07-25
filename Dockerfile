# Stage 1: Build the application
FROM node:18.16.0-alpine as base

# Add package file
COPY package.json ./

# Install deps
RUN npm install

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Build dist
RUN npm run build

# Stage 2: Start production image build
FROM node:18.16.0-alpine

# Copy node modules and build directory from the first stage
COPY --from=base ./node_modules ./node_modules
COPY --from=base /dist /dist

# Add wait-for-it.sh to the image
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Install bash (needed for wait-for-it.sh)
RUN apk add --no-cache bash

# Set the wait-for-it script as an entrypoint
ENTRYPOINT ["/usr/src/app/wait-for-it.sh", "db:5432", "--", "node", "dist/server.js"]

# Run migrations after container starts
CMD ["npm", "run", "typeorm:generate-migration", "--name=create_tables", "&&", "npm", "run", "typeorm:run"]

# Expose port 3003
EXPOSE 3003

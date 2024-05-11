FROM node:16-alpine as base

ENV WEB_APP_DIR=/app

WORKDIR $WEB_APP_DIR

# Add package files
COPY package.json $WEB_APP_DIR
COPY yarn.lock $WEB_APP_DIR

# Install dependencies
RUN yarn install

# Copy source files
COPY prisma/ $WEB_APP_DIR/prisma
COPY protos/ $WEB_APP_DIR/protos
COPY scripts/ $WEB_APP_DIR/scripts
COPY src/ $WEB_APP_DIR/src
COPY tsconfig.json $WEB_APP_DIR

# Generate prisma files
RUN yarn generate

# Build dist
RUN chmod +x ./scripts/build_grpc_client_js.sh
RUN sed -i 's/\r$//' ./scripts/build_grpc_client_js.sh
RUN yarn tsc
RUN ./scripts/build_grpc_client_js.sh
RUN yarn build:paths

# Start production image build
FROM node:20.11.1-alpine

ENV WEB_APP_DIR=/app

WORKDIR $WEB_APP_DIR

# Copy node modules and build directory
COPY --from=base $WEB_APP_DIR/node_modules $WEB_APP_DIR/node_modules
COPY --from=base $WEB_APP_DIR/dist $WEB_APP_DIR/dist
COPY --from=base $WEB_APP_DIR/prisma $WEB_APP_DIR/prisma
COPY docker/app/start.sh $WEB_APP_DIR

# Install netcat
RUN apk update
RUN apk add netcat-openbsd
RUN chmod a+x start.sh
RUN sed -i 's/\r$//' start.sh

CMD ./start.sh
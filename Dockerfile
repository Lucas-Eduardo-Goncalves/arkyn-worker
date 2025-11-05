# Adjust BUN 
FROM oven/bun:latest AS base

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Copy application code
COPY --link . .

# Install node modules
COPY --link bun.lock package.json ./
RUN bun install --ci

# Final stage for app image
FROM base

# Install Openssl
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists/*

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000

CMD [ "bun", "run", "start" ]

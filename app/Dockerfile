FROM oven/bun:1
# important : install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --chown=bun:bun package.json bun.lock* ./
RUN bun install --frozen-lockfile
COPY --chown=bun:bun . .
USER bun
EXPOSE 3000
CMD ["bun", "run", "dev"]

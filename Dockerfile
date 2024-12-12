FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS prod

WORKDIR /app
COPY pnpm-lock.yaml .
RUN pnpm fetch --prod

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Expose the port on which the app will run
EXPOSE 8000

# Start the server using the production build
CMD ["pnpm", "run", "start:prod"]

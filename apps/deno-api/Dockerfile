#TODO: FIX THIS TO WORK IN THE MONOREPO CONTEXT

FROM denoland/deno:latest
EXPOSE 8000
WORKDIR /app
COPY . .
CMD ["run", "--allow-net", "--allow-read", "--allow-write", "server.ts"]
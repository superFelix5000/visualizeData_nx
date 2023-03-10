FROM denoland/deno:latest
EXPOSE 8000
COPY ./controllers controllers
COPY ./src src
CMD ["run", "--allow-net", "--allow-read", "--allow-write", "src/main.ts"]
### Web demo

This is a web project based on Django, React, RabbitMQ and Websockets in Dockerized environment.

It demonstrates following capabilities:
- Student list management,
- Avatar upload,
- Real-time notifications.

#### Quick start

Install Docker, Docker-compose and run

```bash
docker-compose build
docker-compose up -d
```
Then check out http://127.0.0.1 in your browser:

<img src="res/main_screen.png" alt="drawing" width="800"/>

#### Developer mode

Install NodeJS, Python, Django, then start developemnt environment via:

```bash
docker-compose -f dev.docker-compose.yml build
docker-compose -f dev.docker-compose.yml up -d
./start-dev.sh
```
Then check out http://127.0.0.1 in your browser.

All logs will be streamed to:
- log_server.log for Django,
- log_worker.log for Worker,
- log_react.log for React webpack,
- log_socket.log for Node.js.

To stop development environment run:
```bash
./stop-dev.sh
```

<img src="res/arch_prod.png" alt="drawing" width="600"/>

<img src="res/arch_dev.png" alt="drawing" width="600"/>

You are free to use it for your own projects, contributions are welcome!

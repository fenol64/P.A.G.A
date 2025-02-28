COMMAND = docker compose -f ./infra/docker-compose.yml

all: dup

dup:
	$(COMMAND) up --build

down:
	$(COMMAND) down

service:
	$(COMMAND) up $(service) --build

logs:
	$(COMMAND) logs -f $(service)

exec:
	$(COMMAND) exec $(service) bash

rmAll:
	docker container rm $(shell docker container ls -aq)
	docker image rm $(shell docker image ls -aq)
	docker volume rm $(shell docker volume ls -q)


re: down dup

me: down up

.PHONY: all dup down service logs exec
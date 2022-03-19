build:
	docker-compose -f docker-compose.base.yml -f docker-compose.dev.yml build
up:
	docker-compose -f docker-compose.base.yml -f docker-compose.dev.yml up
build-prod:
	docker-compose -f docker-compose.base.yml -f docker-compose.prod.yml build
up-prod:
	docker-compose -f docker-compose.base.yml -f docker-compose.prod.yml up --build
down:
	docker-compose down

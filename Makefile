run:
	cd prime-generator
	npm start

gadd:
	git add *

build:
	cd prime-generator
	npm run build

deploy:
	cd prime-generator
	npm run deploy

PushToRepo:
	git push -u origin master

PullMasterFromRepo:
	git pull https://github.com/Steven113/Prime-Sieve-Generation-React.git master

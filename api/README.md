# API

RESTful API and MySQL database for the React App.

Initially, it will be de

### Generating React Page 

```shell
node bin/generate-page.js "house.json" "House" "House"    
```

### Generating SQL for words table using json file

```shell
node bin/generate-words-sql.js "basic-phrases.json" 
```

### Spinning up Docker containers

```shell
docker compose -p vietnamese up -d
```

### Spinning down Docker containers 

```shell
docker compose -p vietnamese down
```

### SSH into container

```shell
docker compose -p vietnamese exec api bash
```

### MySQL via container

```shell
mysql -u root -ppassword -h mysql_vi
```

### Rebuild MySQL

```shell
npm run rebuild-db
```
# API

A RESTful API for the Vietnamese language as well as an adhoc set of commands to help generate resources

This will be a simple, light-weight SaaS product for Vietnamese language teachers and their students.

It will provide a white-label turn-key solution as well as support layered customisations.  That is, teacher will be able to customise their resources and apply their own branding.

## Features

- A white-label, unbranded version that can be branded, personalised by teachers
- A turn-key solution that is ready out-of-the-box
- Text-To-Speech tool to provide example pronunciation
- Speech-To-Text tool to validate user pronunciation
- Customisable chatbot to answer language-related questions for students
- Interactive games and quizzes for students
- Lessons covering all levels of learning

## Pricing

- Free service with limited functionality (adverts)
- Paid service that can be branded and personalised by teachers (advert-free)
- Cancellation at any time

Pricing will be based by seats, starting with 1-5 seats.




## Adhoc commands

### Generating React Page 

```shell
node bin/generate-page.js "house.json" "House" "House"    
```

### Generating SQL for words table using json file

```shell
node bin/generate-words-sql.js "basic-phrases.json" 
```


## Docker

### Spinning up Docker container and rebuilding it

```shell
docker compose -p vietnamese up -d --build
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








## Building the Dictionary step by step

Okay, we start with a txt file called ```word-dictionary.txt``` with approx 4,000 English words.

We want to turn this into structured JSON and then direct the output to a new file called ```word-dictionary.json```.

```shell
node parse-word-dictionary-txt.js > word-dictionary.json
```

We now want to cycle through ```word-dictionary.json``` and get the Vietnamese translation for each word.

We do this and then direct the output to a new file called ```word-dictionary-with-translations.json```.

This will take approx 10-15 mins to complete, depending on your local environment.

```shell
node parse-word-dictionary-json.js > word-dictionary-with-translations.json
```
Now we want to cycle through ```word-dictionary-with-translations.json``` and get the phonetic spellings for each translation.

We do this and the direct the output to a new file called ```word-dictionary-with-translations-and-phonetic-spellings.json```

This will take approx 10-15 mins to complete, depending on your local environment.

```shell
node node parse-word-dictionary-json-adding-phonetic-spelling.js > word-dictionary-with-translations-and-phonetic-spellings.json
```
# API

There will be a database storing translations for UI / UX, words (a Vietnamese - English dictionary featuring audio) et al.

### Generating React Page 

```shell
node bin/generate-page.js "house.json" "House" "House"    
```

### Generating SQL for words table using json file

```shell
node bin/generate-words-sql.js "basic-phrases.json" 
```
# boo-backend-api
Test asignation for boo backend position, made with nodejs, using jest for testing.

To run the project run ```yarn``` to install needed packages, then run yarn dev to start nodemon server

If you prefer, you can create a .env file containing the variables ```PORT``` and ```MONGOPORT``` otherwise the project will run on port 3000 and mongo with the 27017 by default.



*** CURL for get profile with id ***

curl --location 'localhost:3001/:profileId'

*** CURL for get profile without id ***
this gets the mocked user given at the beggining

curl --location 'localhost:3001/'


*** CURL for the profile post ***
To post a new profile the only required field is name

curl --location 'localhost:3001/' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Miguel Ortiz",
    "description": "I'\''m Miguel a cat owner",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png"
  }'
  
*** CURL to get comments ***
This get all the comments stored on the database, it allows filter and sort from queryParam

filter = "mbti" | "enneagram" | "zodiac" ; other string will be taking as a empty filter

sort = "recent" | "best"

curl --location 'localhost:3001/comments?filter=mbti&sort=best'

*** CURL to get comments from a profile ***
This get all the comments made about a profile, allows filter and sort the same way that the previous get

curl --location 'localhost:3001/comments/:profileId?filter=mbti&sort=best'

*** CURL to add a comment  ***
This add a comment, it can be about a profile or just a simple comment, if it has commentedUser on the body then the comment is about a profile, the fields mbti, enneagram and zodiac are for the voting option mentioned on the figma. A comment needs to have a title, description and id of the user that is making the comment

curl --location 'localhost:3001/comments/' \
--header 'Content-Type: application/json' \
--data '{
    "title": "INTP",
    "description": "He is an INTP",
    "userId": "1",
    "commentedUser": 999,
    "mbti": "INFP",
    "enneagram": "2w3",
    "zodiac": "Leo"
}'

*** CURL to add a like to a comment ***
This adds a like to the comment provided

curl --location --request POST 'localhost:3001/comments/:commentId/like'

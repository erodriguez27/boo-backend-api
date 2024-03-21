# boo-backend-api


*** CURL for get with id ***

curl --location 'localhost:3001/0'

*** CURL for get without id ***

curl --location 'localhost:3001/'


*** CURL for the post ***

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
  

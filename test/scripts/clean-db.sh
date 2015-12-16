#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name."
  exit 1
fi

mongoimport --jsonArray --drop --db $1 --collection users --file /Users/michaelrichter/homework/25reddittdd/test/db/users.json
mongoimport --jsonArray --drop --db $1 --collection posts --file /Users/michaelrichter/homework/25reddittdd/test/db/posts.json

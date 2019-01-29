#!/bin/bash

POST_URL=$1
POST_FILE=_posts/medium_post.md

echo "Exporting post from $POST_URL"

cat > $POST_FILE <<EOL
---
layout: blog
category: blog
title: TITLE
description: >
  TODO DESCRIPTION
---
EOL

mediumexporter -H $POST_URL >> $POST_FILE
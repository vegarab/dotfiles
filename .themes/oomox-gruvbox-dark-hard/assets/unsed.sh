#!/bin/sh
sed -i \
         -e 's/rgb(0%,0%,0%)/#d5c4a1/g' \
         -e 's/rgb(100%,100%,100%)/#1d2021/g' \
    -e 's/rgb(50%,0%,0%)/#bdae93/g' \
     -e 's/rgb(0%,50%,0%)/#83a598/g' \
 -e 's/rgb(0%,50.196078%,0%)/#83a598/g' \
     -e 's/rgb(50%,0%,50%)/#ebdbb2/g' \
 -e 's/rgb(50.196078%,0%,50.196078%)/#ebdbb2/g' \
     -e 's/rgb(0%,0%,50%)/#3c3836/g' \
	"$@"

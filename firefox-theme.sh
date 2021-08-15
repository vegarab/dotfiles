#!/bin/bash
NAME=$(whoami)
firefox -CreateProfile $NAME

if [ ! -f "/home/$NAME/dotfiles/userChrome.css" ]; then
	cd /home/$NAME/dotfiles/
	wget https://raw.githubusercontent.com/vegarab/dotfiles/master/userChrome.css
fi

cd /home/$NAME/.mozilla/firefox/*.default/

if [ ! -d "chrome" ]; then
	mkdir chrome
fi

P1=$(pwd)
sudo ln -s /home/$NAME/dotfiles/userChrome.css $P1/chrome/userChrome.css

cd chrome
var="@import url(\"file:///home/$NAME/.themes/colors.css\");"
sed -i "1s~.*~$var~g" userChrome.css

kill firefox

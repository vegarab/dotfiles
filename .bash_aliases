# personal aliases

alias venv='source venv/bin/activate'

alias sshagent25='ssh agent25@agent25.tinusf.com'

# Google Calendar
alias gc='gcalcli'
alias gcw='gcalcli calw'
alias gcm='gcalcli calm'
alias iccube-run='sudo bash /opt/icCube/bin/icCube.sh'

alias iccube-server='bash /opt/icCube/bin/icCube.sh'

#alias packer='packer-aur'
# bash
alias brc='v ~/.bashrc'
alias bra='v ~/.bash_aliases'

# vim
alias v='vim'
alias vrc='vim ~/.vimrc'

# i3con
alias i3conf='vim ~/.config/i3/config'

# navigate in dev
alias dev='cd ~/dev/'
alias web='cd ~/dev/web'
alias pyth='cd ~/dev/python'
alias jva='cd ~/dev/java'

alias algdat='cd ~/dev/python/tdt4120/'
alias webtek='cd ~/dev/web/it2805/'
alias dprim='cd ~/dev/python/daraprim/'
alias datdig='cd ~/dev/assembly/tdt4160/'

alias dprim='cd ~/dev/python/daraprim/'
alias havam='cd ~/dev/web/it2805/havam/'

# acs
alias cls='clear'

# network-manager
alias rN='sudo systemctl restart NetworkManager'

alias svim="HOME=/home/user && sudo vim -u $HOME/.vimrc"

alias slack="cd ~/dev/js/slack-fork && npm start"
alias slag="cd ~/dev/js/slag/bin && node slag.js"

alias xM="xmodmap .Xmodmap"

alias i3r="cd ~/.i3-rice"
alias conf="cd ~/.config"

alias pU='cd ~/dev/java/tdt4140-project/tdt4140-gr1864'

# customs
alias weather='curl -s wttr.in | sed -n "1,7p"'

# git
alias superg='git branch -r | grep -v "\->" | while read remote; do git branch
--track "${remote#origin/}" "$remote"; done'

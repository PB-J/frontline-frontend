## ERD

<img src="https://i.imgur.com/XrljtG8.png"/>

## Wireframes

<img src="https://i.imgur.com/yEWnND3.png"/>

## User Stories

A web app for frontline medical workers
to receive appreciation for their work
Through a digital forum for public 'thank you cards'
(People can sign up and post appreciation for specific hospitals or in general so that they can feel seen and understand their impact)

## Installation

1. Install dependencies with `npm install`.
2. `git add` and `git commit` your changes.
3. Run the development server with `npm start`.

## Deployment

```
npm run deploy
```

## Troubleshooting

"gyp: No Xcode or CLT version detected!"

```
sudo xcode-select --reset
```

or

```
xcode-select --print-path
sudo rm -r -f /Library/Developer/CommandLineTools
xcode-select --install
```

"nvm command not found"

add to ~/.bash_profile or ~/.zshrc

```
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh  # This loads NVM
```

restart nvm

```
source ~/.zshrc
source ~/.bash_profile
```

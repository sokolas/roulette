## Roulette Discord Bot

Entertain your users with this simple emoji roulette game.

## Usage

* `!r-set` - set up emojis (add or delete reactions to the message)
* `!r-list` - list active emojis
* `!r-save` - save emojis
* `!r-roll` - roll!

## Setup

First, create a [Discord bot application](https://discordapp.com/developers/applications/).

### Windows

#### Windows Requirements

* [Node.js 12.0+ (Current)](https://nodejs.org/en/download/)
  * Installing with build tools is recommended

#### Windows Setup

1. Install Node.js 12.0 or newer.
1. Download this repository using git in a command prompt

    ```cmd
    git clone https://github.com/sokolas/roulette.git
    ```

    or by just downloading and extracting the [project zip](https://github.com/sokolas/roulette/archive/master.zip) from GitHub.
1. Open a command prompt in the `roulette` folder.

    ```sh
    # Install Windows build tools (if you didn't install build tools with Node)
    npm install --global windows-build-tools
    # NPM install non-development packages
    npm install
    # Build the Typescript
    npm run build
    ```

1. Create a file called `config.json` in the project directory with the contents:

    ```json
    {
      "admin_role": "Server Admins",
      "token":"xxxxxxxxxx"
    }
    ```

    Add your bot token. Admin role is optional.
1. Run the bot:

    ```sh
    npm start
    ```

### Debian Linux

#### Debian Requirements

* Node.js 12.0+
* Python 2.7 (for erlpack)
* C++ build tools (for erlpack)

#### Download

```sh
# Clone this repository
git clone https://github.com/sokolas/roulette.git
cd markov-discord
```

#### Configure

Create a file called `config.json` in the project directory with the contents:
```json
{
    "admin_role": "Server Admins",
    "token":"xxxxxxxxxx"
}
```

Add your bot token. Admin role is optional.

#### Install and Run

```sh
# Install Node.js if you haven't already
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
nvm install node

# NPM install non-development packages
npm install

# If you run into build errors, install the following packages:
sudo apt-get install python -y
sudo apt-get install build-essential -y

# Build the Typescript
npm run build

# Start the program
npm start
```

import * as fs from 'fs';
import * as Discord from 'discord.js';

const client = new Discord.Client();

interface Config {
    token: string,
    admin_role?: string,
    size?: number
}

class MyEmoji {
    name: string;
    id: string | null;
    
    constructor(name: string, id: string | null) {
        this.name = name;
        this.id = id;
    }
    toString() {
        if (this.id) {
            return `<:${this.name}:${this.id}>`;
        } else {
            return this.name;
        }
    }
}

let TOKEN: string | undefined = undefined;
let SIZE = 3;
let MESSAGE: Discord.Message;
let ADMIN_ROLE: string | null = null;
let EMOJIS: Discord.Collection<string, MyEmoji> = new Discord.Collection();

try {
    const cfg: Config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    ADMIN_ROLE = cfg.admin_role || null;
    TOKEN = cfg.token;
    SIZE = cfg.size || 3;
} catch (e) {
    console.log('Error reading config.json: ', e);
}

try {
    const em: MyEmoji[] = JSON.parse(fs.readFileSync('emojis.json', 'utf8'));
    em.forEach(em => {
        EMOJIS.set(em.name, new MyEmoji(em.name, em.id));
    });
    console.log(EMOJIS.array());
} catch (e) {
    if (e.code !== 'ENOENT') {
        console.log('Error reading emojis.json: ', e);
    }
}

client.once('ready', () => {
    console.log('Ready!');
    if (client.user) client.user.setActivity("!r-help");
});

client.on('message', (message) => {
    if (!message.author.bot) {
        if (checkAdmin(message.member)) {    
            // admin commands
            if (message.content.startsWith('!r-set')) {
                MESSAGE = message;
                message.channel.send("^ Add reactions to your message now");
            } else if (message.content.startsWith('!r-list')) {
                message.channel.send(`${EMOJIS.array()}`);
            } else if (message.content.startsWith('!r-save')) {
                try {
                    fs.writeFileSync('emojis.json', JSON.stringify(EMOJIS));
                    message.channel.send(`${EMOJIS.size} emojis saved`);
                } catch (e) {
                    console.log('Error saving data: ', e);
                    message.channel.send("Error");
                }
            }
        }
        // user commands
        let reply = '';
        if (message.content.startsWith("!r-roll")) {
            for (let i = 0; i < SIZE; i++) {
                reply = reply.concat(EMOJIS.random().toString());
            }
            message.channel.send(reply);
        } else if(message.content.startsWith('!r-help')) {
            message.channel.send('`!r-set` - set up emojis\n`!r-list` - list active emojis\n`!r-save` - save emojis\n`!r-roll` - roll!')
        }
    }
})

function checkAdmin(member: Discord.GuildMember | null): boolean {
    if (ADMIN_ROLE) {
        return member?.roles.cache
            .map(role => {return role.name})
            .includes(ADMIN_ROLE) || false;
    } else {
        return true;
    }
}

client.on('messageReactionAdd', (reaction, user) => {
    if (MESSAGE && reaction.message.id === MESSAGE.id && reaction.message.member?.user.id === user.id) {
        const em: MyEmoji = new MyEmoji(reaction.emoji.name, reaction.emoji.id);
        if (!EMOJIS.find(e => {return e.id === em.id && e.name === em.name})) {
            EMOJIS.set(em.name, em);
        }
    }
})

client.on('messageReactionRemove', (reaction, user) => {
    if (MESSAGE && reaction.message.id === MESSAGE.id && reaction.message.member?.user.id === user.id) {
        EMOJIS.delete(reaction.emoji.name);
    }
})

client.login(TOKEN);
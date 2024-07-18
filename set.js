const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0d2SThKUDZlUDMyaUs1ckExU2UzYVdRWThxVFdFcHl3SXYzSkxrTXpYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieTRpTXdsYTVxbGpjM0JobW9vTTVGbUNHaTJ2Uy94ZzFLSURoRG9PWGtYTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SjkwOUsyMnZ4TzM2a09RSXhrcUZqNGZXQ2RBdUtQWDFaN0RkN3ZzeEhrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsZlFtVnBTRWhSYmxtNXhpOGxsSklOK3NvV04zdGE1eDJPMGwybEJXVlJRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndOdVMyMDJXZURxUXZzc0YwaDNiRE9VdjBaSURrRDhMWFY3MzFrWEZ2WEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVLbUpOVVFGUks5THNtSGxHZVloVjZiRnVVWDBHQXNSL2N5aVpvSDhKU0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU9kdncybEY4dnNrU3lpa2JXZnhVMnlESmNSUWhEdUZJbCtqY1k2VWIwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWljb05uRWhTU1hvV1lGUjB5a2hleC9LNGNUY01SRFBHZVVKWHR1bUdWOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9NS2E0cEo1aVhhR05mUk9tMUwzVmZFNjRPeHhlNTlVbmUyTUE0MTFLanhHaFFsU0tPams0Z1NiR3JVRG9BelBxSVkrMUlFTjVid3FlblNCL25HMGpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY0LCJhZHZTZWNyZXRLZXkiOiIxOGpXMXVuMVIvRmZVTkI4a05XMzR5d3gzVDM4bTlNdno4V0ZySHRmNVhVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIxZTI5UU0wY1F3YXdZY0MzRzItVXR3IiwicGhvbmVJZCI6ImQ4OWZjNTU0LTExMWUtNDcwNi04YzAzLTdlZjMzMjc0ZDM2MSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJENDczZXEyTzl2STNTWjhNTkRQbnl5bll0Y3M9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidi9Yakppc1VBUnhYOWJzM0lZSThRNnpsb0FZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlgzTDdTNkJEIiwibWUiOnsiaWQiOiIyNTQ3ODI2NjI0Mjc6MTlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2Rh/CdkYXwnZuq8J2QtfCdm6XwnZC/In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMN0Z1cElGRUtybzViUUdHQTBnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJKT2VvaVc1bkhxV1BtN21lc1MvVk41eTNHa0lUcVBYcTlhRkpWMXRJdkhFPSIsImFjY291bnRTaWduYXR1cmUiOiJHQ1FURngrblRoSnhtbXdSanFmYVdBbDBweVMvbVZ1RDUrTG1vOXhqUHpwWHZzc09OdnNsdENhRWJwVFl3OGYxL0NUczZBYTdRV2ltaEg2Qk9tM0lCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTGxhbEVFeFNncWFhcGNHRTVQWWJwYWg5T2xudnduUnZrMUFyaml5VForNiszK3lsUjlZaUVmSjlSSVQ1WXJUMzdyU3lkVzA0dkhmbUl2b29qdEVYanc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3ODI2NjI0Mjc6MTlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU1RucUlsdVp4NmxqNXU1bnJFdjFUZWN0eHBDRTZqMTZ2V2hTVmRiU0x4eCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTMzMjc5MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFISXEifQ==',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "TRIBAL",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "TRIBAL",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'TRIBAL',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

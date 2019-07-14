'use strict'
require('dotenv').config()
module.exports = {
  NODE_ENV: '"production"',
  FBASE_API_KEY: JSON.stringify(process.env.FBASE_API_KEY),
  FBASE_AUTH_DOMAIN: JSON.stringify(process.env.FBASE_AUTH_DOMAIN),
  FBASE_DATABASE_URL: JSON.stringify(process.env.FBASE_DATABASE_URL),
  FBASE_PROJECT_ID: JSON.stringify(process.env.FBASE_PROJECT_ID),
  FBASE_STORAGE_BUCKET: JSON.stringify(process.env.FBASE_STORAGE_BUCKET),
  FBASE_MESSAGING_ID: JSON.stringify(process.env.FBASE_MESSAGING_ID),
  FBASE_APP_ID: JSON.stringify(process.env.FBASE_APP_ID)
}

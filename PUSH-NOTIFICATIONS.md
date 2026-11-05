# WordUp Web Push Notifications

WordUp is hosted on GitHub Pages. Pages can show subscription controls but cannot securely hold provider credentials or send broadcasts. This integration uses OneSignal Web Push and a Cloudflare Worker as the private broadcast endpoint.

## Included
- Optional learner subscription panel on the home screen.
- Permission is requested only after the learner clicks Enable notifications.
- OneSignal manages browser subscriptions and delivery.
- The Owner Area includes a broadcast composer.
- Provider credentials and the private broadcast token stay on the Worker.
- The existing WordUp service worker imports the OneSignal service-worker runtime.

Only learners who visit WordUp, opt in, and allow browser notifications can receive messages. Existing visitors must return and subscribe.

## Setup

### 1. Create a OneSignal app
1. Create an account at https://onesignal.com/ and add a Web push platform.
2. Set the site URL to https://wordupenglish.github.io/wordup/.
3. Set the default notification URL to https://wordupenglish.github.io/wordup/.
4. Copy the public OneSignal App ID.

### 2. Configure the website
In wordup-notifications.js, replace ADD_ONESIGNAL_APP_ID with the public App ID and ADD_CLOUDFLARE_WORKER_URL with your deployed Worker URL. The App ID is public; never put the REST API key in this file.

### 3. Deploy the Cloudflare Worker
1. Create a Worker at https://dash.cloudflare.com/ and deploy push-worker/worker.js.
2. Add these three values as Worker secrets: ONESIGNAL_APP_ID, ONESIGNAL_REST_API_KEY, PUSH_ADMIN_TOKEN.
3. The REST API key comes from OneSignal app settings. Generate a long random PUSH_ADMIN_TOKEN and keep it private.
4. Test the Worker URL plus /health; it should return JSON with ok:true.
5. Put the Worker URL in wordup-notifications.js, then commit and push that public configuration.

With Wrangler, add each secret using the command below and paste its value when prompted:

    npx wrangler secret put ONESIGNAL_APP_ID
    npx wrangler secret put ONESIGNAL_REST_API_KEY
    npx wrangler secret put PUSH_ADMIN_TOKEN

Never commit a .env file or paste secrets into GitHub.

## Send a broadcast
1. Open WordUp and enter the Owner Area.
2. Edit the notification title and message.
3. Paste the private PUSH_ADMIN_TOKEN into the private token field.
4. Click Send to subscribed learners. The token is cleared after a successful send.

Suggested first message:

**Your English Journey Is Waiting!**

A few minutes of practice today can make a real difference. Open WordUp, complete a lesson, and keep growing. Your future fluent self will thank you!

## Important
- Test with your own browser subscription first.
- Notifications are broadcasts to all subscribed users, not individual messages or scheduled reminders.
- Do not share the private token or store it in public source code.
- Learners can block notifications at any time in browser settings.
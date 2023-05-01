// You MUST have a file called "token.secret" in the same directory as this file!
// This should be the secret token found in https://dashboard.ngrok.com/
// Make sure it is on a single line with no spaces!
// It will NOT be committed.

// TO START
//   1. Open a terminal and run 'npm start'
//   2. Open another terminal and run 'npm run tunnel'
//   3. Copy/paste the ngrok HTTPS url into the DialogFlow fulfillment.
//
// Your changes to this file will be hot-reloaded!

import fetch from "node-fetch";
import fs from "fs";
import ngrok from "ngrok";
import morgan from "morgan";
import express from "express";

// Read and register with secret ngrok token.
ngrok.authtoken(fs.readFileSync("token.secret").toString().trim());

// Start express on port 53705
const app = express();
const port = 53705;

// Accept JSON bodies and begin logging.
app.use(express.json());
app.use(morgan(':date ":method :url" :status - :response-time ms'));

// "Hello World" endpoint.
// You should be able to visit this in your browser
// at localhost:53705 or via the ngrok URL.
app.get("/", (req, res) => {
  res.status(200).send(
    JSON.stringify({
      msg: "Express Server Works!",
    })
  );
});

// Dialogflow will POST a JSON body to /.
// We use an intent map to map the incoming intent to
// its appropriate async functions below.
// You can examine the request body via `req.body`
// See https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook#webhook_request
app.post("/", (req, res) => {
  const intent = req.body.queryResult.intent.displayName;

  // A map of intent names to callback functions.
  const intentMap = {
    GetNumMessages: doGetNumMessages,
    GetNumUsers: doGetNumUsers,
    GetChatroomMessages: doGetRecentPosts,
  };

  if (intent in intentMap) {
    // Call the appropriate callback function
    intentMap[intent](req, res);
  } else {
    // Uh oh! We don't know what to do with this intent.
    // There is likely something wrong with your code.
    // Double-check your names.
    console.error(`Could not find ${intent} in intent map!`);
    res.status(404).send(JSON.stringify({ msg: "Not found!" }));
  }
});

// Open for business!
app.listen(port, () => {
  console.log(
    `DialogFlow Handler listening on port ${port}. Use 'npm run tunnel' to expose this.`
  );
});

// Your turn!
// See https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook#webhook_response
// Use `res` to send your response; don't return!

async function doGetNumUsers(req, res) {
  const resp = await fetch("https://cs571.org/s23/hw12/api/numUsers", {
    headers: {
      "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
    },
  });
  const json = await resp.json();
  res.status(200).send({
    fulfillmentMessages: [
      {
        text: {
          text: [`There are ${json.users} users registered on BadgerChat`],
        },
      },
    ],
  });
}

async function doGetRecentPosts(req, res) {
  let chatroom = req.body.queryResult.parameters.Chatroom.replace(" ", "");
  let NumPosts = req.body.queryResult.parameters.NumPosts;
  if (!NumPosts) {
    NumPosts = 1;
  } else if (NumPosts > 5) {
    NumPosts = 5;
  }
  let url = "https://cs571.org/s23/hw12/api/numMessages";
  const resp = await fetch(
    `https://cs571.org/s23/hw12/api/chatroom/${chatroom}/messages`,
    {
      headers: {
        "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
      },
    }
  );
  const json = await resp.json();
  const messages = json.messages.slice(0, NumPosts);

  let sendMessage = [];

  messages.forEach((element) => {
    sendMessage.push({
      card: {
        title: element.title,
        subtitle: element.poster,
        buttons: [
          {
            text: "Read more",
            postback: `https://cs571.org/s23/badgerchat/chatrooms/${element.chatroom}/messages/${element.id}`,
          },
        ],
      },
    });
  });

  res.status(200).send({
    fulfillmentMessages: sendMessage,
  });
}

async function doGetNumMessages(req, res) {
  let chatroom = req.body.queryResult.parameters.Chatroom;
  let url = "https://cs571.org/s23/hw12/api/numMessages";
  if (chatroom) {
    url = `https://cs571.org/s23/hw12/api/chatroom/${chatroom}/numMessages`;
  }
  if (!chatroom) {
    chatroom = "BadgerChat";
  }
  const resp = await fetch(url, {
    headers: {
      "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
    },
  });
  const json = await resp.json();
  res.status(200).send({
    fulfillmentMessages: [
      {
        text: {
          text: [`There are ${json.messages} messages sent in ${chatroom}`],
        },
      },
    ],
  });
}

import { Config } from "@netlify/edge-functions";
import agents from "../../agents.json" with { type: "json" };

export default async (request: Request) => {

  // Get the user agent string of the requester
  const ua = request.headers.get('user-agent');

  if (!ua?.length) {
    console.log(`blocking null agent`);
    return new Response('Access Denied: User-Agent is required', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }

  // Check against our list of known AI bots
  let isBot = false;
  agents.forEach(agent => {
    if (ua?.toLowerCase().includes(agent.toLowerCase())) {
      console.log(`blocking ${agent}`);
      isBot = true;
      return;
    }
  })

  // If the requester is an AI bot, disallow with a 401
  if(isBot) {
    return new Response(null, { status: 401 });
  }
  // Otherwise, continue with the request as normal
  else {
    return;
  }
};

// This edge function is executed for all requests across the site
export const config: Config = {
  path: "/*",
};
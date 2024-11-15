/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
 
const frames = createFrames({
  basePath: "/frames",
});
const handleRequest = frames(async () => {
  return {
    image: <span>SHUNK - Decentralised AMC</span>,
    buttons: [<Button action="link" target={"https://www.google.com"}>Click me</Button>],
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;
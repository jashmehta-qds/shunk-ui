/* eslint-disable react/jsx-key */
import { frames } from "../../frames";
import { Button } from "frames.js/next";
 
export const POST = frames(async (ctx) => {
 
  return {
    image: <div tw="flex">HELLO</div>,
    buttons: [
      <Button action="post" target="/route2">
        CLICK
      </Button>,
    ],
  };
});
// ==UserScript==
// @name         ChatGPT alarm
// @namespace    http://tampermonkey.net/
// @version      2025-01-25
// @description  An gong sound will play when your ChatGPT prompt is finished, to notify you to return to the tab and stop getting distracted
// @author       Hinson Chan, github.com/flatypus
// @match        *://chatgpt.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @downloadURL  https://github.com/flatypus/chatgptalarm/raw/refs/heads/master/ChatGPTAlarm.user.js
// @updateURL    https://github.com/flatypus/chatgptalarm/raw/refs/heads/master/ChatGPTAlarm.user.js
// @grant        none
// @license MIT
// ==/UserScript==
 
// the site has CSPs that disable loading from url or from base64, but creating a blob should work
const audio_string = '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'
const binary = atob(audio_string);
const len = binary.length;
const uint8Array = new Uint8Array(len);
 
for (let i = 0; i < len; i++) {
  uint8Array[i] = binary.charCodeAt(i);
}
 
const blob = new Blob([uint8Array], { type: 'audio/mp3' });
const url = URL.createObjectURL(blob);
const audio = new Audio(url);
 
const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
    let [resource, config] = args;
    if (typeof resource === "string" && resource?.includes("backend-api/lat/r")){
        audio.play();
    }
    const response = await originalFetch(resource, config);
    return response;
};

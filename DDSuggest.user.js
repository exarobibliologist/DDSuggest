// ==UserScript==
// @name         DA DD Suggestion Autofill
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Floating button to suggest a Daily Deviation via Google Forms
// @match        *://*.deviantart.com/*/art/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. Define your static variables
    const formBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSehJ3gpwmLjKP4w417yn1gPcNa0xE_oe_DZ44rKbBGzRhv3Fg/viewform";
    const deviationLinkEntryId = "entry.147453066"; 
    const usernameEntryId = "entry.1506871634";
    
    // ==========================================
    // ENTER YOUR DEVIANTART USERNAME BELOW
    // ==========================================
    const myUsername = "exarobibliologist";

    // 2. Create and style the floating button
    const btn = document.createElement('button');
    btn.innerHTML = '🦉 Suggest DD';
    btn.style.cssText = 'position:fixed; top:70px; left:20px; z-index:9999; padding:10px 15px; background:#f7590a; color:white; border:none; border-radius:5px; cursor:pointer; font-weight:bold; box-shadow: 0 2px 5px rgba(0,0,0,0.5);';
    document.body.appendChild(btn);

    // 3. Handle the click event
    btn.addEventListener('click', () => {
        const currentUrl = encodeURIComponent(window.location.href);
        const user = encodeURIComponent(myUsername);
        
        // Construct the pre-filled URL using standard string concatenation
		const finalUrl = formBaseUrl + "?usp=pp_url&" + deviationLinkEntryId + "=" + currentUrl + "&" + usernameEntryId + "=" + user;
        window.open(finalUrl, '_blank');
    });
})();
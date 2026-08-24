// ==UserScript==
// @name         DA DD Suggestion Autofill
// @namespace    http://tampermonkey.net/
// @version      0.2
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
    
    // 2. Dynamic Username Extractor
    function getMyUsername() {
        // Target the top navigation header
        const header = document.querySelector('header');
        if (!header) return "";
        
        // Look for links in the header that point to DA and contain an image (the avatar)
        const links = header.querySelectorAll('a[href^="https://www.deviantart.com/"]');
        
        for (let link of links) {
            if (link.querySelector('img')) {
                // Split the URL: "https://www.deviantart.com/exarobibliologist"
                const urlParts = link.href.split('/').filter(Boolean); // Removes trailing empty strings
                const potentialUsername = urlParts.pop(); 
                
                // Exclude other generic icon links just in case
                if (!['notifications', 'chat', 'submit', 'watch'].includes(potentialUsername)) {
                    return potentialUsername;
                }
            }
        }
        return ""; // Fallback if the DOM changes and the link isn't found
    }

    // 3. Create and style the floating button
    const btn = document.createElement('button');
    btn.innerHTML = '🦉 Suggest DD';
    btn.style.cssText = 'position:fixed; top:70px; left:20px; z-index:9999; padding:10px 15px; background:#f7590a; color:white; border:none; border-radius:5px; cursor:pointer; font-weight:bold; box-shadow: 0 2px 5px rgba(0,0,0,0.5);';
    document.body.appendChild(btn);

    // 4. Handle the click event
    btn.addEventListener('click', () => {
        const currentUrl = encodeURIComponent(window.location.href);
        
        // Fire the scraping function to get the dynamic username
        const dynamicUsername = getMyUsername();
        const user = encodeURIComponent(dynamicUsername);
        
        // Construct the pre-filled URL and open in a new tab
        const finalUrl = `${formBaseUrl}?usp=pp_url&${deviationLinkEntryId}=${currentUrl}&${usernameEntryId}=${user}`;
        window.open(finalUrl, '_blank');
    });
})();
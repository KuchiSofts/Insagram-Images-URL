// ==UserScript==
// @name         Get Instagram Photo URL
// @namespace    https://kuchi.be/
// @version      1.4
// @description  Allow "Copy image link" on Instagram Photos
// @author       Kuchi
// @defaulticon     https://raw.githubusercontent.com/KuchiSofts/Insagram-Images-URL/main/instagram.icon.png
// @icon            https://raw.githubusercontent.com/KuchiSofts/Insagram-Images-URL/main/instagram.icon.png
// @updateURL       https://github.com/KuchiSofts/Insagram-Images-URL/raw/main/Instagram-PhotoURL.user.js
// @downloadURL     https://github.com/KuchiSofts/Insagram-Images-URL/raw/main/Instagram-PhotoURL.user.js
// @match        *://www.instagram.com/*
// @match        *://instagram.com/*
// @run-at          document-start
// @grant        none
// @priority        9000
// ==/UserScript==

(function() {
  'use strict';

  // Function to set the z-index of images with alt attribute containing "Photo by" or "Photo shared"
  function setZIndex() {
    // Get all images on the page with alt attribute containing "Photo by" or "Photo shared"
    const images = document.querySelectorAll('img[alt*="Photo by"], img[alt*="Photo shared"]');

    // Loop through the images and set their z-index to a high value
    images.forEach(image => {
      image.style.zIndex = '999';

      // Check the srcset attribute for additional image sources
      const srcset = image.getAttribute('srcset');
      if (srcset) {
        // Split the srcset by comma and space
        const sources = srcset.split(',').map(source => source.trim());

        // Filter out sources that don't have http or https
        const httpSources = sources.filter(source => /^(https?:\/\/).+/.test(source));
        // Set the first filtered source as the new image src
        if (httpSources.length > 0) {
          const newSrc = httpSources[0].split(' ')[0];
          const newImage = new Image();
          // Copy over all the attributes and styles from the original image
          Array.from(image.attributes).forEach(attr => {
            newImage.setAttribute(attr.name, attr.value);
          });
          newImage.style.cssText = image.style.cssText;
          newImage.setAttribute('src', newSrc);
          // Replace the original image with the new one
          image.parentNode.replaceChild(newImage, image);
        }
      }
    });
  }

    setInterval(function() {
        setZIndex();
    }, 100);

})();

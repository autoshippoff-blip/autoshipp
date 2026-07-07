'use client';

import React, { useEffect } from 'react';

export default function EtaWidget({ isActive = true }) {
  useEffect(() => {
    if (!isActive) return;

    const existingScript = document.querySelector('script[data-mount-id="eta-widget"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = window.location.hostname === 'localhost'
      ? 'http://localhost:3000/widget/eta-widget.js'
      : 'https://pincode-delivery-estimate-lljv.onrender.com/widget/eta-widget.js';
    script.setAttribute('data-api-key', 'tk_public_fe3275b47c7f574534a0b036');
    script.setAttribute('data-mount-id', 'eta-widget');
    script.async = true;

    const timer = setTimeout(() => {
      document.body.appendChild(script);
    }, 50);

    // Shadow DOM Stylist Poller (penetrates shadow boundary to enforce mobile layout)
    const styleInterval = setInterval(() => {
      const widgetRoot = document.getElementById('eta-widget');
      if (widgetRoot && widgetRoot.shadowRoot) {
        const shadow = widgetRoot.shadowRoot;
        const styleId = 'eta-mobile-fix-style';
        if (!shadow.getElementById(styleId)) {
          const styleEl = document.createElement('style');
          styleEl.id = styleId;
          styleEl.textContent = `
            :host {
              width: 100% !important;
              max-width: 100% !important;
              display: block !important;
              box-sizing: border-box !important;
            }
            .eta-widget-container {
              width: 100% !important;
              max-width: 100% !important;
              box-sizing: border-box !important;
            }
            .eta-widget-form {
              display: flex !important;
              flex-direction: row !important;
              flex-wrap: nowrap !important;
              width: 100% !important;
              box-sizing: border-box !important;
            }
            .eta-widget-input {
              min-width: 0 !important;
              flex: 1 1 auto !important;
              box-sizing: border-box !important;
            }
            .eta-widget-button {
              flex: 0 0 auto !important;
              box-sizing: border-box !important;
            }
          `;
          shadow.appendChild(styleEl);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(styleInterval);
      if (document.querySelector('script[data-mount-id="eta-widget"]')) {
        document.querySelector('script[data-mount-id="eta-widget"]').remove();
      }
    };
  }, [isActive]);

  return (
    <div className="w-full">
      <div id="eta-widget" className="min-h-[220px] w-full text-foreground" />
      <style dangerouslySetInnerHTML={{ __html: `
        #eta-widget {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }
        #eta-widget form, 
        #eta-widget .flex-row,
        #eta-widget div[class*="flex"] {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          align-items: center !important;
          gap: 8px !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        #eta-widget input {
          min-width: 0 !important;
          flex: 1 1 auto !important;
          box-sizing: border-box !important;
        }
        #eta-widget button {
          flex: 0 0 auto !important;
          box-sizing: border-box !important;
          margin-left: 0 !important;
        }
      ` }} />
    </div>
  );
}

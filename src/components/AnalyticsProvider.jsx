import { useEffect } from 'react';
import Script from 'next/script';

const AnalyticsProvider = ({ children }) => {
  
    return (
      <>
      <Script 
      async 
      src="https://www.googletagmanager.com/gtag/js?id=G-YKQWWC5ZF6" 
      />

      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}');
        `}
      </Script>

      <Script id="apollo-tracking">
        {`
        function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
        o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
        o.onload=function(){window.trackingFunctions.onLoad({appId:"690baac320fc4b0011bd02cb"})},
        document.head.appendChild(o)}initApollo();
        `}
      </Script>
        {children}
      </>
    );
  };
  
  export default AnalyticsProvider;
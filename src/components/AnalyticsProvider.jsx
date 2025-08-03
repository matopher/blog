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
        {children}
      </>
    );
  };
  
  export default AnalyticsProvider;
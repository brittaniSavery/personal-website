window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", process.env.NEXT_PUBLIC_ANALYTICS_ID_V1);
gtag("config", process.env.NEXT_PUBLIC_ANALYTICS_ID_V2);

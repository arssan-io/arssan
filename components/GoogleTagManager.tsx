import Script from "next/script";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type GoogleTagManagerProps = {
  gtmId?: string;
};

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps = {}) {
  const rawId =
    gtmId ||
    process.env.NEXT_PUBLIC_GTM_ID ||
    process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;

  const containerId = rawId ? rawId.replace(/["';\s]/g, "") : undefined;

  if (!containerId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

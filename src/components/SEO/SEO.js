import React from "react";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

const SEO = () => {
  const { t } = useTranslation("seo");
  return (
    <Head>
      <title>{t("pageTitle")}</title>
      <meta charSet="UTF-8" />
      <meta name="description" content={t("description")} />
      <meta name="keywords" content={t("keywords")} />
      <meta
        name="author"
        content="Deutsche Welle Research and Cooperation Projects"
      />
      <link
        rel="icon"
        type="image/png"
        href="/images/icons/favicon-16x16.png"
        sizes="16x16"
      />
      <link
        rel="icon"
        type="image/png"
        href="/images/icons/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/images/icons/favicon-96x96.png"
        sizes="96x96"
      />
      <link
        rel="apple-touch-icon"
        href="/images/icons/favicon-120x120.png"
        sizes="120x120"
      />
      <link
        rel="apple-touch-icon"
        href="/images/icons/favicon-152x152.png"
        sizes="152x152"
      />
      <link
        rel="apple-touch-icon"
        href="/images/icons/favicon-167x167.png"
        sizes="167x167"
      />
      <link
        rel="apple-touch-icon"
        href="/images/icons/favicon-180x180.png"
        sizes="180x180"
      />
      <meta property="og:title" content={t("pageTitle")} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={t("pageURL")} />
      <meta property="og:image" content={t("ogImageURL")} />
    </Head>
  );
};

export default SEO;

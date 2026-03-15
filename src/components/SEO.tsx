import React from "react";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/utils/siteConfig";

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogType?: string;
    ogImage?: string;
    twitterHandle?: string;
    keywords?: string[];
    schema?: object;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical,
    ogType = "website",
    ogImage,
    twitterHandle,
    keywords,
    schema,
}) => {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
    const metaDescription = description || siteConfig.description;
    const url = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url;
    const image = ogImage || siteConfig.ogImage;
    const combinedKeywords = keywords
        ? [...new Set([...siteConfig.keywords, ...keywords])]
        : siteConfig.keywords;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={combinedKeywords.join(", ")} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={siteConfig.name} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={image} />
            {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

            {/* JSON-LD Schema */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;

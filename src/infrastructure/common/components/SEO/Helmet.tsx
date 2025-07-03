// src/components/SEOHelmet.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
};

const SEOHelmet: React.FC<Props> = ({
    title = 'Trang mặc định | MyWebsite',
    description = 'Mô tả mặc định nếu không truyền vào',
    image = 'https://yourdomain.com/default-thumbnail.png',
    url = typeof window !== 'undefined' ? window.location.href : '',
}) => {
    return (
        <Helmet>
            {/* HTML Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEOHelmet;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SiteConfig } from '../types';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string | string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  imageAlt?: string;
  articleData?: {
    title: string;
    excerpt: string;
    publishedDate?: string;
    author?: string;
    category?: string;
  };
  siteConfig: SiteConfig;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  imageAlt,
  articleData,
  siteConfig
}) => {
  const defaultTitle = siteConfig?.heroTitle || "XE ĐẸP PRO - Đẳng Cấp Chăm Sóc Xe Hơi Chuyên Nghiệp";
  const metaTitle = title ? `${title} | XE ĐẸP PRO` : defaultTitle;
  
  const defaultDescription = siteConfig?.seoDescription || "Trung tâm chăm sóc xe hơi chuyên nghiệp XE ĐẸP PRO. Dịch vụ phủ ceramic 9H, dán phim cách nhiệt 3M, đánh bóng xe hơi, dán PPF bảo vệ sơn xe uy tín hàng đầu Hà Nội.";
  const metaDescription = description || defaultDescription;
  
  const defaultKeywords = siteConfig?.seoKeywords || "detailing chuyên nghiệp, phủ ceramic diamond 9H, dán PPF Hà Nội, AI Detailing Advisor, tư vấn chăm sóc xe AI, bảo vệ xe theo thời tiết, xe đẹp pro, chăm sóc xe hơi cao cấp Long Biên, đánh bóng ô tô Hà Nội, vệ sinh nội thất ô tô, dán phim cách nhiệt 3M, bảo vệ sơn xe, detailing uy tín hà nội, xe dep pro long bien, chăm sóc xe hơi hà nội, phủ ceramic ô tô, dán ppf ô tô hà nội, wrap đổi màu xe hơi, vệ sinh khoang máy ô tô, đánh bóng kính ô tô, cách âm chống ồn ô tô, phục hồi mâm xe AI";
  const keywordsStr = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  const metaKeywords = keywordsStr ? `${keywordsStr}, ${defaultKeywords}` : defaultKeywords;
  
  const siteUrl = "https://www.xedep.pro";
  // Enforce absolute URL path without trailing slash issues
  const cleanPath = canonical ? (canonical.startsWith('/') ? canonical : `/${canonical}`) : '';
  const fullUrl = `${siteUrl}${cleanPath}`;
  
  const defaultOgImage = siteConfig?.heroImage || "https://images.unsplash.com/photo-1603584173870-7f394833ec96?auto=format&fit=crop&q=80&w=2069";
  const logo = siteConfig?.logoUrl || `${siteUrl}/logo.png`;
  const phone = siteConfig?.contactPhone || "0588896699";
  const address = siteConfig?.contactAddress || "Sân Golf Long Biên, Phúc Đồng, Long Biên, Hà Nội";
  const email = siteConfig?.contactEmail || "contact@xedep.pro";
  const businessName = siteConfig?.siteName || "XE ĐẸP PRO";

  // WebSite Schema with SearchAction
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": businessName,
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // LocalBusiness Schema with multi-type (AutoRepair + AutoWash + LocalBusiness)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "AutoWash", "LocalBusiness"],
    "name": businessName,
    "image": ogImage || defaultOgImage,
    "@id": `${siteUrl}/#localbusiness`,
    "url": siteUrl,
    "telephone": phone,
    "email": email,
    "logo": logo,
    "priceRange": "$$",
    "description": "Trung tâm chăm sóc xe chuyên nghiệp tại Hà Nội.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": "Hà Nội",
      "postalCode": "100000",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.034,
      "longitude": 105.901
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/xedeppro.vietnam",
      "https://www.youtube.com/xedeppro"
    ]
  };

  // Breadcrumbs Schema
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Trang chủ",
      "item": siteUrl
    }
  ];

  if (cleanPath && cleanPath !== "/") {
    const parts = cleanPath.split("/").filter(Boolean);
    let currentPath = "";
    parts.forEach((part, index) => {
      currentPath += `/${part}`;
      let name = part;
      // Friendly names in Vietnamese for standard paths
      if (part === "services") name = "Dịch vụ";
      else if (part === "news") name = "Tin tức";
      else if (part === "wash") name = "Rửa xe chi tiết";
      else if (part === "polish") name = "Đánh bóng sơn";
      else if (part === "ceramic") name = "Phủ Ceramic";
      else if (part === "ppf") name = "PPF Bảo vệ sơn";
      else if (part === "wrap") name = "Wrap đổi màu";
      else if (part === "window") name = "Phim cách nhiệt";
      else if (part === "interior-deep-cleaning") name = "Dọn nội thất sâu";
      else if (part === "engine") name = "Vệ sinh khoang máy";
      else if (part === "tuning") name = "Độ xe nâng cấp";
      else if (part === "underbody") name = "Sơn phủ gầm";
      else if (title) name = title;

      breadcrumbItems.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": `${siteUrl}${currentPath}`
      });
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="XE ĐẸP PRO" />
      
      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Preload critical LCP assets dynamically */}
      {logo && <link rel="preload" href={logo} as="image" />}
      {siteConfig?.heroImage && <link rel="preload" href={siteConfig.heroImage} as="image" fetchPriority="high" />}
      
      {/* Alternates */}
      <link rel="alternate" hrefLang="vi-vn" href={fullUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content="XE ĐẸP PRO" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
      {imageAlt ? (
        <meta name="twitter:image:alt" content={imageAlt} />
      ) : (
        <meta name="twitter:image:alt" content="XE ĐẸP PRO Detailing" />
      )}
      
      {/* Additional Article Meta */}
      {ogType === 'article' && articleData && (
        <>
          <meta property="article:published_time" content={articleData.publishedDate || new Date().toISOString()} />
          <meta property="article:author" content={articleData.author || "XE ĐẸP PRO"} />
          <meta property="article:section" content={articleData.category || "Car Care"} />
        </>
      )}

      {/* Structured Data (Schema.org) JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(webSiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;

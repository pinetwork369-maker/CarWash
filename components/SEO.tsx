import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SiteConfig } from '../types';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string[] | string;
  imageAlt?: string;
  articleData?: any;
  siteConfig?: SiteConfig;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical, 
  ogImage, 
  ogType = 'website',
  keywords,
  imageAlt,
  articleData,
  siteConfig
}) => {
  const siteName = siteConfig?.siteName || "XE ĐẸP PRO";
  const slogan = "ĐẲNG CẤP CHUYÊN NGHIỆP";
  const siteTitle = siteName.includes(slogan) ? siteName : `${siteName} | ${slogan}`;
  const fullTitle = title 
    ? (title.includes(siteName) ? title : `${title} | ${siteTitle}`)
    : `${siteName} | Detailing 4.0 & AI Advisor | Phủ Ceramic, PPF, Wrap Ô Tô Hà Nội`;
  const defaultDescription = siteConfig?.seoDescription || "XE ĐẸP PRO - Trung tâm Detailing 4.0 hàng đầu Hà Nội. Tích hợp công nghệ AI cố vấn dịch vụ, bảo vệ xe theo thời tiết. Chuyên sâu Phủ Ceramic 9H, Dán PPF, Wrap đổi màu & Chăm sóc xe toàn diện chuyên nghiệp.";
  const metaDescription = description || defaultDescription;
  const defaultKeywords = siteConfig?.seoKeywords || "detailing chuyên nghiệp, phủ ceramic diamond 9H, dán PPF Hà Nội, AI Detailing Advisor, tư vấn chăm sóc xe AI, bảo vệ xe theo thời tiết, xe đẹp pro, chăm sóc xe hơi cao cấp Long Biên, đánh bóng ô tô Hà Nội, vệ sinh nội thất ô tô, dán phim cách nhiệt 3M, bảo vệ sơn xe, detailing uy tín hà nội, xe dep pro long bien, chăm sóc xe hơi hà nội, phủ ceramic ô tô, dán ppf ô tô hà nội, wrap đổi màu xe hơi, vệ sinh khoang máy ô tô, đánh bóng kính ô tô, cách âm chống ồn ô tô, phục hồi mâm xe AI";
  const keywordsStr = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  const metaKeywords = keywordsStr ? `${keywordsStr}, ${defaultKeywords}` : defaultKeywords;
  const url = "https://www.xedep.pro";
  const fullUrl = canonical ? `${url}${canonical}` : url;
  const defaultOgImage = siteConfig?.heroImage || "https://images.unsplash.com/photo-1603584173870-7f394833ec96?auto=format&fit=crop&q=80&w=2069";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content="index, follow" />
      {siteConfig?.googleVerificationCode && (
        <meta name="google-site-verification" content={siteConfig.googleVerificationCode} />
      )}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:image:alt" content={imageAlt || fullTitle} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="XE ĐẸP PRO" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />

      {/* Structured Data - General */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoRepair",
          "name": "XE ĐẸP PRO",
          "image": defaultOgImage,
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "E28 Khu Đồng Dưa",
            "addressLocality": "Hà Cầu, Hà Đông",
            "addressRegion": "Hà Nội",
            "postalCode": "100000",
            "addressCountry": "VN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 20.9652,
            "longitude": 105.7794
          },
          "url": url,
          "telephone": "0588896699",
          "openingHours": "Mo-Su 08:00-18:00",
          "sameAs": [
            "https://www.facebook.com/xedepauto",
            "https://www.youtube.com/xedepauto",
            "https://www.instagram.com/xedepauto"
          ]
        })}
      </script>

      {/* Structured Data - Article */}
      {ogType === 'article' && articleData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": fullTitle,
            "image": [ogImage || defaultOgImage],
            "datePublished": articleData.date,
            "dateModified": articleData.date,
            "author": [{
              "@type": "Person",
              "name": articleData.author || "XE ĐẸP PRO",
              "url": url
            }]
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

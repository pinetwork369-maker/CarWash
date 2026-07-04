import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const currentPath = location.pathname;

  const localSeoRoutes: Record<string, { title: string; desc: string; keywords: string }> = {
    '/phu-ceramic-ha-noi': {
      title: 'Phủ Ceramic Ô Tô Hà Nội Chuyên Nghiệp | Bảo Vệ Sơn 9H Cao Cấp',
      desc: 'Dịch vụ phủ Ceramic ô tô Hà Nội chuyên sâu tại XE ĐẸP PRO. Sơn bóng gương, kháng nước lá sen, bảo vệ sơn nguyên bản 9H Diamond. Bảo hành chính hãng uy tín.',
      keywords: 'phủ ceramic ô tô Hà Nội, ceramic 9H, bóng gương sơn xe, bảo vệ sơn ô tô Hà Nội'
    },
    '/dan-ppf-ha-noi': {
      title: 'Dán PPF Ô Tô Hà Nội Chuyên Nghiệp | Bảo Vệ Sơn Chống Xước TPU',
      desc: 'Dịch vụ dán phim bảo vệ sơn PPF ô tô Hà Nội tại XE ĐẸP PRO. Phim PPF TPU cao cấp tự phục hồi vết xước, chống đá văng va quẹt nhẹ. Bảo hành lên đến 10 năm.',
      keywords: 'dán PPF ô tô Hà Nội, phim bảo vệ sơn PPF, tự phục hồi xước ô tô, PPF TPU Hà Nội'
    },
    '/danh-bong-xe-ha-noi': {
      title: 'Đánh Bóng Xe Hơi Hà Nội Chuyên Nghiệp | Hiệu Chỉnh Sơn Xe',
      desc: 'Dịch vụ đánh bóng xe hơi Hà Nội uy tín tại XE ĐẸP PRO. Loại bỏ xước quầng xoáy móng tay, phục hồi độ phản chiếu bóng gương 100%. Giá tốt chất lượng chuyên sâu!',
      keywords: 'đánh bóng xe hơi Hà Nội, hiệu chỉnh sơn ô tô, xóa xước xe hơi, bóng gương sơn xe'
    },
    '/dan-phim-cach-nhiet-ha-noi': {
      title: 'Dán Phim Cách Nhiệt Ô Tô Hà Nội | Phim 3M Crystalline',
      desc: 'Dịch vụ dán phim cách nhiệt 3M Crystalline Hà Nội chính hãng tại XE ĐẸP PRO. Cản nhiệt 99%, chống tia UV cực tím bảo vệ mắt và da lái xe. Báo giá ưu đãi tối ưu.',
      keywords: 'dán phim cách nhiệt ô tô Hà Nội, phim 3M Crystalline Hà Nội, phim cách nhiệt chống nóng, dán kính cách nhiệt ô tô'
    },
    '/rua-xe-detailing-ha-noi': {
      title: 'Rửa Xe Detailing Hà Nội Tiêu Chuẩn Quốc Tế | Sạch Sâu 3 Bước',
      desc: 'Dịch vụ rửa xe Detailing Hà Nội sạch sâu 3 bước bằng găng tay lông cừu mềm mại, hóa chất pH trung tính nhập khẩu châu Âu. Quy trình rửa xe không xước an toàn tuyệt đối.',
      keywords: 'rửa xe detailing Hà Nội, rửa xe 3 bước sạch sâu, cọ rửa mâm lốp chuyên nghiệp, rửa xe không xước'
    },
    '/ve-sinh-noi-that-ha-noi': {
      title: 'Vệ Sinh Nội Thất Ô Tô Hà Nội Chuyên Sâu | Khử Mùi Diệt Khuẩn',
      desc: 'Dịch vụ vệ sinh dọn nội thất ô tô Hà Nội chuyên sâu tại XE ĐẸP PRO. Tháo ghế hút bụi, sấy hơi nước nóng diệt khuẩn, dưỡng da cao cấp, khử mùi ozone triệt để.',
      keywords: 'vệ sinh nội thất ô tô Hà Nội, dọn nội thất ô tô Hà Nội, khử mùi xe hơi Hà Nội, dọn nội thất xe hơi'
    },
    '/ve-sinh-noi-that-o-to-ha-noi': {
      title: 'Vệ Sinh Nội Thất Ô Tô Hà Nội Chuyên Sâu | Khử Mùi Diệt Khuẩn',
      desc: 'Dịch vụ vệ sinh dọn nội thất ô tô Hà Nội chuyên sâu tại XE ĐẸP PRO. Tháo ghế hút bụi, sấy hơi nước nóng diệt khuẩn, dưỡng da cao cấp, khử mùi ozone triệt để.',
      keywords: 'vệ sinh nội thất ô tô Hà Nội, dọn nội thất ô tô Hà Nội, khử mùi xe hơi Hà Nội, dọn nội thất xe hơi'
    },
    '/hieu-chinh-son-ha-noi': {
      title: 'Hiệu Chỉnh Sơn Xe Ô Tô Hà Nội | Phục Hồi Nền Sơn Hoàn Mỹ',
      desc: 'Hiệu chỉnh sơn xe ô tô chuyên nghiệp tại Hà Nội. Loại bỏ hoàn toàn vết trầy xước, khuyết tật sơn, quầng hologram, chuẩn bị bề mặt tốt nhất trước khi phủ ceramic/PPF.',
      keywords: 'hiệu chỉnh sơn xe hà nội, đánh bóng sơn ô tô, xử lý vết xước xe hơi, xóa xước sơn ô tô'
    },
    '/khu-mui-noi-that-ha-noi': {
      title: 'Khử Mùi Nội Thất Ô Tô Hà Nội | Diệt Khuẩn Không Khí Cabin',
      desc: 'Dịch vụ khử mùi và diệt khuẩn cabin ô tô chuyên sâu tại Hà Nội. Ứng dụng công nghệ sục Ozone và xông tinh dầu thảo dược thiên nhiên, đánh bay mùi hôi ẩm mốc.',
      keywords: 'khử mùi ô tô hà nội, diệt khuẩn nội thất xe hơi, khử mùi hải sản thuốc lá, xông tinh dầu ô tô'
    }
  };

  const matchedRoute = localSeoRoutes[currentPath];
  const detectedTitle = matchedRoute ? matchedRoute.title : title;
  const detectedDescription = matchedRoute ? matchedRoute.desc : description;
  const detectedKeywords = matchedRoute ? matchedRoute.keywords : keywords;

  const defaultTitle = siteConfig?.heroTitle || "XE ĐẸP PRO - Đẳng Cấp Chăm Sóc Xe Hơi Chuyên Nghiệp";
  const metaTitle = detectedTitle 
    ? (detectedTitle.includes("XE ĐẸP PRO") ? detectedTitle : `${detectedTitle} | XE ĐẸP PRO`) 
    : defaultTitle;
  
  const defaultDescription = siteConfig?.seoDescription || "Trung tâm chăm sóc xe hơi chuyên nghiệp XE ĐẸP PRO. Dịch vụ phủ ceramic 9H, dán phim cách nhiệt 3M, đánh bóng xe hơi, dán PPF bảo vệ sơn xe uy tín hàng đầu Hà Nội.";
  const metaDescription = detectedDescription || defaultDescription;
  
  const defaultKeywords = siteConfig?.seoKeywords || "detailing chuyên nghiệp, phủ ceramic diamond 9H, dán PPF Hà Nội, AI Detailing Advisor, tư vấn chăm sóc xe AI, bảo vệ xe theo thời tiết, xe đẹp pro, chăm sóc xe hơi cao cấp Long Biên, đánh bóng ô tô Hà Nội, vệ sinh nội thất ô tô, dán phim cách nhiệt 3M, bảo vệ sơn xe, detailing uy tín hà nội, xe dep pro long bien, chăm sóc xe hơi hà nội, phủ ceramic ô tô, dán ppf ô tô hà nội, wrap đổi màu xe hơi, vệ sinh khoang máy ô tô, đánh bóng kính ô tô, cách âm chống ồn ô tô, phục hồi mâm xe AI";
  const keywordsStr = Array.isArray(detectedKeywords) ? detectedKeywords.join(', ') : detectedKeywords;
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
    "priceRange": "50.000đ - 50.000.000đ",
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
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Nguyễn Hoàng Nam"
        },
        "datePublished": "2026-06-15",
        "reviewBody": "Dịch vụ phủ ceramic cực kỳ chất lượng, xe bóng loáng như gương, nhân viên phục vụ rất chuyên nghiệp tại Hà Nội.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Trần Thu Trang"
        },
        "datePublished": "2026-06-20",
        "reviewBody": "Tôi đã dán phim cách nhiệt 3M Crystalline ở đây, cabin mát hơn hẳn khi đỗ xe trời nắng Hà Nội. Rất hài lòng!",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Hà Nội" },
      { "@type": "AdministrativeArea", "name": "Ba Đình" },
      { "@type": "AdministrativeArea", "name": "Đống Đa" },
      { "@type": "AdministrativeArea", "name": "Cầu Giấy" },
      { "@type": "AdministrativeArea", "name": "Thanh Xuân" },
      { "@type": "AdministrativeArea", "name": "Hoàng Mai" },
      { "@type": "AdministrativeArea", "name": "Long Biên" },
      { "@type": "AdministrativeArea", "name": "Hà Đông" },
      { "@type": "AdministrativeArea", "name": "Nam Từ Liêm" },
      { "@type": "AdministrativeArea", "name": "Bắc Từ Liêm" },
      { "@type": "AdministrativeArea", "name": "Hoàn Kiếm" },
      { "@type": "AdministrativeArea", "name": "Hai Bà Trưng" },
      { "@type": "AdministrativeArea", "name": "Tây Hồ" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dịch Vụ Chăm Sóc Xe Ô Tô XE ĐẸP PRO",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Phủ Ceramic Ô Tô 9H Diamond",
            "description": "Phủ nano ceramic bảo vệ sơn xe bóng gương sâu."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dán Phim Bảo Vệ Sơn PPF TPU",
            "description": "Bọc PPF bảo vệ sơn chống trầy xước tự phục hồi."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Đánh Bóng Hiệu Chỉnh Sơn Xe",
            "description": "Xóa xước quầng quấn xoáy phục hồi nước sơn sáng bóng."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dán Phim Cách Nhiệt 3M Crystalline",
            "description": "Chống nóng cách nhiệt cabin hiệu quả vượt trội."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Rửa Xe Detailing Sạch Sâu 3 Bước",
            "description": "Rửa xe bằng găng lông cừu và hóa chất trung tính."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vệ Sinh Nội Thất Ô Tô Chuyên Sâu",
            "description": "Tháo ghế giặt sàn sấy hơi nước nóng diệt khuẩn."
          }
        }
      ]
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

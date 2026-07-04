import React from 'react';
import LocalSeoLandingPage from '../../components/LocalSeoLandingPage';

interface PageProps {
  siteConfig: any;
  setSiteConfig: any;
  services?: any;
  t: any;
  language: string;
  setLanguage: any;
  theme: string;
  setTheme: any;
  isEditMode: boolean;
  isDesignAuthenticated: boolean;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: any;
  onAddNotification?: any;
  handlePayment: any;
  scrollToSection: any;
}

export default function RuaXeDetailingHaNoiPage(props: PageProps) {
  return (
    <LocalSeoLandingPage
      serviceId="wash"
      {...props}
    />
  );
}

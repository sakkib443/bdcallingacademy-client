import Footer from '@/components/sheard/Footer';
import Navbar from '@/components/sheard/Navbar';
import TopHeader from '@/components/sheard/TopHeader';
import WhatsAppButton from '@/components/sheard/WhatsAppButton';
import FloatingSeminarButton from '@/components/sheard/FloatingSeminarButton';
import FloatingLanguageButton from '@/components/sheard/FloatingLanguageButton';
import IntroWrapper from '@/components/IntroWrapper';
import React from 'react';

const mainLayout = ({ children }) => {
    return (
        <>
            <IntroWrapper>
                <div>
                    <TopHeader></TopHeader>
                    <Navbar></Navbar>
                    {children}
                    <Footer></Footer>
                </div>
            </IntroWrapper>
            {/* These buttons must be outside IntroWrapper because IntroWrapper uses transform, which breaks fixed positioning */}
            <WhatsAppButton />
            <FloatingSeminarButton />
            <FloatingLanguageButton />
        </>
    );
};

export default mainLayout;
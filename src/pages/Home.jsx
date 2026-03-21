import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import CoursesSection from '@/components/landing/CoursesSection';
import LiveClassesSection from '@/components/landing/LiveClassesSection';
import ResultsSection from '@/components/landing/ResultsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import ExamSimulatorSection from '@/components/landing/ExamSimulatorSection';
import CTASection from '@/components/landing/CTASection';
import FAQSection from '@/components/landing/FAQSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0F172A] transition-colors duration-300" dir="rtl">
            <Navbar />
            <div id="hero">
                <HeroSection />
            </div>
            <ProblemSection />
            <SolutionSection />
            <div id="features">
                <FeaturesSection />
            </div>
            <div id="courses">
                <CoursesSection />
            </div>
            <div id="live">
                <LiveClassesSection />
            </div>
            <ExamSimulatorSection />
            <ResultsSection />
            <div id="testimonials">
                <TestimonialsSection />
            </div>
            <CTASection />
            <div id="faq">
                <FAQSection />
            </div>
            <Footer />
        </div>
    );
}
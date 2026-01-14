import HeroWrapper from './components/HeroWrapper.jsx';
import Nav from './components/Nav.jsx';
import Header from './components/Header.jsx';
import TestimonialSection from './components/TestimonialSection.jsx';
import TrustedSection from './components/TrustedSection.jsx';
import Mistakes from './components/Mistakes.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import BenefitsAndBonuses from './components/BenefitsAndBonuses.jsx';
import LimitedSlotsCTA from './components/LimitedSlotsCTA.jsx';
import ConsultationForm from './components/ConsultationForm.jsx';
import FAQSection from './components/FAQSection.jsx';
import Footer from './components/Footer.jsx';

export default function Page() {
    return (
        <HeroWrapper>
            <Nav />
            <Header />
            <TrustedSection />
            <TestimonialSection />
            <Mistakes />
            <HowItWorks />
            <BenefitsAndBonuses />
            <LimitedSlotsCTA />
            <ConsultationForm />
            <FAQSection />
            <Footer />
        </HeroWrapper>
    );
}

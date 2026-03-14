import AboutHero from "@/components/Aboutpage/AboutHero";
import Count from "@/components/Aboutpage/Count";
import Mission from "@/components/Aboutpage/Mission";
import CeoMessage from "@/components/Aboutpage/CeoMessage";
import Value from "@/components/Aboutpage/Value";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <Count />
      <CeoMessage />
      <Mission />
      <Value />
    </div>
  );
};

export default AboutPage;

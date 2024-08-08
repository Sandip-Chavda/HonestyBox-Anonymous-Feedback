import HeroSectionTextHover from "@/components/animata/hero-section-text-hover";
// import ConfettiComponents from "@/components/confetti/Confetti";
import Footer from "@/components/footer/Footer";
import { MarqueeDemo } from "@/components/magicui/Marquee-user";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center px-4 md:px-24 py-8">
        {/* <ConfettiComponents /> */}

        <section className="text-center mb-8 md:mb-2">
          <HeroSectionTextHover />
        </section>

        <section className="text-center mb-8 md:mb-12">
          <MarqueeDemo />
        </section>

        <section id="faq" className="text-center w-full mb-8 md:mb-12">
          <div className="md:text-2xl text-xl font-medium">
            Frequently Asked Qestions (FAQ)
          </div>

          <div className="w-[70px] mx-auto mt-5 h-px bg-[#804dff]" />

          <Accordion
            type="single"
            collapsible
            className=" mt-8 w-[70%] mx-auto"
          >
            <AccordionItem value="item-1" className="w-full">
              <AccordionTrigger className="!text-start">
                What is HonestyBox?
              </AccordionTrigger>
              <AccordionContent className="text-start">
                HonestyBox is a platform where users can share feedback,
                opinions, or messages anonymously. It provides a way for
                individuals to express themselves openly without revealing their
                identity.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="w-full">
              <AccordionTrigger className="!text-start">
                How does HonestyBox work?
              </AccordionTrigger>
              <AccordionContent className="text-start">
                Users can visit the HonestyBox website or app and submit
                messages anonymously. These messages can be feedback, opinions,
                or thoughts on various topics. Recipients can read these
                messages without knowing who sent them.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="w-full">
              <AccordionTrigger className="!text-start">
                Is it necessary to create an account to send messages?
              </AccordionTrigger>
              <AccordionContent className="text-start">
                No, you do not need to create an account or log in to use
                HonestyBox. The platform allows anonymous submissions without
                requiring users to register.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="w-full">
              <AccordionTrigger className="!text-start">
                Is it necessary to recieve message and public url?
              </AccordionTrigger>
              <AccordionContent className="text-start">
                Yes, you do need to create an account or log in to share your
                public url and get your recieved messages dashboard.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="w-full">
              <AccordionTrigger className="!text-start">
                Are there any guidelines for using HonestyBox?
              </AccordionTrigger>
              <AccordionContent className="text-start">
                Yes, there are guidelines to ensure respectful communication.
                Users are encouraged to refrain from abusive or offensive
                language and to focus on providing helpful feedback or
                expressing thoughts respectfully.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="w-full">
              <AccordionTrigger className="!text-start">
                Can I respond to messages I receive on HonestyBox?
              </AccordionTrigger>
              <AccordionContent className="text-start">
                Currently, HonestyBox primarily facilitates one-way anonymous
                communication. Recipients can read messages but cannot directly
                respond to anonymous senders through the platform.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7" className="w-full">
              <AccordionTrigger className="!text-start">
                Is HonestyBox free to use?
              </AccordionTrigger>
              <AccordionContent className="text-start">
                Yes, HonestyBox is free for users to submit and receive
                anonymous messages. There are no charges associated with using
                the platform.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8" className="w-full">
              <AccordionTrigger className="!text-start">
                How can I contact support if I have a problem with HonestyBox?
              </AccordionTrigger>
              <AccordionContent className="text-start">
                For any issues or questions, you can contact our support team
                through this{" "}
                <a
                  href="mailto:cylonescorpion@gmail.com"
                  className="text-[#804dff]"
                >
                  E-mail
                </a>
                . We are here to assist you and ensure you have a positive
                experience using HonestyBox.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      <footer className="">
        <Footer />
      </footer>
    </>
  );
}

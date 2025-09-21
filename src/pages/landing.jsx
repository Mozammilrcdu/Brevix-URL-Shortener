import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BarChart,
  Smartphone,
  Link as LinkIcon,
  QrCode,
  User,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: <BarChart size={32} />,
    title: "Analytics",
    description:
      "Track total clicks, location, and device stats for each shortened URL.",
  },
  {
    icon: <LinkIcon size={32} />,
    title: "Easy Link Management",
    description:
      "Create, customize, and delete short links with just a few clicks.",
  },
  {
    icon: <QrCode size={32} />,
    title: "QR Codes",
    description: "Generate QR codes for your links for easy sharing.",
  },
  {
    icon: <User size={32} />,
    title: "User Friendly UI",
    description: "Intuitive interface designed for smooth user experience.",
  },
  {
    icon: <Shield size={32} />,
    title: "Secure & Reliable",
    description:
      "Your data is protected and only accessible by you via your account.",
  },
  {
    icon: <Smartphone size={32} />,
    title: "Mobile Friendly",
    description: "Optimized for all devices, including smartphones and tablets.",
  },
];

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-0 max-w-screen-lg mx-auto">
      {/* Main Heading */}
      <h2 className="my-6 sm:my-10 text-3xl sm:text-5xl lg:text-6xl text-white text-center font-extrabold">
        From cluttered to clean<br /> shorten your links 👇
      </h2>

      {/* URL Form */}
      <form
        onSubmit={handleShorten}
        className="flex flex-col sm:flex-row w-full sm:w-4/5 md:w-2/3 gap-2 mb-10"
      >
        <Input
          type="url"
          placeholder="Enter your loooong URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="flex-1 py-3 px-4"
        />
        <Button type="submit" className="w-full sm:w-auto py-3" variant="destructive">
          Shorten!
        </Button>
      </form>

      {/* Poster Image */}
      <div className="w-full rounded-2xl overflow-hidden shadow-lg mb-8">
        <img
          src="/poster.png"
          alt="Poster"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 w-full sm:w-11/12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 text-white flex flex-col items-start gap-3 shadow-md hover:scale-105 transition-transform duration-300"
          >
            <div className="text-amber-400">{feature.icon}</div>
            <h3 className="text-lg sm:text-xl font-bold">{feature.title}</h3>
            <p className="text-sm sm:text-base">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* FAQ Accordion */}
      <Accordion type="multiple" collapsible className="w-full sm:w-4/5 md:w-2/3">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does the Brevix URL shortener works?
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version
            of that URL. This shortened URL redirects to the original long URL
            when accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Do I need an account to use the app?</AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage your URLs, view
            analytics, and customize your short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What analytics are available for my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, geolocation data of the clicks,
            and device types (mobile/desktop) for each of your shortened URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;

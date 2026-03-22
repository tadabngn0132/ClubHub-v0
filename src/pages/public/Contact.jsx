import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const initialFormState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const contactCards = useMemo(
    () => [
      {
        title: "Hotline",
        value: "+84 987 654 321",
        note: "Mon - Fri | 08:00 - 21:00",
      },
      {
        title: "Email",
        value: "gdc.fpt2022@gmail.com",
        note: "We usually reply within 24 hours",
      }
    ],
    [],
  );

  const socialLinks = useMemo(
    () => [
      {
        name: "Facebook",
        url: "https://www.facebook.com/greenwichdancecrew",
        icon: faFacebook,
        color: "hover:text-blue-500",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/greenwichdancecrew",
        icon: faInstagram,
        color: "hover:text-pink-500",
      },
      {
        name: "TikTok",
        url: "https://www.tiktok.com/@greenwichdancecrew",
        icon: faTiktok,
        color: "hover:text-black dark:hover:text-white",
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/@greenwichdancecrew",
        icon: faYoutube,
        color: "hover:text-red-600",
      },
    ],
    [],
  );

  const onChangeField = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate send request for now; replace by API call when endpoint is ready.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setSubmitStatus("success");
      setFormData(initialFormState);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden flex flex-col min-h-[var(--pub-main-min-height)] mt-[var(--pub-main-margin-y)] mb-[var(--pub-main-margin-y)] px-[var(--pub-container-padding-x-mobile)] md:px-[var(--pub-container-padding-x)]">
      <div className="absolute top-6 -left-20 w-64 h-64 rounded-full blur-3xl bg-[var(--dark-pink-color)]/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl bg-[var(--pink-color)]/20 pointer-events-none" />

      <div className="relative mt-8 rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/6 to-white/0 p-6 md:p-10">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 xl:gap-10">
          <section className="xl:col-span-2 space-y-6">
            <h1 className="monument-extra-bold text-3xl md:text-4xl uppercase leading-tight">
              Contact
              <br />
              <span className="monument-regular pink-color">The Crew</span>
            </h1>

            <p className="text-sm leading-6 text-white/80 max-w-xl">
              Need support for club activities, collaboration, sponsorship, or
              internal operations? Send your message and our admin team will get
              back to you quickly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
              {contactCards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[#111111]/70 p-4"
                >
                  <h2 className="monument-regular uppercase text-xs tracking-wider text-white/70">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-base text-white">{item.value}</p>
                  <p className="mt-1 text-xs text-white/60">{item.note}</p>
                </article>
              ))}
            </div>

            <div className="rounded-2xl border border-[var(--pink-color)]/40 bg-[var(--pink-color)]/10 p-4 animate-slide-right">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--pink-color)]">
                Quick FAQ
              </p>
              <p className="mt-2 text-sm text-white/85">
                For event registration issues, include your full name, student
                email, and event code so we can help faster.
              </p>
            </div>
          </section>

          <section className="xl:col-span-3 rounded-2xl border border-white/10 bg-[#101010]/80 p-5 md:p-7 animate-slide-left">
            <form className="space-y-4" onSubmit={onSubmitForm}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2 text-sm">
                  Full Name
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={onChangeField}
                    required
                    className="rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--pink-color)]"
                    placeholder="Nguyen Van A"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChangeField}
                    required
                    className="rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--pink-color)]"
                    placeholder="abc123@fpt.edu.vn"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2 text-sm">
                  Phone Number
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={onChangeField}
                    className="rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--pink-color)]"
                    placeholder="09xxxxxxxx"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm">
                  Subject
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={onChangeField}
                    required
                    className="rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--pink-color)]"
                    placeholder="Support for activity"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm">
                Message
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={onChangeField}
                  required
                  className="rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--pink-color)]"
                  placeholder="Tell us how we can help you..."
                />
              </label>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between pt-2">
                <p className="text-xs text-white/60">
                  By submitting this form, you agree that ClubHub may contact
                  you regarding your request.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="monument-regular uppercase px-5 py-2.5 rounded-xl border border-[var(--pink-color)] text-[var(--pink-color)] hover:bg-[var(--pink-color)] hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>

              {submitStatus === "success" && (
                <p className="text-sm text-green-400">
                  Message sent successfully. We will contact you soon.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong while sending your message. Please try
                  again.
                </p>
              )}
            </form>
          </section>

          <section className="xl:col-span-5 rounded-2xl border border-white/10 bg-[#111111]/70 p-5 md:p-7">
            <div className="flex flex-col gap-4">
              <h3 className="monument-regular uppercase text-lg tracking-wider text-white/90">
                Follow Us
              </h3>
              <p className="text-sm text-white/70 mb-4">
                Stay updated with the latest news, performances, and behind-the-scenes content
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-12 h-12 rounded-xl border border-white/20 bg-white/5 text-white/80 transition-all duration-300 ${link.color} hover:border-[var(--pink-color)]/50 hover:bg-white/10`}
                    title={link.name}
                  >
                    <FontAwesomeIcon icon={link.icon} size="lg" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;

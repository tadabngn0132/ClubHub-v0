import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
  faGoogle,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faMapLocationDot,
  faClock,
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const initialFormState = {
  fullName: "",
  email: "",
  message: "",
};

// Helper function for reCAPTCHA v3 token
const getRecaptchaToken = async () => {
  if (window.grecaptcha) {
    try {
      return await window.grecaptcha.execute("6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", {
        action: "submit",
      });
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      return null;
    }
  }
  // Mock token for development
  return "mock_token_" + Date.now();
};

// Email validation regex
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, success, error
  const [formErrors, setFormErrors] = useState({});

  const contactMethods = useMemo(
    () => [
      {
        icon: faEnvelope,
        title: "Email",
        value: "gdc.fpt2022@gmail.com",
        note: "Response within 24-48 hours",
        action: "mailto:gdc.fpt2022@gmail.com",
        actionType: "link",
      },
      {
        icon: faPhone,
        title: "President",
        value: "+84 987 654 321",
        note: "Nguyen Thai Manh",
        action: "tel:+84987654321",
        actionType: "link",
      },
      {
        icon: faPhone,
        title: "Vice President",
        value: "+84 988 765 432",
        note: "Tran Bich Ngoc",
        action: "tel:+84988765432",
        actionType: "link",
      },
      {
        icon: faMapLocationDot,
        title: "Location",
        value: "FPT University, Campus 1",
        note: "Lot E, Dong Nai Province",
        action: "https://maps.google.com/?q=FPT+University+Dong+Nai",
        actionType: "external",
      },
      {
        icon: faClock,
        title: "Hours",
        value: "Mon - Fri, 8:00 AM - 9:00 PM",
        note: "Closed on weekends & holidays",
        action: null,
        actionType: "none",
      },
    ],
    []
  );

  const socialLinks = useMemo(
    () => [
      {
        name: "Facebook Messenger",
        url: "https://m.me/greenwichdancecrew",
        icon: faFacebook,
        bgColor: "bg-blue-600/20 hover:bg-blue-600/30",
        textColor: "text-blue-500",
      },
      {
        name: "Instagram DM",
        url: "https://instagram.com/greenwichdancecrew",
        icon: faInstagram,
        bgColor: "bg-pink-600/20 hover:bg-pink-600/30",
        textColor: "text-pink-500",
      },
      {
        name: "TikTok",
        url: "https://www.tiktok.com/@greenwichdancecrew",
        icon: faTiktok,
        bgColor: "bg-white/10 hover:bg-white/20",
        textColor: "text-white",
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/@greenwichdancecrew",
        icon: faYoutube,
        bgColor: "bg-red-600/20 hover:bg-red-600/30",
        textColor: "text-red-500",
      },
    ],
    []
  );

  const onChangeField = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Reset submit status on input
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await getRecaptchaToken();

      // Simulate API call - in production, this would call your backend
      // POST /api/contact with recaptchaToken and formData
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Form submitted:", {
        ...formData,
        recaptchaToken,
        timestamp: new Date().toISOString(),
      });

      setSubmitStatus("success");
      setFormData(initialFormState);
      setFormErrors({});

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetrySubmit = async () => {
    onSubmitForm({ preventDefault: () => {} });
  };

  return (
    <main className="relative overflow-hidden w-full min-h-[var(--pub-main-min-height)] my-[var(--pub-main-margin-y)] px-[var(--pub-container-padding-x-mobile)] md:px-[var(--pub-container-padding-x)]">
      {/* Background decorations */}
      <div className="absolute top-6 -left-20 w-64 h-64 rounded-full blur-3xl bg-[#DB3F7A]/10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl bg-[#DB3F7A]/5 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative mb-12">
        <div className="rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_14%_22%,_#1c1c1e_0%,_#080809_100%)] p-6 text-white sm:p-8 md:p-12">
          <div className="pointer-events-none absolute -left-14 top-8 h-44 w-44 rounded-full bg-[#DB3F7A]/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-60 w-60 rounded-full bg-[#DB3F7A]/5 blur-3xl" />

          <div className="relative flex flex-col gap-6">
            <p className="monument-regular text-xs uppercase tracking-[0.3em] text-white/45">
              Get in Touch
            </p>

            <h1 className="monument-extra-bold uppercase text-4xl leading-[1.04] sm:text-5xl md:text-6xl max-w-3xl">
              Contact
              <br />
              <span className="text-[#DB3F7A]">The Crew</span>
            </h1>

            <p className="max-w-2xl text-sm font-light leading-7 text-white/75 md:text-base">
              Have questions about club activities, collaboration opportunities, sponsorship, or
              event registration? We're here to help! Choose your preferred contact method below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods & Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Methods Column */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="monument-extra-bold text-2xl uppercase text-white mb-6">
            Contact Methods
          </h2>

          {contactMethods.map((method, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-white/10 bg-[#0d0d0f] p-4 hover:border-[#DB3F7A]/50 transition-all duration-300 hover:shadow-[0_24px_48px_rgba(219,63,122,0.15)]"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#DB3F7A]/20 text-[#DB3F7A]">
                    <FontAwesomeIcon icon={method.icon} size="lg" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                    {method.title}
                  </p>

                  {method.actionType === "link" ? (
                    <a
                      href={method.action}
                      className="block text-base font-semibold text-white hover:text-[#DB3F7A] transition-colors break-all"
                    >
                      {method.value}
                    </a>
                  ) : method.actionType === "external" ? (
                    <a
                      href={method.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-base font-semibold text-white hover:text-[#DB3F7A] transition-colors"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="text-base font-semibold text-white">
                      {method.value}
                    </p>
                  )}

                  <p className="mt-1 text-xs text-white/50">{method.note}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Quick Tips */}
          <div className="rounded-2xl border border-[#DB3F7A]/30 bg-[#DB3F7A]/10 p-4 mt-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#DB3F7A] font-semibold mb-2">
              Quick Tip
            </p>
            <p className="text-sm leading-relaxed text-white/75">
              For faster responses on event registration issues, include your full name,
              student email, and event code.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-6 md:p-8">
            <h2 className="monument-extra-bold text-2xl uppercase text-white mb-6">
              Send us a Message
            </h2>

            <form className="space-y-5" onSubmit={onSubmitForm}>
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Full Name <span className="text-[#DB3F7A]">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={onChangeField}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-[#1c1c1e] text-white placeholder:text-white/40 focus:outline-none ${
                    formErrors.fullName
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
                      : "border-white/15 focus:border-[#DB3F7A] focus:ring-1 focus:ring-[#DB3F7A]/50"
                  }`}
                  placeholder="Nguyen Van A"
                />
                {formErrors.fullName && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <FontAwesomeIcon icon={faExclamationTriangle} size="xs" />
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Email <span className="text-[#DB3F7A]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChangeField}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-[#1c1c1e] text-white placeholder:text-white/40 focus:outline-none ${
                    formErrors.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
                      : "border-white/15 focus:border-[#DB3F7A] focus:ring-1 focus:ring-[#DB3F7A]/50"
                  }`}
                  placeholder="your@email.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <FontAwesomeIcon icon={faExclamationTriangle} size="xs" />
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Message <span className="text-[#DB3F7A]">*</span>
                </label>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={onChangeField}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-[#1c1c1e] text-white placeholder:text-white/40 focus:outline-none resize-none ${
                    formErrors.message
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
                      : "border-white/15 focus:border-[#DB3F7A] focus:ring-1 focus:ring-[#DB3F7A]/50"
                  }`}
                  placeholder="Tell us how we can help you..."
                />
                {formErrors.message && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <FontAwesomeIcon icon={faExclamationTriangle} size="xs" />
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* reCAPTCHA Notice */}
              <p className="text-xs text-white/50">
                This site is protected by reCAPTCHA and the Google
                <a href="https://policies.google.com/privacy" className="text-[#DB3F7A] hover:text-[#DB3F7A]/80 ml-1">Privacy Policy</a> and
                <a href="https://policies.google.com/terms" className="text-[#DB3F7A] hover:text-[#DB3F7A]/80 ml-1">Terms of Service</a> apply.
              </p>

              {/* Submit Status Messages */}
              {submitStatus === "success" && (
                <div className="rounded-lg bg-green-500/10 border border-green-500/50 p-4 flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-400">Thank you for contacting us!</p>
                    <p className="text-sm text-green-400/80 mt-1">
                      We will respond to your message within 24-48 hours. Please check your email for updates.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/50 p-4 flex items-start gap-3">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-red-400">Failed to send message</p>
                    <p className="text-sm text-red-400/80 mt-1">
                      Something went wrong. Please try again or contact us directly.
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-lg bg-[#DB3F7A] hover:bg-[#DB3F7A]/80 disabled:bg-[#DB3F7A]/50 disabled:cursor-not-allowed text-white font-semibold uppercase tracking-wider transition-all duration-200"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus === "error" && (
                  <button
                    type="button"
                    onClick={handleRetrySubmit}
                    disabled={isSubmitting}
                    className="py-3 px-4 rounded-lg border border-white/20 hover:border-[#DB3F7A]/50 text-white font-semibold uppercase tracking-wider transition-colors"
                  >
                    Retry
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Google Maps Section */}
      <section className="mb-12">
        <h2 className="monument-extra-bold text-2xl uppercase text-white mb-6">
          Visit Us
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Info Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-6">
            <h3 className="monument-extra-bold text-lg uppercase text-white mb-4">
              FPT University
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                  Campus
                </p>
                <p className="text-sm text-white/85">
                  Lot E, Dong Nai Province, Vietnam
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                  Building
                </p>
                <p className="text-sm text-white/85">
                  Main Campus, Building A
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=FPT+University+Dong+Nai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-[#DB3F7A]/20 border border-[#DB3F7A]/50 text-[#DB3F7A] hover:bg-[#DB3F7A]/30 transition-colors text-sm font-semibold"
              >
                <FontAwesomeIcon icon={faMapLocationDot} size="sm" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 overflow-hidden bg-[#1c1c1e] h-80">
            <iframe
              title="FPT University Dong Nai Campus"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5341393477006!2d106.76831599999999!3d10.840000100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sFPT+University+Dong+Nai!2sLot+E,+Dong+Nai+Province,+Vietnam!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section>
        <h2 className="monument-extra-bold text-2xl uppercase text-white mb-6">
          Connect With Us
        </h2>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d0f] p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Social Description */}
            <div>
              <p className="text-sm leading-relaxed text-white/75 mb-6">
                Follow us on social media to stay updated with the latest news, performances,
                behind-the-scenes content, and announcements. You can also send us direct messages
                on any platform!
              </p>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">
                  Popular Platforms
                </p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Instagram: Latest photos & reels</li>
                  <li>• TikTok: Short dance videos & clips</li>
                  <li>• Facebook: Event updates & announcements</li>
                  <li>• YouTube: Full performance videos</li>
                </ul>
              </div>
            </div>

            {/* Social Links Grid */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-white/10 transition-all duration-300 group/social ${link.bgColor}`}
                    title={link.name}
                  >
                    <FontAwesomeIcon
                      icon={link.icon}
                      size="2x"
                      className={`${link.textColor} group-hover/social:scale-110 transition-transform`}
                    />
                    <span className="text-xs font-semibold text-white/75 group-hover/social:text-white text-center">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

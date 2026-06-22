import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with us!</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>Have questions about our products, bulk orders, or partnerships? Reach out to us!</p>

              <div className="contact-items">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div>
                    <h4>Address</h4>
                    <p>Pandual, Madhubani, Bihar, India</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+919152150599">+91 9152150599</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:info@aapnamakhana.com">info@aapnamakhana.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">💬</span>
                  <div>
                    <h4>WhatsApp</h4>
                    <a href="https://wa.me/919152150599" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              {submitted && <div className="alert alert-success">Thank you! Your message has been sent. We'll get back to you soon.</div>}
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="input-field" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="Enter your phone number" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea className="input-field" rows="5" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

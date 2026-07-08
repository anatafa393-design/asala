import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'interior',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request or format whatsapp redirection
    setSubmitted(true);
    setTimeout(() => {
      // Auto redirect to WhatsApp with pre-filled message (adds excellent convenience)
      const serviceNames = {
        interior: 'تصميم داخلي وتشطيب',
        exterior: 'تصميم خارجي ولاندسكيب',
        commercial: 'تجهيز معارض ومكاتب',
        contracting: 'إدارة مشاريع ومقاولات عامة'
      };
      const text = `السلام عليكم ورحمة الله،\nأنا الاسم: ${formData.name}\nالجوال: ${formData.phone}\nالطلب: استفسار بخصوص ${serviceNames[formData.service]}\nالتفاصيل: ${formData.message}`;
      const whatsappUrl = `https://wa.me/966507030093?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }, 1500);
  };

  return (
    <section id="contact-form-section" className="section contact-form-section">
      <div className="contact-form-container">
        <h2 className="section-title">اطلب <span className="gold-text">استشارتك الآن</span></h2>
        <p className="contact-subtitle">سواء كان مشروعك سكنياً أو تجارياً، نحن هنا لمساعدتك في بناء مساحتك الفاخرة</p>

        {submitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>تم استلام طلبك بنجاح!</h3>
            <p>جاري توجيهك إلى الواتساب للتواصل المباشر مع المهندس المختص...</p>
          </div>
        ) : (
          <form className="contact-inquiry-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">الاسم الكريم</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="أدخل اسمك الكريم"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">رقم الجوال</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required 
                  placeholder="05xxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني (اختياري)</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="service">الخدمة المطلوبة</label>
                <select 
                  id="service" 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="interior">تصميم داخلي وتشطيب</option>
                  <option value="exterior">تصميم خارجي ولاندسكيب</option>
                  <option value="commercial">تجهيز معارض ومكاتب تجارية</option>
                  <option value="contracting">إدارة مشاريع ومقاولات عامة</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="message">تفاصيل المشروع / الرسالة</label>
              <textarea 
                id="message" 
                name="message" 
                rows="4" 
                required 
                placeholder="صف لنا مساحة مشروعك، متطلباتك، وتفضيلاتك البصرية..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="form-submit-btn">
              إرسال الطلب والتواصل
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;

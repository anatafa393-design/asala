import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "م. طارق العبدالله",
    role: "صاحب فيلا خاصة",
    initials: "ط",
    rating: 5,
    text: "فريق أصالة كان احترافياً منذ اللحظة الأولى. أبدعوا في التصميم الداخلي والخارجي للفيلا وكانت جودة التشطيب والتنفيذ تفوق التوقعات."
  },
  {
    name: "شركة الأفق العقارية",
    role: "مطور عقاري",
    initials: "أ",
    rating: 5,
    text: "تعاملنا مع أصالة في تنفيذ عدة مشاريع سكنية وتجارية. يتميزون بالدقة في المواعيد، الفخامة في التصميم، والاهتمام الاستثنائي بالتفاصيل."
  },
  {
    name: "د. خالد السالم",
    role: "مالك مطعم فاخر",
    initials: "خ",
    rating: 5,
    text: "حولت أصالة مساحة مطعمي إلى تحفة فنية حديثة. تصميم الديكور الداخلي ساهم بشكل كبير في جذب الزبائن وعكس هوية المطعم الفاخرة."
  }
];

const Testimonials = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.testimonial-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <section id="testimonials" className="section testimonials-section" ref={containerRef}>
      <h2 className="section-title">آراء <span className="gold-text">العملاء</span></h2>
      <div className="testimonials-grid">
        {testimonials.map((item, idx) => (
          <div key={idx} className="testimonial-card">
            <Quote className="quote-icon" size={40} />
            
            {/* Star Rating */}
            <div className="rating-stars">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} className="star-icon" size={16} />
              ))}
            </div>

            <p className="testimonial-text">{item.text}</p>
            
            {/* Author Wrapper with Avatar */}
            <div className="testimonial-author-wrapper">
              <div className="testimonial-avatar">
                {item.initials}
              </div>
              <div className="testimonial-author-info">
                <h4 className="author-name">{item.name}</h4>
                <span className="author-role">{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

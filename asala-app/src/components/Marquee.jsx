import './Marquee.css';

const marqueeImages = [
  '/images/ديكورات_اسقف/1.webp',
  '/images/ديكورات_جدران/1.webp',
  '/images/ديكورات_مطابخ/1.webp',
  '/images/ديكورات_غرف_نوم/1.webp',
  '/images/صور ديكور مكاتب/imgi_108_modern-office-decor.webp',
  '/images/ديكورات_مجالس/imgi_165_2-5-scaled.webp',
  '/images/ديكورات_حمامات/1.webp',
  '/images/صور ديكور مطاعم فاخره/imgi_119_ديكورات-بارات-مطاعم.webp'
];

const Marquee = () => {
  return (
    <div className="marquee-container" dir="ltr">
      <div className="marquee-track">
        {/* We duplicate the images to create an infinite loop effect */}
        {[...marqueeImages, ...marqueeImages, ...marqueeImages].map((src, index) => (
          <div key={index} className="marquee-item">
            <img src={src} alt={`Decor showcase ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

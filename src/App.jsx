import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

import whatsappIcon from './image/whatsapp.png';
import facebookIcon from './image/facebook.png';
import youtubeIcon from './image/youtube.png';
import instagramIcon from './image/insta.jpg';

const defaultHeroImages = [
  "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
];

// Generate 25 default events
const defaultEvents = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  title: `Community Welfare & Medical Outreach Drive #${index + 1}`,
  date: `Batch Date: 1${index % 10}th of Month, 2025-2026`,
  desc: "Successfully conducted free general health screening, distributed prescription opticals to elderly citizens, and provided notebooks to poor students.",
  photos: [
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80"
  ]
}));

// Generate 50 default gallery items
const defaultGallery = Array.from({ length: 50 }, (_, index) => {
  const seed = index + 1;
  return {
    id: seed,
    title: `Community Outreach & Medical Camp Memory #${seed}`,
    date: `2025-2026 Batch`,
    photos: [
      `https://picsum.photos/seed/trust${seed}a/400/300`,
      `https://picsum.photos/seed/trust${seed}b/400/300`,
      `https://picsum.photos/seed/trust${seed}c/400/300`
    ]
  };
});

// Generate 8 past events done items for home page
const defaultPastEvents = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  title: `Past Community Drive #${index + 1}`,
  date: `Jan 1${index}, 2026`,
  img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=400&q=80"
}));

function useSiteData() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('seeman_trust_master_ultimate_data');
    return saved ? JSON.parse(saved) : {
      topHeaderImg: "",
      trustTitle: "SEEMAN A.DHANRAJ",
      trustSubtitle: "EDUCATIONAL AND MEDICAL TRUST",
      heroImages: defaultHeroImages,
      heroTitle: "EMPOWERING LIVES THROUGH EDUCATION & HEALTHCARE",
      heroTagline: "Supporting underprivileged communities with free medical camps, medicines, and educational opportunities.",
      
      // Impact Videos / YouTube section
      youtubeEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      impactCards: [
        { title: "EDUCATIONAL PATHWAYS", desc: "Helping poor students reach their full potential." },
        { title: "RURAL HEALTH CAMP", desc: "Supporting underprivileged with free medical camps." },
        { title: "OPTICAL DRIVE SUCCESS", desc: "Conducting free health checkups, medicine & opticals." },
        { title: "COMMUNITY EMPOWERMENT", desc: "Empowering women and celebrating opportunities." }
      ],

      pastEvents: defaultPastEvents,

      aboutTitle: "About Seeman A.Dhanaraj Educational And Medical Trust",
      aboutText: "Founded with a noble vision to uplift the underprivileged, our trust is dedicated to bridging societal gaps through robust educational support, regular rural health camps, free medicine distribution, optical care, and impactful community celebrations like Women's Day and Independence Day.",
      
      initiativesTitle: "Our Initiatives & Programs",
      initiativesText: "We provide comprehensive assistance ranging from educational toolkits and school uniforms to rural medical checkups, free prescription medicines, and optical distribution drives.",
      
      donateAccountName: "Seeman A.Dhanaraj Educational And Medical Trust",
      donateAccountNo: "XXXXXXXXXXXXXX",
      donateIfsc: "XXXX0000XXX",
      donateQrImg: "",
      donateText: "Your contribution directly helps a poor student study or brings life-saving medical care to someone in dire need.",
      
      contactEmail: "contact@seemanadhanrajtrust.org",
      contactPhone: "+91 8608525464",
      contactAddress: "Seeman A.Dhanraj Trust Headquarters, Tamil Nadu, India",
      
      events: defaultEvents,
      gallery: defaultGallery
    };
  });

  useEffect(() => {
    localStorage.setItem('seeman_trust_master_ultimate_data', JSON.stringify(data));
  }, [data]);

  return [data, setData];
}

function FooterContact({ siteData }) {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div className="footer-contact-info">
          <h3>Contact Us & Location</h3>
          <p><strong>WhatsApp:</strong> {siteData.contactPhone}</p>
          <p><strong>Email:</strong> {siteData.contactEmail}</p>
          <p><strong>Address:</strong> {siteData.contactAddress}</p>
        </div>
        <div className="footer-map-box">
          <iframe 
            title="Trust Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.840428987332!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzU3LjgiTiA4MCU5NicxNC41IkU!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin" 
            width="100%" 
            height="180" 
            style={{ border: 0, borderRadius: '4px' }} 
            allowFullScreen="" 
            loading="lazy">
          </iframe>
        </div>
        <div className="footer-bottom-bar">
          <p>&copy; 2026 Seeman A.Dhanraj Educational And Medical Trust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function Home({ siteData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const heroImages = siteData.heroImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div>
      <header className="hero" style={{ backgroundImage: `url(${heroImages[currentSlide] || defaultHeroImages[0]})` }}>
        <div className="hero-overlay"></div>
        <button className="slider-btn prev" onClick={prevSlide}>&#10094;</button>
        <div className="hero-content">
          <h2>{siteData.heroTitle}</h2>
          <p className="tagline">{siteData.heroTagline}</p>
          <button onClick={() => navigate('/donate')} className="btn primary">DONATE NOW</button>
        </div>
        <button className="slider-btn next" onClick={nextSlide}>&#10095;</button>
        
        <div className="slider-dots">
          {heroImages.map((_, index) => (
            <span key={index} className={`dot ${currentSlide === index ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></span>
          ))}
        </div>
      </header>

      {/* Impact & YouTube Video Section */}
      <section className="section impact-section">
        <div className="container">
          <h2>OUR IMPACT & VIDEO HIGHLIGHT</h2>
          <div className="home-youtube-container" style={{ marginBottom: '2.5rem' }}>
            <iframe 
              width="100%" 
              height="400" 
              src={siteData.youtubeEmbedUrl} 
              title="Trust YouTube Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              style={{ borderRadius: '8px', maxWidth: '800px' }}>
            </iframe>
          </div>

          <div className="video-grid">
            {siteData.impactCards.map((card, idx) => (
              <div key={idx} className="video-card">
                <div className="video-thumbnail-placeholder">▶</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Done 8-Grid Section */}
      <section className="section events-done-section">
        <div className="container">
          <h2>OUR EVENTS DONE</h2>
          <p className="section-subtitle">A glimpse into our successful community drives and past programs.</p>
          <div className="events-8-grid">
            {siteData.pastEvents.map((ev) => (
              <div key={ev.id} className="event-box-card">
                <div className="event-img-placeholder" style={{ backgroundImage: `url(${ev.img})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'transparent' }}>
                  📷 Event Image
                </div>
                <span className="event-box-date">{ev.date}</span>
                <h4>{ev.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section events-section">
        <div className="container">
          <h2>UPCOMING EVENTS</h2>
          <div className="event-cards">
            <div className="event-card"><span className="event-date">Oct 26, 2026</span><h3>Medical Camp in Village X</h3></div>
            <div className="event-card"><span className="event-date">Mar 18, 2026</span><h3>Women's Day Celebration</h3></div>
          </div>
        </div>
      </section>
      <FooterContact siteData={siteData} />
    </div>
  );
}

function AboutPage({ siteData }) {
  return (
    <div className="page-wrapper">
      <div className="page-container">
        <h2>{siteData.aboutTitle}</h2>
        <p>{siteData.aboutText}</p>
      </div>
      <FooterContact siteData={siteData} />
    </div>
  );
}

function InitiativesPage({ siteData }) {
  return (
    <div className="page-wrapper">
      <div className="page-container">
        <h2>{siteData.initiativesTitle}</h2>
        <p style={{ marginBottom: '1.5rem' }}>{siteData.initiativesText}</p>
        <div className="detailed-list">
          <div className="detail-item"><h3>📚 Educational Support</h3><p>Providing tuition assistance, school bags, notebooks, and uniforms.</p></div>
          <div className="detail-item"><h3>🩺 Medical Camps</h3><p>Offering free clinical checkups and essential medicines in rural areas.</p></div>
          <div className="detail-item"><h3>👓 Free Opticals</h3><p>Vision screening and free prescription spectacles for elderly and needy citizens.</p></div>
        </div>
      </div>
      <FooterContact siteData={siteData} />
    </div>
  );
}

function EventImageSlider({ images }) {
  const [currIdx, setCurrIdx] = useState(0);

  const prevPhoto = (e) => {
    e.stopPropagation();
    setCurrIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setCurrIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="event-photo-slider">
      <img src={images[currIdx]} alt="Event slide" className="slider-img" />
      <button className="mini-slide-btn prev-btn" onClick={prevPhoto}>&#10094;</button>
      <button className="mini-slide-btn next-btn" onClick={nextPhoto}>&#10095;</button>
      <div className="mini-dots">
        {images.map((_, i) => (
          <span key={i} className={`mini-dot ${currIdx === i ? 'active' : ''}`}></span>
        ))}
      </div>
    </div>
  );
}

function EventsPage({ siteData }) {
  return (
    <div className="page-wrapper">
      <div className="page-container">
        <h2>Trust Events & Detailed Lineup (25 Events)</h2>
        <p>Explore our complete timeline of welfare programs. Use arrows on each event photo box to slide through photos.</p>
        
        <div className="events-lineup">
          {siteData.events.map((ev) => (
            <div key={ev.id} className="event-lineup-card">
              <div className="event-large-img-box">
                <EventImageSlider images={ev.photos} />
              </div>
              <div className="event-lineup-info">
                <span className="event-badge">{ev.date}</span>
                <h3>{ev.title}</h3>
                <p>{ev.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterContact siteData={siteData} />
    </div>
  );
}

function GallerySlider({ images }) {
  const [currIdx, setCurrIdx] = useState(0);

  const prevPhoto = (e) => {
    e.stopPropagation();
    setCurrIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setCurrIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="event-photo-slider">
      <img src={images[currIdx]} alt="Gallery slide" className="slider-img" />
      <button className="mini-slide-btn prev-btn" onClick={prevPhoto}>&#10094;</button>
      <button className="mini-slide-btn next-btn" onClick={nextPhoto}>&#10095;</button>
      <div className="mini-dots">
        {images.map((_, i) => (
          <span key={i} className={`mini-dot ${currIdx === i ? 'active' : ''}`}></span>
        ))}
      </div>
    </div>
  );
}

function GalleryPage({ siteData }) {
  return (
    <div className="page-wrapper">
      <div className="page-container" style={{ maxWidth: '1200px' }}>
        <h2>Trust Photo Gallery (50 Items)</h2>
        <p>Browse through moments captured across our camps and drives. Slide through 3 photos per item like a shopping app!</p>
        
        <div className="gallery-grid">
          {siteData.gallery.map((item) => (
            <div key={item.id} className="gallery-item-card">
              <div className="gallery-slider-box">
                <GallerySlider images={item.photos} />
              </div>
              <div className="gallery-caption">
                <span className="gallery-date">{item.date}</span>
                <h4>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterContact siteData={siteData} />
    </div>
  );
}

function DonatePage({ siteData }) {
  return (
    <div className="page-wrapper">
      <div className="page-container">
        <h2>Support Our Cause</h2>
        <p>{siteData.donateText}</p>
        
        <div className="donation-box">
          <h3>Bank Transfer Details & Payment Scanner</h3>
          <p><strong>Account Name:</strong> {siteData.donateAccountName}</p>
          <p><strong>Account Number:</strong> {siteData.donateAccountNo}</p>
          <p><strong>IFSC Code:</strong> {siteData.donateIfsc}</p>

          {siteData.donateQrImg && (
            <div className="qr-container" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <h4>Scan & Donate (QR / Scanner)</h4>
              <img src={siteData.donateQrImg} alt="Payment Scanner" style={{ maxHeight: '180px', marginTop: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          )}
        </div>
      </div>
      <FooterContact siteData={siteData} />
    </div>
  );
}

// --- MASTER ADMIN DASHBOARD PAGE ---
function AdminPage({ siteData, setSiteData }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === "admin9791") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Incorrect Password! Please enter admin9791.");
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setSiteData(prev => ({ ...prev, [name]: value }));
  };

  const handleImpactCardChange = (index, field, value) => {
    const updatedCards = [...siteData.impactCards];
    updatedCards[index][field] = value;
    setSiteData(prev => ({ ...prev, impactCards: updatedCards }));
  };

  const handlePastEventChange = (index, field, value) => {
    const updatedPast = [...siteData.pastEvents];
    updatedPast[index][field] = value;
    setSiteData(prev => ({ ...prev, pastEvents: updatedPast }));
  };

  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...siteData.events];
    updatedEvents[index][field] = value;
    setSiteData(prev => ({ ...prev, events: updatedEvents }));
  };

  const handleGalleryChange = (index, field, value) => {
    const updatedGallery = [...siteData.gallery];
    updatedGallery[index][field] = value;
    setSiteData(prev => ({ ...prev, gallery: updatedGallery }));
  };

  const handleFileUpload = (e, targetField, eventIndex = null, photoIndex = null, galleryIndex = null, pastIndex = null) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (targetField === 'topHeaderImg') {
          setSiteData(prev => ({ ...prev, topHeaderImg: result }));
        } else if (targetField === 'donateQrImg') {
          setSiteData(prev => ({ ...prev, donateQrImg: result }));
        } else if (targetField === 'pastEventImg') {
          const updatedPast = [...siteData.pastEvents];
          updatedPast[pastIndex].img = result;
          setSiteData(prev => ({ ...prev, pastEvents: updatedPast }));
        } else if (targetField === 'eventPhoto') {
          const updatedEvents = [...siteData.events];
          updatedEvents[eventIndex].photos[photoIndex] = result;
          setSiteData(prev => ({ ...prev, events: updatedEvents }));
        } else if (targetField === 'galleryPhoto') {
          const updatedGallery = [...siteData.gallery];
          updatedGallery[galleryIndex].photos[photoIndex] = result;
          setSiteData(prev => ({ ...prev, gallery: updatedGallery }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    setSuccessMsg("All changes saved successfully! Website updated live.");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  if (!isAuthenticated) {
    return (
      <div className="page-wrapper">
        <div className="admin-login-container">
          <h2>🔒 Admin Portal Login</h2>
          <p>Enter your password to access the master content management system.</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={passwordInput} 
              onChange={(e) => setPasswordInput(e.target.value)} 
              required
            />
            <button type="submit" className="btn primary">Login</button>
            {errorMsg && <p className="error-text">{errorMsg}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="admin-dashboard-container" style={{ maxWidth: '1000px' }}>
        <h2>⚙️ Master Website Content Management Admin</h2>
        <p>Edit every single word, heading, video link, and image slot across all 25 events, 50 gallery items, 8 past events, donation details, and header banner.</p>
        
        {successMsg && <div className="success-banner">{successMsg}</div>}

        <form onSubmit={handleSaveAll} className="admin-form">
          
          {/* Header & Logo */}
          <div className="admin-section-box">
            <h3>1. Trust Header Banner & Logo</h3>
            {siteData.topHeaderImg && (
              <div style={{ margin: '10px 0' }}>
                <img src={siteData.topHeaderImg} alt="Header Preview" style={{ maxHeight: '80px', borderRadius: '4px' }} />
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'topHeaderImg')} />
            
            <label style={{ marginTop: '10px' }}>Trust Title Name:</label>
            <input type="text" name="trustTitle" value={siteData.trustTitle} onChange={handleTextChange} />
            <label>Trust Subtitle:</label>
            <input type="text" name="trustSubtitle" value={siteData.trustSubtitle} onChange={handleTextChange} />
          </div>

          {/* Home Hero & YouTube */}
          <div className="admin-section-box">
            <h3>2. Home Page Hero & YouTube Video</h3>
            <label>Hero Heading:</label>
            <input type="text" name="heroTitle" value={siteData.heroTitle} onChange={handleTextChange} />
            <label>Hero Tagline:</label>
            <textarea name="heroTagline" value={siteData.heroTagline} onChange={handleTextChange} rows="2" />
            <label style={{ marginTop: '10px' }}>YouTube Embed URL (e.g. https://www.youtube.com/embed/VIDEO_ID):</label>
            <input type="text" name="youtubeEmbedUrl" value={siteData.youtubeEmbedUrl} onChange={handleTextChange} />
          </div>

          {/* Impact 4 Cards */}
          <div className="admin-section-box">
            <h3>3. Home Impact Cards (4 Cards)</h3>
            {siteData.impactCards.map((card, idx) => (
              <div key={idx} className="admin-sub-box">
                <h4>Impact Card #{idx + 1}</h4>
                <label>Title:</label>
                <input type="text" value={card.title} onChange={(e) => handleImpactCardChange(idx, 'title', e.target.value)} />
                <label>Description:</label>
                <input type="text" value={card.desc} onChange={(e) => handleImpactCardChange(idx, 'desc', e.target.value)} />
              </div>
            ))}
          </div>

          {/* Past Events Done 8-Grid */}
          <div className="admin-section-box">
            <h3>4. Home "Our Events Done" (8 Slots)</h3>
            {siteData.pastEvents.map((pev, idx) => (
              <div key={pev.id} className="admin-sub-box">
                <h4>Past Event #{pev.id}</h4>
                <label>Title:</label>
                <input type="text" value={pev.title} onChange={(e) => handlePastEventChange(idx, 'title', e.target.value)} />
                <label>Date:</label>
                <input type="text" value={pev.date} onChange={(e) => handlePastEventChange(idx, 'date', e.target.value)} />
                <label style={{ marginTop: '6px' }}>Upload Image:</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'pastEventImg', null, null, null, idx)} />
              </div>
            ))}
          </div>

          {/* About & Initiatives */}
          <div className="admin-section-box">
            <h3>5. About Us & Initiatives Pages</h3>
            <label>About Page Heading:</label>
            <input type="text" name="aboutTitle" value={siteData.aboutTitle} onChange={handleTextChange} />
            <label>About Page Text:</label>
            <textarea name="aboutText" value={siteData.aboutText} onChange={handleTextChange} rows="3" />
            <label style={{ marginTop: '10px' }}>Initiatives Page Heading:</label>
            <input type="text" name="initiativesTitle" value={siteData.initiativesTitle} onChange={handleTextChange} />
            <label>Initiatives Page Text:</label>
            <textarea name="initiativesText" value={siteData.initiativesText} onChange={handleTextChange} rows="3" />
          </div>

          {/* Donation & Scanner QR */}
          <div className="admin-section-box">
            <h3>6. Donation Page & Payment QR Scanner</h3>
            <label>Account Name:</label>
            <input type="text" name="donateAccountName" value={siteData.donateAccountName} onChange={handleTextChange} />
            <label>Account Number:</label>
            <input type="text" name="donateAccountNo" value={siteData.donateAccountNo} onChange={handleTextChange} />
            <label>IFSC Code:</label>
            <input type="text" name="donateIfsc" value={siteData.donateIfsc} onChange={handleTextChange} />
            <label>Donation Message Text:</label>
            <textarea name="donateText" value={siteData.donateText} onChange={handleTextChange} rows="2" />
            
            <p style={{ marginTop: '10px' }}><strong>Upload Payment Scanner / QR Code Image:</strong></p>
            {siteData.donateQrImg && (
              <div style={{ margin: '8px 0' }}>
                <img src={siteData.donateQrImg} alt="QR Preview" style={{ maxHeight: '120px', borderRadius: '4px' }} />
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'donateQrImg')} />
          </div>

          {/* Contact Details */}
          <div className="admin-section-box">
            <h3>7. Contact & Footer Information</h3>
            <label>Contact Phone / WhatsApp:</label>
            <input type="text" name="contactPhone" value={siteData.contactPhone} onChange={handleTextChange} />
            <label>Contact Email:</label>
            <input type="text" name="contactEmail" value={siteData.contactEmail} onChange={handleTextChange} />
            <label>Trust Address:</label>
            <input type="text" name="contactAddress" value={siteData.contactAddress} onChange={handleTextChange} />
          </div>

          {/* Events Manager - ALL 25 SLOTS */}
          <div className="admin-section-box">
            <h3>8. Events Manager (All 25 Slots Editable)</h3>
            <p>Customize each event's name, date, description, and upload its 3 slider photos:</p>
            {siteData.events.map((ev, idx) => (
              <div key={ev.id} className="admin-sub-box">
                <h4>Event Slot #{ev.id}</h4>
                <label>Title:</label>
                <input type="text" value={ev.title} onChange={(e) => handleEventChange(idx, 'title', e.target.value)} />
                <label>Date:</label>
                <input type="text" value={ev.date} onChange={(e) => handleEventChange(idx, 'date', e.target.value)} />
                <label>Description:</label>
                <input type="text" value={ev.desc} onChange={(e) => handleEventChange(idx, 'desc', e.target.value)} />
                
                <div style={{ marginTop: '8px' }}>
                  <label>Upload Slider Photo 1:</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'eventPhoto', idx, 0)} />
                  <label style={{ marginTop: '4px' }}>Upload Slider Photo 2:</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'eventPhoto', idx, 1)} />
                  <label style={{ marginTop: '4px' }}>Upload Slider Photo 3:</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'eventPhoto', idx, 2)} />
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Manager - ALL 50 SLOTS */}
          <div className="admin-section-box">
            <h3>9. Gallery Manager (All 50 Slots Editable)</h3>
            <p>Customize gallery item titles, dates, and upload their 3 slider photos:</p>
            {siteData.gallery.map((item, idx) => (
              <div key={item.id} className="admin-sub-box">
                <h4>Gallery Slot #{item.id}</h4>
                <label>Title Heading:</label>
                <input type="text" value={item.title} onChange={(e) => handleGalleryChange(idx, 'title', e.target.value)} />
                <label>Date:</label>
                <input type="text" value={item.date} onChange={(e) => handleGalleryChange(idx, 'date', e.target.value)} />
                
                <div style={{ marginTop: '8px' }}>
                  <label>Upload Photo 1:</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'galleryPhoto', null, 0, idx)} />
                  <label style={{ marginTop: '4px' }}>Upload Photo 2:</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'galleryPhoto', null, 1, idx)} />
                  <label style={{ marginTop: '4px' }}>Upload Photo 3:</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'galleryPhoto', null, 2, idx)} />
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className="btn primary save-btn">Save All Changes</button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [siteData, setSiteData] = useSiteData();

  return (
    <Router>
      <div className="trust-app">
        <header className="top-header">
          <div className="top-header-container" style={{ width: '100%', justifyContent: siteData.topHeaderImg ? 'center' : 'space-between' }}>
            {siteData.topHeaderImg ? (
              <div className="custom-header-banner">
                <img src={siteData.topHeaderImg} alt="Trust Header Banner" style={{ maxHeight: '90px', width: '100%', objectFit: 'contain' }} />
              </div>
            ) : (
              <>
                <div className="logo-box-square">
                  <span>LOGO</span>
                </div>
                <div className="brand-text">
                  <h1 className="trust-title">{siteData.trustTitle}</h1>
                  <span className="trust-subtitle">{siteData.trustSubtitle}</span>
                </div>
              </>
            )}
          </div>
        </header>

        <nav className="navbar">
          <div className="nav-container">
            <ul className="nav-links">
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/about">ABOUT US</Link></li>
              <li><Link to="/initiatives">OUR INITIATIVES</Link></li>
              <li><Link to="/events">EVENTS</Link></li>
              <li><Link to="/gallery">GALLERY</Link></li>
              <li><Link to="/donate">DONATE</Link></li>
              <li><a href="#contact">CONTACT</a></li>
            </ul>
            
            <div className="nav-social-icons">
              <a href="https://wa.me/918608525464" target="_blank" rel="noreferrer" title="WhatsApp">
                <img src={whatsappIcon} alt="WhatsApp" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a href="https://www.youtube.com/@seemandhanrajtrust5056" target="_blank" rel="noreferrer" title="YouTube">
                <img src={youtubeIcon} alt="YouTube" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
                <img src={instagramIcon} alt="Instagram" />
              </a>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home siteData={siteData} />} />
          <Route path="/about" element={<AboutPage siteData={siteData} />} />
          <Route path="/initiatives" element={<InitiativesPage siteData={siteData} />} />
          <Route path="/events" element={<EventsPage siteData={siteData} />} />
          <Route path="/gallery" element={<GalleryPage siteData={siteData} />} />
          <Route path="/donate" element={<DonatePage siteData={siteData} />} />
          <Route path="/admin" element={<AdminPage siteData={siteData} setSiteData={setSiteData} />} />
        </Routes>
      </div>
    </Router>
  );
}
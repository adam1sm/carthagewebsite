document.addEventListener('DOMContentLoaded', () => {
  // First, remove any existing click handlers that might interfere
  const allLinks = document.querySelectorAll('a[href="#"]');
  allLinks.forEach(link => {
    link.replaceWith(link.cloneNode(true));
  });

  // Explicitly handle waitlist-specific elements
  const waitlistElements = document.querySelectorAll('.waitlist-btn, .waitlist-link, .cta');
  waitlistElements.forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Handle footer navigation separately
  const footerLinks = document.querySelectorAll('.footer-section a:not(.waitlist-link)');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const linkText = link.textContent.trim();
      
      // Map sections for navigation
      const sectionMap = {
        'For Investors': 'investors',
        'For Founders': 'founders',
        'FAQ': 'faq',
        'How it Works': 'investors',
        'About Us': null,
        'Contact': null,
        'Blog (Coming Soon)': null,
        'Privacy Policy': null,
        'Terms of Service': null,
        'Disclaimers': null,
        'SEC Filings': null
      };

      const sectionId = sectionMap[linkText];
      if (sectionId) {
        scrollToSection(sectionId);
      }
    });
  });

  // Handle navbar navigation
  const navLinks = document.querySelectorAll('.navbar a:not([class])');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const linkText = link.textContent.trim();
      
      const sectionMap = {
        'How it Works': 'investors',
        'FAQ': 'faq'
      };

      const sectionId = sectionMap[linkText];
      if (sectionId) {
        scrollToSection(sectionId);
      }
    });
  });

  // Helper function for smooth scrolling
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const sectionPosition = section.getBoundingClientRect().top;
      const offsetPosition = sectionPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Modal functionality
  function openModal() {
    const modal = document.getElementById('waitlistModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('waitlistModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Make modal functions globally available
  window.openModal = openModal;
  window.closeModal = closeModal;

  // Modal close button
  const closeButton = document.querySelector('.modal-close');
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Close on outside click
  const modal = document.getElementById('waitlistModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle form submission
  const waitlistForm = document.getElementById('waitlistForm');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {
        email: formData.get('email'),
        userType: formData.get('userType')
      };
      
      console.log('Form submitted:', data);
      
      const modalContent = document.getElementById('modalContent');
      modalContent.innerHTML = `
        <div class="success-message">
          <h2 style="font-family: 'Source Serif Pro', serif; font-size: 2rem; margin-bottom: 1rem;">Thank You!</h2>
          <p style="color: #666; margin-bottom: 1.5rem;">We'll keep you updated on our progress and notify you when Carthage launches.</p>
          <button onclick="document.querySelector('.modal-close').click()" 
                  style="background-color: black; color: white; padding: 1rem 2rem; border-radius: 100px; border: none; font-weight: 600; cursor: pointer;">
            Close
          </button>
        </div>
      `;
    });
  }

  // Parallax effect for landing section
  const landingSection = document.querySelector('.landing-section');
  const heroText = document.querySelector('.hero-text');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (landingSection.getBoundingClientRect().bottom > 0) {
      landingSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
      heroText.style.transform = `translateY(${-50 + (scrolled * 0.2)}%)`;
      heroText.style.opacity = Math.max(0, 1 - (scrolled / 500));
    }
  });

  // Smooth section transitions
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Add specific animations for features sections
        if (entry.target.classList.contains('features-section')) {
          const featureContent = entry.target.querySelector('.features-content');
          const hero = entry.target.querySelector('.features-hero');
          const boxes = entry.target.querySelectorAll('.feature-box');
          
          featureContent.style.opacity = '1';
          featureContent.style.transform = 'translateY(0)';
          
          // Animate hero first
          setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
          }, 200);

          // Then animate boxes sequentially
          boxes.forEach((box, index) => {
            setTimeout(() => {
              box.style.opacity = '1';
              box.style.transform = 'translateY(0)';
            }, index * 150 + 400);
          });
        }
      }
    });
  }, {
    threshold: 0.2
  });

  sections.forEach(section => {
    if (!section.classList.contains('landing-section')) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px)';
      section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(section);
    }
  });

  // Feature boxes hover effect
  const featureBoxes = document.querySelectorAll('.feature-box');
  featureBoxes.forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(30px)';
    box.style.transition = 'all 0.3s ease-out';
    
    box.addEventListener('mouseenter', () => {
      box.style.transform = 'translateY(-5px)';
      box.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    });
    
    box.addEventListener('mouseleave', () => {
      box.style.transform = 'translateY(0)';
      box.style.boxShadow = 'none';
    });
  });

  // FAQ functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const allFaqItems = document.querySelectorAll('.faq-item');
      
      allFaqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          otherAnswer.style.maxHeight = '0';
          otherAnswer.style.padding = '0 30px';
        }
      });
      
      item.classList.toggle('active');
      
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
        answer.style.padding = '20px 30px';
      } else {
        answer.style.maxHeight = '0';
        answer.style.padding = '0 30px';
      }
    });
  });

  // Make logo click scroll to top
  const logos = document.querySelectorAll('.logo img, .footer-logo');
  logos.forEach(logo => {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

  // Add active state to navigation items based on scroll position
  window.addEventListener('scroll', () => {
    const sections = ['investors', 'founders', 'faq'].map(id => document.getElementById(id));
    const navLinks = document.querySelectorAll('.navbar a');
    
    let currentSection = '';
    
    sections.forEach(section => {
      if (section) {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          currentSection = section.id;
        }
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkText = link.textContent.trim();
      const sectionMap = {
        'For Investors': 'investors',
        'For Founders': 'founders',
        'FAQ': 'faq'
      };
      
      if (sectionMap[linkText] === currentSection) {
        link.classList.add('active');
      }
    });
  });
});
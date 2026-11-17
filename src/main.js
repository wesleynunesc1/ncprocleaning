// NC ProCleaning Main JavaScript Interactions
// Modelado a partir dos padrões da Skill alicerce-mota-layout

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Header Scroll Detection (Mota threshold: 80px)
  const header = document.getElementById('main-header');

  const handleScroll = () => {
    if (window.scrollY > 80) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOpenIcon = document.querySelector('.menu-open-icon');
  const menuCloseIcon = document.querySelector('.menu-close-icon');
  let isMenuOpen = false;

  const toggleMobileMenu = () => {
    isMenuOpen = !isMenuOpen;
    mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen ? 'true' : 'false');

    if (isMenuOpen) {
      mobileMenu.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
      mobileMenu.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      menuOpenIcon.classList.add('hidden');
      menuCloseIcon.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
      mobileMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      menuOpenIcon.classList.remove('hidden');
      menuCloseIcon.classList.add('hidden');
    }
  };

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close on mobile menu link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (isMenuOpen) toggleMobileMenu();
      });
    });
  }

  // 3. Single-Open Accordion with Morphing Icon (Mota Blueprint FAQ)
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other items first (Single-Open behavior)
      faqItems.forEach(otherItem => {
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        const otherContent = otherItem.querySelector('.faq-content');
        const otherIcon = otherItem.querySelector('.faq-icon');

        otherTrigger.setAttribute('aria-expanded', 'false');
        otherContent.style.maxHeight = null;
        otherIcon.classList.remove('rotate-45', 'bg-[#397F87]', 'text-white');
        otherIcon.classList.add('bg-gray-100', 'text-gray-500');
        otherItem.classList.remove('border-[#397F87]/50', 'shadow-md');
      });

      // Toggle current
      if (!isExpanded) {
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.classList.remove('bg-gray-100', 'text-gray-500');
        icon.classList.add('rotate-45', 'bg-[#397F87]', 'text-white');
        item.classList.add('border-[#397F87]/50', 'shadow-md');
      }
    });
  });

  // 4. Free Estimate Form Handling
  const estimateForm = document.getElementById('estimate-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');

  if (estimateForm) {
    estimateForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let hasError = false;
      const requiredInputs = estimateForm.querySelectorAll('[required]');

      requiredInputs.forEach(input => {
        const errorMsg = input.parentElement.querySelector('.error-msg');
        if (!input.value.trim()) {
          hasError = true;
          input.classList.add('border-red-500');
          if (errorMsg) errorMsg.classList.remove('hidden');
        } else {
          input.classList.remove('border-red-500');
          if (errorMsg) errorMsg.classList.add('hidden');
        }
      });

      const emailInput = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
        hasError = true;
        emailInput.classList.add('border-red-500');
        const errorMsg = emailInput.parentElement.querySelector('.error-msg');
        if (errorMsg) {
          errorMsg.textContent = 'Please enter a valid email address.';
          errorMsg.classList.remove('hidden');
        }
      }

      if (hasError) {
        showFeedback('Please correct the highlighted fields above before submitting.', 'error');
        return;
      }

      const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        company: document.getElementById('company').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        propertyType: document.getElementById('propertyType').value,
        city: document.getElementById('city').value.trim(),
        facilitySize: document.getElementById('facilitySize').value.trim() || 'Not specified',
        cleaningRequirements: document.getElementById('cleaningRequirements').value,
        details: document.getElementById('details').value.trim() || 'None provided'
      };

      submitBtn.disabled = true;
      btnSpinner.classList.remove('hidden');
      btnText.textContent = 'CONNECTING TO WHATSAPP...';

      // Immediate redirect to WhatsApp with fully structured commercial estimate message
      setTimeout(() => {
        const whatsappUrl = generateWhatsAppLink(formData);
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        submitBtn.disabled = false;
        btnSpinner.classList.add('hidden');
        btnText.textContent = 'REQUEST MY FREE ESTIMATE';

        showFeedback(`
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-white font-bold text-base">
              <svg class="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.838.896 2.796.896 3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.783-5.768-5.783zm0 10.428c-.859 0-1.688-.239-2.404-.695l-.172-.109-1.579.414.421-1.539-.113-.18c-.495-.788-.785-1.558-.785-2.553 0-2.569 2.09-4.659 4.632-4.659 2.541 0 4.631 2.09 4.631 4.659 0 2.57-2.09 4.662-4.631 4.662z"/></svg>
              <span>Redirecting to WhatsApp...</span>
            </div>
            <p class="text-white/85 text-sm">Your estimate request for <strong>${formData.company}</strong> (${formData.propertyType}) has been prepared with all your facility details.</p>
            <p class="text-white/70 text-xs">If WhatsApp did not open automatically, click the button below to send your request directly to our team:</p>
            <div class="pt-2">
              <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1eb956] transition-all shadow-lg transform hover:-translate-y-0.5">
                <span>Open WhatsApp Chat Now</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        `, 'success');

        estimateForm.reset();
      }, 600);
    });
  }

  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.classList.remove('hidden');
    if (type === 'error') {
      formFeedback.className = 'mb-6 p-4 rounded-xl text-sm font-medium bg-red-950/70 border border-red-500/50 text-red-200';
      formFeedback.innerHTML = message;
    } else {
      formFeedback.className = 'mb-6 p-6 rounded-2xl text-sm font-medium bg-[#142A3A] border border-[#397F87] text-white shadow-xl';
      formFeedback.innerHTML = message;
    }
    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function generateWhatsAppLink(data) {
    const targetPhone = '19512190248';
    const message = 
`*NEW COMMERCIAL ESTIMATE REQUEST — NC PROCLEANING*

*FACILITY & CONTACT DETAILS*
• Name: ${data.fullName}
• Organization / Company: ${data.company}
• Property Type: ${data.propertyType}
• Location: ${data.city}, Greater Boston MA
• Facility Size: ${data.facilitySize}

*CONTACT INFORMATION*
• Email: ${data.email}
• Phone: ${data.phone}

*SERVICE REQUIREMENTS*
• Schedule: ${data.cleaningRequirements}
• Additional Details: ${data.details}

Thank you! Looking forward to reviewing the service proposal.`;

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
  }

  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

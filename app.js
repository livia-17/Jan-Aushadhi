// ========================================================
// JAN AUSHADHI WEB APP - JAVASCRIPT
// With Indian Medicine MCP Server Search Engine Integration
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const locationBtn = document.getElementById('location-select-btn');
  const currentLocationEl = document.getElementById('current-location');
  const locationModal = document.getElementById('location-modal');
  const closeLocationModal = document.getElementById('close-location-modal');
  const cityItems = document.querySelectorAll('.city-item');

  const uploadBtn = document.getElementById('upload-prescription-btn');
  const fileInput = document.getElementById('prescription-file-input');

  const homeSearchInput = document.getElementById('medicine-search');
  const homeSearchActionBtn = document.getElementById('search-action-btn');

  // Search Overlay Elements
  const searchOverlay = document.getElementById('search-overlay');
  const closeSearchOverlayBtn = document.getElementById('close-search-overlay');
  const overlaySearchInput = document.getElementById('overlay-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const searchMicBtn = document.getElementById('search-mic-btn');
  const searchMedicineSection = document.getElementById('search-medicine-section');
  const searchSuggestionsContainer = document.getElementById('search-suggestions-container');
  const btnSearchClickPhoto = document.getElementById('btn-search-click-photo');
  const btnSearchSelectPhoto = document.getElementById('btn-search-select-photo');
  const filterChips = document.querySelectorAll('.filter-chip');
  const searchResultsList = document.getElementById('search-results-list');
  const resultsCountEl = document.getElementById('results-count');

  const categoryCards = document.querySelectorAll('.category-card');
  const navItems = document.querySelectorAll('.nav-item');
  const toast = document.getElementById('toast');

  let activeFilter = 'all';

  // --- Toast Notification Helper ---
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // --- Centralized Screen Elements ---
  const screenPrescriptionsMain = document.getElementById('screen-prescriptions-main');
  const screenPrescriptionUpload = document.getElementById('screen-prescription-upload');
  const screenReviewPages = document.getElementById('screen-review-pages');
  const screenCart = document.getElementById('screen-cart');
  const screenLoading = document.getElementById('screen-loading');
  const screenProductInfo = document.getElementById('screen-product-info');
  const screenPickStore = document.getElementById('screen-pick-store');
  const screenStoreInfo = document.getElementById('screen-store-info');
  const firstAidBtn = document.getElementById('first-aid-btn');

  // ========================================================
  // SCREEN NAVIGATION HISTORY SYSTEM
  // Ensures every back button returns to the immediate last step
  // ========================================================
  let navigationStack = ['home'];
  let highestScreenZIndex = 120;

  function bringToFront(el) {
    if (!el) return;
    highestScreenZIndex += 5;
    el.style.zIndex = highestScreenZIndex;
  }

  function pushScreen(screenId) {
    if (navigationStack[navigationStack.length - 1] !== screenId) {
      navigationStack.push(screenId);
    }
  }

  function navigateBack() {
    if (navigationStack.length <= 1) {
      return;
    }

    const currentScreen = navigationStack.pop();
    const previousScreen = navigationStack[navigationStack.length - 1];

    // Hide the current screen
    if (currentScreen === 'store-info') {
      if (screenStoreInfo) {
        screenStoreInfo.classList.remove('active');
        screenStoreInfo.classList.remove('preview-mode');
      }
    } else if (currentScreen === 'pick-store') {
      if (screenPickStore) screenPickStore.classList.remove('active');
    } else if (currentScreen === 'product-info') {
      if (screenProductInfo) screenProductInfo.classList.remove('active');
    } else if (currentScreen === 'cart') {
      if (screenCart) screenCart.classList.remove('active');
    } else if (currentScreen === 'review-pages') {
      if (screenReviewPages) screenReviewPages.classList.remove('active');
    } else if (currentScreen === 'prescription-upload') {
      if (screenPrescriptionUpload) screenPrescriptionUpload.classList.remove('active');
    } else if (currentScreen === 'prescriptions-main') {
      if (screenPrescriptionsMain) screenPrescriptionsMain.classList.remove('active');
    }

    // Ensure the previous screen is visible/active
    if (previousScreen === 'store-info') {
      if (screenStoreInfo) screenStoreInfo.classList.add('active');
    } else if (previousScreen === 'pick-store') {
      if (screenPickStore) screenPickStore.classList.add('active');
    } else if (previousScreen === 'product-info') {
      if (screenProductInfo) screenProductInfo.classList.add('active');
    } else if (previousScreen === 'cart') {
      if (screenCart) screenCart.classList.add('active');
    } else if (previousScreen === 'review-pages') {
      if (screenReviewPages) screenReviewPages.classList.add('active');
    } else if (previousScreen === 'prescription-upload') {
      if (screenPrescriptionUpload) screenPrescriptionUpload.classList.add('active');
    } else if (previousScreen === 'prescriptions-main') {
      if (screenPrescriptionsMain) screenPrescriptionsMain.classList.add('active');
      navItems.forEach(nav => {
        nav.classList.toggle('active', nav.dataset.tab === 'prescription');
      });
    } else if (previousScreen === 'home') {
      navItems.forEach(nav => {
        nav.classList.toggle('active', nav.dataset.tab === 'home');
      });
    }
  }

  // --- Location Selection Modal ---
  if (locationBtn && locationModal) {
    locationBtn.addEventListener('click', () => {
      locationModal.classList.add('open');
    });

    closeLocationModal.addEventListener('click', () => {
      locationModal.classList.remove('open');
    });

    locationModal.addEventListener('click', (e) => {
      if (e.target === locationModal) {
        locationModal.classList.remove('open');
      }
    });

    cityItems.forEach((item) => {
      item.addEventListener('click', () => {
        cityItems.forEach(c => {
          c.classList.remove('selected');
          const checkmark = c.querySelector('span');
          if (checkmark) checkmark.remove();
        });

        item.classList.add('selected');
        const checkSpan = document.createElement('span');
        checkSpan.textContent = ' ✓';
        item.appendChild(checkSpan);

        const selectedCity = item.dataset.city;
        currentLocationEl.textContent = selectedCity;
        locationModal.classList.remove('open');
        showToast(`Delivering to ${selectedCity}`);
      });
    });
  }

  // --- Screen: Prescription 1 (Hub) Elements ---
  const prescriptionsHubBack = document.getElementById('prescriptions-hub-back');
  const hubAddPrescriptionBox = document.getElementById('hub-add-prescription-box');
  const hubBigPlusBtn = document.getElementById('hub-big-plus-btn');
  const prescriptionSearchInput = document.getElementById('prescription-search-input');
  const hubValidateLink = document.getElementById('hub-validate-link');
  const prescriptionCards = document.querySelectorAll('.prescription-card');
  const doctorStackCards = document.querySelectorAll('.doctor-stack-card');
  const sortNewestBtn = document.getElementById('sort-newest-btn');
  const filterBtn = document.getElementById('filter-btn');
  const validRxModal = document.getElementById('valid-rx-modal');
  const closeValidRxModal = document.getElementById('close-valid-rx-modal');

  // Open Prescription 1 (Management Hub)
  function openPrescriptionsHub() {
    pushScreen('prescriptions-main');
    if (screenPrescriptionsMain) screenPrescriptionsMain.classList.add('active');
    navItems.forEach(nav => {
      nav.classList.toggle('active', nav.dataset.tab === 'prescription');
    });
  }

  function closePrescriptionsHub() {
    if (navigationStack[navigationStack.length - 1] === 'prescriptions-main') {
      navigateBack();
    } else {
      if (screenPrescriptionsMain) screenPrescriptionsMain.classList.remove('active');
      navItems.forEach(nav => {
        nav.classList.toggle('active', nav.dataset.tab === 'home');
      });
    }
  }

  if (prescriptionsHubBack) {
    prescriptionsHubBack.addEventListener('click', closePrescriptionsHub);
  }

  // Clicking (+) on Prescription 1 opens the Upload Prescription Screen & Action Sheet
  if (hubAddPrescriptionBox) {
    hubAddPrescriptionBox.addEventListener('click', () => {
      openPrescriptionScreen();
      setTimeout(openUploadOptionsSheet, 200);
    });
  }

  if (hubBigPlusBtn) {
    hubBigPlusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPrescriptionScreen();
      setTimeout(openUploadOptionsSheet, 200);
    });
  }

  // Doctor Search on Prescription Hub
  if (prescriptionSearchInput) {
    prescriptionSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      prescriptionCards.forEach(card => {
        const docName = (card.dataset.doctor || '').toLowerCase();
        card.style.display = (!q || docName.includes(q)) ? 'flex' : 'none';
      });

      doctorStackCards.forEach(card => {
        const docName = (card.dataset.doctor || '').toLowerCase();
        card.style.display = (!q || docName.includes(q)) ? 'flex' : 'none';
      });
    });
  }

  // Prescription Card Interactions
  prescriptionCards.forEach(card => {
    const docName = card.dataset.doctor;
    const date = card.dataset.date;
    const closeBtn = card.querySelector('.pcard-close-btn');

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.remove();
          showToast(`Deleted prescription from ${docName}`);
        }, 200);
      });
    }

    card.addEventListener('click', () => {
      showToast(`Viewing prescription: ${docName} (${date})`);
    });
  });

  // Doctor Stack Card Click
  doctorStackCards.forEach(card => {
    card.addEventListener('click', () => {
      const docName = card.dataset.doctor;
      showToast(`Opening prescriptions from ${docName}`);
    });
  });

  // How to validate link in Hub
  if (hubValidateLink && validRxModal) {
    hubValidateLink.addEventListener('click', (e) => {
      e.preventDefault();
      validRxModal.classList.add('open');
    });
  }

  // --- Prescription Upload Screen Elements ---
  const prescriptionScreenBack = document.getElementById('prescription-screen-back');
  const mainUploadBtn = document.getElementById('main-prescription-upload-btn');
  const mainFileInput = document.getElementById('main-prescription-file-input');
  const uploadedFileCard = document.getElementById('uploaded-file-card');
  const uploadedFileName = document.getElementById('uploaded-file-name');
  const removeFileBtn = document.getElementById('remove-file-btn');
  const validRxLinkBtn = document.getElementById('valid-prescription-link-btn');

  // Open Screen 2: Prescription Upload Screen
  function openPrescriptionScreen() {
    pushScreen('prescription-upload');
    if (screenPrescriptionUpload) screenPrescriptionUpload.classList.add('active');
  }

  function closePrescriptionScreen() {
    if (navigationStack[navigationStack.length - 1] === 'prescription-upload') {
      navigateBack();
    } else {
      if (screenPrescriptionUpload) screenPrescriptionUpload.classList.remove('active');
    }
  }

  // Hook up Homepage "Upload" Button to open Screen 2
  if (uploadBtn) {
    uploadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openPrescriptionScreen();
    });
  }

  // Screen 2 Back Button
  if (prescriptionScreenBack) {
    prescriptionScreenBack.addEventListener('click', closePrescriptionScreen);
  }

  // --- Upload Action Bottom Sheet & Elements ---
  const uploadOptionsModal = document.getElementById('upload-options-modal');
  const closeUploadOptionsBtn = document.getElementById('close-upload-options-btn');
  const optTakePhoto = document.getElementById('opt-take-photo');
  const optChooseGallery = document.getElementById('opt-choose-gallery');
  const optSavedPrescriptions = document.getElementById('opt-saved-prescriptions');
  const cameraFileInput = document.getElementById('camera-file-input');
  const galleryFileInput = document.getElementById('gallery-file-input');

  const savedRxModal = document.getElementById('saved-rx-modal');
  const closeSavedRxModal = document.getElementById('close-saved-rx-modal');
  const savedRxItems = document.querySelectorAll('.saved-rx-item');

  function openUploadOptionsSheet() {
    if (uploadOptionsModal) uploadOptionsModal.classList.add('open');
  }

  function closeUploadOptionsSheet() {
    if (uploadOptionsModal) uploadOptionsModal.classList.remove('open');
  }

  // Hook up "Upload prescription" button to open the Bottom Action Sheet
  if (mainUploadBtn) {
    mainUploadBtn.addEventListener('click', () => {
      openUploadOptionsSheet();
    });
  }

  if (closeUploadOptionsBtn) {
    closeUploadOptionsBtn.addEventListener('click', closeUploadOptionsSheet);
  }

  if (uploadOptionsModal) {
    uploadOptionsModal.addEventListener('click', (e) => {
      if (e.target === uploadOptionsModal) {
        closeUploadOptionsSheet();
      }
    });
  }

  // --- Camera Viewfinder Elements ---
  const cameraModal = document.getElementById('camera-modal');
  const closeCameraModal = document.getElementById('close-camera-modal');
  const cameraVideo = document.getElementById('camera-video');
  const cameraCanvas = document.getElementById('camera-canvas');
  const cameraShutterBtn = document.getElementById('camera-shutter-btn');
  const capturedPreviewWrapper = document.getElementById('captured-preview-wrapper');
  const capturedImagePreview = document.getElementById('captured-image-preview');
  const liveCameraControls = document.getElementById('live-camera-controls');
  const postCaptureControls = document.getElementById('post-capture-controls');
  const retakePhotoBtn = document.getElementById('retake-photo-btn');
  const usePhotoBtn = document.getElementById('use-photo-btn');

  const fileIconBox = document.getElementById('file-icon-box');
  const prescriptionPreviewThumb = document.getElementById('prescription-preview-thumb');

  let activeCameraStream = null;
  let currentCapturedDataUrl = null;

  function stopCameraStream() {
    if (activeCameraStream) {
      activeCameraStream.getTracks().forEach(track => track.stop());
      activeCameraStream = null;
    }
    if (cameraVideo) cameraVideo.srcObject = null;
  }

  async function startCamera() {
    try {
      stopCameraStream();
      const constraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      activeCameraStream = stream;
      cameraVideo.srcObject = stream;
      await cameraVideo.play();

      // Reset viewfinder state
      capturedPreviewWrapper.style.display = 'none';
      liveCameraControls.style.display = 'flex';
      postCaptureControls.style.display = 'none';
      cameraModal.classList.add('open');
    } catch (err) {
      console.warn('Direct camera stream failed, falling back to camera file input:', err);
      // Fallback directly to native camera file input
      if (cameraFileInput) cameraFileInput.click();
    }
  }

  // Close Camera Viewfinder
  if (closeCameraModal) {
    closeCameraModal.addEventListener('click', () => {
      stopCameraStream();
      cameraModal.classList.remove('open');
    });
  }

  // Camera Shutter Snap
  if (cameraShutterBtn && cameraVideo && cameraCanvas) {
    cameraShutterBtn.addEventListener('click', () => {
      cameraCanvas.width = cameraVideo.videoWidth || 640;
      cameraCanvas.height = cameraVideo.videoHeight || 480;
      const ctx = cameraCanvas.getContext('2d');
      ctx.drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height);

      currentCapturedDataUrl = cameraCanvas.toDataURL('image/jpeg', 0.92);
      capturedImagePreview.src = currentCapturedDataUrl;

      // Show approval view
      capturedPreviewWrapper.style.display = 'flex';
      liveCameraControls.style.display = 'none';
      postCaptureControls.style.display = 'flex';
    });
  }

  // Retake Photo
  if (retakePhotoBtn) {
    retakePhotoBtn.addEventListener('click', () => {
      capturedPreviewWrapper.style.display = 'none';
      liveCameraControls.style.display = 'flex';
      postCaptureControls.style.display = 'none';
      currentCapturedDataUrl = null;
    });
  }

  // --- Screen: Review Pages (Prescription 1.3) Elements & State ---
  const reviewPagesBack = document.getElementById('review-pages-back');
  const reviewPagesGrid = document.getElementById('review-pages-grid');
  const btnConfirmAddPrescription = document.getElementById('btn-confirm-add-prescription');
  const btnAddMedicinesCart = document.getElementById('btn-add-medicines-cart');
  const recentlyAddedRow = document.getElementById('recently-added-row');

  let uploadedPages = [];

  function openReviewPagesScreen(initialPageSrc = null) {
    pushScreen('review-pages');
    if (initialPageSrc) {
      if (!uploadedPages.includes(initialPageSrc)) {
        uploadedPages.push(initialPageSrc);
      }
    } else if (uploadedPages.length === 0) {
      uploadedPages.push('assets/postcard.png');
    }
    renderReviewPages();
    if (screenReviewPages) screenReviewPages.classList.add('active');
  }

  function closeReviewPagesScreen() {
    if (navigationStack[navigationStack.length - 1] === 'review-pages') {
      navigateBack();
    } else {
      if (screenReviewPages) screenReviewPages.classList.remove('active');
    }
  }

  if (reviewPagesBack) {
    reviewPagesBack.addEventListener('click', closeReviewPagesScreen);
  }

  function renderReviewPages() {
    if (!reviewPagesGrid) return;
    reviewPagesGrid.innerHTML = '';

    uploadedPages.forEach((src, idx) => {
      const pageCard = document.createElement('div');
      pageCard.className = 'review-page-card';
      pageCard.dataset.page = idx + 1;
      pageCard.innerHTML = `
        <img class="review-page-img" src="${src}" alt="Page ${idx + 1}" />
        <button class="review-page-remove-btn" aria-label="Remove page">✕</button>
      `;

      const removeBtn = pageCard.querySelector('.review-page-remove-btn');
      if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          uploadedPages.splice(idx, 1);
          renderReviewPages();
          showToast('Image removed');
          if (uploadedPages.length === 0) {
            closeReviewPagesScreen();
          }
        });
      }

      pageCard.addEventListener('click', () => {
        showToast(`Viewing Page ${idx + 1}`);
      });
      reviewPagesGrid.appendChild(pageCard);
    });

    // "Add more pages" Card
    const addMoreCard = document.createElement('div');
    addMoreCard.className = 'add-more-pages-card';
    addMoreCard.id = 'btn-add-more-pages';
    addMoreCard.innerHTML = `
      <div class="add-more-circle-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <span class="add-more-pages-text">Add more pages</span>
    `;
    addMoreCard.addEventListener('click', () => {
      openUploadOptionsSheet();
    });
    reviewPagesGrid.appendChild(addMoreCard);
  }

  // When user clicks "Add prescription" in Review Pages:
  if (btnConfirmAddPrescription) {
    btnConfirmAddPrescription.addEventListener('click', () => {
      const firstPageSrc = uploadedPages[0] || 'assets/postcard.png';
      const now = new Date();
      const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

      // Create new card in Recently Added row if row exists
      if (recentlyAddedRow) {
        const newCard = document.createElement('div');
        newCard.className = 'prescription-card';
        newCard.dataset.doctor = 'Dr. Sharma';
        newCard.dataset.date = dateStr;
        newCard.innerHTML = `
          <div class="card-doc-preview" style="background: url('${firstPageSrc}') lightgray -0.282px -0.257px / 100% 176.815% no-repeat;">
            <button class="pcard-close-btn" aria-label="Delete">✕</button>
          </div>
          <div class="card-footer-info">
            <span class="pcard-doc-name">Dr. Sharma</span>
            <span class="pcard-date">${dateStr}</span>
          </div>
        `;

        const closeBtn = newCard.querySelector('.pcard-close-btn');
        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            newCard.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            newCard.style.opacity = '0';
            newCard.style.transform = 'scale(0.8)';
            setTimeout(() => {
              newCard.remove();
              showToast('Deleted prescription');
            }, 200);
          });
        }

        newCard.addEventListener('click', () => {
          showToast(`Viewing prescription: Dr. Sharma (${dateStr})`);
        });

        recentlyAddedRow.prepend(newCard);
      }

      showLoadingScreen(1800, () => {
        if (screenReviewPages) screenReviewPages.classList.remove('active');
        if (screenPrescriptionUpload) screenPrescriptionUpload.classList.remove('active');
        navigationStack = ['home', 'prescriptions-main'];
        openPrescriptionsHub();
        showToast('Prescription added successfully!');
      });
    });
  }

  // --- Screen: Loading Animation (Prescription 1.4) ---
  function showLoadingScreen(durationMs = 1800, onComplete = null) {
    if (screenLoading) screenLoading.classList.add('active');
    setTimeout(() => {
      if (screenLoading) screenLoading.classList.remove('active');
      if (onComplete) onComplete();
    }, durationMs);
  }

  function closeLoadingScreen() {
    if (screenLoading) screenLoading.classList.remove('active');
  }

  // ========================================================
  // SCREEN: CART (Cart 1 - Prescription Extracted Medicines)
  // ========================================================
  const cartScreenBack = document.getElementById('cart-screen-back');
  const cartShareBtn = document.getElementById('cart-share-btn');
  const cartItemsList = document.getElementById('cart-items-list');
  const btnCartAddMore = document.getElementById('btn-cart-add-more');
  const cartMedicineTotal = document.getElementById('cart-medicine-total');
  const cartTotalSaving = document.getElementById('cart-total-saving');
  const btnPickStore = document.getElementById('btn-pick-store');

  const DEFAULT_PRESCRIPTION_MEDICINES = [
    {
      id: 'med-nicorandil',
      generic_name: 'Nicorandil Tablet IP 5mg',
      brand_name: '(Nikoran 5mg)',
      pack_size: '20 Tablets',
      price: 82,
      mrp: 480,
      qty: 1,
      image: 'assets/image 623.png'
    },
    {
      id: 'med-clopidogrel',
      generic_name: 'Clopidogrel 75mg & Aspirin 75mg Capsule',
      brand_name: '(Clopilet A 75mg)',
      pack_size: '10 Tablets',
      price: 21,
      mrp: 85,
      qty: 1,
      image: 'assets/image 624.png'
    },
    {
      id: 'med-rosuvastatin',
      generic_name: 'Rosuvastatin 20mg',
      brand_name: '(Rosuvas 20mg)',
      pack_size: '10 Tablets',
      price: 29,
      mrp: 420,
      qty: 1,
      image: 'assets/image 625.png'
    },
    {
      id: 'med-nebivolol',
      generic_name: 'Nebivolol 2.5 mg',
      brand_name: '(Nebicard 2.5 mg)',
      pack_size: '10 Tablets',
      price: 25,
      mrp: 239,
      qty: 1,
      image: 'assets/image 626.png'
    },
    {
      id: 'med-telmisartan',
      generic_name: 'Telmisartan Tablets IP 40mg',
      brand_name: '(Telma 40)',
      pack_size: '10 tablets',
      price: 18,
      mrp: 140,
      qty: 1,
      image: 'assets/Telmisartan 40mg.png'
    }
  ];

  // Cart starts with only the medicines the user has added (from search or prescription)
  const prescriptionMedicines = [];

  function openCartScreen() {
    closeSearchOverlay();
    pushScreen('cart');
    renderCartItems();
    bringToFront(screenCart);
    if (screenCart) screenCart.classList.add('active');
  }

  function closeCartScreen() {
    if (navigationStack[navigationStack.length - 1] === 'cart') {
      navigateBack();
    } else {
      if (screenCart) screenCart.classList.remove('active');
    }
  }

  if (cartScreenBack) {
    cartScreenBack.addEventListener('click', closeCartScreen);
  }

  if (firstAidBtn) {
    firstAidBtn.addEventListener('click', () => {
      openCartScreen();
    });
  }

  if (cartShareBtn) {
    cartShareBtn.addEventListener('click', () => {
      showToast('Cart link copied to clipboard!');
    });
  }

  if (btnCartAddMore) {
    btnCartAddMore.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openSearchOverlay('');
    });
  }

  if (btnPickStore) {
    btnPickStore.addEventListener('click', () => {
      openPickStoreScreen();
    });
  }

  // ========================================================
  // SCREEN: PICK YOUR STORE (Date & Time Slot Selection)
  // ========================================================
  const pickStoreBack = document.getElementById('pick-store-back');
  const btnSelectDate = document.getElementById('btn-select-date');
  const storeDateDisplay = document.getElementById('store-date-display');
  const calendarCard = document.getElementById('calendar-card');
  const calPrevBtn = document.getElementById('cal-prev-btn');
  const calNextBtn = document.getElementById('cal-next-btn');
  const calMonthTitle = document.getElementById('cal-month-title');
  const calDaysGrid = document.getElementById('cal-days-grid');

  const btnSelectTimeslot = document.getElementById('btn-select-timeslot');
  const storeTimeslotDisplay = document.getElementById('store-timeslot-display');
  const timeslotList = document.getElementById('timeslot-list');
  const timeslotPills = document.querySelectorAll('.timeslot-pill');

  const btnConfirmPickup = document.getElementById('btn-confirm-pickup');
  const btnChangeStore = document.getElementById('btn-change-store');
  const storeSelectModal = document.getElementById('store-select-modal');
  const storeModalClose = document.getElementById('store-modal-close');
  const storeModalList = document.getElementById('store-modal-list');
  const kendraStoreName = document.getElementById('kendra-store-name');
  const kendraStoreAddress = document.getElementById('kendra-store-address');

  // --- Interactive Calendar System ---
  const today = new Date();
  let calYear = today.getFullYear();
  let calMonth = today.getMonth(); // 0 - 11

  // Format today's date (e.g. "Wed, 28 Oct 2026")
  const defaultFormattedDate = today.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  // Pre-selected defaults for Date & Time Slot
  let selectedDateObj = {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
    formatted: defaultFormattedDate
  };
  let selectedTimeSlot = '09:00 AM - 12:00PM';

  // Helper function to get pickup date in DD-MM-YYYY format
  function getPickupDateDDMMYYYY() {
    if (selectedDateObj && selectedDateObj.day && selectedDateObj.month !== undefined && selectedDateObj.year) {
      const d = String(selectedDateObj.day).padStart(2, '0');
      const m = String(selectedDateObj.month + 1).padStart(2, '0');
      const y = selectedDateObj.year;
      return d + '-' + m + '-' + y;
    }
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const y = now.getFullYear();
    return d + '-' + m + '-' + y;
  }

  // Apply default text & class to the picker display boxes
  if (storeDateDisplay) {
    storeDateDisplay.textContent = defaultFormattedDate;
    storeDateDisplay.classList.add('has-value');
  }
  if (storeTimeslotDisplay) {
    storeTimeslotDisplay.textContent = selectedTimeSlot;
    storeTimeslotDisplay.classList.add('has-value');
  }

  function openPickStoreScreen() {
    if (!selectedKendraId && KENDRA_LIST.length > 0) {
      selectedKendraId = KENDRA_LIST[0].id;
    }
    renderKendraStoresList();
    updateConfirmPickupButton();
    pushScreen('pick-store');
    bringToFront(screenPickStore);
    if (screenPickStore) screenPickStore.classList.add('active');
  }

  function closePickStoreScreen() {
    if (navigationStack[navigationStack.length - 1] === 'pick-store') {
      navigateBack();
    } else {
      if (screenPickStore) screenPickStore.classList.remove('active');
    }
  }

  if (pickStoreBack) {
    pickStoreBack.addEventListener('click', closePickStoreScreen);
  }



  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function renderCalendar(year, month) {
    if (!calMonthTitle || !calDaysGrid) return;
    calMonthTitle.textContent = `${monthNames[month]} ${year}`;
    calDaysGrid.innerHTML = '';

    // Day of week for 1st of month: 0 is Sun, convert so Mon is 0..Sun is 6
    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = (firstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Empty cells before 1st day
    for (let i = 0; i < startOffset; i++) {
      const emptySpan = document.createElement('span');
      emptySpan.className = 'cal-day empty';
      calDaysGrid.appendChild(emptySpan);
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayBtn = document.createElement('button');
      dayBtn.type = 'button';
      dayBtn.className = 'cal-day';
      dayBtn.textContent = day;

      const dateInstance = new Date(year, month, day);
      const isPast = dateInstance < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isToday = (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      );
      const isSelected = selectedDateObj && (
        day === selectedDateObj.day &&
        month === selectedDateObj.month &&
        year === selectedDateObj.year
      );

      if (isPast) {
        dayBtn.disabled = true;
      }
      if (isToday) {
        dayBtn.classList.add('today');
      }
      if (isSelected) {
        dayBtn.classList.add('selected');
      }

      dayBtn.addEventListener('click', () => {
        const formatted = dateInstance.toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
        selectedDateObj = { day, month, year, formatted };
        if (storeDateDisplay) {
          storeDateDisplay.textContent = formatted;
          storeDateDisplay.classList.add('has-value');
        }
        if (calendarCard) {
          calendarCard.style.display = 'none';
        }
        if (btnSelectDate) {
          btnSelectDate.classList.remove('active');
        }
        renderCalendar(calYear, calMonth);
      });

      calDaysGrid.appendChild(dayBtn);
    }
  }

  // Initialize calendar
  renderCalendar(calYear, calMonth);

  if (btnSelectDate && calendarCard) {
    btnSelectDate.addEventListener('click', () => {
      const isHidden = calendarCard.style.display === 'none' || calendarCard.style.display === '';
      calendarCard.style.display = isHidden ? 'block' : 'none';
      btnSelectDate.classList.toggle('active', isHidden);
      if (isHidden) {
        renderCalendar(calYear, calMonth);
      }
    });
  }

  if (calPrevBtn) {
    calPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      calMonth--;
      if (calMonth < 0) {
        calMonth = 11;
        calYear--;
      }
      renderCalendar(calYear, calMonth);
    });
  }

  if (calNextBtn) {
    calNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      calMonth++;
      if (calMonth > 11) {
        calMonth = 0;
        calYear++;
      }
      renderCalendar(calYear, calMonth);
    });
  }

  // --- Time Slot Selection (matching media_1793126555102_797cc7cf.png) ---
  if (btnSelectTimeslot && timeslotList) {
    btnSelectTimeslot.addEventListener('click', () => {
      const isHidden = timeslotList.style.display === 'none' || timeslotList.style.display === '';
      timeslotList.style.display = isHidden ? 'flex' : 'none';
      btnSelectTimeslot.classList.toggle('active', isHidden);
      btnSelectTimeslot.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    });
  }

  timeslotPills.forEach(pill => {
    pill.addEventListener('click', () => {
      timeslotPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      selectedTimeSlot = pill.dataset.slot;
      if (storeTimeslotDisplay) {
        storeTimeslotDisplay.textContent = selectedTimeSlot;
        storeTimeslotDisplay.classList.add('has-value');
      }
      if (btnSelectTimeslot) {
        btnSelectTimeslot.classList.remove('active');
        btnSelectTimeslot.setAttribute('aria-expanded', 'false');
      }
      if (timeslotList) {
        timeslotList.style.display = 'none';
      }
    });
  });

  // --- Kendra Stores Search, Filter & Sort System ---
  const kendraSearchInput = document.getElementById('kendra-search-input');
  const kendraSearchClear = document.getElementById('kendra-search-clear');
  const btnKendraFilter = document.getElementById('btn-kendra-filter');
  const kendraChips = document.querySelectorAll('.kendra-chip');
  const btnKendraSort = document.getElementById('btn-kendra-sort');
  const kendraSortLabel = document.getElementById('kendra-sort-label');
  const kendraStoresList = document.getElementById('kendra-stores-list');

  function renderKendraStoreSvg(maskId = 'store_svg') {
    return `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask_${maskId}" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
          <rect width="32" height="32" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask_${maskId})">
          <path d="M6.66667 5.33325H25.3333C25.7111 5.33325 26.0278 5.46103 26.2833 5.71659C26.5389 5.97214 26.6667 6.28881 26.6667 6.66659C26.6667 7.04436 26.5389 7.36103 26.2833 7.61659C26.0278 7.87214 25.7111 7.99992 25.3333 7.99992H6.66667C6.28889 7.99992 5.97222 7.87214 5.71667 7.61659C5.46111 7.36103 5.33333 7.04436 5.33333 6.66659C5.33333 6.28881 5.46111 5.97214 5.71667 5.71659C5.97222 5.46103 6.28889 5.33325 6.66667 5.33325ZM6.66667 26.6666C6.28889 26.6666 5.97222 26.5388 5.71667 26.2833C5.46111 26.0277 5.33333 25.711 5.33333 25.3333V18.6666H5.1C4.67778 18.6666 4.33333 18.5055 4.06667 18.1833C3.8 17.861 3.71111 17.4888 3.8 17.0666L5.13333 10.3999C5.2 10.0888 5.35556 9.83325 5.6 9.63325C5.84444 9.43325 6.12222 9.33325 6.43333 9.33325H25.5667C25.8778 9.33325 26.1556 9.43325 26.4 9.63325C26.6444 9.83325 26.8 10.0888 26.8667 10.3999L28.2 17.0666C28.2889 17.4888 28.2 17.861 27.9333 18.1833C27.6667 18.5055 27.3222 18.6666 26.9 18.6666H26.6667V25.3333C26.6667 25.711 26.5389 26.0277 26.2833 26.2833C26.0278 26.5388 25.7111 26.6666 25.3333 26.6666C24.9556 26.6666 24.6389 26.5388 24.3833 26.2833C24.1278 26.0277 24 25.711 24 25.3333V18.6666H18.6667V25.3333C18.6667 25.711 18.5389 26.0277 18.2833 26.2833C18.0278 26.5388 17.7111 26.6666 17.3333 26.6666H6.66667ZM8 23.9999H16V18.6666H8V23.9999Z" fill="#1C1B1F"/>
        </g>
      </svg>
    `;
  }

  const KENDRA_LIST = [
    {
      id: 'kendra-chinchwad',
      name: 'Jan Aushadhi Kendra, Chinchwad',
      nameLine1: 'Jan Aushadhi',
      nameLine2: 'Kendra, Chinchwad',
      distanceNum: 2.5,
      distanceText: '2.5km away',
      code: 'PMBJK01600',
      ownerName: 'Thakur',
      ownerEmail: 'thakur34@gmail.com',
      phone: '+91 98230 16000',
      address: 'Chinchwad, Pune',
      openingHours: '09:00 AM - 06:00 PM',
      status: 'Open Now'
    },
    {
      id: 'kendra-pimpri',
      name: 'Jan Aushadhi Kendra, Pimpri',
      nameLine1: 'Jan Aushadhi',
      nameLine2: 'Kendra, Pimpri',
      distanceNum: 4.0,
      distanceText: '4km away',
      code: 'PMBJK01584',
      ownerName: 'Patil',
      ownerEmail: 'patil.kendra@gmail.com',
      phone: '+91 98230 15840',
      address: 'Pimpri, Pune',
      openingHours: '09:00 AM - 06:00 PM',
      status: 'Open Now'
    },
    {
      id: 'kendra-nigdi',
      name: 'Jan Aushadhi Kendra, Nigdi',
      nameLine1: 'Jan Aushadhi',
      nameLine2: 'Kendra, Nigdi',
      distanceNum: 6.0,
      distanceText: '6km away',
      code: 'PMBJK01720',
      ownerName: 'Sharma',
      ownerEmail: 'sharma.nigdi@gmail.com',
      phone: '+91 98230 17200',
      address: 'Nigdi, Pune',
      openingHours: '09:00 AM - 06:00 PM',
      status: 'Open Now'
    },
    {
      id: 'kendra-wakad',
      name: 'Jan Aushadhi Kendra, Wakad',
      nameLine1: 'Jan Aushadhi',
      nameLine2: 'Kendra, Wakad',
      distanceNum: 3.8,
      distanceText: '3.8km away',
      code: 'PMBJK01642',
      ownerName: 'Deshmukh',
      ownerEmail: 'deshmukh.wakad@gmail.com',
      phone: '+91 98230 16420',
      address: 'Wakad, Pune',
      openingHours: '09:00 AM - 06:00 PM',
      status: 'Open Now'
    },
    {
      id: 'kendra-bhosari',
      name: 'Jan Aushadhi Kendra, Bhosari',
      nameLine1: 'Jan Aushadhi',
      nameLine2: 'Kendra, Bhosari',
      distanceNum: 5.5,
      distanceText: '5.5km away',
      code: 'PMBJK01811',
      ownerName: 'Kulkarni',
      ownerEmail: 'kulkarni.bhosari@gmail.com',
      phone: '+91 98230 18110',
      address: 'Bhosari, Pune',
      openingHours: '09:00 AM - 06:00 PM',
      status: 'Open Now'
    }
  ];

  // Helper functions for dynamic cart-based medicine availability
  function getCartMedicineItems() {
    if (prescriptionMedicines && prescriptionMedicines.length > 0) {
      return prescriptionMedicines;
    }
    return DEFAULT_PRESCRIPTION_MEDICINES;
  }

  function getKendraAvailInfo(kendraId) {
    const medItems = getCartMedicineItems();
    const totalCount = medItems.length;
    let availCount = totalCount;

    if (totalCount <= 0) {
      availCount = 0;
    } else if (totalCount === 1) {
      availCount = (kendraId === 'kendra-nigdi') ? 0 : 1;
    } else if (kendraId === 'kendra-wakad' || kendraId === 'kendra-pimpri') {
      availCount = totalCount;
    } else if (kendraId === 'kendra-chinchwad' || kendraId === 'kendra-bhosari') {
      availCount = Math.max(1, totalCount - 1);
    } else if (kendraId === 'kendra-nigdi') {
      availCount = Math.max(1, Math.floor(totalCount * 0.25));
    }

    let colorClass = 'avail-yellow';
    if (totalCount <= 0 || availCount === 0) {
      colorClass = 'avail-red';
    } else if (availCount === totalCount) {
      colorClass = 'avail-green';
    } else if (availCount <= 1 && totalCount > 1) {
      colorClass = 'avail-red';
    }

    const availText = `${availCount} of ${totalCount} medicine${totalCount > 1 ? 's' : ''} available`;

    return {
      totalCount,
      availCount,
      colorClass,
      availText,
      medItems
    };
  }

  let selectedKendraId = 'kendra-chinchwad';
  let kendraSearchQuery = '';
  let kendraFilterMode = 'all'; // 'all' or 'full-stock'
  let kendraSortNearFirst = true;

  function updateConfirmPickupButton() {
    if (!btnConfirmPickup) return;
    if (selectedKendraId) {
      btnConfirmPickup.removeAttribute('disabled');
      btnConfirmPickup.classList.remove('disabled');
    } else {
      btnConfirmPickup.setAttribute('disabled', 'true');
      btnConfirmPickup.classList.add('disabled');
    }
  }

  function renderKendraStoresList() {
    if (!kendraStoresList) return;

    let list = KENDRA_LIST.filter(k => {
      const info = getKendraAvailInfo(k.id);
      if (!kendraSearchQuery) return true;
      const q = kendraSearchQuery.toLowerCase();
      return (
        k.name.toLowerCase().includes(q) ||
        k.distanceText.toLowerCase().includes(q) ||
        info.availText.toLowerCase().includes(q)
      );
    });

    if (kendraFilterMode === 'full-stock') {
      list = list.filter(k => {
        const info = getKendraAvailInfo(k.id);
        return info.availCount === info.totalCount && info.totalCount > 0;
      });
    }

    list.sort((a, b) => {
      return kendraSortNearFirst
        ? a.distanceNum - b.distanceNum
        : b.distanceNum - a.distanceNum;
    });

    if (list.length === 0) {
      kendraStoresList.innerHTML = `
        <div class="empty-kendra-state">
          No Kendra found matching "${kendraSearchQuery}". Try another area.
        </div>
      `;
      return;
    }

    kendraStoresList.innerHTML = list.map(k => {
      const info = getKendraAvailInfo(k.id);
      return `
      <div class="kendra-item-card ${k.id === selectedKendraId ? 'selected' : ''}" data-id="${k.id}">
        <!-- Store Icon on LEFT side -->
        <div class="kendra-card-icon-wrap">
          ${renderKendraStoreSvg(k.id)}
        </div>
        <!-- Details on RIGHT side -->
        <div class="kendra-card-content">
          <div class="kendra-card-header-row">
            <h3 class="kendra-card-name">${k.name}</h3>
            <button type="button" class="btn-kendra-eye" data-id="${k.id}" aria-label="View store details" title="View store details">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
          <div class="kendra-card-distance">${k.distanceText}</div>
          <div class="kendra-card-avail ${info.colorClass}">${info.availText}</div>
          <!-- Underlined View medicines button below availability -->
          <button type="button" class="btn-view-medicines" data-id="${k.id}">View medicines</button>
        </div>
      </div>
    `;
    }).join('');

    kendraStoresList.querySelectorAll('.kendra-item-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-view-medicines') || e.target.closest('.btn-kendra-eye')) return;
        selectedKendraId = card.dataset.id;
        renderKendraStoresList();
        updateConfirmPickupButton();
        const chosen = KENDRA_LIST.find(k => k.id === selectedKendraId);
        if (chosen) {
          showToast(`Selected ${chosen.name}`);
        }
      });
    });

    kendraStoresList.querySelectorAll('.btn-view-medicines').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const kendraId = btn.dataset.id;
        const targetKendra = KENDRA_LIST.find(k => k.id === kendraId);
        openViewMedicinesModal(targetKendra);
      });
    });

    kendraStoresList.querySelectorAll('.btn-kendra-eye').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const kendraId = btn.dataset.id;
        openStoreInfoScreen(kendraId, true);
      });
    });
  }

  // View Medicines Availability Modal System
  const viewMedsModal = document.getElementById('view-meds-modal');
  const viewMedsStoreName = document.getElementById('view-meds-store-name');
  const viewMedsAvailSummary = document.getElementById('view-meds-avail-summary');
  const viewMedsList = document.getElementById('view-meds-list');
  const viewMedsClose = document.getElementById('view-meds-close');
  const btnViewMedsDone = document.getElementById('btn-view-meds-done');

  function openViewMedicinesModal(kendra) {
    if (!viewMedsModal || !kendra) return;
    if (viewMedsStoreName) viewMedsStoreName.textContent = kendra.name;

    const info = getKendraAvailInfo(kendra.id);

    if (viewMedsAvailSummary) {
      viewMedsAvailSummary.textContent = info.availText;
      viewMedsAvailSummary.className = `view-meds-subtitle ${info.colorClass}`;
    }
    if (viewMedsList) {
      viewMedsList.innerHTML = info.medItems.map((med, idx) => {
        const isAvailable = idx < info.availCount;
        const name = med.generic_name || med.name || med.brand_name || 'Medicine';
        return `
          <div class="view-meds-item">
            <span class="view-meds-item-name">${name}</span>
            <span class="view-meds-item-badge ${isAvailable ? 'in-stock' : 'out-of-stock'}">
              ${isAvailable ? '✓ In Stock' : '✕ Not Available'}
            </span>
          </div>
        `;
      }).join('');
    }
    viewMedsModal.style.display = 'flex';
  }

  function closeViewMedicinesModal() {
    if (viewMedsModal) viewMedsModal.style.display = 'none';
  }

  if (viewMedsClose) {
    viewMedsClose.addEventListener('click', closeViewMedicinesModal);
  }

  if (btnViewMedsDone) {
    btnViewMedsDone.addEventListener('click', closeViewMedicinesModal);
  }

  if (viewMedsModal) {
    viewMedsModal.addEventListener('click', (e) => {
      if (e.target === viewMedsModal) closeViewMedicinesModal();
    });
  }

  // Initialize Kendra List & Button State
  renderKendraStoresList();
  updateConfirmPickupButton();

  // Search input handler
  if (kendraSearchInput) {
    kendraSearchInput.addEventListener('input', (e) => {
      kendraSearchQuery = e.target.value.trim();
      if (kendraSearchClear) {
        kendraSearchClear.style.display = kendraSearchQuery.length > 0 ? 'inline-block' : 'none';
      }
      renderKendraStoresList();
    });
  }

  if (kendraSearchClear && kendraSearchInput) {
    kendraSearchClear.addEventListener('click', () => {
      kendraSearchInput.value = '';
      kendraSearchQuery = '';
      kendraSearchClear.style.display = 'none';
      renderKendraStoresList();
      kendraSearchInput.focus();
    });
  }

  // Filter pill tag handler
  if (btnKendraFilter) {
    btnKendraFilter.addEventListener('click', () => {
      const filterLbl = document.getElementById('kendra-filter-label');
      const medItems = getCartMedicineItems();
      const total = medItems.length;
      if (kendraFilterMode === 'all') {
        kendraFilterMode = 'full-stock';
        btnKendraFilter.classList.add('active');
        if (filterLbl) filterLbl.textContent = `${total} of ${total} Available`;
        showToast(`Filter: Showing Kendras with full stock (${total} of ${total})`);
      } else {
        kendraFilterMode = 'all';
        btnKendraFilter.classList.remove('active');
        if (filterLbl) filterLbl.textContent = 'Filter';
        showToast('Filter: All Kendras');
      }
      renderKendraStoresList();
    });
  }

  // Sort pill tag handler
  if (btnKendraSort) {
    btnKendraSort.addEventListener('click', () => {
      kendraSortNearFirst = !kendraSortNearFirst;
      if (kendraSortLabel) {
        kendraSortLabel.textContent = kendraSortNearFirst ? 'Sort' : 'Distance';
      }
      btnKendraSort.classList.toggle('active', !kendraSortNearFirst);
      renderKendraStoresList();
      showToast(kendraSortNearFirst ? 'Sorted by: Nearest first' : 'Sorted by: Distance');
    });
  }

  // --- Store Information Navigation & Screen Population ---
  let currentOrderKendra = null;

  function getOrderSummaryData() {
    const items = (prescriptionMedicines && prescriptionMedicines.length > 0)
      ? prescriptionMedicines
      : DEFAULT_PRESCRIPTION_MEDICINES;

    let totalCost = 0;
    let totalSavings = 0;
    let totalMrp = 0;

    items.forEach(med => {
      const qty = med.qty || 1;
      const price = med.price || 0;
      const mrp = med.mrp || price;
      totalCost += price * qty;
      totalSavings += (mrp - price) * qty;
      totalMrp += mrp * qty;
    });

    return {
      items,
      itemCount: items.length,
      totalCost,
      totalSavings,
      totalMrp
    };
  }

  function renderOrderSummarySection() {
    const summary = getOrderSummaryData();
    const countBadge = document.getElementById('order-summary-item-count');
    const listEl = document.getElementById('order-summary-items-list');
    const billMrpEl = document.getElementById('order-bill-mrp');
    const billSavingsEl = document.getElementById('order-bill-savings');
    const billTotalEl = document.getElementById('order-bill-total');
    const successPayEl = document.getElementById('success-pay-amount');

    if (countBadge) {
      countBadge.textContent = `${summary.itemCount} Item${summary.itemCount > 1 ? 's' : ''}`;
    }

    if (listEl) {
      listEl.innerHTML = summary.items.map(med => {
        const qty = med.qty || 1;
        const price = (med.price || 0) * qty;
        const mrp = (med.mrp || 0) * qty;
        return `
          <div class="order-summary-med-row">
            <div class="order-med-info">
              <span class="order-med-name">${med.generic_name}</span>
              <span class="order-med-sub">${med.brand_name ? med.brand_name + ' • ' : ''}Qty: ${qty}</span>
            </div>
            <div class="order-med-pricing">
              <span class="order-med-price">₹ ${price}</span>
              ${mrp > price ? `<span class="order-med-mrp">₹${mrp}</span>` : ''}
            </div>
          </div>
        `;
      }).join('');
    }

    if (billMrpEl) billMrpEl.textContent = `₹ ${summary.totalMrp}`;
    if (billSavingsEl) billSavingsEl.textContent = `- ₹ ${summary.totalSavings}`;
    if (billTotalEl) billTotalEl.textContent = `₹ ${summary.totalCost}`;
    if (successPayEl) successPayEl.textContent = `₹ ${summary.totalCost}`;
  }

  function openStoreInfoScreen(kendraId, isPreviewMode = false) {
    const chosenKendra = KENDRA_LIST.find(k => k.id === kendraId) || KENDRA_LIST[0];
    currentOrderKendra = chosenKendra;

    // Render Order Summary & Bill
    renderOrderSummarySection();

    // If the user has selected a date, keep that date; otherwise keep today's date
    const formattedDate = getPickupDateDDMMYYYY();

    // Format time slot nicely
    let formattedTime = selectedTimeSlot || '09:00 AM - 12:00 PM';
    formattedTime = formattedTime.replace(/(\d{2}:\d{2})(AM|PM)/g, '$1 $2').replace(/\s*-\s*/, ' - ');

    // Populate Store Info Screen
    const nameEl = document.getElementById('store-info-name');
    const ownerEl = document.getElementById('store-info-owner-name');
    const codeEl = document.getElementById('store-info-code');
    const hoursEl = document.getElementById('store-info-hours');
    const statusEl = document.getElementById('store-info-status');
    const dateEl = document.getElementById('store-info-date');
    const timeEl = document.getElementById('store-info-time');

    if (nameEl) nameEl.textContent = chosenKendra.name;
    if (ownerEl) ownerEl.textContent = chosenKendra.ownerName || 'Thakur';
    if (codeEl) codeEl.textContent = chosenKendra.code || 'PMBJK01600';
    if (hoursEl) hoursEl.textContent = chosenKendra.openingHours || '09:00 AM - 06:00 PM';
    if (statusEl) statusEl.textContent = chosenKendra.status || 'Open Now';
    if (dateEl) dateEl.textContent = formattedDate;
    if (timeEl) timeEl.textContent = formattedTime;

    // Set preview mode or normal confirmation mode
    if (isPreviewMode) {
      if (screenStoreInfo) screenStoreInfo.classList.add('preview-mode');
    } else {
      if (screenStoreInfo) screenStoreInfo.classList.remove('preview-mode');
    }

    // Navigate to Store Information screen
    pushScreen('store-info');
    bringToFront(screenStoreInfo);
    if (screenStoreInfo) screenStoreInfo.classList.add('active');
  }

  // Confirm & Proceed Button Handler from Pick Store screen
  if (btnConfirmPickup) {
    btnConfirmPickup.addEventListener('click', () => {
      if (!selectedKendraId) {
        selectedKendraId = (KENDRA_LIST && KENDRA_LIST[0]) ? KENDRA_LIST[0].id : 'kendra-chinchwad';
        renderKendraStoresList();
        updateConfirmPickupButton();
      }
      openStoreInfoScreen(selectedKendraId, false);
    });
  }

  // --- Store Information Screen Handlers ---
  const storeInfoBack = document.getElementById('store-info-back');
  if (storeInfoBack) {
    storeInfoBack.addEventListener('click', () => {
      navigateBack();
    });
  }

  // Underlined Action Buttons: Call the Kendra & Get Direction
  const btnCallKendra = document.getElementById('btn-call-kendra');
  const btnGetDirections = document.getElementById('btn-get-directions');

  if (btnCallKendra) {
    btnCallKendra.addEventListener('click', () => {
      const chosenKendra = currentOrderKendra || KENDRA_LIST.find(k => k.id === selectedKendraId) || KENDRA_LIST[0];
      const phone = chosenKendra.phone || '+91 98230 16000';
      showToast(`Calling ${chosenKendra.name} (${phone})...`);
      setTimeout(() => {
        window.location.href = `tel:${phone.replace(/\s+/g, '')}`;
      }, 500);
    });
  }

  if (btnGetDirections) {
    btnGetDirections.addEventListener('click', () => {
      const chosenKendra = currentOrderKendra || KENDRA_LIST.find(k => k.id === selectedKendraId) || KENDRA_LIST[0];
      showToast(`Opening directions to ${chosenKendra.name}...`);
      setTimeout(() => {
        const query = encodeURIComponent(`${chosenKendra.name}, Pune`);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
      }, 500);
    });
  }

  // Confirmation Dialog & Final Pickup Handlers
  const confirmOrderDialog = document.getElementById('confirm-order-dialog');
  const dialogConfirmMsg = document.getElementById('dialog-confirm-msg');
  const btnDialogNo = document.getElementById('btn-dialog-no');
  const btnDialogYes = document.getElementById('btn-dialog-yes');
  const btnFinalConfirmPickup = document.getElementById('btn-final-confirm-pickup');
  const pickupSuccessModal = document.getElementById('pickup-success-modal');
  const btnSuccessHome = document.getElementById('btn-success-home');

  if (btnFinalConfirmPickup) {
    btnFinalConfirmPickup.addEventListener('click', () => {
      const chosenKendra = currentOrderKendra || KENDRA_LIST.find(k => k.id === selectedKendraId) || KENDRA_LIST[0];
      const formattedDate = getPickupDateDDMMYYYY();
      let formattedTime = selectedTimeSlot || '09:00 AM - 12:00 PM';
      formattedTime = formattedTime.replace(/(\d{2}:\d{2})(AM|PM)/g, '$1 $2').replace(/\s*-\s*/, ' - ');

      if (dialogConfirmMsg) {
        dialogConfirmMsg.textContent = `Do you want to confirm your pickup at ${chosenKendra.name} on ${formattedDate} (${formattedTime})?`;
      }
      if (confirmOrderDialog) {
        confirmOrderDialog.style.display = 'flex';
      }
    });
  }

  // Dialog No Button -> Dismiss Dialog
  if (btnDialogNo) {
    btnDialogNo.addEventListener('click', () => {
      if (confirmOrderDialog) {
        confirmOrderDialog.style.display = 'none';
      }
    });
  }

  // Dialog Yes Button -> Confirm and Show Success Sheet
  if (btnDialogYes) {
    btnDialogYes.addEventListener('click', () => {
      if (confirmOrderDialog) {
        confirmOrderDialog.style.display = 'none';
      }

      const chosenKendra = currentOrderKendra || KENDRA_LIST.find(k => k.id === selectedKendraId) || KENDRA_LIST[0];
      const formattedDate = getPickupDateDDMMYYYY();
      let formattedTime = selectedTimeSlot || '09:00 AM - 12:00 PM';
      formattedTime = formattedTime.replace(/(\d{2}:\d{2})(AM|PM)/g, '$1 $2').replace(/\s*-\s*/, ' - ');
      const summary = getOrderSummaryData();

      const successMsg = document.getElementById('pickup-success-msg');
      const successSlot = document.getElementById('success-pickup-slot');
      const successPayEl = document.getElementById('success-pay-amount');
      const orderIdEl = document.querySelector('#pickup-success-modal .success-order-box .success-val');

      if (successMsg) {
        successMsg.textContent = `Your medicine order is booked for pickup at ${chosenKendra.name}.`;
      }
      if (successSlot) {
        successSlot.textContent = `${formattedDate} (${formattedTime})`;
      }
      if (successPayEl) {
        successPayEl.textContent = `₹ ${summary.totalCost}`;
      }
      if (orderIdEl) {
        orderIdEl.textContent = `#PMBJ-${Math.floor(10000 + Math.random() * 90000)}`;
      }

      if (pickupSuccessModal) {
        pickupSuccessModal.style.display = 'flex';
      }
    });
  }

  // Success Sheet "Back to Home" Button -> Takes user back to homepage
  if (btnSuccessHome) {
    btnSuccessHome.addEventListener('click', () => {
      if (pickupSuccessModal) pickupSuccessModal.style.display = 'none';
      if (confirmOrderDialog) confirmOrderDialog.style.display = 'none';
      if (screenStoreInfo) screenStoreInfo.classList.remove('active');
      if (screenPickStore) screenPickStore.classList.remove('active');
      if (screenCart) screenCart.classList.remove('active');

      // Reset cart state
      prescriptionMedicines.length = 0;
      if (typeof renderCartItems === 'function') renderCartItems();

      // Reset navigation to Home
      navigationStack = ['home'];
      navItems.forEach(nav => nav.classList.toggle('active', nav.dataset.tab === 'home'));
      showToast('Order confirmed! Returned to Home.');
    });
  }

  // Store Information Bottom Navigation Handlers
  const storeInfoNavItems = document.querySelectorAll('.store-info-bottom-nav .nav-item');
  storeInfoNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      const tab = item.dataset.tab;
      if (tab === 'home') {
        if (screenStoreInfo) screenStoreInfo.classList.remove('active');
        if (screenPickStore) screenPickStore.classList.remove('active');
        if (screenCart) screenCart.classList.remove('active');
        navigationStack = ['home'];
        navItems.forEach(nav => nav.classList.toggle('active', nav.dataset.tab === 'home'));
      } else if (tab === 'prescription') {
        if (screenStoreInfo) screenStoreInfo.classList.remove('active');
        if (screenPickStore) screenPickStore.classList.remove('active');
        if (screenCart) screenCart.classList.remove('active');
        navigationStack = ['home', 'prescriptions-main'];
        openPrescriptionsHub();
      } else if (tab === 'locate') {
        // Already on locate / store info screen
      } else {
        showToast(`${item.querySelector('.nav-label').textContent} selected`);
      }
    });
  });

  function renderMedicinePackSvg(med) {
    const pillColor = med.color || '#F97316';
    return `
      <svg width="60" height="50" viewBox="0 0 60 50" fill="none">
        <ellipse cx="30" cy="46" rx="26" ry="3" fill="#E2E8F0"/>
        <path d="M12 12L24 6H54L42 12H12Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="0.8"/>
        <path d="M42 12L54 6V30L42 36V12Z" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="0.8"/>
        <rect x="10" y="12" width="32" height="24" rx="2" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="0.8"/>
        <circle cx="16" cy="18" r="3" fill="#1A73E9"/>
        <circle cx="16" cy="18" r="1.5" fill="#22C55E"/>
        <rect x="21" y="16" width="18" height="2" rx="1" fill="#475569"/>
        <rect x="21" y="20" width="12" height="1.5" rx="0.75" fill="#94A3B8"/>
        <path d="M8 32C8 30.8954 8.89543 30 10 30H38C39.1046 30 40 30.8954 40 32L38 42C38 43.1046 37.1046 44 36 44H12C10.8954 44 10 43.1046 10 42L8 32Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="0.8"/>
        <circle cx="14" cy="37" r="3" fill="${pillColor}" stroke="#FFFFFF" stroke-width="0.6"/>
        <circle cx="21" cy="37" r="3" fill="${pillColor}" stroke="#FFFFFF" stroke-width="0.6"/>
        <circle cx="28" cy="37" r="3" fill="${pillColor}" stroke="#FFFFFF" stroke-width="0.6"/>
        <circle cx="35" cy="37" r="3" fill="${pillColor}" stroke="#FFFFFF" stroke-width="0.6"/>
      </svg>
    `;
  }

  function formatPriceDisplay(val) {
    return val < 10 ? `0${val}` : `${val}`;
  }

  function renderCartItems() {
    if (!cartItemsList) return;
    cartItemsList.innerHTML = '';

    if (prescriptionMedicines.length === 0) {
      cartItemsList.innerHTML = `
        <div class="empty-cart-state" style="text-align: center; padding: 48px 16px; color: #64748B;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 12px; display: inline-block;">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p style="font-size: 15px; font-weight: 600; color: #1E293B; margin-bottom: 4px;">Your cart is empty</p>
          <p style="font-size: 13px;">Add medicines from prescription or search to see them here.</p>
        </div>
      `;
      const cartBillCard = document.getElementById('cart-bill-card');
      const cartBillMrp = document.getElementById('cart-bill-mrp');
      const cartBillSavings = document.getElementById('cart-bill-savings');
      const cartBillTotal = document.getElementById('cart-bill-total');

      if (cartBillCard) cartBillCard.style.display = 'none';
      if (cartBillMrp) cartBillMrp.textContent = `₹ 0`;
      if (cartBillSavings) cartBillSavings.textContent = `- ₹ 0`;
      if (cartBillTotal) cartBillTotal.textContent = `₹ 0`;
      if (cartMedicineTotal) cartMedicineTotal.textContent = `₹ 0`;
      if (cartTotalSaving) cartTotalSaving.textContent = `₹ 0`;

      if (currentSelectedMedicine && typeof updateProductActionUI === 'function') {
        updateProductActionUI(0);
      }
      return;
    }

    let totalCost = 0;
    let totalSavings = 0;
    let totalMrp = 0;

    prescriptionMedicines.forEach(med => {
      const itemQty = med.qty || 1;
      const price = med.price || 0;
      const mrp = med.mrp || (price > 0 ? Math.round(price * 4) : 0);
      totalCost += price * itemQty;
      totalSavings += Math.max(0, mrp - price) * itemQty;
      totalMrp += mrp * itemQty;

      const packVisual = med.image
        ? `<img class="cart-item-img" src="${med.image}" alt="${med.generic_name}" />`
        : renderMedicinePackSvg(med);

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.dataset.id = med.id;
      itemEl.innerHTML = `
        <div class="cart-item-pack">
          ${packVisual}
        </div>
        <div class="cart-item-info">
          <h3 class="cart-item-name">${med.generic_name}</h3>
          <p class="cart-item-brand">${med.brand_name}</p>
          <p class="cart-item-packsize">${med.pack_size}</p>
        </div>
        <div class="cart-item-actions">
          <div class="cart-item-price">₹ ${formatPriceDisplay(med.price)}</div>
          <div class="cart-qty-pill">
            <button class="cart-qty-btn minus" data-id="${med.id}" aria-label="Decrease">−</button>
            <span class="cart-qty-num">${med.qty}</span>
            <button class="cart-qty-btn plus" data-id="${med.id}" aria-label="Increase">+</button>
          </div>
        </div>
      `;

      // Wire quantity listeners
      const minusBtn = itemEl.querySelector('.cart-qty-btn.minus');
      const plusBtn = itemEl.querySelector('.cart-qty-btn.plus');

      if (minusBtn) {
        minusBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (med.qty > 1) {
            med.qty--;
            renderCartItems();
          } else {
            const idx = prescriptionMedicines.findIndex(m => m.id === med.id);
            if (idx !== -1) {
              prescriptionMedicines.splice(idx, 1);
              renderCartItems();
              showToast(`Removed from cart`);
            }
          }
        });
      }

      if (plusBtn) {
        plusBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          med.qty++;
          renderCartItems();
        });
      }

      cartItemsList.appendChild(itemEl);
    });

    const cartBillCard = document.getElementById('cart-bill-card');
    const cartBillMrp = document.getElementById('cart-bill-mrp');
    const cartBillSavings = document.getElementById('cart-bill-savings');
    const cartBillTotal = document.getElementById('cart-bill-total');

    if (cartBillCard) cartBillCard.style.display = 'block';
    if (cartBillMrp) cartBillMrp.textContent = `₹ ${totalMrp}`;
    if (cartBillSavings) cartBillSavings.textContent = `- ₹ ${totalSavings}`;
    if (cartBillTotal) cartBillTotal.textContent = `₹ ${totalCost}`;

    if (cartMedicineTotal) {
      cartMedicineTotal.textContent = `₹ ${totalCost}`;
    }
    if (cartTotalSaving) {
      cartTotalSaving.textContent = `₹ ${totalSavings}`;
    }

    if (currentSelectedMedicine && typeof updateProductActionUI === 'function') {
      const inCart = prescriptionMedicines.find(m => 
        m.generic_name.toLowerCase().includes((currentSelectedMedicine.jan_aushadhi_name || '').toLowerCase()) || 
        m.generic_name.toLowerCase().includes((currentSelectedMedicine.generic_name || '').toLowerCase()) ||
        (currentSelectedMedicine.brand_name && m.brand_name && m.brand_name.toLowerCase().includes(currentSelectedMedicine.brand_name.toLowerCase()))
      );
      updateProductActionUI(inCart ? inCart.qty : 0);
    }
  }

  // When user clicks "Add Medicines to Cart":
  if (btnAddMedicinesCart) {
    btnAddMedicinesCart.addEventListener('click', () => {
      // Save prescription card into hub first
      const firstPageSrc = uploadedPages[0] || 'assets/postcard.png';
      const now = new Date();
      const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

      if (recentlyAddedRow) {
        const newCard = document.createElement('div');
        newCard.className = 'prescription-card';
        newCard.dataset.doctor = 'Dr. Sharma';
        newCard.dataset.date = dateStr;
        newCard.innerHTML = `
          <div class="card-doc-preview" style="background: url('${firstPageSrc}') lightgray -0.282px -0.257px / 100% 176.815% no-repeat;">
            <button class="pcard-close-btn" aria-label="Delete">✕</button>
          </div>
          <div class="card-footer-info">
            <span class="pcard-doc-name">Dr. Sharma</span>
            <span class="pcard-date">${dateStr}</span>
          </div>
        `;

        const closeBtn = newCard.querySelector('.pcard-close-btn');
        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            newCard.remove();
            showToast('Deleted prescription');
          });
        }
        recentlyAddedRow.prepend(newCard);
      }

      // Add medicines from prescription into cart (keeping any medicines already added from search)
      DEFAULT_PRESCRIPTION_MEDICINES.forEach(pm => {
        const already = prescriptionMedicines.find(m => m.id === pm.id);
        if (already) {
          already.qty = Math.max(already.qty, pm.qty);
        } else {
          prescriptionMedicines.push({ ...pm });
        }
      });

      // Show loading animation screen (Prescription 1.4) then navigate to Cart!
      showLoadingScreen(1800, () => {
        openCartScreen();
        showToast('Prescription verified! Medicines added to Cart.');
      });
    });
  }

  // Use Photo
  if (usePhotoBtn) {
    usePhotoBtn.addEventListener('click', () => {
      if (currentCapturedDataUrl) {
        stopCameraStream();
        cameraModal.classList.remove('open');
        closeUploadOptionsSheet();

        const now = new Date();
        const photoName = `Rx_Photo_${now.getDate()}${now.getMonth() + 1}_${now.getHours()}${now.getMinutes()}.jpg`;
        handlePrescriptionAttached(photoName, currentCapturedDataUrl);
        openReviewPagesScreen(currentCapturedDataUrl);
      }
    });
  }

  // Handle Prescription Attachment Helper (Supports Thumbnails)
  function handlePrescriptionAttached(fileName, previewSrc = null) {
    if (uploadedFileName) uploadedFileName.textContent = fileName;

    if (previewSrc && prescriptionPreviewThumb) {
      prescriptionPreviewThumb.src = previewSrc;
      prescriptionPreviewThumb.style.display = 'block';
      if (fileIconBox) fileIconBox.style.display = 'none';
    } else {
      if (prescriptionPreviewThumb) prescriptionPreviewThumb.style.display = 'none';
      if (fileIconBox) fileIconBox.style.display = 'flex';
    }

    if (uploadedFileCard) {
      uploadedFileCard.style.display = 'flex';
    }
    showToast(`Prescription attached: ${fileName}`);
  }

  // 1. Take a photo (Opens Camera Viewfinder)
  if (optTakePhoto) {
    optTakePhoto.addEventListener('click', () => {
      closeUploadOptionsSheet();
      startCamera();
    });
  }

  // Fallback Camera File Input (for devices where getUserMedia is restricted)
  if (cameraFileInput) {
    cameraFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          handlePrescriptionAttached(file.name, event.target.result);
          openReviewPagesScreen(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 2. Choose from gallery
  if (optChooseGallery && galleryFileInput) {
    optChooseGallery.addEventListener('click', () => {
      closeUploadOptionsSheet();
      galleryFileInput.click();
    });

    galleryFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            handlePrescriptionAttached(file.name, event.target.result);
            openReviewPagesScreen(event.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          handlePrescriptionAttached(file.name, null);
          openReviewPagesScreen('assets/postcard.png');
        }
      }
    });
  }

  // 3. Your prescriptions (Saved)
  if (optSavedPrescriptions && savedRxModal) {
    optSavedPrescriptions.addEventListener('click', () => {
      closeUploadOptionsSheet();
      savedRxModal.classList.add('open');
    });

    if (closeSavedRxModal) {
      closeSavedRxModal.addEventListener('click', () => {
        savedRxModal.classList.remove('open');
      });
    }

    if (savedRxModal) {
      savedRxModal.addEventListener('click', (e) => {
        if (e.target === savedRxModal) {
          savedRxModal.classList.remove('open');
        }
      });
    }

    savedRxItems.forEach(item => {
      item.addEventListener('click', () => {
        const rxName = item.dataset.rx;
        savedRxModal.classList.remove('open');
        closeUploadOptionsSheet();
        handlePrescriptionAttached(rxName);
        openReviewPagesScreen('assets/postcard.png');
      });
    });
  }

  // Remove Uploaded File
  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', () => {
      if (cameraFileInput) cameraFileInput.value = '';
      if (galleryFileInput) galleryFileInput.value = '';
      if (uploadedFileCard) uploadedFileCard.style.display = 'none';
      showToast('Prescription removed');
    });
  }

  // Valid Prescription Guide Modal
  if (validRxLinkBtn && validRxModal) {
    validRxLinkBtn.addEventListener('click', () => {
      validRxModal.classList.add('open');
    });

    closeValidRxModal.addEventListener('click', () => {
      validRxModal.classList.remove('open');
    });

    validRxModal.addEventListener('click', (e) => {
      if (e.target === validRxModal) {
        validRxModal.classList.remove('open');
      }
    });
  }

  // ========================================================
  // SEARCH & MEDICINE DATABASE ENGINE
  // ========================================================

  function openSearchOverlay(initialQuery = '') {
    bringToFront(searchOverlay);
    searchOverlay.classList.add('open');
    overlaySearchInput.value = initialQuery;
    clearSearchBtn.classList.toggle('visible', !!initialQuery);
    renderSearchSuggestions(initialQuery);
    executeSearch(initialQuery);
    setTimeout(() => {
      overlaySearchInput.focus();
    }, 150);
  }

  function closeSearchOverlay() {
    searchOverlay.classList.remove('open');
    homeSearchInput.value = '';
    renderSearchSuggestions('');
  }

  // --- Search Autocomplete Suggestions Helper (Matching Figma Screenshots) ---
  function renderSearchSuggestions(query) {
    if (!searchSuggestionsContainer) return;
    const q = (query || '').trim();

    const filterChipsSection = document.querySelector('.search-filter-chips');
    const searchResultsInfo = document.querySelector('.search-results-info');

    if (!q) {
      searchSuggestionsContainer.innerHTML = '';
      searchSuggestionsContainer.style.display = 'none';
      if (searchMedicineSection) searchMedicineSection.style.display = 'block';
      if (filterChipsSection) filterChipsSection.style.display = 'flex';
      if (searchResultsInfo) searchResultsInfo.style.display = 'flex';
      if (searchResultsList) searchResultsList.style.display = 'flex';
      return;
    }

    const suggestions = typeof getSearchSuggestions === 'function' ? getSearchSuggestions(q) : [];
    if (suggestions.length === 0) {
      searchSuggestionsContainer.innerHTML = '';
      searchSuggestionsContainer.style.display = 'none';
      if (searchMedicineSection) searchMedicineSection.style.display = 'none';
      if (filterChipsSection) filterChipsSection.style.display = 'none';
      if (searchResultsInfo) searchResultsInfo.style.display = 'flex';
      if (searchResultsList) searchResultsList.style.display = 'flex';
      return;
    }

    searchSuggestionsContainer.innerHTML = '';
    searchSuggestionsContainer.style.display = 'flex';
    if (searchMedicineSection) searchMedicineSection.style.display = 'none';
    if (filterChipsSection) filterChipsSection.style.display = 'none';
    if (searchResultsInfo) searchResultsInfo.style.display = 'none';
    if (searchResultsList) searchResultsList.style.display = 'none';

    suggestions.forEach(item => {
      const row = document.createElement('div');
      row.className = 'search-suggestion-item';

      // 🕒 Clock icon if recent/history or 🔍 search glass
      const iconSvg = item.isHistory ? `
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ` : `
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      `;

      // Google-style bolding: matched query in normal, completion in bold
      const textLower = item.text.toLowerCase();
      const qLower = q.toLowerCase();
      let textHtml = item.text;
      if (textLower.startsWith(qLower)) {
        const matchPart = item.text.substring(0, q.length);
        const remainder = item.text.substring(q.length);
        textHtml = `<span class="suggestion-match">${matchPart}</span><span class="suggestion-completion">${remainder}</span>`;
      } else {
        textHtml = `<span class="suggestion-completion">${item.text}</span>`;
      }

      row.innerHTML = `
        <div class="suggestion-left">
          <div class="suggestion-icon">${iconSvg}</div>
          <div class="suggestion-text">${textHtml}</div>
        </div>
        <div class="suggestion-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      `;

      // SCENARIOS 1 & 3: Clicking ANY suggestion row immediately leads to the Product Info Page!
      row.addEventListener('click', (e) => {
        const med = item.medicine || (typeof findBestMatchingMedicine === 'function' ? findBestMatchingMedicine(item.text) : null);
        if (med) {
          openProductInfoScreen(med);
        }
      });

      searchSuggestionsContainer.appendChild(row);
    });
  }

  // SCENARIO 2: Typing whole medicine name and pressing Enter/Search leads to Product Info Page!
  function submitSearchToProductInfo(query) {
    const q = (query || '').trim();
    if (!q) return;
    const bestMed = typeof findBestMatchingMedicine === 'function' ? findBestMatchingMedicine(q) : null;
    if (bestMed) {
      openProductInfoScreen(bestMed);
    } else {
      executeSearch(q);
    }
  }

  function renderMedicineCard(med, isGenericSearch = false) {
    const card = document.createElement('div');
    card.className = 'med-card';

    // If generic search was performed, display ONLY the generic name and omit brand names
    const primaryTitle = isGenericSearch 
      ? (med.jan_aushadhi_name || med.generic_name) 
      : med.brand_name;

    const subTitle = isGenericSearch 
      ? `Active Formulation: ${med.generic_name}`
      : med.generic_name;

    const rxLabel = med.prescription_required ? 'Rx Required' : 'OTC';
    const rxClass = med.prescription_required ? 'rx' : 'otc';

    card.innerHTML = `
      <div class="med-card-top">
        <div class="med-title-group">
          <h3 class="med-brand-name">${primaryTitle}</h3>
          <span class="med-generic-name">${subTitle}</span>
        </div>
        <div class="med-card-arrow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>

      <div class="med-details-row">
        <span>${med.dosage_form} • ${med.pack_size}</span>
        <span>•</span>
        <span class="med-rx-pill ${rxClass}">${rxLabel}</span>
      </div>

      <div class="med-pricing-box">
        <div class="price-col">
          <span class="ja-label">JAN AUSHADHI PRICE</span>
          <div>
            <span class="ja-price">₹${med.jan_aushadhi_price.toFixed(2)}</span>
            ${!isGenericSearch ? `<span class="mrp-strike">MRP ₹${med.brand_mrp.toFixed(2)}</span>` : ''}
          </div>
        </div>
        <div class="savings-tag">Save ${med.savings_percent}%</div>
      </div>
    `;

    // Entire card is clickable -> leads to Product Info page
    card.addEventListener('click', () => {
      openProductInfoScreen(med);
    });

    return card;
  }

  // ========================================================
  // SCREEN: PRODUCT INFO (Medicine Details Page)
  // ========================================================
  const productInfoBack = document.getElementById('product-info-back');
  const productShareBtn = document.getElementById('product-share-btn');
  const productBtnAddCart = document.getElementById('product-btn-add-cart');

  let currentSelectedMedicine = null;

  // Initialize Accordion Click Handlers
  document.querySelectorAll('.product-accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.product-accordion-item');
      if (item) {
        const isOpen = item.classList.contains('open');
        item.classList.toggle('open');
        header.setAttribute('aria-expanded', !isOpen);
      }
    });
  });

  function openProductInfoScreen(med) {
    if (!med) {
      // Default to Telma 40 if opened directly
      med = typeof MEDICINES_DATABASE !== 'undefined' 
        ? (MEDICINES_DATABASE.find(m => m.brand_name === 'Telma 40') || MEDICINES_DATABASE[0]) 
        : null;
    }
    if (!med) return;
    currentSelectedMedicine = med;

    // 0. Top Header Title (per screenshot)
    const headerTitle = document.getElementById('product-info-header-title');
    if (headerTitle) headerTitle.textContent = med.jan_aushadhi_name || med.generic_name || 'Telmisartan Tablets IP 40mg';

    // 1. Top Non-clickable "Showing for —" card
    const showingBrand = document.getElementById('showing-for-brand');
    const showingGeneric = document.getElementById('showing-for-generic');
    const showingImg = document.getElementById('showing-for-img');

    if (showingBrand) showingBrand.textContent = med.brand_name || 'Telma 40';
    if (showingGeneric) showingGeneric.textContent = med.generic_name || 'Telmisartan (40mg)';
    if (showingImg) showingImg.src = med.image || 'assets/Telmisartan 40mg.png';

    // 2. Main Product Image
    const heroImg = document.getElementById('product-hero-img');
    if (heroImg) heroImg.src = med.image || 'assets/Telmisartan 40mg.png';

    // 3. Generic Medicine Name
    const genericMainName = document.getElementById('product-generic-main-name');
    if (genericMainName) genericMainName.textContent = med.jan_aushadhi_name || med.generic_name;

    // 4. Two adjacent small cards
    const cardPmbiCode = document.getElementById('card-pmbi-code');
    const cardPackSize = document.getElementById('card-pack-size');
    if (cardPmbiCode) cardPmbiCode.textContent = med.pmbi_code || '300';
    if (cardPackSize) cardPackSize.textContent = med.pack_size || '10 tablets';

    // 5. Comparative Price Box (per user screenshot)
    const priceValJa = document.getElementById('price-val-ja');
    const priceValOther = document.getElementById('price-val-other');
    const priceValSavings = document.getElementById('price-val-savings');
    const bottomPrice = document.getElementById('product-bottom-price');

    const jaPriceNum = Math.round(med.jan_aushadhi_price || 18);
    const mrpNum = Math.round(med.brand_mrp || 106);
    const savingsNum = Math.round((med.savings != null ? med.savings : (mrpNum - jaPriceNum)) || 88);

    if (priceValJa) priceValJa.textContent = `₹ ${jaPriceNum}`;
    if (priceValOther) priceValOther.textContent = `₹ ${mrpNum}`;
    if (priceValSavings) priceValSavings.textContent = `₹ ${savingsNum}`;
    if (bottomPrice) bottomPrice.textContent = `₹ ${jaPriceNum}`;

    // 6. Kendra Availability Card
    const kendraAvailText = document.getElementById('kendra-avail-text');
    if (kendraAvailText) {
      const kInfo = med.kendra_info || 'Available in 3 Kendra near 462039';
      kendraAvailText.innerHTML = kInfo.replace(/(\d{6})/, '<strong>$1</strong>');
    }

    // 7. Populate 8 Accordions
    // 1. Product Information
    const accProductInfo = document.getElementById('acc-content-product-info');
    if (accProductInfo) {
      accProductInfo.innerHTML = `<p>${med.product_info || med.description || 'Quality generic medicine manufactured under PMBJP standards.'}</p>`;
    }

    // 2. Uses
    const accUses = document.getElementById('acc-content-uses');
    if (accUses) {
      const usesList = Array.isArray(med.uses) && med.uses.length > 0 
        ? med.uses 
        : ['Treatment of Hypertension (High Blood Pressure)', 'Prevention of Heart Attack and Stroke', 'Reduction of cardiac workload'];
      accUses.innerHTML = `<ul class="acc-bullet-list">${usesList.map(u => `<li>${u}</li>`).join('')}</ul>`;
    }

    // 3. Benefits
    const accBenefits = document.getElementById('acc-content-benefits');
    if (accBenefits) {
      accBenefits.innerHTML = `<p>${med.benefits || med.description || 'Effectively relaxes blood vessels, significantly reducing hypertension and cardiac risks.'}</p>`;
    }

    // 4. Side Effects
    const accSideEffects = document.getElementById('acc-content-side-effects');
    if (accSideEffects) {
      const seList = Array.isArray(med.side_effects) && med.side_effects.length > 0
        ? med.side_effects
        : ['Dizziness or lightheadedness', 'Back pain and muscle cramps', 'Sinus congestion', 'Fatigue'];
      accSideEffects.innerHTML = `<ul class="acc-bullet-list">${seList.map(s => `<li>${s}</li>`).join('')}</ul>`;
    }

    // 5. Usage
    const accUsage = document.getElementById('acc-content-usage');
    if (accUsage) {
      accUsage.innerHTML = `<p>${med.usage || 'Take this medicine in the dose and duration as advised by your doctor. Swallow it whole with water. Do not chew or crush.'}</p>`;
    }

    // 6. How it works
    const accHowItWorks = document.getElementById('acc-content-how-it-works');
    if (accHowItWorks) {
      accHowItWorks.innerHTML = `<p>${med.how_it_works || 'Works by blocking the hormone angiotensin II, relaxing the blood vessels and allowing smoother blood flow.'}</p>`;
    }

    // 7. Safety advice
    const accSafetyAdvice = document.getElementById('acc-content-safety-advice');
    if (accSafetyAdvice) {
      if (Array.isArray(med.safety_advice) && med.safety_advice.length > 0) {
        accSafetyAdvice.innerHTML = med.safety_advice.map(item => {
          let badgeClass = 'safety-badge-caution';
          if (/unsafe|avoid/i.test(item.status)) badgeClass = 'safety-badge-unsafe';
          else if (/monitoring/i.test(item.status)) badgeClass = 'safety-badge-monitoring';
          return `
            <div class="acc-safety-item">
              <div class="acc-safety-header">
                <span class="acc-safety-topic">${item.topic}</span>
                <span class="acc-safety-badge ${badgeClass}">${item.status}</span>
              </div>
              <p class="acc-safety-desc">${item.text}</p>
            </div>
          `;
        }).join('');
      } else {
        accSafetyAdvice.innerHTML = `
          <div class="acc-safety-item">
            <div class="acc-safety-header">
              <span class="acc-safety-topic">General Advice</span>
              <span class="acc-safety-badge safety-badge-caution">Caution</span>
            </div>
            <p class="acc-safety-desc">Consult your doctor before taking this medicine if you are pregnant, nursing, or have kidney/liver conditions.</p>
          </div>
        `;
      }
    }

    // 8. FAQs
    const accFaqs = document.getElementById('acc-content-faqs');
    if (accFaqs) {
      if (Array.isArray(med.faqs) && med.faqs.length > 0) {
        accFaqs.innerHTML = med.faqs.map(faq => `
          <div class="acc-faq-item">
            <div class="acc-faq-q">Q: ${faq.q}</div>
            <div class="acc-faq-a">${faq.a}</div>
          </div>
        `).join('');
      } else {
        accFaqs.innerHTML = `
          <div class="acc-faq-item">
            <div class="acc-faq-q">Q: Is Jan Aushadhi medicine equally effective as branded?</div>
            <div class="acc-faq-a">Yes, Jan Aushadhi generic medicines are WHO-GMP certified, NABL tested, and therapeutically equivalent to branded equivalents at significantly lower prices.</div>
          </div>
        `;
      }
    }

    // Check if item is already in cart to display stepper vs Add to Cart button
    const inCartItem = prescriptionMedicines.find(m => 
      m.generic_name.toLowerCase().includes((med.jan_aushadhi_name || '').toLowerCase()) || 
      m.generic_name.toLowerCase().includes((med.generic_name || '').toLowerCase()) ||
      (med.brand_name && m.brand_name && m.brand_name.toLowerCase().includes(med.brand_name.toLowerCase()))
    );
    updateProductActionUI(inCartItem ? inCartItem.qty : 0);

    closeSearchOverlay();
    pushScreen('product-info');
    bringToFront(screenProductInfo);
    if (screenProductInfo) screenProductInfo.classList.add('active');
  }

  function closeProductInfoScreen() {
    if (navigationStack[navigationStack.length - 1] === 'product-info') {
      navigateBack();
    } else {
      if (screenProductInfo) screenProductInfo.classList.remove('active');
    }
  }

  if (productInfoBack) {
    productInfoBack.addEventListener('click', closeProductInfoScreen);
  }

  if (productShareBtn) {
    productShareBtn.addEventListener('click', () => {
      showToast('Product link copied to clipboard!');
    });
  }

  const productQtyStepper = document.getElementById('product-qty-stepper');
  const productQtyMinus = document.getElementById('product-qty-minus');
  const productQtyPlus = document.getElementById('product-qty-plus');
  const productQtyVal = document.getElementById('product-qty-val');
  const floatingViewCartPill = document.getElementById('floating-view-cart-pill');
  const floatingCartThumbImg = document.getElementById('floating-cart-thumb-img');
  const floatingCartCount = document.getElementById('floating-cart-count');

  if (floatingViewCartPill) {
    floatingViewCartPill.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openCartScreen();
    });
  }

  function ensureSelectedMedicine() {
    if (currentSelectedMedicine) return currentSelectedMedicine;
    if (typeof MEDICINES_DATABASE !== 'undefined' && MEDICINES_DATABASE.length > 0) {
      currentSelectedMedicine = MEDICINES_DATABASE.find(m => m.brand_name === 'Telma 40') || MEDICINES_DATABASE[0];
    } else {
      currentSelectedMedicine = {
        jan_aushadhi_name: 'Telmisartan Tablets IP 40mg',
        generic_name: 'Telmisartan (40mg)',
        brand_name: 'Telma 40',
        jan_aushadhi_price: 18,
        brand_mrp: 106,
        pack_size: '10 tablets',
        image: 'assets/Telmisartan 40mg.png'
      };
    }
    return currentSelectedMedicine;
  }

  function updateProductActionUI(qty) {
    if (!productBtnAddCart || !productQtyStepper) return;
    const med = ensureSelectedMedicine();
    const jaPriceNum = med ? Math.round(med.jan_aushadhi_price || 18) : 18;
    const bottomPrice = document.getElementById('product-bottom-price');

    if (qty > 0) {
      productBtnAddCart.style.display = 'none';
      productQtyStepper.style.display = 'flex';
      if (productQtyVal) productQtyVal.textContent = qty;
      if (bottomPrice) bottomPrice.textContent = `₹ ${jaPriceNum * qty}`;
    } else {
      productBtnAddCart.style.display = 'flex';
      productQtyStepper.style.display = 'none';
      if (bottomPrice) bottomPrice.textContent = `₹ ${jaPriceNum}`;
    }

    // Update Floating View Cart Pill (Blue pill matching buttons)
    if (floatingViewCartPill) {
      if (qty > 0) {
        floatingViewCartPill.classList.add('visible');
        floatingViewCartPill.style.display = 'flex';
        // Show count of medicine items in cart (5 items)
        const countToShow = prescriptionMedicines.length > 0 ? prescriptionMedicines.length : (qty > 0 ? 1 : 0);
        if (floatingCartCount) {
          floatingCartCount.textContent = `${countToShow} item${countToShow === 1 ? '' : 's'}`;
        }
        if (floatingCartThumbImg) {
          floatingCartThumbImg.src = med?.image || 'assets/Telmisartan 40mg.png';
        }
      } else {
        floatingViewCartPill.classList.remove('visible');
        floatingViewCartPill.style.display = 'none';
      }
    }
  }

  if (productBtnAddCart) {
    productBtnAddCart.addEventListener('click', () => {
      const med = ensureSelectedMedicine();
      let existing = prescriptionMedicines.find(m => 
        m.generic_name.toLowerCase().includes((med.jan_aushadhi_name || '').toLowerCase()) || 
        m.generic_name.toLowerCase().includes((med.generic_name || '').toLowerCase()) ||
        (med.brand_name && m.brand_name && m.brand_name.toLowerCase().includes(med.brand_name.toLowerCase()))
      );
      if (existing) {
        existing.qty = Math.max(existing.qty, 1);
      } else {
        existing = {
          id: 'med-' + Date.now(),
          generic_name: med.jan_aushadhi_name || med.generic_name,
          brand_name: `(${med.brand_name || 'Generic'})`,
          pack_size: med.pack_size || '10 tablets',
          price: Math.round(med.jan_aushadhi_price || 18),
          mrp: Math.round(med.brand_mrp || 106),
          qty: 1,
          color: '#1A73E9',
          image: med.image || 'assets/Telmisartan 40mg.png'
        };
        prescriptionMedicines.push(existing);
      }
      updateProductActionUI(existing.qty);
      renderCartItems();
      showToast(`Added ${med.brand_name || med.jan_aushadhi_name} to cart!`);
    });
  }

  if (productQtyPlus) {
    productQtyPlus.addEventListener('click', (e) => {
      e.stopPropagation();
      const med = ensureSelectedMedicine();
      let existing = prescriptionMedicines.find(m => 
        m.generic_name.toLowerCase().includes((med.jan_aushadhi_name || '').toLowerCase()) || 
        m.generic_name.toLowerCase().includes((med.generic_name || '').toLowerCase()) ||
        (med.brand_name && m.brand_name && m.brand_name.toLowerCase().includes(med.brand_name.toLowerCase()))
      );
      if (existing) {
        existing.qty++;
        updateProductActionUI(existing.qty);
        renderCartItems();
      } else {
        existing = {
          id: 'med-' + Date.now(),
          generic_name: med.jan_aushadhi_name || med.generic_name,
          brand_name: `(${med.brand_name || 'Generic'})`,
          pack_size: med.pack_size || '10 tablets',
          price: Math.round(med.jan_aushadhi_price || 18),
          mrp: Math.round(med.brand_mrp || 106),
          qty: 1,
          color: '#1A73E9',
          image: med.image || 'assets/Telmisartan 40mg.png'
        };
        prescriptionMedicines.push(existing);
        updateProductActionUI(1);
        renderCartItems();
      }
    });
  }

  if (productQtyMinus) {
    productQtyMinus.addEventListener('click', (e) => {
      e.stopPropagation();
      const med = ensureSelectedMedicine();
      const index = prescriptionMedicines.findIndex(m => 
        m.generic_name.toLowerCase().includes((med.jan_aushadhi_name || '').toLowerCase()) || 
        m.generic_name.toLowerCase().includes((med.generic_name || '').toLowerCase()) ||
        (med.brand_name && m.brand_name && m.brand_name.toLowerCase().includes(med.brand_name.toLowerCase()))
      );
      if (index !== -1) {
        if (prescriptionMedicines[index].qty > 1) {
          prescriptionMedicines[index].qty--;
          updateProductActionUI(prescriptionMedicines[index].qty);
        } else {
          prescriptionMedicines.splice(index, 1);
          updateProductActionUI(0);
          showToast(`Removed from cart`);
        }
        renderCartItems();
      } else {
        updateProductActionUI(0);
      }
    });
  }

  function executeSearch(query = '') {
    const q = query.trim();
    let results = [];
    let isGenericQuery = false;

    // Toggle "Search your Medicine" block per Search 1
    if (searchMedicineSection) {
      searchMedicineSection.style.display = q ? 'none' : 'block';
    }

    if (!q) {
      // If query is empty, show medicines based on active category filter
      if (activeFilter === 'all') {
        results = MEDICINES_DATABASE;
      } else {
        results = getMedicinesByCategory(activeFilter);
      }
      resultsCountEl.textContent = `Showing ${results.length} medicines`;
    } else {
      // Execute multi-criteria search
      const searchResponse = searchMedicines(q);
      results = searchResponse.results;
      isGenericQuery = searchResponse.isGenericQuery;

      // If a category filter is active, further filter results
      if (activeFilter !== 'all') {
        results = results.filter(m => m.category.toLowerCase() === activeFilter.toLowerCase());
      }

      if (isGenericQuery) {
        resultsCountEl.textContent = `${results.length} generic formulation${results.length === 1 ? '' : 's'} found`;
      } else {
        resultsCountEl.textContent = `${results.length} result${results.length === 1 ? '' : 's'} for "${q}"`;
      }
    }

    searchResultsList.innerHTML = '';

    if (results.length === 0) {
      searchResultsList.innerHTML = `
        <div class="search-empty-state">
          <div class="empty-icon">🔍</div>
          <h4 class="empty-title">No medicines found</h4>
          <p class="empty-desc">
            Try searching by generic name (e.g. <b>Paracetamol</b>), brand (e.g. <b>Dolo 650</b>, <b>Pan 40</b>), or symptom (e.g. <b>fever</b>, <b>headache</b>, <b>asthma</b>).
          </p>
        </div>
      `;
      return;
    }

    results.forEach(med => {
      searchResultsList.appendChild(renderMedicineCard(med, isGenericQuery));
    });
  }

  // --- Search Listeners ---
  if (homeSearchInput) {
    homeSearchInput.addEventListener('click', () => {
      openSearchOverlay(homeSearchInput.value);
    });

    homeSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = homeSearchInput.value.trim();
        if (val) {
          submitSearchToProductInfo(val);
        } else {
          openSearchOverlay('');
        }
      }
    });
  }

  if (homeSearchActionBtn) {
    homeSearchActionBtn.addEventListener('click', () => {
      const val = homeSearchInput.value.trim();
      if (val) {
        submitSearchToProductInfo(val);
      } else {
        openSearchOverlay('');
      }
    });
  }

  if (closeSearchOverlayBtn) {
    closeSearchOverlayBtn.addEventListener('click', closeSearchOverlay);
  }

  if (overlaySearchInput) {
    overlaySearchInput.addEventListener('input', (e) => {
      const q = e.target.value;
      clearSearchBtn.classList.toggle('visible', !!q);
      renderSearchSuggestions(q);
      executeSearch(q);
    });

    overlaySearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitSearchToProductInfo(overlaySearchInput.value);
      }
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      overlaySearchInput.value = '';
      clearSearchBtn.classList.remove('visible');
      renderSearchSuggestions('');
      executeSearch('');
      overlaySearchInput.focus();
    });
  }

  // --- Voice Search Listener ---
  if (searchMicBtn) {
    searchMicBtn.addEventListener('click', () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'en-IN';
          recognition.interimResults = false;
          recognition.maxAlternatives = 1;

          searchMicBtn.classList.add('listening');
          showToast('Listening... Speak medicine name');

          recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            if (overlaySearchInput) {
              overlaySearchInput.value = spokenText;
              clearSearchBtn.classList.add('visible');
              executeSearch(spokenText);
            }
            searchMicBtn.classList.remove('listening');
            showToast(`Heard: "${spokenText}"`);
          };

          recognition.onerror = () => {
            searchMicBtn.classList.remove('listening');
            showToast('Voice input cancelled or not permitted');
          };

          recognition.onend = () => {
            searchMicBtn.classList.remove('listening');
          };

          recognition.start();
        } catch (e) {
          searchMicBtn.classList.remove('listening');
          showToast('Voice search not available on this browser');
        }
      } else {
        showToast('Voice search: Say "Paracetamol" or "Cetirizine"');
        if (overlaySearchInput) {
          overlaySearchInput.value = 'Paracetamol';
          clearSearchBtn.classList.add('visible');
          executeSearch('Paracetamol');
        }
      }
    });
  }

  // --- Search 1: Photo Search Buttons ---
  if (btnSearchClickPhoto) {
    btnSearchClickPhoto.addEventListener('click', () => {
      closeSearchOverlay();
      startCamera();
    });
  }

  if (btnSearchSelectPhoto) {
    btnSearchSelectPhoto.addEventListener('click', () => {
      closeSearchOverlay();
      if (galleryFileInput) {
        galleryFileInput.click();
      }
    });
  }

  // --- Filter Chips ---
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      executeSearch(overlaySearchInput.value);
    });
  });

  // --- Category Cards on Homepage Click ---
  categoryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      activeFilter = category;

      // Update active chip
      filterChips.forEach(c => {
        c.classList.toggle('active', c.dataset.filter === category);
      });

      openSearchOverlay('');
      showToast(`Showing ${card.querySelector('.category-name').textContent} medicines`);
    });
  });

  // --- Bottom Navigation Switcher ---
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const tabName = item.querySelector('.nav-label').textContent;

      if (item.dataset.tab === 'home') {
        closeSearchOverlay();
        if (screenPrescriptionUpload) screenPrescriptionUpload.classList.remove('active');
        if (screenPrescriptionsMain) screenPrescriptionsMain.classList.remove('active');
        if (screenReviewPages) screenReviewPages.classList.remove('active');
        if (screenCart) screenCart.classList.remove('active');
        if (screenLoading) screenLoading.classList.remove('active');
        if (screenProductInfo) screenProductInfo.classList.remove('active');
        navigationStack = ['home'];
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
      } else if (item.dataset.tab === 'prescription') {
        closeSearchOverlay();
        if (screenPrescriptionUpload) screenPrescriptionUpload.classList.remove('active');
        if (screenReviewPages) screenReviewPages.classList.remove('active');
        if (screenCart) screenCart.classList.remove('active');
        if (screenLoading) screenLoading.classList.remove('active');
        if (screenProductInfo) screenProductInfo.classList.remove('active');
        navigationStack = ['home', 'prescriptions-main'];
        openPrescriptionsHub();
      } else {
        closeSearchOverlay();
        if (screenPrescriptionUpload) screenPrescriptionUpload.classList.remove('active');
        if (screenPrescriptionsMain) screenPrescriptionsMain.classList.remove('active');
        if (screenReviewPages) screenReviewPages.classList.remove('active');
        if (screenCart) screenCart.classList.remove('active');
        if (screenLoading) screenLoading.classList.remove('active');
        if (screenProductInfo) screenProductInfo.classList.remove('active');
        navigationStack = ['home'];
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        showToast(`${tabName} selected`);
      }
    });
  });
});

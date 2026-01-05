// ============================================
// WEBSITE ULANG TAHUN UNTUK ADEL - 15 TAHUN
// ============================================

// Konfigurasi
const CONFIG = {
  appName: "Adel's 15th Birthday",
  appVersion: "1.0.1",
  defaultImage:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
  musicUrl: "ultahsong.mp3",
  fallbackMusicUrl:
    "https://assets.mixkit.co/music/preview/mixkit-romantic-moment-724.mp3",
  maxWishLength: 500,
  itemsPerPage: {
    memories: 6,
    wishes: 6,
    gallery: 12,
  },
};

// State Aplikasi
const APP_STATE = {
  currentSection: "home",
  isMusicPlaying: false,
  isGiftOpened: false,
  memories: [],
  wishes: [],
  gallery: [],
  currentPage: {
    memories: 1,
    wishes: 1,
    gallery: 1,
  },
  filters: {
    memories: "all",
    wishes: "all",
    gallery: "",
  },
  sort: {
    memories: "newest",
    wishes: "newest",
    gallery: "newest",
  },
};

// DOM Elements
const DOM = {
  // Loading
  loadingScreen: document.getElementById("loadingScreen"),

  // Navigation
  navLinks: document.querySelectorAll(".nav-link"),
  mobileMenuBtn: document.getElementById("mobileMenuBtn"),
  mobileNavOverlay: document.getElementById("mobileNavOverlay"),
  closeMobileNav: document.getElementById("closeMobileNav"),
  mobileNavLinks: document.querySelectorAll(".mobile-nav-link"),

  // Music
  musicToggle: document.getElementById("musicToggle"),
  mobileMusicToggle: document.getElementById("mobileMusicToggle"),
  smallMusicToggle: document.getElementById("smallMusicToggle"),
  playMusicBtn: document.getElementById("playMusicBtn"),
  bgMusic: document.getElementById("bgMusic"),

  // Back to top
  backToTop: document.getElementById("backToTop"),

  // Sections
  sections: document.querySelectorAll(".section"),

  // Home - TIDAK ADA scroll indicator
  counterNumbers: document.querySelectorAll(".counter-number"),

  // Memories
  memoryForm: document.getElementById("memoryForm"),
  memoryImage: document.getElementById("memoryImage"),
  fileUploadArea: document.getElementById("fileUploadArea"),
  imagePreview: document.getElementById("imagePreview"),
  memoryRating: document.getElementById("memoryRating"),
  stars: document.querySelectorAll(".star"),
  ratingText: document.querySelector(".rating-text"),
  memoriesGrid: document.getElementById("memoriesGrid"),
  totalMemories: document.getElementById("totalMemories"),
  averageRating: document.getElementById("averageRating"),
  filterBtns: document.querySelectorAll(".filter-btn"),
  sortMemories: document.getElementById("sortMemories"),

  // Gallery
  galleryGrid: document.getElementById("galleryGrid"),
  gallerySearch: document.getElementById("gallerySearch"),
  totalPhotos: document.getElementById("totalPhotos"),
  topRated: document.getElementById("topRated"),
  contributors: document.getElementById("contributors"),
  viewBtns: document.querySelectorAll(".view-btn"),
  gridView: document.getElementById("gridView"),
  masonryView: document.getElementById("masonryView"),

  // Wishes
  wishForm: document.getElementById("wishForm"),
  wishMessage: document.getElementById("wishMessage"),
  charCount: document.getElementById("charCount"),
  wishesGrid: document.getElementById("wishesGrid"),
  totalWishes: document.getElementById("totalWishes"),
  refreshWishes: document.getElementById("refreshWishes"),
  editWishModal: document.getElementById("editWishModal"),
  editWishForm: document.getElementById("editWishForm"),
  editWishName: document.getElementById("editWishName"),
  editWishMessage: document.getElementById("editWishMessage"),
  editCharCount: document.getElementById("editCharCount"),
  cancelEdit: document.getElementById("cancelEdit"),
  closeEditModal: document.getElementById("closeEditModal"),

  // Gift
  giftBox: document.getElementById("giftBox"),
  giftMessage: document.getElementById("giftMessage"),
  celebrateBtn: document.getElementById("celebrateBtn"),
  animationArea: document.getElementById("animationArea"),

  // Modals
  imageModal: document.getElementById("imageModal"),
  closeModal: document.getElementById("closeModal"),
  modalImage: document.getElementById("modalImage"),
  modalTitle: document.getElementById("modalTitle"),
  modalDescription: document.getElementById("modalDescription"),
  modalDate: document.getElementById("modalDate"),
  modalRating: document.getElementById("modalRating"),

  // Toast
  toastContainer: document.getElementById("toastContainer"),
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  initApp();
});

async function initApp() {
  // Simulate loading
  await simulateLoading();

  // Initialize components
  initNavigation();
  initMusicPlayer();
  initBackToTop();
  initCounters();
  initMemories();
  initGallery();
  initWishes();
  initGift();
  initModals();

  // Hide loading screen
  setTimeout(() => {
    DOM.loadingScreen.style.opacity = "0";
    DOM.loadingScreen.style.visibility = "hidden";

    // Show welcome toast
    showToast("Selamat Datang!", "Selamat ulang tahun Adel! 🎉", "success");
  }, 1000);
}

async function simulateLoading() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
  // Smooth scroll to sections
  DOM.navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute("href");
      navigateToSection(sectionId.substring(1));
    });
  });

  DOM.mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.getAttribute("href");
      navigateToSection(sectionId.substring(1));
      closeMobileNav();
    });
  });

  // Mobile menu toggle
  DOM.mobileMenuBtn.addEventListener("click", toggleMobileNav);
  DOM.closeMobileNav.addEventListener("click", closeMobileNav);
  DOM.mobileNavOverlay.addEventListener("click", function (e) {
    if (e.target === this) closeMobileNav();
  });

  // Close mobile nav on escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMobileNav();
  });
}

function navigateToSection(sectionId) {
  // Update active section
  APP_STATE.currentSection = sectionId;

  // Update nav links
  updateActiveNavLink(sectionId);

  // Scroll to section
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 70,
      behavior: "smooth",
    });
  }

  // Update URL hash
  history.pushState(null, null, `#${sectionId}`);
}

function updateActiveNavLink(sectionId) {
  // Desktop nav
  DOM.navLinks.forEach((link) => {
    const linkSection = link.getAttribute("href").substring(1);
    if (linkSection === sectionId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Mobile nav
  DOM.mobileNavLinks.forEach((link) => {
    const linkSection = link.getAttribute("href").substring(1);
    if (linkSection === sectionId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Update sections
  DOM.sections.forEach((section) => {
    if (section.id === sectionId) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
}

function toggleMobileNav() {
  DOM.mobileMenuBtn.classList.toggle("active");
  DOM.mobileNavOverlay.classList.toggle("active");
  document.body.style.overflow = DOM.mobileNavOverlay.classList.contains(
    "active"
  )
    ? "hidden"
    : "";
}

function closeMobileNav() {
  DOM.mobileMenuBtn.classList.remove("active");
  DOM.mobileNavOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Handle browser back/forward
window.addEventListener("popstate", function () {
  const hash = window.location.hash.substring(1) || "home";
  navigateToSection(hash);
});

// Initial navigation based on URL hash
const initialHash = window.location.hash.substring(1) || "home";
navigateToSection(initialHash);

// ============================================
// MUSIC PLAYER
// ============================================

function initMusicPlayer() {
  // Set up audio
  DOM.bgMusic.volume = 0.5;

  // Try to load the local music file first
  const audio = new Audio();
  audio.src = CONFIG.musicUrl;
  audio.addEventListener("error", function () {
    // If local file fails, use fallback URL
    DOM.bgMusic.src = CONFIG.fallbackMusicUrl;
    console.log("Menggunakan lagu fallback");
  });

  // Music toggle buttons
  [
    DOM.musicToggle,
    DOM.mobileMusicToggle,
    DOM.smallMusicToggle,
    DOM.playMusicBtn,
  ].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", toggleMusic);
    }
  });

  // Update music button state when audio plays/pauses
  DOM.bgMusic.addEventListener("play", updateMusicButtonState);
  DOM.bgMusic.addEventListener("pause", updateMusicButtonState);

  // Auto-play on gift open
  DOM.giftBox.addEventListener("click", function () {
    if (!APP_STATE.isMusicPlaying && APP_STATE.isGiftOpened) {
      playMusic();
    }
  });
}

function toggleMusic() {
  if (APP_STATE.isMusicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  DOM.bgMusic
    .play()
    .then(() => {
      APP_STATE.isMusicPlaying = true;
      updateMusicButtonState();
      showToast("Musik Dimainkan", "Lagu romantis untuk Adel 🎵", "success");
    })
    .catch((error) => {
      console.error("Error playing music:", error);
      showToast("Error", "Tidak dapat memutar musik", "error");
    });
}

function pauseMusic() {
  DOM.bgMusic.pause();
  APP_STATE.isMusicPlaying = false;
  updateMusicButtonState();
}

function updateMusicButtonState() {
  const isPlaying = !DOM.bgMusic.paused;
  APP_STATE.isMusicPlaying = isPlaying;

  // Update all music buttons
  const musicButtons = [
    DOM.musicToggle,
    DOM.mobileMusicToggle,
    DOM.smallMusicToggle,
    DOM.playMusicBtn,
  ];
  musicButtons.forEach((btn) => {
    if (btn) {
      if (isPlaying) {
        btn.classList.add("playing");
        if (btn.querySelector("i")) {
          btn.querySelector("i").className = "fas fa-pause";
        }
        // Update text
        const textElements = btn.querySelectorAll("span");
        textElements.forEach((el) => {
          if (el.textContent.includes("Putar")) {
            el.textContent = el.textContent.replace("Putar", "Pause");
          }
        });
      } else {
        btn.classList.remove("playing");
        if (btn.querySelector("i")) {
          btn.querySelector("i").className = "fas fa-play";
        }
        // Update text
        const textElements = btn.querySelectorAll("span");
        textElements.forEach((el) => {
          if (el.textContent.includes("Pause")) {
            el.textContent = el.textContent.replace("Pause", "Putar");
          }
        });
      }
    }
  });

  // Update mobile music text
  const mobileMusicText = document.getElementById("mobileMusicText");
  if (mobileMusicText) {
    mobileMusicText.textContent = isPlaying ? "Pause Musik" : "Putar Musik";
  }
}

// ============================================
// BACK TO TOP
// ============================================

function initBackToTop() {
  DOM.backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", toggleBackToTop);
}

function toggleBackToTop() {
  if (window.pageYOffset > 300) {
    DOM.backToTop.classList.add("visible");
  } else {
    DOM.backToTop.classList.remove("visible");
  }
}

// ============================================
// HOME SECTION - COUNTERS
// ============================================

function initCounters() {
  // Animate counter numbers
  DOM.counterNumbers.forEach((counter) => {
    const target = counter.textContent;
    if (target !== "∞") {
      const numTarget = parseInt(target);
      animateCounter(counter, numTarget);
    }
  });
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// ============================================
// MEMORIES SECTION
// ============================================

function initMemories() {
  // Load sample memories
  loadSampleMemories();

  // Star rating
  initStarRating();

  // File upload
  initFileUpload();

  // Form submission
  DOM.memoryForm.addEventListener("submit", handleMemorySubmit);

  // Filter buttons
  DOM.filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.dataset.filter;
      APP_STATE.filters.memories = filter;
      updateActiveFilterButton(this);
      renderMemories();
    });
  });

  // Sort select
  if (DOM.sortMemories) {
    DOM.sortMemories.addEventListener("change", function () {
      APP_STATE.sort.memories = this.value;
      renderMemories();
    });
  }
}

function loadSampleMemories() {
  // Sample memories data
  const sampleMemories = [
    {
      id: 1,
      title: "Pesta Ulang Tahun ke-14",
      description:
        "Perayaan ulang tahun tahun lalu di rumah dengan keluarga dan teman-teman terdekat.",
      date: "2022-05-15",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      author: "Keluarga",
      timestamp: "2022-05-15T10:30:00Z",
    },
    {
      id: 2,
      title: "Liburan ke Pantai",
      description: "Kenangan indah saat liburan keluarga ke pantai tahun lalu.",
      date: "2022-07-20",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80",
      author: "Ibu",
      timestamp: "2022-07-20T14:20:00Z",
    },
    {
      id: 3,
      title: "Pertunjukan Musik Sekolah",
      description: "Adel tampil memukau dalam pertunjukan musik sekolah.",
      date: "2022-10-05",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      author: "Guru",
      timestamp: "2022-10-05T19:00:00Z",
    },
  ];

  // Load from localStorage or use samples
  const savedMemories = localStorage.getItem("adel_memories");
  if (savedMemories) {
    APP_STATE.memories = JSON.parse(savedMemories);
  } else {
    APP_STATE.memories = sampleMemories;
    saveMemories();
  }

  // Update gallery from memories
  updateGalleryFromMemories();

  // Initial render
  renderMemories();
}

function initStarRating() {
  DOM.stars.forEach((star) => {
    star.addEventListener("click", function () {
      const rating = parseInt(this.dataset.value);
      setRating(rating);
    });

    star.addEventListener("mouseover", function () {
      const rating = parseInt(this.dataset.value);
      previewRating(rating);
    });

    star.addEventListener("mouseout", function () {
      const currentRating = parseInt(DOM.memoryRating.value);
      previewRating(currentRating);
    });
  });
}

function setRating(rating) {
  DOM.memoryRating.value = rating;

  // Update star display
  DOM.stars.forEach((star) => {
    const starValue = parseInt(star.dataset.value);
    const icon = star.querySelector("i");

    if (starValue <= rating) {
      icon.className = "fas fa-star";
      icon.style.color = "#ffd700";
    } else {
      icon.className = "far fa-star";
      icon.style.color = "#ccc";
    }
  });

  // Update rating text
  const ratingTexts = [
    "Belum ada rating",
    "Kurang bagus",
    "Cukup bagus",
    "Bagus",
    "Sangat bagus",
    "Luar biasa!",
  ];

  if (DOM.ratingText) {
    DOM.ratingText.textContent = ratingTexts[rating] || "Belum ada rating";
  }
}

function previewRating(rating) {
  DOM.stars.forEach((star) => {
    const starValue = parseInt(star.dataset.value);
    const icon = star.querySelector("i");

    if (starValue <= rating) {
      icon.style.color = "#ffd700";
    } else {
      icon.style.color = "#e0e0e0";
    }
  });
}

function initFileUpload() {
  // Click file upload area to trigger file input
  DOM.fileUploadArea.addEventListener("click", () => {
    DOM.memoryImage.click();
  });

  // Handle file selection
  DOM.memoryImage.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      previewImage(file);
    }
  });

  // Drag and drop
  DOM.fileUploadArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    this.style.borderColor = "var(--dark-pink)";
    this.style.background = "var(--light-pink)";
  });

  DOM.fileUploadArea.addEventListener("dragleave", function (e) {
    e.preventDefault();
    this.style.borderColor = "";
    this.style.background = "";
  });

  DOM.fileUploadArea.addEventListener("drop", function (e) {
    e.preventDefault();
    this.style.borderColor = "";
    this.style.background = "";

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      DOM.memoryImage.files = e.dataTransfer.files;
      previewImage(file);
    } else {
      showToast("Error", "Hanya file gambar yang diperbolehkan", "error");
    }
  });
}

function previewImage(file) {
  if (!file.type.startsWith("image/")) {
    showToast("Error", "File harus berupa gambar", "error");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    showToast("Error", "Ukuran file maksimal 5MB", "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    DOM.imagePreview.innerHTML = `
            <img src="${e.target.result}" alt="Preview" style="max-width: 200px; border-radius: 8px;">
            <button type="button" class="remove-image" style="margin-left: 10px; color: #ff4757;">
                <i class="fas fa-times"></i> Hapus
            </button>
        `;
    DOM.imagePreview.style.display = "flex";
    DOM.imagePreview.style.alignItems = "center";

    // Add remove button listener
    DOM.imagePreview
      .querySelector(".remove-image")
      .addEventListener("click", function () {
        DOM.imagePreview.innerHTML = "";
        DOM.imagePreview.style.display = "none";
        DOM.memoryImage.value = "";
      });
  };
  reader.readAsDataURL(file);
}

function handleMemorySubmit(e) {
  e.preventDefault();

  // Get form values
  const title = document.getElementById("memoryTitle").value;
  const description = document.getElementById("memoryDescription").value;
  const date = document.getElementById("memoryDate").value;
  const rating = parseInt(DOM.memoryRating.value) || 0;

  // Validation
  if (!title || !description || !date || rating === 0) {
    showToast("Error", "Harap isi semua field dan beri rating", "error");
    return;
  }

  // Handle image
  let imageUrl = "";
  if (DOM.memoryImage.files[0]) {
    const file = DOM.memoryImage.files[0];
    imageUrl = URL.createObjectURL(file);
  } else {
    // Use default image if none provided
    imageUrl = CONFIG.defaultImage;
  }

  // Create memory object
  const memory = {
    id: Date.now(),
    title,
    description,
    date,
    rating,
    image: imageUrl,
    author: "Pengguna",
    timestamp: new Date().toISOString(),
  };

  // Add to memories
  APP_STATE.memories.unshift(memory);
  saveMemories();

  // Update gallery
  updateGalleryFromMemories();

  // Reset form
  DOM.memoryForm.reset();
  DOM.imagePreview.innerHTML = "";
  DOM.imagePreview.style.display = "none";
  setRating(0);

  // Render updated memories
  renderMemories();

  // Show success message
  showToast("Berhasil!", "Kenangan berhasil disimpan", "success");
}

function renderMemories() {
  // Filter memories
  let filteredMemories = [...APP_STATE.memories];

  // Apply rating filter
  if (APP_STATE.filters.memories !== "all") {
    const ratingFilter = parseInt(APP_STATE.filters.memories);
    filteredMemories = filteredMemories.filter(
      (memory) => memory.rating === ratingFilter
    );
  }

  // Apply sorting
  switch (APP_STATE.sort.memories) {
    case "newest":
      filteredMemories.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      break;
    case "oldest":
      filteredMemories.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      break;
    case "highest":
      filteredMemories.sort((a, b) => b.rating - a.rating);
      break;
    case "lowest":
      filteredMemories.sort((a, b) => a.rating - b.rating);
      break;
  }

  // Calculate pagination
  const totalMemories = filteredMemories.length;
  const totalPages = Math.ceil(totalMemories / CONFIG.itemsPerPage.memories);
  const startIndex =
    (APP_STATE.currentPage.memories - 1) * CONFIG.itemsPerPage.memories;
  const endIndex = startIndex + CONFIG.itemsPerPage.memories;
  const paginatedMemories = filteredMemories.slice(startIndex, endIndex);

  // Update stats
  if (DOM.totalMemories) {
    DOM.totalMemories.textContent = totalMemories;
  }

  // Calculate average rating
  const average =
    totalMemories > 0
      ? (
          APP_STATE.memories.reduce((sum, memory) => sum + memory.rating, 0) /
          APP_STATE.memories.length
        ).toFixed(1)
      : "0.0";
  if (DOM.averageRating) {
    DOM.averageRating.textContent = average;
  }

  // Render memories
  if (paginatedMemories.length === 0) {
    DOM.memoriesGrid.innerHTML = `
            <div class="no-memories">
                <i class="fas fa-image"></i>
                <h4>Tidak ada kenangan</h4>
                <p>Tidak ada kenangan yang sesuai dengan filter</p>
            </div>
        `;
  } else {
    DOM.memoriesGrid.innerHTML = paginatedMemories
      .map(
        (memory) => `
            <div class="memory-card" data-id="${memory.id}">
                <img src="${memory.image}" alt="${
          memory.title
        }" class="memory-image">
                <div class="memory-content">
                    <div class="memory-header">
                        <h3 class="memory-title">${memory.title}</h3>
                        <div class="memory-rating">
                            ${'<i class="fas fa-star"></i>'.repeat(
                              memory.rating
                            )}
                            ${'<i class="far fa-star"></i>'.repeat(
                              5 - memory.rating
                            )}
                        </div>
                    </div>
                    <p class="memory-description">${memory.description}</p>
                    <div class="memory-footer">
                        <span class="memory-date">${formatDate(
                          memory.date
                        )}</span>
                        <span class="memory-author">Oleh: ${
                          memory.author
                        }</span>
                    </div>
                </div>
                <div class="memory-actions">
                    <button class="view-memory" data-id="${memory.id}">
                        <i class="fas fa-eye"></i> Lihat
                    </button>
                    <button class="delete-memory" data-id="${memory.id}">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
            </div>
        `
      )
      .join("");

    // Add event listeners to action buttons
    DOM.memoriesGrid.querySelectorAll(".view-memory").forEach((btn) => {
      btn.addEventListener("click", function () {
        const memoryId = parseInt(this.dataset.id);
        viewMemory(memoryId);
      });
    });

    DOM.memoriesGrid.querySelectorAll(".delete-memory").forEach((btn) => {
      btn.addEventListener("click", function () {
        const memoryId = parseInt(this.dataset.id);
        deleteMemory(memoryId);
      });
    });

    // Add click event to memory cards
    DOM.memoriesGrid.querySelectorAll(".memory-card").forEach((card) => {
      card.addEventListener("click", function (e) {
        if (!e.target.closest(".memory-actions")) {
          const memoryId = parseInt(this.dataset.id);
          viewMemory(memoryId);
        }
      });
    });
  }
}

function viewMemory(id) {
  const memory = APP_STATE.memories.find((m) => m.id === id);
  if (!memory) return;

  // Show modal with memory details
  if (DOM.modalImage) DOM.modalImage.src = memory.image;
  if (DOM.modalImage) DOM.modalImage.alt = memory.title;
  if (DOM.modalTitle) DOM.modalTitle.textContent = memory.title;
  if (DOM.modalDescription)
    DOM.modalDescription.textContent = memory.description;
  if (DOM.modalDate) DOM.modalDate.textContent = formatDate(memory.date);
  if (DOM.modalRating) DOM.modalRating.textContent = `${memory.rating} Bintang`;

  if (DOM.imageModal) {
    DOM.imageModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function deleteMemory(id) {
  if (confirm("Apakah Anda yakin ingin menghapus kenangan ini?")) {
    APP_STATE.memories = APP_STATE.memories.filter(
      (memory) => memory.id !== id
    );
    saveMemories();
    updateGalleryFromMemories();
    renderMemories();
    showToast("Berhasil!", "Kenangan berhasil dihapus", "success");
  }
}

function updateActiveFilterButton(activeButton) {
  DOM.filterBtns.forEach((btn) => btn.classList.remove("active"));
  activeButton.classList.add("active");
}

function saveMemories() {
  localStorage.setItem("adel_memories", JSON.stringify(APP_STATE.memories));
}

// ============================================
// GALLERY SECTION
// ============================================

function initGallery() {
  // Load gallery from memories
  updateGalleryFromMemories();

  // View toggle
  DOM.viewBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const view = this.dataset.view;
      switchGalleryView(view);
      updateActiveViewButton(this);
    });
  });

  // Search functionality
  if (DOM.gallerySearch) {
    DOM.gallerySearch.addEventListener("input", function () {
      APP_STATE.filters.gallery = this.value.toLowerCase();
      renderGallery();
    });
  }
}

function updateGalleryFromMemories() {
  // Create gallery items from memories
  APP_STATE.gallery = APP_STATE.memories.map((memory) => ({
    id: memory.id,
    image: memory.image,
    title: memory.title,
    rating: memory.rating,
    date: memory.date,
    author: memory.author,
  }));

  // Update stats
  updateGalleryStats();

  // Render gallery
  renderGallery();
}

function updateGalleryStats() {
  if (DOM.totalPhotos) DOM.totalPhotos.textContent = APP_STATE.gallery.length;

  // Count top rated (4+ stars)
  const topRatedCount = APP_STATE.gallery.filter(
    (item) => item.rating >= 4
  ).length;
  if (DOM.topRated) DOM.topRated.textContent = topRatedCount;

  // Count unique contributors
  const contributors = new Set(APP_STATE.gallery.map((item) => item.author));
  if (DOM.contributors) DOM.contributors.textContent = contributors.size;
}

function switchGalleryView(view) {
  if (DOM.gridView) DOM.gridView.classList.remove("active");
  if (DOM.masonryView) DOM.masonryView.classList.remove("active");

  if (view === "grid" && DOM.gridView) {
    DOM.gridView.classList.add("active");
  } else if (view === "masonry" && DOM.masonryView) {
    DOM.masonryView.classList.add("active");
  }

  renderGallery();
}

function updateActiveViewButton(activeButton) {
  DOM.viewBtns.forEach((btn) => btn.classList.remove("active"));
  activeButton.classList.add("active");
}

function renderGallery() {
  // Filter gallery items
  let filteredGallery = [...APP_STATE.gallery];

  if (APP_STATE.filters.gallery) {
    filteredGallery = filteredGallery.filter((item) =>
      item.title.toLowerCase().includes(APP_STATE.filters.gallery)
    );
  }

  // Render grid view
  if (DOM.gridView && DOM.gridView.classList.contains("active")) {
    if (filteredGallery.length === 0) {
      DOM.galleryGrid.innerHTML = `
                <div class="no-photos">
                    <i class="fas fa-images"></i>
                    <h4>Tidak ada foto</h4>
                    <p>Tidak ada foto yang sesuai dengan pencarian</p>
                </div>
            `;
    } else {
      DOM.galleryGrid.innerHTML = filteredGallery
        .map(
          (item) => `
                <div class="gallery-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="gallery-item-overlay">
                        <h4 class="gallery-item-title">${item.title}</h4>
                        <div class="gallery-item-rating">
                            ${'<i class="fas fa-star"></i>'.repeat(item.rating)}
                            ${'<i class="far fa-star"></i>'.repeat(
                              5 - item.rating
                            )}
                        </div>
                    </div>
                </div>
            `
        )
        .join("");

      // Add click event to gallery items
      DOM.galleryGrid.querySelectorAll(".gallery-item").forEach((item) => {
        item.addEventListener("click", function () {
          const itemId = parseInt(this.dataset.id);
          viewGalleryItem(itemId);
        });
      });
    }
  }

  // Render masonry view
  if (DOM.masonryView && DOM.masonryView.classList.contains("active")) {
    // Implementation for masonry view
    DOM.masonryView.innerHTML = `
            <div class="masonry-grid">
                ${filteredGallery
                  .map(
                    (item) => `
                    <div class="masonry-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;

    // Add click event to masonry items
    DOM.masonryView.querySelectorAll(".masonry-item").forEach((item) => {
      item.addEventListener("click", function () {
        const itemId = parseInt(this.dataset.id);
        viewGalleryItem(itemId);
      });
    });
  }
}

function viewGalleryItem(id) {
  const item = APP_STATE.gallery.find((item) => item.id === id);
  if (!item) return;

  // Show modal with gallery item details
  if (DOM.modalImage) DOM.modalImage.src = item.image;
  if (DOM.modalImage) DOM.modalImage.alt = item.title;
  if (DOM.modalTitle) DOM.modalTitle.textContent = item.title;
  if (DOM.modalDescription)
    DOM.modalDescription.textContent = `Foto oleh: ${item.author}`;
  if (DOM.modalDate) DOM.modalDate.textContent = formatDate(item.date);
  if (DOM.modalRating) DOM.modalRating.textContent = `${item.rating} Bintang`;

  if (DOM.imageModal) {
    DOM.imageModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// ============================================
// WISHES SECTION
// ============================================

function initWishes() {
  // Load sample wishes
  loadSampleWishes();

  // Character counter
  if (DOM.wishMessage) {
    DOM.wishMessage.addEventListener("input", updateCharCount);
  }

  // Form submission
  if (DOM.wishForm) {
    DOM.wishForm.addEventListener("submit", handleWishSubmit);
  }

  // Refresh wishes
  if (DOM.refreshWishes) {
    DOM.refreshWishes.addEventListener("click", renderWishes);
  }

  // Filter buttons
  document.querySelectorAll(".wishes-filter .filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.dataset.filter;
      APP_STATE.filters.wishes = filter;
      updateActiveWishFilterButton(this);
      renderWishes();
    });
  });

  // Sort select
  const sortWishes = document.getElementById("sortWishes");
  if (sortWishes) {
    sortWishes.addEventListener("change", function () {
      APP_STATE.sort.wishes = this.value;
      renderWishes();
    });
  }

  // Edit modal
  initEditModal();
}

function loadSampleWishes() {
  // Sample wishes data
  const sampleWishes = [
    {
      id: 1,
      name: "Keluarga Adel",
      message:
        "Selamat ulang tahun sayang! Semoga di usia 15 tahun ini, kamu semakin matang, bijaksana, dan selalu menjadi kebanggaan keluarga. Kami sangat menyayangimu!",
      relation: "family",
      timestamp: new Date().toISOString(),
      likes: 12,
    },
    {
      id: 2,
      name: "Sahabat Adel",
      message:
        "Happy 15th birthday! Semoga panjang umur, sehat selalu, dan sukses dalam semua impianmu!",
      relation: "friend",
      timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      likes: 8,
    },
    {
      id: 3,
      name: "Bibi Rina",
      message:
        "Selamat ulang tahun keponakanku yang cantik! Semoga semakin sukses dan membanggakan orang tua!",
      relation: "relative",
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      likes: 5,
    },
  ];

  // Load from localStorage or use samples
  const savedWishes = localStorage.getItem("adel_wishes");
  if (savedWishes) {
    APP_STATE.wishes = JSON.parse(savedWishes);
  } else {
    APP_STATE.wishes = sampleWishes;
    saveWishes();
  }

  // Initial render
  renderWishes();
}

function updateCharCount() {
  if (!DOM.wishMessage || !DOM.charCount) return;

  const length = DOM.wishMessage.value.length;
  DOM.charCount.textContent = length;

  if (length > CONFIG.maxWishLength) {
    DOM.charCount.style.color = "#ff4757";
    DOM.wishMessage.style.borderColor = "#ff4757";
  } else {
    DOM.charCount.style.color = "";
    DOM.wishMessage.style.borderColor = "";
  }
}

function handleWishSubmit(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("wishName").value;
  const message = DOM.wishMessage ? DOM.wishMessage.value : "";
  const relation = document.getElementById("wishRelation").value;

  // Validation
  if (!name || !message) {
    showToast("Error", "Harap isi nama dan ucapan", "error");
    return;
  }

  if (message.length > CONFIG.maxWishLength) {
    showToast(
      "Error",
      `Ucapan maksimal ${CONFIG.maxWishLength} karakter`,
      "error"
    );
    return;
  }

  // Create wish object
  const wish = {
    id: Date.now(),
    name,
    message,
    relation,
    timestamp: new Date().toISOString(),
    likes: 0,
  };

  // Add to wishes
  APP_STATE.wishes.unshift(wish);
  saveWishes();

  // Reset form
  if (DOM.wishForm) DOM.wishForm.reset();
  if (DOM.charCount) DOM.charCount.textContent = "0";

  // Render updated wishes
  renderWishes();

  // Show success message
  showToast("Berhasil!", "Ucapan berhasil dikirim", "success");
}

function renderWishes() {
  // Filter wishes
  let filteredWishes = [...APP_STATE.wishes];

  // Apply relation filter
  if (APP_STATE.filters.wishes !== "all") {
    filteredWishes = filteredWishes.filter(
      (wish) => wish.relation === APP_STATE.filters.wishes
    );
  }

  // Apply sorting
  switch (APP_STATE.sort.wishes) {
    case "newest":
      filteredWishes.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      break;
    case "oldest":
      filteredWishes.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      break;
    case "name":
      filteredWishes.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  // Calculate pagination
  const totalWishes = filteredWishes.length;
  const totalPages = Math.ceil(totalWishes / CONFIG.itemsPerPage.wishes);
  const startIndex =
    (APP_STATE.currentPage.wishes - 1) * CONFIG.itemsPerPage.wishes;
  const endIndex = startIndex + CONFIG.itemsPerPage.wishes;
  const paginatedWishes = filteredWishes.slice(startIndex, endIndex);

  // Update stats
  if (DOM.totalWishes) {
    DOM.totalWishes.textContent = totalWishes;
  }

  // Render wishes
  if (paginatedWishes.length === 0) {
    DOM.wishesGrid.innerHTML = `
            <div class="no-wishes">
                <i class="fas fa-comment"></i>
                <h4>Tidak ada ucapan</h4>
                <p>Tidak ada ucapan yang sesuai dengan filter</p>
            </div>
        `;
  } else {
    DOM.wishesGrid.innerHTML = paginatedWishes
      .map(
        (wish) => `
            <div class="wish-card" data-id="${wish.id}">
                <div class="wish-card-header">
                    <div class="wish-author">
                        <div class="author-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="author-info">
                            <h4>${wish.name}</h4>
                            <span class="wish-date">${formatDate(
                              wish.timestamp
                            )}</span>
                        </div>
                    </div>
                    <div class="wish-type ${wish.relation}">
                        <i class="fas fa-${getRelationIcon(wish.relation)}"></i>
                        ${getRelationText(wish.relation)}
                    </div>
                </div>
                <div class="wish-card-body">
                    <p class="wish-text">${wish.message}</p>
                </div>
                <div class="wish-card-footer">
                    <div class="wish-actions">
                        <button class="action-btn edit-btn" data-id="${
                          wish.id
                        }">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="action-btn delete-btn" data-id="${
                          wish.id
                        }">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");

    // Add event listeners to action buttons
    DOM.wishesGrid.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const wishId = parseInt(this.dataset.id);
        openEditModal(wishId);
      });
    });

    DOM.wishesGrid.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const wishId = parseInt(this.dataset.id);
        deleteWish(wishId);
      });
    });
  }
}

function getRelationIcon(relation) {
  const icons = {
    family: "home",
    friend: "user-friends",
    relative: "users",
    other: "star",
  };
  return icons[relation] || "user";
}

function getRelationText(relation) {
  const texts = {
    family: "Keluarga",
    friend: "Teman",
    relative: "Kerabat",
    other: "Lainnya",
  };
  return texts[relation] || "Lainnya";
}

function updateActiveWishFilterButton(activeButton) {
  document.querySelectorAll(".wishes-filter .filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  activeButton.classList.add("active");
}

function initEditModal() {
  // Character counter for edit form
  if (DOM.editWishMessage) {
    DOM.editWishMessage.addEventListener("input", function () {
      const length = this.value.length;
      if (DOM.editCharCount) {
        DOM.editCharCount.textContent = length;
      }

      if (length > CONFIG.maxWishLength) {
        if (DOM.editCharCount) DOM.editCharCount.style.color = "#ff4757";
        this.style.borderColor = "#ff4757";
      } else {
        if (DOM.editCharCount) DOM.editCharCount.style.color = "";
        this.style.borderColor = "";
      }
    });
  }

  // Form submission
  if (DOM.editWishForm) {
    DOM.editWishForm.addEventListener("submit", handleEditWishSubmit);
  }

  // Cancel button
  if (DOM.cancelEdit) {
    DOM.cancelEdit.addEventListener("click", closeEditModal);
  }
  if (DOM.closeEditModal) {
    DOM.closeEditModal.addEventListener("click", closeEditModal);
  }

  // Close modal on overlay click
  if (DOM.editWishModal) {
    DOM.editWishModal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeEditModal();
      }
    });
  }

  // Close modal on escape
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      DOM.editWishModal &&
      DOM.editWishModal.classList.contains("active")
    ) {
      closeEditModal();
    }
  });
}

let currentEditWishId = null;

function openEditModal(wishId) {
  const wish = APP_STATE.wishes.find((w) => w.id === wishId);
  if (!wish) return;

  currentEditWishId = wishId;

  // Populate form
  if (DOM.editWishName) DOM.editWishName.value = wish.name;
  if (DOM.editWishMessage) DOM.editWishMessage.value = wish.message;
  if (DOM.editCharCount) DOM.editCharCount.textContent = wish.message.length;

  // Show modal
  if (DOM.editWishModal) {
    DOM.editWishModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeEditModal() {
  if (DOM.editWishModal) {
    DOM.editWishModal.classList.remove("active");
    document.body.style.overflow = "";
  }
  currentEditWishId = null;
  if (DOM.editWishForm) DOM.editWishForm.reset();
}

function handleEditWishSubmit(e) {
  e.preventDefault();

  if (!currentEditWishId) return;

  const name = DOM.editWishName ? DOM.editWishName.value : "";
  const message = DOM.editWishMessage ? DOM.editWishMessage.value : "";

  // Validation
  if (!name || !message) {
    showToast("Error", "Harap isi nama dan ucapan", "error");
    return;
  }

  if (message.length > CONFIG.maxWishLength) {
    showToast(
      "Error",
      `Ucapan maksimal ${CONFIG.maxWishLength} karakter`,
      "error"
    );
    return;
  }

  // Update wish
  const wishIndex = APP_STATE.wishes.findIndex(
    (w) => w.id === currentEditWishId
  );
  if (wishIndex !== -1) {
    APP_STATE.wishes[wishIndex].name = name;
    APP_STATE.wishes[wishIndex].message = message;
    APP_STATE.wishes[wishIndex].timestamp = new Date().toISOString();

    saveWishes();
    renderWishes();
    closeEditModal();
    showToast("Berhasil!", "Ucapan berhasil diperbarui", "success");
  }
}

function deleteWish(id) {
  if (confirm("Apakah Anda yakin ingin menghapus ucapan ini?")) {
    APP_STATE.wishes = APP_STATE.wishes.filter((wish) => wish.id !== id);
    saveWishes();
    renderWishes();
    showToast("Berhasil!", "Ucapan berhasil dihapus", "success");
  }
}

function saveWishes() {
  localStorage.setItem("adel_wishes", JSON.stringify(APP_STATE.wishes));
}

// ============================================
// GIFT SECTION
// ============================================

function initGift() {
  // Gift box click
  if (DOM.giftBox) {
    DOM.giftBox.addEventListener("click", openGift);
  }

  // Celebrate button
  if (DOM.celebrateBtn) {
    DOM.celebrateBtn.addEventListener("click", celebrateAgain);
  }

  // Mini gifts
  document.querySelectorAll(".mini-gift").forEach((gift) => {
    gift.addEventListener("click", function () {
      const giftType = this.dataset.gift;
      openMiniGift(giftType);
    });
  });
}

function openGift() {
  if (APP_STATE.isGiftOpened) return;

  APP_STATE.isGiftOpened = true;

  // Animate gift opening
  if (DOM.giftBox) {
    DOM.giftBox.style.transform = "scale(1.1) rotate(5deg)";
    DOM.giftBox.style.transition = "all 0.5s ease";
  }

  setTimeout(() => {
    // Hide gift box
    if (DOM.giftBox) {
      DOM.giftBox.style.opacity = "0";
      DOM.giftBox.style.visibility = "hidden";
    }

    // Show gift message
    if (DOM.giftMessage) {
      DOM.giftMessage.classList.add("active");
    }

    // Create animations
    createAnimations();

    // Auto-play music
    if (!APP_STATE.isMusicPlaying) {
      playMusic();
    }

    // Show celebration toast
    showToast("🎉 Selamat!", "Hadiah telah dibuka!", "success");
  }, 500);
}

function celebrateAgain() {
  // Reset gift state
  APP_STATE.isGiftOpened = false;

  // Hide gift message
  if (DOM.giftMessage) {
    DOM.giftMessage.classList.remove("active");
  }

  // Show gift box
  if (DOM.giftBox) {
    DOM.giftBox.style.opacity = "1";
    DOM.giftBox.style.visibility = "visible";
    DOM.giftBox.style.transform = "scale(1) rotate(0deg)";
  }

  // Clear animations
  if (DOM.animationArea) {
    DOM.animationArea.innerHTML = "";
  }

  // Show toast
  showToast("🎂", "Klik kado lagi untuk membuka ulang!", "info");
}

function createAnimations() {
  // Clear previous animations
  if (DOM.animationArea) {
    DOM.animationArea.innerHTML = "";
  }

  // Create balloons
  for (let i = 0; i < 20; i++) {
    createBalloon();
  }

  // Create confetti
  for (let i = 0; i < 50; i++) {
    createConfetti();
  }

  // Create floating hearts
  for (let i = 0; i < 15; i++) {
    createFloatingHeart();
  }
}

function createBalloon() {
  if (!DOM.animationArea) return;

  const balloon = document.createElement("div");
  balloon.className = "animation-balloon";

  // Random properties
  const colors = [
    "#ff69b4",
    "#ff85c2",
    "#ff1493",
    "#d9a7ff",
    "#a3d9ff",
    "#fff9ae",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 40 + 20;
  const left = Math.random() * 100;
  const duration = Math.random() * 6 + 4;

  // Apply styles
  balloon.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size * 1.3}px;
        background: ${color};
        border-radius: 50%;
        left: ${left}%;
        bottom: -50px;
        animation: floatBalloon ${duration}s ease-in forwards;
    `;

  // Add string
  const string = document.createElement("div");
  string.style.cssText = `
        position: absolute;
        width: 2px;
        height: ${size * 2}px;
        background: #666;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
    `;
  balloon.appendChild(string);

  DOM.animationArea.appendChild(balloon);

  // Remove after animation
  setTimeout(() => {
    balloon.remove();
  }, duration * 1000);
}

function createConfetti() {
  if (!DOM.animationArea) return;

  const confetti = document.createElement("div");
  confetti.className = "animation-confetti";

  // Random properties
  const shapes = ["circle", "square", "rectangle", "triangle"];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const colors = [
    "#ff69b4",
    "#ff85c2",
    "#ff1493",
    "#d9a7ff",
    "#a3d9ff",
    "#fff9ae",
    "#a8ffb8",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 10 + 5;
  const left = Math.random() * 100;
  const duration = Math.random() * 3 + 2;
  const delay = Math.random() * 2;

  // Apply styles based on shape
  let shapeStyles = "";
  switch (shape) {
    case "circle":
      shapeStyles = "border-radius: 50%;";
      break;
    case "square":
      shapeStyles = "";
      break;
    case "rectangle":
      shapeStyles = `width: ${size * 2}px; height: ${size}px;`;
      break;
    case "triangle":
      shapeStyles = `
                width: 0;
                height: 0;
                background: transparent !important;
                border-left: ${size}px solid transparent;
                border-right: ${size}px solid transparent;
                border-bottom: ${size * 2}px solid ${color};
            `;
      break;
  }

  confetti.style.cssText = `
        position: absolute;
        width: ${shape === "rectangle" ? size * 2 : size}px;
        height: ${size}px;
        background: ${shape === "triangle" ? "transparent" : color};
        left: ${left}%;
        top: -20px;
        animation: fallConfetti ${duration}s ease-in ${delay}s forwards;
        ${shapeStyles}
    `;

  DOM.animationArea.appendChild(confetti);

  // Remove after animation
  setTimeout(() => {
    confetti.remove();
  }, (duration + delay) * 1000);
}

function createFloatingHeart() {
  if (!DOM.animationArea) return;

  const heart = document.createElement("div");
  heart.className = "animation-heart";
  heart.innerHTML = "❤️";

  // Random properties
  const size = Math.random() * 20 + 15;
  const left = Math.random() * 100;
  const duration = Math.random() * 8 + 6;
  const delay = Math.random() * 5;

  heart.style.cssText = `
        position: absolute;
        font-size: ${size}px;
        left: ${left}%;
        bottom: 0;
        animation: floatHeart ${duration}s ease-in ${delay}s forwards;
        opacity: 0.8;
    `;

  DOM.animationArea.appendChild(heart);

  // Remove after animation
  setTimeout(() => {
    heart.remove();
  }, (duration + delay) * 1000);
}

function openMiniGift(type) {
  const messages = {
    1: "Virtual hug untuk Adel! 🤗",
    2: "Bunga digital yang selalu mekar untukmu! 🌸",
    3: "Lagu romantis spesial untuk hari spesialmu! 🎵",
    4: "Puisi indah tentang kecantikanmu! ✨",
  };

  showToast(
    "🎁 Hadiah Virtual",
    messages[type] || "Hadiah spesial untuk Adel!",
    "success"
  );

  // Add small animation
  const giftIcon = document.querySelector(
    `.mini-gift[data-gift="${type}"] .gift-icon`
  );
  if (giftIcon) {
    giftIcon.style.transform = "scale(1.2)";
    giftIcon.style.transition = "transform 0.3s ease";

    setTimeout(() => {
      giftIcon.style.transform = "scale(1)";
    }, 300);
  }
}

// ============================================
// MODALS
// ============================================

function initModals() {
  // Image modal
  if (DOM.closeModal) {
    DOM.closeModal.addEventListener("click", closeImageModal);
  }
  if (DOM.imageModal) {
    DOM.imageModal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeImageModal();
      }
    });
  }

  // Close modal on escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (DOM.imageModal && DOM.imageModal.classList.contains("active")) {
        closeImageModal();
      }
      if (DOM.editWishModal && DOM.editWishModal.classList.contains("active")) {
        closeEditModal();
      }
    }
  });
}

function closeImageModal() {
  if (DOM.imageModal) {
    DOM.imageModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // If today
    if (date.toDateString() === now.toDateString()) {
      return "Hari ini";
    }

    // If yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Kemarin";
    }

    // If within last week
    if (diffDays < 7) {
      return `${diffDays} hari yang lalu`;
    }

    // Otherwise format date
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    return dateString;
  }
}

function showToast(title, message, type = "info") {
  if (!DOM.toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icon =
    type === "success"
      ? "✅"
      : type === "error"
      ? "❌"
      : type === "warning"
      ? "⚠️"
      : "ℹ️";

  toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;

  DOM.toastContainer.appendChild(toast);

  // Remove toast after 5 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener("error", function (e) {
  console.error("Global error:", e.error);
  showToast("Error", "Terjadi kesalahan dalam aplikasi", "error");
});

// Handle offline/online status
window.addEventListener("offline", function () {
  showToast("Info", "Anda sedang offline", "warning");
});

window.addEventListener("online", function () {
  showToast("Info", "Koneksi internet telah pulih", "success");
});

// ============================================
// CSS ANIMATIONS (injected into style tag)
// ============================================

const styleTag = document.createElement("style");
styleTag.textContent = `
    /* Animation keyframes */
    @keyframes floatBalloon {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-450px) rotate(20deg);
            opacity: 0;
        }
    }
    
    @keyframes fallConfetti {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(400px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes floatHeart {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-200px) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translateY(-400px) scale(0.8);
            opacity: 0;
        }
    }
    
    /* Toast notifications */
    .toast-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
    }
    
    .toast {
        background: white;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
        border-left: 4px solid #ff69b4;
        animation: slideIn 0.3s ease;
    }
    
    .toast.success {
        border-left-color: #00b894;
    }
    
    .toast.error {
        border-left-color: #ff4757;
    }
    
    .toast.warning {
        border-left-color: #ffa502;
    }
    
    .toast-icon {
        font-size: 20px;
    }
    
    .toast-content h4 {
        margin: 0 0 5px 0;
        font-size: 14px;
        font-weight: 600;
    }
    
    .toast-content p {
        margin: 0;
        font-size: 12px;
        color: #666;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(styleTag);

// ============================================
// EXPORT FUNCTIONS (for browser console debugging)
// ============================================

window.APP = {
  state: APP_STATE,
  config: CONFIG,
  resetMemories: function () {
    localStorage.removeItem("adel_memories");
    APP_STATE.memories = [];
    renderMemories();
    showToast("Reset", "Memories telah direset", "success");
  },
  resetWishes: function () {
    localStorage.removeItem("adel_wishes");
    APP_STATE.wishes = [];
    renderWishes();
    showToast("Reset", "Wishes telah direset", "success");
  },
  addSampleData: function () {
    // Add sample memories and wishes
    loadSampleMemories();
    loadSampleWishes();
    showToast("Sample Data", "Data sample telah ditambahkan", "success");
  },
};

console.log(
  "%c🎉 Website Ulang Tahun Adel - 15 Tahun 🎉",
  "color: #ff69b4; font-size: 16px; font-weight: bold;"
);
console.log("%cVersi: " + CONFIG.appVersion, "color: #666;");
console.log("%cGunakan APP. di console untuk debugging", "color: #009688;");

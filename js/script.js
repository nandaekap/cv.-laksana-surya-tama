// ===== Menu mobile halaman PDA Test =====
const pdaMenuToggle = document.getElementById('pdaMenuToggle');
const pdaMenu = document.getElementById('pdaMenu');

if (pdaMenuToggle && pdaMenu) {
  pdaMenuToggle.addEventListener('click', () => {
    const open = pdaMenu.classList.toggle('open');
    pdaMenuToggle.setAttribute('aria-expanded', String(open));
  });

  pdaMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      pdaMenu.classList.remove('open');
      pdaMenuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const layanan = pdaMenu.querySelector('.pda-dropdown > button');
  const dropdown = pdaMenu.querySelector('.pda-dropdown');
  if (layanan && dropdown) {
    layanan.addEventListener('click', () => dropdown.classList.toggle('open'));
  }
}

// ===== Lightbox dokumentasi aktivitas PDA Test =====
const pdaModal = document.getElementById('pdaModal');
const pdaModalImage = document.getElementById('pdaModalImage');
const pdaModalClose = document.getElementById('pdaModalClose');

function closePdaModal() {
  if (!pdaModal) return;
  pdaModal.classList.remove('open');
  pdaModal.setAttribute('aria-hidden', 'true');
  if (pdaModalImage) pdaModalImage.src = '';
}

document.querySelectorAll('.pda-image-button').forEach((button) => {
  button.addEventListener('click', () => {
    if (!pdaModal || !pdaModalImage) return;
    pdaModalImage.src = button.dataset.image;
    pdaModalImage.alt = button.dataset.alt || 'Dokumentasi PDA Test';
    pdaModal.classList.add('open');
    pdaModal.setAttribute('aria-hidden', 'false');
  });
});

if (pdaModalClose) pdaModalClose.addEventListener('click', closePdaModal);
if (pdaModal) {
  pdaModal.addEventListener('click', (event) => {
    if (event.target === pdaModal) closePdaModal();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePdaModal();
});

document.addEventListener("DOMContentLoaded", function () {

    const serviceCards = document.querySelectorAll(".service-item");

    serviceCards.forEach(function (card) {

        card.style.cursor = "pointer";

        card.addEventListener("click", function () {

            const title = card.querySelector("h3");

            if (!title) return;

            const serviceName = title.textContent.trim().toLowerCase();

            if (serviceName === "pda test") {
                window.location.href = "pda-test.html";
            }

            else if (serviceName === "soil test") {
                window.location.href = "soil-test.html";
            }

            else if (serviceName === "borpile") {
                window.location.href = "borpile.html";
            }

            else if (serviceName === "layanan lainnya") {
                window.location.href = "other.html";
            }

        });

    });

});
/* =========================================
   TAMBAH FOTO AKTIVITAS
========================================= */

const activityAddBtn =
    document.getElementById("activityAddBtn");

const activityUploadForm =
    document.getElementById("activityUploadForm");

const activityFormClose =
    document.getElementById("activityFormClose");

const activityCancelBtn =
    document.getElementById("activityCancelBtn");

const activitySaveBtn =
    document.getElementById("activitySaveBtn");

const activityPhoto =
    document.getElementById("activityPhoto");

const activityPreview =
    document.getElementById("activityPreview");

const activityPreviewImage =
    document.getElementById("activityPreviewImage");

const activityGallery =
    document.getElementById("activityGallery");

const activityTitle =
    document.getElementById("activityTitle");

const activityCategory =
    document.getElementById("activityCategory");

const activityLocation =
    document.getElementById("activityLocation");

const activityDate =
    document.getElementById("activityDate");


let selectedActivityImage = null;


/* =========================================
   BUKA FORM
========================================= */

if (activityAddBtn) {

    activityAddBtn.addEventListener(
        "click",
        function () {

            activityUploadForm.classList.add("open");

            activityAddBtn.style.display = "none";

        }
    );

}


/* =========================================
   TUTUP FORM
========================================= */

function closeActivityForm() {

    activityUploadForm.classList.remove("open");

    activityAddBtn.style.display = "inline-flex";

}


if (activityFormClose) {

    activityFormClose.addEventListener(
        "click",
        closeActivityForm
    );

}


if (activityCancelBtn) {

    activityCancelBtn.addEventListener(
        "click",
        closeActivityForm
    );

}


/* =========================================
   PREVIEW FOTO
========================================= */

if (activityPhoto) {

    activityPhoto.addEventListener(
        "change",
        function () {

            const file = this.files[0];

            if (!file) {
                return;
            }


            /* Validasi tipe file */

            if (!file.type.startsWith("image/")) {

                alert(
                    "File harus berupa gambar."
                );

                this.value = "";

                return;
            }


            /* Maksimal 5 MB */

            if (file.size > 5 * 1024 * 1024) {

                alert(
                    "Ukuran foto maksimal 5 MB."
                );

                this.value = "";

                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    selectedActivityImage =
                        event.target.result;

                    activityPreviewImage.src =
                        selectedActivityImage;

                    activityPreview.classList.add(
                        "has-image"
                    );

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================
   FORMAT TANGGAL
========================================= */

function formatActivityDate(date) {

    if (!date) {
        return "";
    }


    const parts =
        date.split("-");


    const activityDateObject =
        new Date(
            parts[0],
            parts[1] - 1,
            parts[2]
        );


    return activityDateObject
        .toLocaleDateString(
            "id-ID",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

}


/* =========================================
   SIMPAN FOTO
========================================= */

if (activitySaveBtn) {

    activitySaveBtn.addEventListener(
        "click",
        function () {


            /* Validasi */

            if (!selectedActivityImage) {

                alert(
                    "Silakan pilih foto terlebih dahulu."
                );

                return;
            }


            if (!activityTitle.value.trim()) {

                alert(
                    "Silakan isi judul aktivitas."
                );

                activityTitle.focus();

                return;
            }


            if (!activityCategory.value) {

                alert(
                    "Silakan pilih jenis layanan."
                );

                return;
            }


            /* Buat card */

            const card =
                document.createElement("article");


            card.className =
                "activity-added-card";


            card.innerHTML = `

                <div class="activity-added-image">

                    <img
                        src="${selectedActivityImage}"
                        alt="${activityTitle.value}">

                </div>


                <div class="activity-added-body">

                    <span class="activity-added-category">
                        ${activityCategory.value}
                    </span>

                    <h3>
                        ${activityTitle.value}
                    </h3>

                    <p>
                        ${
                            activityLocation.value ||
                            "Lokasi belum ditambahkan"
                        }
                    </p>

                    <time>
                        ${
                            formatActivityDate(
                                activityDate.value
                            )
                        }
                    </time>

                </div>

            `;


            /* Tambahkan ke gallery */

            activityGallery.prepend(card);


            /* Reset */

            activityPhoto.value = "";

            activityTitle.value = "";

            activityCategory.value = "";

            activityLocation.value = "";

            activityDate.value = "";

            selectedActivityImage = null;


            activityPreviewImage.src = "";

            activityPreview.classList.remove(
                "has-image"
            );


            /* Tutup form */

            closeActivityForm();

        }
    );

}

/* =========================================
   MOBILE NAVBAR HOME
========================================= */

const homeMenuToggle =
    document.getElementById("homeMenuToggle");

const homeMenu =
    document.getElementById("homeMenu");


if (homeMenuToggle && homeMenu) {

    homeMenuToggle.addEventListener(
        "click",
        function () {

            homeMenu.classList.toggle("open");

            const isOpen =
                homeMenu.classList.contains("open");


            homeMenuToggle.innerHTML =
                isOpen ? "×" : "☰";

        }
    );


    /* Tutup menu saat link diklik */

    const homeMenuLinks =
        homeMenu.querySelectorAll("a");


    homeMenuLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                homeMenu.classList.remove("open");

                homeMenuToggle.innerHTML = "☰";

            }
        );

    });


    /* Tutup saat klik di luar */

    document.addEventListener(
        "click",
        function (event) {

            const klikDiMenu =
                homeMenu.contains(event.target);

            const klikDiTombol =
                homeMenuToggle.contains(event.target);


            if (!klikDiMenu && !klikDiTombol) {

                homeMenu.classList.remove("open");

                homeMenuToggle.innerHTML = "☰";

            }

        }
    );

}

/* =========================================
   CONTACT MOBILE MENU
========================================= */

const contactMenuToggle =
    document.getElementById("contactMenuToggle");

const contactMenu =
    document.getElementById("contactMenu");


if (contactMenuToggle && contactMenu) {

    function closeContactMenu() {

        contactMenu.classList.remove("open");

        contactMenuToggle.innerHTML = "☰";

        contactMenuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    contactMenuToggle.addEventListener(
        "click",
        function () {

            contactMenu.classList.toggle("open");


            const isOpen =
                contactMenu.classList.contains("open");


            contactMenuToggle.innerHTML =
                isOpen ? "×" : "☰";


            contactMenuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        }
    );


    contactMenu
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                closeContactMenu
            );

        });


    document.addEventListener(
        "click",
        function (event) {

            if (
                !contactMenu.contains(event.target) &&
                !contactMenuToggle.contains(event.target)
            ) {

                closeContactMenu();

            }

        }
    );


    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 950) {

                closeContactMenu();

            }

        }
    );

}


/* =========================================
   CONTACT FORM TO WHATSAPP
========================================= */

const whatsappContactForm =
    document.getElementById("whatsappContactForm");


if (whatsappContactForm) {

    whatsappContactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("contactName")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("contactPhone")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("contactEmail")
                    .value
                    .trim();


            const company =
                document
                    .getElementById("contactCompany")
                    .value
                    .trim();


            const service =
                document
                    .getElementById("contactService")
                    .value;


            const message =
                document
                    .getElementById("contactMessage")
                    .value
                    .trim();


            /* Nomor perusahaan tanpa + */

            const whatsappNumber =
                "6281315601312";


            const whatsappMessage =
`Halo CV. Laksana Surya Tama,

Saya ingin berkonsultasi mengenai layanan Anda.

Nama: ${name}
No. Telepon: ${phone}
Email: ${email || "-"}
Perusahaan / Instansi: ${company || "-"}
Layanan: ${service}

Pesan:
${message}

Terima kasih.`;


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}

document.addEventListener("DOMContentLoaded", function () {

    const jackingMenuToggle =
        document.getElementById("jackingMenuToggle");

    const jackingMenu =
        document.getElementById("jackingMenu");

    if (jackingMenuToggle && jackingMenu) {

        jackingMenuToggle.addEventListener("click", function () {

            jackingMenu.classList.toggle("open");

            const isOpen =
                jackingMenu.classList.contains("open");

            jackingMenuToggle.textContent =
                isOpen ? "×" : "☰";

        });

    }

});





/* =========================================================
   GSAP SCROLL ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Pastikan GSAP dan ScrollTrigger tersedia
    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        console.warn("GSAP / ScrollTrigger tidak tersedia.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);


    /* =====================================================
       1. TENTANG KAMI
    ===================================================== */

    const aboutContent =
        document.querySelector(".company-about-content");

    const aboutImage =
        document.querySelector(".company-about-image");


    if (aboutContent) {

        gsap.fromTo(
            aboutContent,
            {
                opacity: 0,
                x: -30
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: "power2.out",

                scrollTrigger: {
                    trigger: aboutContent,
                    start: "top 85%",
                    once: true
                }
            }
        );

    }


    if (aboutImage) {

        gsap.fromTo(
            aboutImage,
            {
                opacity: 0,
                x: 30
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: "power2.out",

                scrollTrigger: {
                    trigger: aboutImage,
                    start: "top 85%",
                    once: true
                }
            }
        );

    }



    /* =====================================================
       2. KENAPA MEMILIH KAMI
    ===================================================== */

    const advantageCards =
        gsap.utils.toArray(".company-value");


    if (advantageCards.length) {

        gsap.fromTo(
            advantageCards,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.12,
                ease: "power2.out",

                scrollTrigger: {
                    trigger: ".company-values",
                    start: "top 88%",
                    once: true
                }
            }
        );

    }



    /* =====================================================
       3. CARD LAYANAN
    ===================================================== */

    const serviceCards =
        gsap.utils.toArray(".company-service-card");


    if (serviceCards.length) {

        gsap.fromTo(
            serviceCards,
            {
                opacity: 0,
                y: 35
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.12,
                ease: "power2.out",

                scrollTrigger: {
                    trigger: ".company-service-grid",
                    start: "top 88%",
                    once: true
                }
            }
        );

    }



    /* =====================================================
       4. SOIL TEST
    ===================================================== */

    const soilSection =
        document.querySelector(".company-soil-highlight");


    if (soilSection) {

        const soilContent =
            soilSection.querySelector(".company-soil-content");

        const soilImage =
            soilSection.querySelector(".company-soil-image");


        if (soilContent) {

            gsap.fromTo(
                soilContent,
                {
                    opacity: 0,
                    x: -30
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    ease: "power2.out",

                    scrollTrigger: {
                        trigger: soilSection,
                        start: "top 85%",
                        once: true
                    }
                }
            );

        }


        if (soilImage) {

            gsap.fromTo(
                soilImage,
                {
                    opacity: 0,
                    x: 30
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    ease: "power2.out",

                    scrollTrigger: {
                        trigger: soilSection,
                        start: "top 85%",
                        once: true
                    }
                }
            );

        }

    }



    /* =====================================================
       5. MAPS / LOKASI
    ===================================================== */

    const locationSection =
        document.querySelector(".home-location");


    if (locationSection) {

        gsap.fromTo(
            locationSection,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",

                scrollTrigger: {
                    trigger: locationSection,
                    start: "top 88%",
                    once: true
                }
            }
        );

    }



    /* =====================================================
       6. JUDUL SECTION
       Judul naik + fade
       Garis orange melebar
       Deskripsi muncul setelahnya
    ===================================================== */

    const sectionHeadings =
        gsap.utils.toArray(".pda-section-heading");


    sectionHeadings.forEach(function (heading) {

        const label =
            heading.querySelector(".pda-label");

        const title =
            heading.querySelector("h2");

        const line =
            heading.querySelector(".pda-heading-line");

        const description =
            heading.querySelector("p:not(.pda-label)");


        // Label kecil
        if (label) {

            gsap.fromTo(
                label,
                {
                    opacity: 0,
                    y: 10
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",

                    scrollTrigger: {
                        trigger: heading,
                        start: "top 85%",
                        once: true
                    }
                }
            );

        }


        // Judul utama
        if (title) {

            gsap.fromTo(
                title,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    delay: 0.08,
                    ease: "power3.out",

                    scrollTrigger: {
                        trigger: heading,
                        start: "top 85%",
                        once: true
                    }
                }
            );

        }


        // Garis orange
        if (line) {

            gsap.fromTo(
                line,
                {
                    scaleX: 0
                },
                {
                    scaleX: 1,
                    duration: 0.8,
                    delay: 0.15,
                    transformOrigin: "center",
                    ease: "power3.out",

                    scrollTrigger: {
                        trigger: heading,
                        start: "top 85%",
                        once: true
                    }
                }
            );

        }


        // Deskripsi
        if (description) {

            gsap.fromTo(
                description,
                {
                    opacity: 0,
                    y: 15
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.22,
                    ease: "power2.out",

                    scrollTrigger: {
                        trigger: heading,
                        start: "top 85%",
                        once: true
                    }
                }
            );

        }

    });

  /* =====================================================
   7. JUDUL SECTION HOMEPAGE - SAFE
===================================================== */

const homeHeadings =
    gsap.utils.toArray(".company-section-heading");

homeHeadings.forEach(function (heading) {

    gsap.fromTo(
        heading,
        {
            opacity: 0,
            y: 25
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",

            scrollTrigger: {
                trigger: heading,
                start: "top 88%",
                once: true
            }
        }
    );

});

    /* =====================================================
       REFRESH SCROLLTRIGGER
    ===================================================== */

    ScrollTrigger.refresh();

});

/* =========================================
   MOBILE NAVBAR - BORPILE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const borpileMenuToggle =
        document.getElementById("borpileMenuToggle");

    const borpileMenu =
        document.getElementById("borpileMenu");

    if (!borpileMenuToggle || !borpileMenu) return;


    // BUKA / TUTUP MENU
    borpileMenuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        borpileMenu.classList.toggle("open");

        const isOpen =
            borpileMenu.classList.contains("open");

        borpileMenuToggle.innerHTML =
            isOpen ? "×" : "☰";

        borpileMenuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    // TUTUP KALAU LINK DIKLIK
    borpileMenu
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                borpileMenu.classList.remove("open");

                borpileMenuToggle.innerHTML = "☰";

                borpileMenuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


    // TUTUP KALAU KLIK DI LUAR MENU
    document.addEventListener("click", function (event) {

        if (
            !borpileMenu.contains(event.target) &&
            !borpileMenuToggle.contains(event.target)
        ) {

            borpileMenu.classList.remove("open");

            borpileMenuToggle.innerHTML = "☰";

            borpileMenuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    // RESET SAAT KEMBALI KE DESKTOP
    window.addEventListener("resize", function () {

        if (window.innerWidth > 1000) {

            borpileMenu.classList.remove("open");

            borpileMenuToggle.innerHTML = "☰";

            borpileMenuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});

const borpileDropdown =
    document.querySelector(".borpile-dropdown");

const borpileDropdownButton =
    document.querySelector(".borpile-dropdown > button");

if (borpileDropdown && borpileDropdownButton) {

    borpileDropdownButton.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        borpileDropdown.classList.toggle("open");

    });

}
/* =========================================
   MOBILE NAVBAR - SONDIR
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const sondirMenuToggle =
        document.getElementById("sondirMenuToggle");

    const sondirMenu =
        document.getElementById("sondirMenu");

    if (!sondirMenuToggle || !sondirMenu) return;


    sondirMenuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        sondirMenu.classList.toggle("open");

        const isOpen =
            sondirMenu.classList.contains("open");

        sondirMenuToggle.innerHTML =
            isOpen ? "×" : "☰";

        sondirMenuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    // Tutup saat link diklik
    sondirMenu
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                sondirMenu.classList.remove("open");

                sondirMenuToggle.innerHTML = "☰";

                sondirMenuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


    // Tutup saat klik di luar
    document.addEventListener("click", function (event) {

        if (
            !sondirMenu.contains(event.target) &&
            !sondirMenuToggle.contains(event.target)
        ) {

            sondirMenu.classList.remove("open");

            sondirMenuToggle.innerHTML = "☰";

            sondirMenuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    // Reset saat kembali ke desktop
    window.addEventListener("resize", function () {

        if (window.innerWidth > 1000) {

            sondirMenu.classList.remove("open");

            sondirMenuToggle.innerHTML = "☰";

            sondirMenuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});

/* =========================================================
   GLOBAL SCROLL ANIMATION - SEMUA HALAMAN
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (
        typeof window.gsap === "undefined" ||
        typeof window.ScrollTrigger === "undefined"
    ) {
        console.warn("GSAP / ScrollTrigger tidak tersedia.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);


    /* ===============================
       FUNGSI ANIMASI
    =============================== */

    function reveal(selector, options = {}) {

        const elements = gsap.utils.toArray(selector);

        if (!elements.length) return;

        elements.forEach(function (element) {

            gsap.fromTo(
                element,
                {
                    opacity: 0,
                    y: options.y ?? 35
                },
                {
                    opacity: 1,
                    y: 0,

                    duration: options.duration ?? 0.75,
                    delay: options.delay ?? 0,

                    ease: "power2.out",

                    scrollTrigger: {
                        trigger: element,
                        start: options.start ?? "top 88%",
                        once: true
                    }
                }
            );

        });

    }


    function revealGroup(selector, options = {}) {

        const elements = gsap.utils.toArray(selector);

        if (!elements.length) return;

        gsap.fromTo(
            elements,
            {
                opacity: 0,
                y: options.y ?? 30
            },
            {
                opacity: 1,
                y: 0,

                duration: options.duration ?? 0.65,
                stagger: options.stagger ?? 0.10,

                ease: "power2.out",

                scrollTrigger: {
                    trigger: elements[0],
                    start: options.start ?? "top 88%",
                    once: true
                }
            }
        );

    }


    /* =====================================================
       HOMEPAGE
    ===================================================== */

    reveal(".company-about-content");
    reveal(".company-about-image");

    reveal(".company-section-heading");

    revealGroup(".company-advantage-card", {
        stagger: 0.12
    });

    revealGroup(".company-service-card", {
        stagger: 0.12
    });

    reveal(".company-soil-content");
    reveal(".company-soil-image");


    /* =====================================================
       PDA TEST
    ===================================================== */

    reveal(".pda-hero-content");

    reveal(".pda-about-content");
    reveal(".pda-about-image");

    revealGroup(".pda-benefit-card", {
        stagger: 0.10
    });

    revealGroup(".pda-process-item", {
        stagger: 0.10
    });

    revealGroup(".pda-activity-card", {
        stagger: 0.08
    });


    /* =====================================================
       BORPILE
    ===================================================== */

    reveal(".borpile-hero-content");

    reveal(".borpile-about-content");
    reveal(".borpile-about-image");

    revealGroup(".borpile-benefit-card", {
        stagger: 0.10
    });

    revealGroup(".borpile-process-item", {
        stagger: 0.10
    });


    /* =====================================================
       SONDIR
    ===================================================== */

    reveal(".sondir-hero-content");

    reveal(".sondir-about-content");
    reveal(".sondir-about-image");

    revealGroup(".sondir-benefit-card", {
        stagger: 0.10
    });

    revealGroup(".sondir-process-item", {
        stagger: 0.10
    });


    /* =====================================================
       JACKING TEST
    ===================================================== */

    reveal(".jacking-hero-content");

    reveal(".jacking-about-content");
    reveal(".jacking-about-image");

    revealGroup(".jacking-benefit-card", {
        stagger: 0.10
    });

    reveal(".jacking-process-intro");

    revealGroup(".jacking-process-item", {
        stagger: 0.10
    });

    reveal(".jacking-parameter-content");
    reveal(".jacking-parameter-card");

    revealGroup(".jacking-gallery-grid article", {
        stagger: 0.12
    });

    reveal(".jacking-cta-box");


    /* =====================================================
       AKTIVITAS
    ===================================================== */

    revealGroup(".pda-activity-grid--gallery .pda-activity-card", {
        stagger: 0.08
    });


    /* =====================================================
       KONTAK
    ===================================================== */

    reveal(".contact-hero-content");

    revealGroup(".contact-info-card", {
        stagger: 0.10
    });

    reveal(".contact-form");
    reveal(".contact-map");


    /* =====================================================
       FOOTER
    ===================================================== */

    reveal(".home-footer-grid", {
        y: 20
    });

    reveal(".pda-footer-grid", {
        y: 20
    });

    reveal(".borpile-footer-grid", {
        y: 20
    });

    reveal(".sondir-footer-grid", {
        y: 20
    });

    reveal(".jacking-footer-grid", {
        y: 20
    });


    ScrollTrigger.refresh();

});


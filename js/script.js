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
                "6281211980367";


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
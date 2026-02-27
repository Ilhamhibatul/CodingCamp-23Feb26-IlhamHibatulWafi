document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. WELCOMING SPEECH 
    // ==========================================
    const initWelcomingSpeech = () => {
        setTimeout(() => {
            let userName = prompt("Halo! Silakan masukkan nama Anda untuk pengalaman yang lebih personal:", "");
            
            if (!userName || userName.trim() === "") {
                userName = "Guest";
            }
            
            const nameElement = document.getElementById('userName');
            if(nameElement) {
                nameElement.textContent = userName;
            }
        }, 300); 
    };

    // ==========================================
    // 2. REAL-TIME CLOCK FOR MESSAGE BOX
    // ==========================================
    const updateTime = () => {
        const timeElement = document.getElementById('currentTime');
        if (!timeElement) return;

        const now = new Date();
        const dateString = now.toString();
        const cleanDateString = dateString.split(' (')[0]; 
        timeElement.textContent = cleanDateString;
    };
    
    // Update setiap detik
    setInterval(updateTime, 1000);
    updateTime(); 

    // ==========================================
    // 3. FORM VALIDATION & HANDLING
    // ==========================================
    const form = document.getElementById('messageForm');
    
    if(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const nama = document.getElementById('nama').value.trim();
            const dob = document.getElementById('tanggalLahir').value;
            const genderInput = document.querySelector('input[name="jenisKelamin"]:checked');
            const pesan = document.getElementById('pesan').value.trim();

            if (!nama || !dob || !genderInput || !pesan) {
                alert("Mohon maaf, harap isi seluruh form data (Nama, Tanggal Lahir, Jenis Kelamin, dan Pesan) sebelum menekan tombol Submit.");
                return;
            }

            document.getElementById('outName').textContent = nama;
            
            const dobParts = dob.split('-');
            const formattedDob = `${dobParts[2]}/${dobParts[1]}/${dobParts[0]}`;
            document.getElementById('outDob').textContent = formattedDob;
            
            document.getElementById('outGender').textContent = genderInput.value;
            document.getElementById('outMessage').textContent = pesan;

            
            alert("Terima kasih! Pesan Anda telah berhasil ditampilkan pada sistem.");
        });
    }

    // ==========================================
    // 4. MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    initWelcomingSpeech();
});

// ==========================================
// 5. SPA NAVIGATION LOGIC 
// ==========================================
/**
  @param {string} targetView 
  @param {string} scrollToId 
 */
window.navigate = function(targetView, scrollToId = null) {
    const views = document.querySelectorAll('.page-view');
    views.forEach(view => {
        view.classList.remove('active');
    });

    const activeView = document.getElementById(`view-${targetView}`);
    if (activeView) {
        activeView.classList.add('active');
    }

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active', 'bg-brand-500', 'text-brand-900'));
    
    navButtons.forEach(btn => {
        if(btn.textContent.toLowerCase().includes(targetView.replace('-', ' '))) {
            btn.classList.add('active');
        }
    });

    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }

    if (scrollToId) {

        setTimeout(() => {
            const targetElement = document.getElementById(scrollToId);
            if (targetElement) {
                const yOffset = -100; 
                const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        }, 100);
    } else {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
};
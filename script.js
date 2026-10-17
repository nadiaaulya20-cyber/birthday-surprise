
const envelope = document.getElementById("envelope");
const heartSeal = document.getElementById("heartSeal");
const hint = document.getElementById("hint");
const letterMessage = document.getElementById("letterMessage");

const envelopeScene = document.getElementById("envelopeScene");
const countdownScene = document.getElementById("countdownScene");
const countdownNumber = document.getElementById("countdownNumber");
const introScene = document.getElementById("introScene");
const galleryScene = document.getElementById("galleryScene");
const birthdayScene = document.getElementById("birthdayScene");

const birthdayCharm = document.getElementById("birthdayCharm");
const backToPhotosBtn = document.getElementById("backToPhotosBtn");

const birthdayAudio = document.getElementById("birthdayAudio");
const musicToggle = document.getElementById("musicToggle");
const musicProgress = document.getElementById("musicProgress");


function showMusicLove() {
    if (!musicToggle) return;

    const rect = musicToggle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = 35;

    for (let i = 0; i < 12; i++) {
        const love = document.createElement("span");
        love.className = "music-love";
        love.textContent = "♥";

        const angle = (Math.PI * 2 * i) / 12;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        love.style.left = x + "px";
        love.style.top = y + "px";
        love.style.transform = "translate(-50%, -50%)";
        love.style.animationDelay = (i * 0.04) + "s";

        document.body.appendChild(love);

        love.addEventListener("animationend", function () {
            love.remove();
        });
    }
}

const showLetterBtn = document.getElementById("showLetterBtn");
const letterContainer = document.getElementById("letterContainer");

let envelopeOpened = false;
let surpriseStarted = false;
let typingTimer;

// =====================================
// 1. MEMBUKA AMPLOP DAN MENGETIK PESAN
// =====================================

if (heartSeal) {
    heartSeal.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (envelopeOpened) return;
        envelopeOpened = true;

        if (envelope) envelope.classList.add("open");
        if (hint) hint.textContent = "A little secret, just for us ♡";

        startBirthdayMusic();

        setTimeout(function () {
            const letter = document.getElementById("letter");

            if (letter) {
                letter.classList.add("letter-zoom");
            }

            const message =
                "Masih ingat tanggal special kita? ... ♡";

            if (!letterMessage) return;

            letterMessage.textContent = "";
            let index = 0;

            function typeNextCharacter() {
                if (index < message.length) {
                    letterMessage.textContent += message.charAt(index);
                    index++;

                    typingTimer = setTimeout(typeNextCharacter, 100);
                } else {
                    // Tunggu 3 detik setelah tulisan selesai.
                    setTimeout(function () {
                        showPasscode();
                    }, 3000);
                }
            }

            clearTimeout(typingTimer);
            typeNextCharacter();
        }, 1000);
    });
}

// =====================================
// 2. MUSIK DAN PROGRESS BAR
// =====================================

function startBirthdayMusic() {
    if (!birthdayAudio || !birthdayAudio.paused) return;

    birthdayAudio.play().catch(function (error) {
        console.log("Musik menunggu interaksi browser:", error);
    });
}

if (birthdayAudio) {
    birthdayAudio.volume = 0.35;

    birthdayAudio.addEventListener("timeupdate", function () {
        if (birthdayAudio.duration && musicProgress) {
            const progress =
                (birthdayAudio.currentTime / birthdayAudio.duration) * 100;

            musicProgress.style.width = progress + "%";
        }
    });

   
        birthdayAudio.addEventListener("play", function () {
            if (musicToggle) musicToggle.textContent = "Ⅱ";
            showMusicLove();
        });


        
        birthdayAudio.addEventListener("pause", function () {
            if (musicToggle) musicToggle.textContent = "▶";
            showMusicLove();
        });

}

if (musicToggle && birthdayAudio) {
    musicToggle.addEventListener("click", function (event) {
        event.stopPropagation();

        if (birthdayAudio.paused) {
            startBirthdayMusic();
        } else {
            birthdayAudio.pause();
        }
    });
}

// =====================================
// 3. PINDAH ANTARHALAMAN
// =====================================





function showScene(scene) {
    if (!scene) return;

    if (envelopeScene) envelopeScene.hidden = true;
    if (countdownScene) countdownScene.hidden = true;
    if (introScene) introScene.hidden = true;
    if (galleryScene) galleryScene.hidden = true;
    if (birthdayScene) birthdayScene.hidden = true;

    // Pastikan amplop lama tidak muncul lagi.
    if (letterMessage) letterMessage.textContent = "";

    scene.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}





// =====================================
// 4. ANIMASI HUJAN HATI
// =====================================

function createHeartShower() {
    const colors = [
        "#ff789f",
        "#ffb5cb",
        "#e83e70",
        "#fff0f5"
    ];

    for (let i = 0; i < 45; i++) {
        setTimeout(function () {
            const heart = document.createElement("span");

            heart.className = "floating-heart";
            heart.textContent = Math.random() > 0.35 ? "♥" : "♡";

            heart.style.setProperty(
                "--start-x",
                Math.random() * 100 + "vw"
            );

            heart.style.setProperty(
                "--drift",
                (Math.random() * 200 - 100) + "px"
            );

            heart.style.setProperty(
                "--rotation",
                (Math.random() * 100 - 50) + "deg"
            );

            heart.style.setProperty(
                "--heart-size",
                (50 + Math.random() * 75) + "px"
            );

            heart.style.setProperty(
                "--heart-duration",
                (3 + Math.random() * 2) + "s"
            );

            heart.style.setProperty(
                "--heart-color",
                colors[Math.floor(Math.random() * colors.length)]
            );

            document.body.appendChild(heart);

            heart.addEventListener("animationend", function () {
                heart.remove();
            });
        }, i * 65);
    }
}




function createLoveTextHeart() {
    return new Promise(function (resolve) {
        const scene = document.createElement("div");
        scene.id = "loveTextHeartScene";
        scene.className = "love-text-heart-scene";
        document.body.appendChild(scene);

        const width = window.innerWidth;
        const height = window.innerHeight;
        const cx = width / 2;
        const cy = height / 2;

        const colors = [
            "#ff3d62", "#ff527f", "#ff719b",
            "#ff91b5", "#ffc0d5", "#fff0f6"
        ];

        const phrases = [
            "I love you",
            "I LOVE YOU",
            "love you ♡",
            "love",
            "I love you ♡"
        ];

        // Bentuk hati yang sama untuk isi dan garis luar.
        function heartPoint(t) {
            return {
                x: 16 * Math.pow(Math.sin(t), 3) / 17,
                y: (
                    13 * Math.cos(t) -
                    5 * Math.cos(2 * t) -
                    2 * Math.cos(3 * t) -
                    Math.cos(4 * t)
                ) / 17
            };
        }

        function insideHeart(x, y) {
            let inside = false;
            const count = 120;

            for (let i = 0, j = count - 1; i < count; j = i++) {
                const a = heartPoint(i * Math.PI * 2 / count);
                const b = heartPoint(j * Math.PI * 2 / count);

                if (
                    (a.y > y) !== (b.y > y) &&
                    x < (b.x - a.x) * (y - a.y) /
                        (b.y - a.y) + a.x
                ) {
                    inside = !inside;
                }
            }

            return inside;
        }

        const heartWidth = Math.min(width * 0.30, height * 0.38);
        const heartHeight = Math.min(height * 0.36, width * 0.30);
        const points = [];

        // Isi hati dengan jarak teratur agar tidak berbentuk persegi.
        const spacingX = 0.065;
const spacingY = 0.075;

        for (let y = -0.98; y <= 0.98; y += spacingY) {
            for (let x = -0.98; x <= 0.98; x += spacingX) {
                if (insideHeart(x, y) && Math.random() < 0.95) {
                    points.push({
                        x: cx + x * heartWidth,
                        y: cy - y * heartHeight,
                        size: Math.max(6, Math.min(13, width * 0.035)) 
                            + Math.random() * 2,
                        opacity: 0.65 + Math.random() * 0.3,
                        delay: Math.random() * 850
                    });
                }
            }
        }

        // Garis luar mengikuti siluet hati yang sama.
        for (let i = 0; i < 120; i++) {
            const p = heartPoint(i * Math.PI * 2 / 120);

            points.push({
                x: cx + p.x * heartWidth,
                y: cy - p.y * heartHeight,
                size: 10 + Math.random() * 3,
                opacity: 0.95,
                delay: Math.random() * 600
            });
        }

        // Batasi jumlah tulisan supaya lebih ringan.
        const maxWords = 1000;

        if (points.length > maxWords) {
            const inside = points.slice(0, points.length - 120);
            const outline = points.slice(-120);

            for (let i = inside.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [inside[i], inside[j]] = [inside[j], inside[i]];
            }

            points.length = 0;
            points.push(...inside.slice(0, maxWords - 120));
            points.push(...outline);
        }

        
        // Tulisan dekorasi berserakan di seluruh pinggir layar.
        const scatteredPhrases = [
            "I love you", "love you ♡", "I LOVE YOU",
            "love", "forever ♡", "my love",
            "I love you ♡"
        ];

        const scatteredCount = Math.min(
            100,
            Math.floor((width * height) / 9000)
        );

        for (let i = 0; i < scatteredCount; i++) {
            const word = document.createElement("span");

            word.className = "love-heart-word love-heart-scattered";
            word.textContent =
                scatteredPhrases[
                    Math.floor(Math.random() * scatteredPhrases.length)
                ];

            word.style.color =
                colors[Math.floor(Math.random() * colors.length)];

            word.style.fontSize = (8 + Math.random() * 5) + "px";
            word.style.left = Math.random() * width + "px";
            word.style.top = Math.random() * height + "px";
            word.style.opacity = "0";

            scene.appendChild(word);

            // Tulisan muncul perlahan dengan jeda berbeda.
            setTimeout(function () {
                if (!scene.isConnected) return;

                word.style.transition = "opacity 1.2s ease";
                word.style.opacity = String(0.25 + Math.random() * 0.4);
            }, Math.random() * 1800);
        }


        // Buat tulisan transparan sebelum bergerak menuju hati.
        points.forEach(function (p) {
            const word = document.createElement("span");
            word.className = "love-heart-word";
            word.textContent =
                phrases[Math.floor(Math.random() * phrases.length)];

            word.style.color =
                colors[Math.floor(Math.random() * colors.length)];

            word.style.fontSize = p.size + "px";
            word.style.left = Math.random() * width + "px";
            word.style.top = Math.random() * height + "px";
            word.style.opacity = "0";

            scene.appendChild(word);
            p.element = word;
        });

        // Sedikit jeda membuat gerakan berkumpul terasa bertahap.
        requestAnimationFrame(function () {
            points.forEach(function (p) {
                setTimeout(function () {
                    if (!scene.isConnected) return;

                    p.element.style.transition =
    "left 2s ease-in-out, " +
    "top 2s ease-in-out, " +
    "opacity .7s ease";

                    p.element.style.left = p.x + "px";
                    p.element.style.top = p.y + "px";
                    p.element.style.opacity = String(p.opacity);
                }, p.delay);
            });
        });

        // Tulisan utama muncul setelah hati mulai terbentuk.
        setTimeout(function () {
            if (!scene.isConnected) return;

            const center = document.createElement("div");
            center.className = "love-heart-center";
            center.textContent = "I LOVE YOU ♡";
            scene.appendChild(center);

            requestAnimationFrame(function () {
                center.classList.add("visible");
            });
        }, 3000);

   
            // Tulisan besar muncul pada detik ke-3.
            // Tahan sampai detik ke-8, lalu hilangkan tulisannya saja.
            setTimeout(function () {
                scene.querySelectorAll(".love-heart-word, .love-heart-center")
                    .forEach(function (word) {
                        word.style.transition = "opacity 0.9s ease";
                        word.style.opacity = "0";
                    });

                // Background tetap ada selama jeda 1,5 detik.
                setTimeout(function () {
                    scene.remove();
                    resolve();
                }, 1500);

            }, 8000);


    });
}







// =====================================
// 5. COUNTDOWN 3, 2, 1
// =====================================

function startCountdown() {
    if (surpriseStarted) return;
    surpriseStarted = true;

    showScene(countdownScene);

    if (!countdownNumber) {
        showIntro();
        return;
    }

    const numbers = ["3", "2", "1"];
    let index = 0;

    function showNextNumber() {
        countdownNumber.textContent = numbers[index];

        countdownNumber.style.animation = "none";

        // Memulai ulang animasi angka.
        void countdownNumber.offsetWidth;

        countdownNumber.style.animation = "";

        index++;

        if (index < numbers.length) {
            setTimeout(showNextNumber, 1100);
        } else {
            setTimeout(showIntro, 1100);
        }
    }

    showNextNumber();
}

// =====================================
// 6. HALAMAN PEMBUKA SEBELUM GALERI
// =====================================

function showIntro() {
    showScene(introScene);

    setTimeout(function () {
        showScene(galleryScene);
        revealPhotos();
    }, 4500);
}

// =====================================
// 7. FOTO MUNCUL SATU PER SATU
// =====================================

function revealPhotos() {
    const photos = document.querySelectorAll(".memory-card");

    photos.forEach(function (photo, index) {
        setTimeout(function () {
            photo.classList.add("show-photo");
        }, index * 1200);
    });
}

// =====================================
// 8. PASSCODE DAN PERTANYAAN YES / NO
// =====================================

function showPasscode() {
    let overlay = document.getElementById("passcodeOverlay");

    // Buat overlay jika belum pernah dibuat.
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "passcodeOverlay";
        overlay.className = "passcode-overlay";

        overlay.innerHTML = `
            <div class="passcode-card">

                <h2>Enter Passcode</h2>

                <div class="passcode-dots">
                    ${Array(6).fill("<span></span>").join("")}
                </div>

                <div class="passcode-keypad">
                    ${["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"]
                        .map(function (number) {
                            return number
                                ? `<button type="button" data-key="${number}">${number}</button>`
                                : "<span></span>";
                        })
                        .join("")}
                </div>

                <p class="passcode-error"></p>
            </div>

            <div class="love-question" hidden>
                <div class="love-particles"></div>

                <p class="love-question-text">
                    Mau masukin pin lagi? ♡
                </p>

                <div class="love-answers">
                    <button type="button" data-answer="yes">YES ♡</button>
                    <button type="button" data-answer="no">NO ♡</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const card = overlay.querySelector(".passcode-card");
        const question = overlay.querySelector(".love-question");
        const particles = overlay.querySelector(".love-particles");
        const text = overlay.querySelector(".love-question-text");
        const answers = overlay.querySelector(".love-answers");
        const dots = overlay.querySelectorAll(".passcode-dots span");
        const error = overlay.querySelector(".passcode-error");

        let enteredPin = "";
        let busy = false;

        function resetPin() {
            enteredPin = "";

            dots.forEach(function (dot) {
                dot.classList.remove("filled");
            });

            error.textContent = "";
        }

        
function makeHearts() {
    particles.innerHTML = "";

    const colors = [
        "#fff0f5",
        "#ffd0e0",
        "#ff9fbe",
        "#f7c5d7",
        "#e8759d"
    ];

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Banyak hati tersebar ke seluruh layar,
    // kemudian bergerak menuju area tulisan.
    for (let i = 0; i < 100; i++) {
        const heart = document.createElement("span");
        heart.className = "question-heart";
        heart.textContent = Math.random() > 0.35 ? "♥" : "♡";

        const startX = Math.random() * width;
        const startY = Math.random() * height;

        // Titik tujuan mengelilingi tengah layar.
        const targetX = width / 2 - startX
            + (Math.random() - 0.5) * Math.min(width * 0.6, 300);

        const targetY = height / 2 - startY
            + (Math.random() - 0.5) * Math.min(height * 0.35, 180);

        heart.style.setProperty("--start-x", startX + "px");
        heart.style.setProperty("--start-y", startY + "px");
        heart.style.setProperty("--target-x", targetX + "px");
        heart.style.setProperty("--target-y", targetY + "px");
        heart.style.setProperty(
            "--heart-size",
            (12 + Math.random() * 27) + "px"
        );
        heart.style.setProperty(
            "--heart-color",
            colors[Math.floor(Math.random() * colors.length)]
        );
        heart.style.setProperty(
            "--delay",
            (Math.random() * 1.2) + "s"
        );

        particles.appendChild(heart);
    }
}


        function showQuestion() {
            resetPin();

            card.hidden = true;
            question.hidden = false;

            question.classList.remove("question-exit");
            question.classList.add("question-enter");

            text.classList.remove("text-visible");
            answers.classList.remove("answers-visible");

            makeHearts();

            setTimeout(function () {
                if (question.hidden) return;

                text.classList.add("text-visible");
                answers.classList.add("answers-visible");
            }, 1000);
        }

        function closeIntoHearts() {
            if (busy) return;
            busy = true;

            makeHearts();

            question.hidden = false;
            question.classList.remove("question-enter");
            question.classList.add("question-exit");

            setTimeout(function () {
                card.hidden = true;

                question.classList.remove("question-exit");

                busy = false;
                showQuestion();
            }, 850);
        }

        function returnToPin() {
            if (busy) return;
            busy = true;

            question.classList.add("question-exit");

            setTimeout(function () {
                question.hidden = true;
                question.classList.remove("question-exit");

                card.hidden = false;

                card.classList.remove("card-melt", "card-return");

                void card.offsetWidth;

                card.classList.add("card-return");

                resetPin();
                busy = false;
            }, 650);
        }

        // Tombol X menampilkan pertanyaan dengan animasi hati.
       const closeButton = overlay.querySelector(".passcode-close");

        if (closeButton) {
            closeButton.onclick = function (event) {
                event.preventDefault();
                event.stopPropagation();
                closeIntoHearts();
            };
        }

        // Tombol YES dan NO.
        overlay.querySelectorAll("[data-answer]")
            .forEach(function (button) {
                button.addEventListener("click", function () {
                    if (button.dataset.answer === "yes") {
                        returnToPin();
                    } else {
                        if (busy) return;
                        busy = true;

                        question.classList.add("question-exit");

                        setTimeout(function () {
                            busy = false;
                            showQuestion();
                        }, 1200);
                    }
                });
            });

        // Tombol angka pada keypad.
        overlay.querySelectorAll("[data-key]")
            .forEach(function (button) {
                button.addEventListener("click", function () {
                    if (busy || card.hidden) return;

                    const key = button.dataset.key;

                    
                    if (key === "⌫") {
                        closeIntoHearts();
                        return;
                    } else if (enteredPin.length < 6) {
                        enteredPin += key;
                    }


                    dots.forEach(function (dot, index) {
                        dot.classList.toggle(
                            "filled",
                            index < enteredPin.length
                        );
                    });

                    
                    if (enteredPin === "121007") {
                        busy = true;
                        error.textContent = "Correct! ♡";

                        setTimeout(async function () {
                            overlay.remove();

                            // Efek love kecil yang lama tetap dipakai.
                            createHeartShower();

                            // Tunggu love lama, lalu tampilkan animasi tulisan hati.
                            setTimeout(async function () {
                                await createLoveTextHeart();

                                // Baru lanjut ke countdown 3, 2, 1.
                                startCountdown();
                            }, 4500);
                        }, 700);
                    }

                });
            });

        // Pertama kali dibuka, tampilkan keypad PIN.
        question.hidden = true;
        card.hidden = false;
    } else {
        // Jika overlay sudah ada, tampilkan kembali keypad.
        overlay.classList.remove("passcode-overlay-exit");
        overlay.style.display = "flex";

        const card = overlay.querySelector(".passcode-card");
        const question = overlay.querySelector(".love-question");

        if (question) question.hidden = true;

        if (card) {
            card.hidden = false;
            card.classList.remove("card-melt", "card-return");
        }

        resetPasscodeDisplay(overlay);
    }
}

// Membersihkan tampilan PIN ketika keypad dibuka kembali.
function resetPasscodeDisplay(overlay) {
    overlay.querySelectorAll(".passcode-dots span")
        .forEach(function (dot) {
            dot.classList.remove("filled");
        });

    const error = overlay.querySelector(".passcode-error");

    if (error) error.textContent = "";
}

// =====================================
// 9. TOMBOL MENUJU HALAMAN ULANG TAHUN
// =====================================

if (birthdayCharm) {
    birthdayCharm.addEventListener("click", function () {
        showScene(birthdayScene);
    });
}

// =====================================
// 10. TOMBOL KEMBALI KE GALERI FOTO
// =====================================

if (backToPhotosBtn) {
    backToPhotosBtn.addEventListener("click", function () {
        showScene(galleryScene);
    });
}

// =====================================
// 11. MEMBUKA SURAT ULANG TAHUN
// =====================================

if (showLetterBtn && letterContainer) {
    showLetterBtn.addEventListener("click", function () {
        letterContainer.hidden = false;
        showLetterBtn.style.display = "none";

        letterContainer.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
}

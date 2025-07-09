// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Sample work items - Replace with your own work items and Drive links
const workItems = [
    {
        title: "Long Form Content",
        description: "In-depth storytelling and extended content that captures the complete narrative",
        driveLink: "https://drive.google.com/file/d/1MsEYRFO0y62M99uqc4-kZ9uvFrCE2D_m/view?usp=drivesdk",
        extraLinks: [
            "https://drive.google.com/file/d/1KfdQ9IqHmUIlJG3s1xCjIawV819m4nhw/view?usp=drivesdk"
        ],
        thumbnail: "https://images.unsplash.com/photo-1601506521793-dc748fc80b67?auto=format&fit=crop&w=800&q=80",
        category: "long-form"
    },
    {
        title: "Short Form Content",
        description: "Engaging social media content, reels, and short videos that capture attention instantly",
        driveLink: "https://drive.google.com/file/d/1jwiskC1HwILn5MYGa_XisG6bxbpe8vr5/view?usp=drivesdk",
        thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
        category: "short-form"
    },
    {
        title: "Wedding Highlights",
        description: "Beautiful wedding moments captured and edited into timeless memories",
        driveLink: "https://drive.google.com/file/d/16u45NfHmCR5Zrh5yyW6ZhyZQm8CtzJTh/view?usp=drivesdk",
        thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
        category: "wedding"
    },
    {
        title: "Social Media Edits",
        description: "Quick, impactful content optimized for social media engagement",
        driveLink: "https://www.instagram.com/vishaledits25?igsh=eWY0eml2aWk0cg%3D%3D&utm_source=qr",
        thumbnail: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
        category: "short-form"
    }
];

// Filter functionality for work items
const filterWorks = (category) => {
    const items = document.querySelectorAll('.work-item');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
};

// Populate work section with animation delay
const workGrid = document.querySelector('.work-grid');

// Clear existing content
workGrid.innerHTML = '';

// Add filter buttons
const filterContainer = document.createElement('div');
filterContainer.className = 'work-filters';
filterContainer.innerHTML = `
    <button class="filter-btn active" data-category="all">All Work</button>
    <button class="filter-btn" data-category="long-form">Long Form</button>
    <button class="filter-btn" data-category="short-form">Short Form</button>
    <button class="filter-btn" data-category="wedding">Wedding Shoots</button>
`;
workGrid.parentElement.insertBefore(filterContainer, workGrid);

// Add event listeners to filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        filterWorks(btn.dataset.category);
    });
});

// Add modal HTML to the document body
const modalHtml = `
  <div id="videoModal" class="modal" style="display:none;position:fixed;z-index:2000;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.7);justify-content:center;align-items:center;">
    <div class="modal-content" style="background:#fff;padding:2rem;border-radius:12px;max-width:90vw;max-height:90vh;overflow:auto;position:relative;">
      <span id="closeModal" style="position:absolute;top:10px;right:20px;font-size:2rem;cursor:pointer;">&times;</span>
      <h2 style="margin-bottom:1rem;">Project Videos</h2>
      <div id="modalLinks"></div>
    </div>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', modalHtml);
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');
const modalLinks = document.getElementById('modalLinks');
closeModal.onclick = () => { videoModal.style.display = 'none'; };
window.onclick = (e) => { if (e.target === videoModal) videoModal.style.display = 'none'; };

workItems.forEach((item, index) => {
    const workItem = document.createElement('div');
    workItem.className = 'work-item';
    workItem.dataset.category = item.category;
    workItem.style.animationDelay = `${index * 0.2}s`;
    let linksHtml = '';
    // Only one button for projects with multiple videos
    if (item.extraLinks && Array.isArray(item.extraLinks)) {
        linksHtml = `<button class="cta-button" data-index="${index}">View Project</button>`;
    } else {
        linksHtml = `<a href="${item.driveLink}" target="_blank" class="cta-button">View Project</a>`;
    }
    workItem.innerHTML = `
        <div class="work-item-image">
            <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
            <div class="work-item-overlay">
                ${linksHtml}
            </div>
        </div>
        <div class="work-item-content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `;
    workGrid.appendChild(workItem);
    // Add event listener for modal button if extraLinks exist
    if (item.extraLinks && Array.isArray(item.extraLinks)) {
        workItem.querySelector('button.cta-button').onclick = function() {
            let allLinks = [item.driveLink, ...item.extraLinks];
            modalLinks.innerHTML = allLinks.map((link, idx) => `<a href="${link}" target="_blank" style="display:block;margin-bottom:1rem;font-size:1.1rem;color:#4f46e5;">Video ${idx+1}</a>`).join('');
            videoModal.style.display = 'flex';
        };
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu after clicking
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (entry.target.classList.contains('skills')) {
                entry.target.querySelectorAll('li').forEach((skill, index) => {
                    skill.style.animationDelay = `${index * 0.1}s`;
                });
            }
        }
    });
}, observerOptions);

// Observe sections and elements
document.querySelectorAll('section, .work-item, .skills li').forEach(element => {
    observer.observe(element);
});

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
}); 

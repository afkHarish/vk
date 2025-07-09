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
        driveLink: "https://drive.google.com/file/d/1pHnShP32RqL7c1YJwAfBHrymvJOOULUT/view?usp=drivesdk",
        thumbnail: "https://images.unsplash.com/photo-1601506521793-dc748fc80b67?auto=format&fit=crop&w=800&q=80",
        category: "long-form"
    },
    {
        title: "Short Form Content",
        description: "Engaging social media content, reels, and short videos that capture attention instantly",
        driveLink: "https://drive.google.com/file/d/1tZq6s5zF0B8V14EE5GW0NhWbZuJdW9KB/view?usp=drivesdk",
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

workItems.forEach((item, index) => {
    const workItem = document.createElement('div');
    workItem.className = 'work-item';
    workItem.dataset.category = item.category;
    workItem.style.animationDelay = `${index * 0.2}s`;
    workItem.innerHTML = `
        <div class="work-item-image">
            <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
            <div class="work-item-overlay">
                <a href="${item.driveLink}" target="_blank" class="cta-button">View Project</a>
            </div>
        </div>
        <div class="work-item-content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `;
    workGrid.appendChild(workItem);
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

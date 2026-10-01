/**
 * Institute of Engineering and Management (IEM) - College Event Management System
 * Pure Vanilla JavaScript (ES6+)
 * Fully persistent with LocalStorage, Interactive Ticket Generator, CSV Exporter & Calendar
 */

(function () {
    'use strict';

    // ===================================================================
    // 1. Initial State & Sample College Events Generator
    // ===================================================================

    // Helper to format date offset from current date
    function getDateOffset(daysOffset, hours = 10, minutes = 0) {
        const d = new Date();
        d.setDate(d.getDate() + daysOffset);
        d.setHours(hours, minutes, 0, 0);
        return d.toISOString().split('T')[0];
    }

    const DEFAULT_EVENTS = [
        {
            id: 'ev-101',
            title: 'HackCampus 2026: 36-Hour National Hackathon',
            category: 'Technical',
            date: getDateOffset(4),
            startTime: '09:00',
            endTime: '21:00',
            venue: 'Advanced Computing Lab & Innovation Hub, Block C',
            organizer: 'Computer Science Society & IEEE Branch',
            capacity: 120,
            priceType: 'free',
            price: 0,
            imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
            description: 'Join over 120 brilliant student developers, designers, and innovators to solve real-world problems in AI, Web3, CleanTech, and HealthTech. Mentorship from industry leads, free food, swags, and cash prizes worth ₹1,50,000!',
            agenda: 'Day 1:\n09:00 AM - Check-in & Breakfast\n10:30 AM - Opening Ceremony & Problem Statements\n12:00 PM - Hacking Commences\n08:00 PM - Mentorship Round 1\n\nDay 2:\n12:00 PM - Final Code Submission\n02:30 PM - Live Demos & Judging\n05:00 PM - Award Ceremony',
            tags: ['Hackathon', 'AI', 'Coding', 'Cash Prize', 'Free Food']
        },
        {
            id: 'ev-102',
            title: 'Tarang 2026: Annual Inter-College Cultural Fest',
            category: 'Cultural',
            date: getDateOffset(10),
            startTime: '16:00',
            endTime: '22:30',
            venue: 'Open Air Amphitheatre, Main Campus',
            organizer: 'Student Cultural Council & Arts Guild',
            capacity: 500,
            priceType: 'paid',
            price: 150,
            imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
            description: 'The biggest extravaganza of music, dance, battle of bands, fashion runway, and stand-up comedy! Featuring live celebrity performances, DJ Night, and food stalls from popular city cuisines.',
            agenda: '04:00 PM - Classical & Fusion Dance Battle\n06:00 PM - Inter-College Battle of the Bands\n08:00 PM - Fashion Show: Eco-Vogue\n09:30 PM - Headliner Musical Performance & EDM Night',
            tags: ['Music', 'Dance', 'DJ Night', 'Fest', 'Celebrity']
        },
        {
            id: 'ev-103',
            title: 'Hands-on Generative AI & LLM Deployment Workshop',
            category: 'Workshop',
            date: getDateOffset(2),
            startTime: '10:00',
            endTime: '15:30',
            venue: 'Seminar Hall 2, Dept of Information Technology',
            organizer: 'AI Research Club & GDSC (Google DSC)',
            capacity: 80,
            priceType: 'free',
            price: 0,
            imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
            description: 'A deep-dive workshop on building autonomous AI agents, fine-tuning open-source models, and deploying production RAG architectures. Includes cloud credits and verified certificate of completion.',
            agenda: '10:00 AM - Foundations of Modern Transformers\n11:45 AM - Building RAG with Vector DBs\n01:00 PM - Lunch Break\n01:45 PM - Hands-on Project: Multi-Agent System\n03:15 PM - Q&A and Certificate Distribution',
            tags: ['Generative AI', 'Python', 'LLM', 'Hands-on', 'Certificate']
        },
        {
            id: 'ev-104',
            title: 'Inter-Department Cricket & Badminton Cup 2026',
            category: 'Sports',
            date: getDateOffset(6),
            startTime: '08:00',
            endTime: '18:00',
            venue: 'University Sports Complex & Indoor Stadium',
            organizer: 'Department of Physical Education',
            capacity: 250,
            priceType: 'free',
            price: 0,
            imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
            description: 'Showcase your athletic spirit! Teams from all branches battle for the prestigious Chancellor Trophy in T20 Cricket and Badminton doubles. Cheer for your branch champions!',
            agenda: '08:00 AM - Athlete March Past & Torch Lighting\n09:00 AM - Cricket Quarterfinals\n01:00 PM - Badminton Semifinals\n03:30 PM - Cricket Championship Final\n05:30 PM - Medals & Trophy Presentation',
            tags: ['Cricket', 'Badminton', 'Trophy', 'Athletics', 'Inter-Branch']
        },
        {
            id: 'ev-105',
            title: 'Campus Sustainability & Green Energy Seminar',
            category: 'Social',
            date: getDateOffset(14),
            startTime: '11:00',
            endTime: '14:00',
            venue: 'Auditorium Block A, Ground Floor',
            organizer: 'Eco-Warriors Club & Rotaract Youth',
            capacity: 150,
            priceType: 'free',
            price: 0,
            imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
            description: 'Keynote sessions by environmental scientists on renewable microgrids and zero-waste campuses, followed by the launch of the student solar vehicle prototype and campus tree plantation drive.',
            agenda: '11:00 AM - Welcome Address by Dean of Academics\n11:30 AM - Keynote: Decentralized Solar Tech\n12:45 PM - Solar Vehicle Unveiling\n01:30 PM - 500-Sapling Plantation Drive',
            tags: ['Environment', 'Green Energy', 'Social', 'Volunteering']
        },
        {
            id: 'ev-106',
            title: 'RoboWars & Autonomous Drone Racing Challenge',
            category: 'Technical',
            date: getDateOffset(18),
            startTime: '10:00',
            endTime: '17:00',
            venue: 'Robotics Arena, Mechanical Workshop Quad',
            organizer: 'Robotics & Automation Society (RAS)',
            capacity: 200,
            priceType: 'paid',
            price: 100,
            imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
            description: 'Witness high-octane battlebots clashing inside the armored steel arena! Plus FPV drone obstacle course racing with live video telemetry on giant stadium screens.',
            agenda: '10:00 AM - Bot Weigh-in & Safety Inspection\n11:00 AM - 15kg Combat Robot Heats\n01:30 PM - High-Speed FPV Drone Obstacle Race\n03:30 PM - Grand Finale: Heavyweight Battlebot Clash',
            tags: ['Robotics', 'Combat Bots', 'Drones', 'Engineering']
        }
    ];

    // Seed 2 default registrations so the passes and attendee roster show realistic demo data
    const DEFAULT_REGISTRATIONS = [
        {
            ticketId: 'TKT-2026-8419',
            eventId: 'ev-101',
            name: 'Rahul Sharma',
            rollNo: 'CS2026-042',
            email: 'rahul.sharma@college.edu',
            phone: '9876543210',
            department: 'Computer Science & Engineering',
            year: '3rd Year',
            ticketType: 'Active Participant / Team',
            remarks: 'Team Lead for Project NeuroFlow',
            registeredAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            checkedIn: true
        },
        {
            ticketId: 'TKT-2026-9214',
            eventId: 'ev-103',
            name: 'Ananya Verma',
            rollNo: 'IT2026-108',
            email: 'ananya.v@college.edu',
            phone: '9812345678',
            department: 'Information Technology',
            year: '2nd Year',
            ticketType: 'General Attendee',
            remarks: '',
            registeredAt: new Date(Date.now() - 86400000).toISOString(),
            checkedIn: false
        }
    ];

    // App State
    let state = {
        events: [],
        registrations: [],
        currentTheme: 'light',
        currentRole: 'student', // 'student' | 'organizer'
        activeCategory: 'all',
        searchTerm: '',
        statusFilter: 'upcoming',
        priceFilter: 'all',
        sortBy: 'date-asc',
        viewMode: 'grid', // 'grid' | 'list'
        calendarDate: new Date(),
        selectedCalendarDay: null
    };

    // ===================================================================
    // 2. Storage Helpers
    // ===================================================================

    const STORAGE_KEY_EVENTS = 'campusvibe_events_v1';
    const STORAGE_KEY_REGISTRATIONS = 'campusvibe_regs_v1';
    const STORAGE_KEY_THEME = 'campusvibe_theme';
    const STORAGE_KEY_ROLE = 'campusvibe_role';

    function loadState() {
        const storedEvents = localStorage.getItem(STORAGE_KEY_EVENTS);
        const storedRegs = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
        const storedTheme = localStorage.getItem(STORAGE_KEY_THEME);
        const storedRole = localStorage.getItem(STORAGE_KEY_ROLE);

        if (storedEvents) {
            try {
                state.events = JSON.parse(storedEvents);
            } catch (e) {
                state.events = [...DEFAULT_EVENTS];
            }
        } else {
            state.events = [...DEFAULT_EVENTS];
            saveEvents();
        }

        if (storedRegs) {
            try {
                state.registrations = JSON.parse(storedRegs);
            } catch (e) {
                state.registrations = [...DEFAULT_REGISTRATIONS];
            }
        } else {
            state.registrations = [...DEFAULT_REGISTRATIONS];
            saveRegistrations();
        }

        if (storedTheme) {
            state.currentTheme = storedTheme;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            state.currentTheme = 'dark';
        }

        if (storedRole) {
            state.currentRole = storedRole;
        }
    }

    function saveEvents() {
        localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(state.events));
    }

    function saveRegistrations() {
        localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(state.registrations));
    }

    function resetToDemoData() {
        state.events = JSON.parse(JSON.stringify(DEFAULT_EVENTS));
        state.registrations = JSON.parse(JSON.stringify(DEFAULT_REGISTRATIONS));
        saveEvents();
        saveRegistrations();
        showToast('All demo events & sample passes have been restored!', 'success');
        renderAll();
    }

    // ===================================================================
    // 3. UI Helpers & Formatting
    // ===================================================================

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    function formatTime(timeStr) {
        if (!timeStr) return '';
        const [h, m] = timeStr.split(':');
        const hour = parseInt(h, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${m} ${ampm}`;
    }

    function getEventRegistrations(eventId) {
        return state.registrations.filter(r => r.eventId === eventId);
    }

    function getAvailableSeats(event) {
        const booked = getEventRegistrations(event.id).length;
        return Math.max(0, event.capacity - booked);
    }

    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const icons = {
            success: 'fa-circle-check',
            danger: 'fa-circle-exclamation',
            warning: 'fa-triangle-exclamation',
            info: 'fa-circle-info'
        };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fa-solid ${icons[type] || icons.info} toast-icon"></i>
            <span>${escapeHTML(message)}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    function escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // ===================================================================
    // 4. Modal Management
    // ===================================================================

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modalElementOrId) {
        const modal = typeof modalElementOrId === 'string'
            ? document.getElementById(modalElementOrId)
            : modalElementOrId;
        if (modal) {
            modal.classList.add('hidden');
            // If no other modals are open, restore scroll
            const openModals = document.querySelectorAll('.modal-overlay:not(.hidden)');
            if (openModals.length === 0) {
                document.body.style.overflow = '';
            }
        }
    }

    function closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
        document.body.style.overflow = '';
    }

    // ===================================================================
    // 5. Render Functions
    // ===================================================================

    function renderHeroStats() {
        const totalEvents = state.events.length;
        const totalRegistrations = state.registrations.length;
        const categories = new Set(state.events.map(e => e.category)).size;
        const userTickets = state.registrations.length; // Active passes

        document.getElementById('statTotalEvents').textContent = totalEvents;
        document.getElementById('statTotalRegistrations').textContent = totalRegistrations;
        document.getElementById('statCategoriesCount').textContent = categories;
        document.getElementById('statUserTickets').textContent = userTickets;
        document.getElementById('myTicketsBadge').textContent = userTickets;
    }

    function renderEvents() {
        const container = document.getElementById('eventsContainer');
        const emptyState = document.getElementById('emptyState');
        const resultsCount = document.getElementById('resultsCount');

        let filtered = [...state.events];

        // Search Filter
        if (state.searchTerm.trim()) {
            const term = state.searchTerm.toLowerCase();
            filtered = filtered.filter(ev =>
                ev.title.toLowerCase().includes(term) ||
                ev.organizer.toLowerCase().includes(term) ||
                ev.venue.toLowerCase().includes(term) ||
                (ev.tags && ev.tags.some(t => t.toLowerCase().includes(term)))
            );
        }

        // Category Filter
        if (state.activeCategory !== 'all') {
            filtered = filtered.filter(ev => ev.category === state.activeCategory);
        }

        // Status / Timeline Filter
        const todayStr = new Date().toISOString().split('T')[0];
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        const nextWeekStr = nextWeek.toISOString().split('T')[0];

        if (state.statusFilter === 'upcoming') {
            filtered = filtered.filter(ev => ev.date >= todayStr);
        } else if (state.statusFilter === 'this-week') {
            filtered = filtered.filter(ev => ev.date >= todayStr && ev.date <= nextWeekStr);
        } else if (state.statusFilter === 'past') {
            filtered = filtered.filter(ev => ev.date < todayStr);
        }

        // Price Filter
        if (state.priceFilter === 'free') {
            filtered = filtered.filter(ev => ev.priceType === 'free' || Number(ev.price) === 0);
        } else if (state.priceFilter === 'paid') {
            filtered = filtered.filter(ev => ev.priceType === 'paid' && Number(ev.price) > 0);
        }

        // Sorting
        filtered.sort((a, b) => {
            if (state.sortBy === 'date-asc') {
                return new Date(a.date) - new Date(b.date);
            } else if (state.sortBy === 'date-desc') {
                return new Date(b.date) - new Date(a.date);
            } else if (state.sortBy === 'popularity') {
                return getEventRegistrations(b.id).length - getEventRegistrations(a.id).length;
            } else if (state.sortBy === 'name-asc') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });

        // Update results counter
        resultsCount.textContent = `Showing ${filtered.length} of ${state.events.length} events`;

        // Update container class for view mode
        if (state.viewMode === 'list') {
            container.classList.add('list-view');
        } else {
            container.classList.remove('list-view');
        }

        if (filtered.length === 0) {
            container.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');

        container.innerHTML = filtered.map(ev => {
            const regCount = getEventRegistrations(ev.id).length;
            const remaining = Math.max(0, ev.capacity - regCount);
            const percentFilled = Math.min(100, Math.round((regCount / ev.capacity) * 100));
            const isSoldOut = remaining <= 0;
            const isFree = ev.priceType === 'free' || Number(ev.price) === 0;

            let progressClass = '';
            if (percentFilled >= 90) progressClass = 'full-seats';
            else if (percentFilled >= 70) progressClass = 'low-seats';

            return `
                <div class="event-card" data-id="${ev.id}">
                    <div class="card-img-wrapper">
                        <img src="${escapeHTML(ev.imageUrl)}" alt="${escapeHTML(ev.title)}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'">
                        <div class="card-overlay-badges">
                            <span class="badge badge-cat-${ev.category}">${ev.category}</span>
                            <span class="badge badge-price ${isFree ? 'badge-success' : 'badge-primary'}">
                                ${isFree ? 'FREE' : `₹${ev.price}`}
                            </span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="event-meta-row">
                            <span><i class="fa-regular fa-calendar"></i> ${formatDate(ev.date)}</span>
                            <span>&bull;</span>
                            <span><i class="fa-regular fa-clock"></i> ${formatTime(ev.startTime)}</span>
                        </div>
                        <h3 class="card-title" onclick="window.CampusApp.openDetails('${ev.id}')">${escapeHTML(ev.title)}</h3>
                        <p class="card-desc">${escapeHTML(ev.description)}</p>

                        <ul class="event-details-list">
                            <li><i class="fa-solid fa-location-dot"></i> <span>${escapeHTML(ev.venue)}</span></li>
                            <li><i class="fa-solid fa-users-gear"></i> <span>${escapeHTML(ev.organizer)}</span></li>
                        </ul>

                        <div class="capacity-box">
                            <div class="capacity-labels">
                                <span>${isSoldOut ? '<strong class="text-danger">Sold Out</strong>' : `${remaining} spots remaining`}</span>
                                <span>${regCount}/${ev.capacity} booked</span>
                            </div>
                            <div class="progress-track">
                                <div class="progress-bar ${progressClass}" style="width: ${percentFilled}%"></div>
                            </div>
                        </div>

                        <div class="card-actions">
                            <button class="btn btn-outline btn-sm" onclick="window.CampusApp.openDetails('${ev.id}')">
                                <i class="fa-solid fa-circle-info"></i> Details
                            </button>
                            <button class="btn btn-primary btn-sm" 
                                onclick="window.CampusApp.openRegister('${ev.id}')"
                                ${isSoldOut ? 'disabled style="opacity:0.6; cursor:not-allowed;"' : ''}>
                                <i class="fa-solid fa-ticket"></i> ${isSoldOut ? 'Full' : 'Register'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderEventDetailsModal(eventId) {
        const ev = state.events.find(e => e.id === eventId);
        if (!ev) return;

        const regCount = getEventRegistrations(ev.id).length;
        const remaining = Math.max(0, ev.capacity - regCount);
        const percentFilled = Math.min(100, Math.round((regCount / ev.capacity) * 100));
        const isSoldOut = remaining <= 0;
        const isFree = ev.priceType === 'free' || Number(ev.price) === 0;

        const badgesEl = document.getElementById('modalDetailBadges');
        badgesEl.innerHTML = `
            <span class="badge badge-cat-${ev.category}">${ev.category}</span>
            <span class="badge ${isFree ? 'badge-success' : 'badge-primary'}">${isFree ? 'Free Entry' : `₹${ev.price} Ticket`}</span>
            ${isSoldOut ? '<span class="badge badge-danger">Sold Out</span>' : ''}
        `;

        const bodyEl = document.getElementById('modalDetailBody');
        bodyEl.innerHTML = `
            <img src="${escapeHTML(ev.imageUrl)}" alt="${escapeHTML(ev.title)}" class="event-detail-banner" onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'">

            <h2 class="modal-title" style="font-size: 1.6rem; margin-top: 0.5rem;">${escapeHTML(ev.title)}</h2>

            <div class="event-detail-meta-grid">
                <div class="detail-meta-item">
                    <i class="fa-regular fa-calendar-check"></i>
                    <div>
                        <span>Date</span>
                        <strong>${formatDate(ev.date)}</strong>
                    </div>
                </div>
                <div class="detail-meta-item">
                    <i class="fa-regular fa-clock"></i>
                    <div>
                        <span>Time</span>
                        <strong>${formatTime(ev.startTime)} - ${formatTime(ev.endTime)}</strong>
                    </div>
                </div>
                <div class="detail-meta-item">
                    <i class="fa-solid fa-location-dot"></i>
                    <div>
                        <span>Venue</span>
                        <strong>${escapeHTML(ev.venue)}</strong>
                    </div>
                </div>
                <div class="detail-meta-item">
                    <i class="fa-solid fa-users-gear"></i>
                    <div>
                        <span>Organizer</span>
                        <strong>${escapeHTML(ev.organizer)}</strong>
                    </div>
                </div>
            </div>

            <div>
                <h4 style="font-size: 1.05rem; margin-bottom: 0.4rem; font-weight:700;">About This Event</h4>
                <p style="color: var(--text-muted); line-height: 1.6;">${escapeHTML(ev.description)}</p>
            </div>

            ${ev.agenda ? `
                <div>
                    <h4 style="font-size: 1.05rem; margin-bottom: 0.4rem; font-weight:700;">Event Schedule / Agenda</h4>
                    <div class="agenda-box">${escapeHTML(ev.agenda)}</div>
                </div>
            ` : ''}

            ${ev.tags && ev.tags.length > 0 ? `
                <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
                    ${ev.tags.map(t => `<span class="badge badge-outline"><i class="fa-solid fa-hashtag"></i> ${escapeHTML(t)}</span>`).join('')}
                </div>
            ` : ''}

            <div class="capacity-box" style="margin-top: 0.5rem;">
                <div class="capacity-labels">
                    <span>${remaining} seats left out of ${ev.capacity}</span>
                    <span>${percentFilled}% Booked</span>
                </div>
                <div class="progress-track">
                    <div class="progress-bar ${percentFilled >= 90 ? 'full-seats' : percentFilled >= 70 ? 'low-seats' : ''}" style="width: ${percentFilled}%"></div>
                </div>
            </div>
        `;

        const footerEl = document.getElementById('modalDetailFooter');
        footerEl.innerHTML = `
            <button type="button" class="btn btn-outline" data-close-modal>Close</button>
            <button type="button" class="btn btn-primary" onclick="window.CampusApp.openRegister('${ev.id}')" ${isSoldOut ? 'disabled style="opacity:0.6;"' : ''}>
                <i class="fa-solid fa-ticket"></i> ${isSoldOut ? 'Sold Out' : 'Register Now'}
            </button>
        `;

        openModal('modalEventDetails');
    }

    function openRegistrationModal(eventId) {
        closeModal('modalEventDetails');
        const ev = state.events.find(e => e.id === eventId);
        if (!ev) return;

        const remaining = getAvailableSeats(ev);
        if (remaining <= 0) {
            showToast('Sorry! This event has reached maximum capacity.', 'warning');
            return;
        }

        document.getElementById('regEventId').value = ev.id;
        document.getElementById('regEventTitle').textContent = ev.title;
        document.getElementById('regSummaryFee').textContent = ev.priceType === 'free' || Number(ev.price) === 0 ? 'FREE' : `₹${ev.price}`;
        document.getElementById('regSummarySeats').textContent = `${remaining} spots available`;

        // Clear previous errors
        document.querySelectorAll('#formRegister .form-group').forEach(fg => fg.classList.remove('has-error'));

        openModal('modalRegister');
    }

    function handleRegistrationSubmit(e) {
        e.preventDefault();
        const form = document.getElementById('formRegister');
        const eventId = document.getElementById('regEventId').value;
        const ev = state.events.find(e => e.id === eventId);

        if (!ev) return;

        const name = document.getElementById('regStudentName').value.trim();
        const rollNo = document.getElementById('regStudentRoll').value.trim();
        const email = document.getElementById('regStudentEmail').value.trim();
        const phone = document.getElementById('regStudentPhone').value.trim();
        const department = document.getElementById('regDepartment').value;
        const year = document.getElementById('regYear').value;
        const ticketType = document.getElementById('regTicketType').value;
        const remarks = document.getElementById('regRemarks').value.trim();

        // Validation
        let isValid = true;

        function checkField(id, condition) {
            const input = document.getElementById(id);
            const parent = input.closest('.form-group');
            if (!condition) {
                parent.classList.add('has-error');
                isValid = false;
            } else {
                parent.classList.remove('has-error');
            }
        }

        checkField('regStudentName', name.length >= 2);
        checkField('regStudentRoll', rollNo.length >= 2);
        checkField('regStudentEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
        checkField('regStudentPhone', /^[0-9]{10}$/.test(phone));
        checkField('regDepartment', department !== '');
        checkField('regYear', year !== '');

        if (!isValid) {
            showToast('Please fix the highlighted fields to continue.', 'danger');
            return;
        }

        // Check if student already registered with this roll number for this event
        const existing = state.registrations.find(r => r.eventId === eventId && r.rollNo.toLowerCase() === rollNo.toLowerCase());
        if (existing) {
            showToast(`Roll No ${rollNo} is already registered for this event! Displaying pass.`, 'warning');
            closeModal('modalRegister');
            showTicketModal(existing, ev);
            return;
        }

        // Check capacity
        if (getAvailableSeats(ev) <= 0) {
            showToast('Event has reached capacity.', 'danger');
            closeModal('modalRegister');
            return;
        }

        // Generate Ticket
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const ticketId = `TKT-2026-${randomNum}`;

        const newRegistration = {
            ticketId,
            eventId: ev.id,
            name,
            rollNo,
            email,
            phone,
            department,
            year,
            ticketType,
            remarks,
            registeredAt: new Date().toISOString(),
            checkedIn: false
        };

        state.registrations.push(newRegistration);
        saveRegistrations();

        form.reset();
        closeModal('modalRegister');

        showToast('Registration successful! Digital pass generated.', 'success');
        renderAll();

        // Open Ticket Pass modal immediately
        showTicketModal(newRegistration, ev);
    }

    function showTicketModal(registration, event) {
        if (!event) {
            event = state.events.find(e => e.id === registration.eventId) || {
                title: 'College Event',
                category: 'General',
                date: '2026-10-15',
                startTime: '10:00',
                venue: 'College Campus',
                priceType: 'free',
                price: 0,
                imageUrl: ''
            };
        }

        document.getElementById('tktPassId').textContent = registration.ticketId;
        document.getElementById('tktEventTitle').textContent = event.title;
        document.getElementById('tktCategory').textContent = event.category;
        document.getElementById('tktDateTime').textContent = `${formatDate(event.date)} • ${formatTime(event.startTime)}`;
        document.getElementById('tktVenue').textContent = event.venue;
        document.getElementById('tktStudentName').textContent = registration.name;
        document.getElementById('tktStudentRoll').textContent = registration.rollNo;
        document.getElementById('tktDept').textContent = `${registration.department} • ${registration.year}`;
        
        const isFree = event.priceType === 'free' || Number(event.price) === 0;
        document.getElementById('tktFee').textContent = `${registration.ticketType} • ${isFree ? 'Free' : 'Paid ₹' + event.price}`;

        const bannerEl = document.getElementById('tktBannerImg');
        bannerEl.style.backgroundImage = `url('${event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}')`;

        openModal('modalDigitalTicket');
    }

    function renderMyTickets() {
        const container = document.getElementById('myTicketsContainer');
        const emptyState = document.getElementById('emptyTicketsState');

        if (state.registrations.length === 0) {
            container.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');

        container.innerHTML = state.registrations.map(reg => {
            const ev = state.events.find(e => e.id === reg.eventId);
            const title = ev ? ev.title : 'Event (Archived)';
            const venue = ev ? ev.venue : 'Campus';
            const date = ev ? formatDate(ev.date) : 'TBD';
            const time = ev ? formatTime(ev.startTime) : '';

            return `
                <div class="user-ticket-card">
                    <div class="user-ticket-top">
                        <div>
                            <span class="badge badge-success" style="background:rgba(255,255,255,0.25); color:#fff;">
                                ${reg.checkedIn ? '<i class="fa-solid fa-check"></i> Checked-In' : 'Confirmed'}
                            </span>
                            <h4>${escapeHTML(title)}</h4>
                        </div>
                        <span class="user-ticket-passid">${reg.ticketId}</span>
                    </div>
                    <div class="user-ticket-body">
                        <div class="user-ticket-info">
                            <div>
                                <span>Date & Time</span>
                                <strong>${date} ${time ? '• ' + time : ''}</strong>
                            </div>
                            <div>
                                <span>Venue</span>
                                <strong>${escapeHTML(venue)}</strong>
                            </div>
                            <div>
                                <span>Attendee</span>
                                <strong>${escapeHTML(reg.name)} (${escapeHTML(reg.rollNo)})</strong>
                            </div>
                            <div>
                                <span>Branch</span>
                                <strong>${escapeHTML(reg.department)}</strong>
                            </div>
                        </div>

                        <div class="user-ticket-actions">
                            <button class="btn btn-primary btn-sm" onclick="window.CampusApp.viewTicket('${reg.ticketId}')">
                                <i class="fa-solid fa-qrcode"></i> View Pass
                            </button>
                            <button class="btn btn-outline btn-sm text-danger" onclick="window.CampusApp.confirmCancelTicket('${reg.ticketId}')" title="Cancel this registration">
                                <i class="fa-solid fa-trash-can"></i> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function cancelTicket(ticketId) {
        const idx = state.registrations.findIndex(r => r.ticketId === ticketId);
        if (idx !== -1) {
            state.registrations.splice(idx, 1);
            saveRegistrations();
            showToast('Event registration cancelled. Seat has been restored.', 'info');
            renderAll();
        }
    }

    // ===================================================================
    // 6. Interactive Calendar Widget
    // ===================================================================

    function renderCalendar() {
        const daysGrid = document.getElementById('calendarDaysGrid');
        const monthYearEl = document.getElementById('calMonthYear');
        const date = state.calendarDate;

        const year = date.getFullYear();
        const month = date.getMonth();

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        monthYearEl.textContent = `${monthNames[month]} ${year}`;

        // First day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Get all events occurring in this year-month
        const eventsInMonth = state.events.filter(ev => {
            const evDate = new Date(ev.date + 'T00:00:00');
            return evDate.getFullYear() === year && evDate.getMonth() === month;
        });

        const eventDaySet = new Set(eventsInMonth.map(ev => parseInt(ev.date.split('-')[2], 10)));

        const today = new Date();
        const isCurrentMonthYear = today.getFullYear() === year && today.getMonth() === month;
        const todayDate = today.getDate();

        let html = '';

        // Empty cells before the 1st
        for (let i = 0; i < firstDay; i++) {
            html += `<div class="cal-day empty"></div>`;
        }

        // Days of month
        for (let d = 1; d <= daysInMonth; d++) {
            const isToday = isCurrentMonthYear && d === todayDate;
            const hasEvent = eventDaySet.has(d);
            const isSelected = state.selectedCalendarDay === d;

            let classes = ['cal-day'];
            if (isToday) classes.push('today');
            if (hasEvent) classes.push('has-event');
            if (isSelected) classes.push('selected');

            html += `<div class="${classes.join(' ')}" data-day="${d}">${d}</div>`;
        }

        daysGrid.innerHTML = html;

        // Auto-select first day with an event or today
        if (state.selectedCalendarDay === null) {
            if (eventDaySet.size > 0) {
                const firstEventDay = Array.from(eventDaySet).sort((a,b)=>a-b)[0];
                selectCalendarDay(firstEventDay);
            } else if (isCurrentMonthYear) {
                selectCalendarDay(todayDate);
            } else {
                selectCalendarDay(1);
            }
        } else {
            renderCalendarDayEvents(state.selectedCalendarDay);
        }
    }

    function selectCalendarDay(day) {
        state.selectedCalendarDay = day;

        // Update day styles in DOM
        document.querySelectorAll('.cal-day').forEach(el => {
            if (parseInt(el.dataset.day, 10) === day) {
                el.classList.add('selected');
            } else {
                el.classList.remove('selected');
            }
        });

        renderCalendarDayEvents(day);
    }

    function renderCalendarDayEvents(day) {
        const previewList = document.getElementById('calEventsList');
        const countBadge = document.getElementById('calSelectedCount');
        const dateHeading = document.getElementById('calSelectedDateText');

        const year = state.calendarDate.getFullYear();
        const month = state.calendarDate.getMonth();
        const dayFormatted = String(day).padStart(2, '0');
        const monthFormatted = String(month + 1).padStart(2, '0');
        const targetDateStr = `${year}-${monthFormatted}-${dayFormatted}`;

        const readableDate = new Date(year, month, day).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        dateHeading.textContent = readableDate;

        const dayEvents = state.events.filter(ev => ev.date === targetDateStr);
        countBadge.textContent = `${dayEvents.length} Event${dayEvents.length === 1 ? '' : 's'}`;

        if (dayEvents.length === 0) {
            previewList.innerHTML = `
                <div class="empty-state" style="padding: 2rem 1rem; border: none; background: transparent;">
                    <i class="fa-regular fa-calendar-xmark" style="font-size:2rem; color:var(--text-subtle); margin-bottom:0.5rem; display:block;"></i>
                    <p style="font-size:0.9rem; margin-bottom:0;">No events scheduled on this day.</p>
                </div>
            `;
            return;
        }

        previewList.innerHTML = dayEvents.map(ev => `
            <div class="preview-card" onclick="window.CampusApp.openDetails('${ev.id}')">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span class="badge badge-cat-${ev.category}">${ev.category}</span>
                    <span style="font-size:0.75rem; font-weight:700; color:var(--primary);"><i class="fa-regular fa-clock"></i> ${formatTime(ev.startTime)}</span>
                </div>
                <h5>${escapeHTML(ev.title)}</h5>
                <p><i class="fa-solid fa-location-dot"></i> ${escapeHTML(ev.venue)}</p>
            </div>
        `).join('');
    }

    // ===================================================================
    // 7. Organizer Hub & Attendee Management
    // ===================================================================

    function renderOrganizerHub() {
        const totalEventsEl = document.getElementById('dashTotalEvents');
        const totalAttendeesEl = document.getElementById('dashTotalAttendees');
        const avgCapacityEl = document.getElementById('dashAvgCapacity');
        const totalRevenueEl = document.getElementById('dashTotalRevenue');
        const tableBody = document.getElementById('organizerTableBody');

        const totalEvents = state.events.length;
        const totalAttendees = state.registrations.length;

        // Calculate average capacity percentage
        let totalCapacity = 0;
        let totalBooked = 0;
        let totalRevenue = 0;

        state.events.forEach(ev => {
            totalCapacity += ev.capacity;
            const booked = getEventRegistrations(ev.id).length;
            totalBooked += booked;
            if (ev.priceType === 'paid' && ev.price > 0) {
                totalRevenue += booked * Number(ev.price);
            }
        });

        const avgCapacity = totalCapacity > 0 ? Math.round((totalBooked / totalCapacity) * 100) : 0;

        totalEventsEl.textContent = totalEvents;
        totalAttendeesEl.textContent = totalAttendees;
        avgCapacityEl.textContent = `${avgCapacity}%`;
        totalRevenueEl.textContent = `₹${totalRevenue.toLocaleString()}`;

        // Search in table
        const searchVal = (document.getElementById('organizerSearchInput')?.value || '').toLowerCase();
        let tableEvents = state.events;
        if (searchVal.trim()) {
            tableEvents = tableEvents.filter(ev =>
                ev.title.toLowerCase().includes(searchVal) ||
                ev.organizer.toLowerCase().includes(searchVal) ||
                ev.category.toLowerCase().includes(searchVal)
            );
        }

        if (tableEvents.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No events found.</td></tr>`;
            return;
        }

        tableBody.innerHTML = tableEvents.map(ev => {
            const regs = getEventRegistrations(ev.id);
            const remaining = Math.max(0, ev.capacity - regs.length);
            const isSoldOut = remaining <= 0;
            const todayStr = new Date().toISOString().split('T')[0];
            const isPast = ev.date < todayStr;

            let statusBadge = '<span class="badge badge-success">Open</span>';
            if (isPast) {
                statusBadge = '<span class="badge badge-outline">Past</span>';
            } else if (isSoldOut) {
                statusBadge = '<span class="badge badge-danger">Full</span>';
            }

            return `
                <tr>
                    <td>
                        <div class="table-event-cell">
                            <img src="${escapeHTML(ev.imageUrl)}" alt="${escapeHTML(ev.title)}" class="table-thumb" onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=100&q=80'">
                            <div>
                                <span class="table-event-name">${escapeHTML(ev.title)}</span>
                                <span class="table-event-org">${escapeHTML(ev.organizer)}</span>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge badge-cat-${ev.category}">${ev.category}</span></td>
                    <td>
                        <div>${formatDate(ev.date)}</div>
                        <small style="color:var(--text-muted);">${formatTime(ev.startTime)}</small>
                    </td>
                    <td><span title="${escapeHTML(ev.venue)}" style="max-width:140px; display:inline-block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${escapeHTML(ev.venue)}</span></td>
                    <td>
                        <strong>${regs.length}</strong> / ${ev.capacity}
                        <small style="color:var(--text-muted); display:block;">(${remaining} left)</small>
                    </td>
                    <td>${statusBadge}</td>
                    <td>
                        <div class="table-actions">
                            <button class="btn btn-outline btn-xs" onclick="window.CampusApp.openAttendees('${ev.id}')" title="View attendees roster">
                                <i class="fa-solid fa-users"></i> Attendees (${regs.length})
                            </button>
                            <button class="btn btn-outline btn-xs" onclick="window.CampusApp.editEvent('${ev.id}')" title="Edit Event">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn btn-outline btn-xs text-danger" onclick="window.CampusApp.confirmDeleteEvent('${ev.id}')" title="Delete Event">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Current event ID in attendee roster modal
    let currentRosterEventId = null;

    function openAttendeeRoster(eventId) {
        currentRosterEventId = eventId;
        const ev = state.events.find(e => e.id === eventId);
        if (!ev) return;

        document.getElementById('rosterSearchInput').value = '';
        renderAttendeeRosterTable();
        openModal('modalAttendees');
    }

    function renderAttendeeRosterTable() {
        if (!currentRosterEventId) return;
        const ev = state.events.find(e => e.id === currentRosterEventId);
        if (!ev) return;

        const allRegs = getEventRegistrations(ev.id);
        const searchVal = (document.getElementById('rosterSearchInput')?.value || '').toLowerCase();

        let filteredRegs = allRegs;
        if (searchVal.trim()) {
            filteredRegs = filteredRegs.filter(r =>
                r.name.toLowerCase().includes(searchVal) ||
                r.rollNo.toLowerCase().includes(searchVal) ||
                r.department.toLowerCase().includes(searchVal) ||
                r.ticketId.toLowerCase().includes(searchVal)
            );
        }

        const subtitle = document.getElementById('rosterEventSubtitle');
        subtitle.textContent = `${ev.title} • ${allRegs.length} Registered / ${ev.capacity} Capacity`;

        // Update counts
        const checkedCount = allRegs.filter(r => r.checkedIn).length;
        const pendingCount = allRegs.length - checkedCount;
        document.getElementById('rosterCounts').innerHTML = `
            <span>Total: <strong>${allRegs.length}</strong></span> &bull;
            <span>Checked In: <strong class="text-success">${checkedCount}</strong></span> &bull;
            <span>Pending: <strong class="text-warning">${pendingCount}</strong></span>
        `;

        const tableBody = document.getElementById('rosterTableBody');
        const emptyState = document.getElementById('emptyRosterState');

        if (filteredRegs.length === 0) {
            tableBody.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');

        tableBody.innerHTML = filteredRegs.map((reg, idx) => `
            <tr>
                <td>${idx + 1}</td>
                <td><code style="font-weight:700; color:var(--primary);">${reg.ticketId}</code></td>
                <td><strong>${escapeHTML(reg.name)}</strong></td>
                <td>${escapeHTML(reg.rollNo)}</td>
                <td>${escapeHTML(reg.department)} (${escapeHTML(reg.year)})</td>
                <td>
                    <small>${escapeHTML(reg.email)}</small><br>
                    <small style="color:var(--text-muted);">${escapeHTML(reg.phone)}</small>
                </td>
                <td>
                    <button class="checkin-btn ${reg.checkedIn ? 'checked' : 'pending'}" 
                        onclick="window.CampusApp.toggleCheckin('${reg.ticketId}')">
                        <i class="fa-solid ${reg.checkedIn ? 'fa-circle-check' : 'fa-clock'}"></i>
                        ${reg.checkedIn ? 'Checked-In' : 'Pending'}
                    </button>
                </td>
                <td>
                    <button class="btn btn-outline btn-xs" onclick="window.CampusApp.viewTicket('${reg.ticketId}')" title="View Pass">
                        <i class="fa-solid fa-qrcode"></i> Pass
                    </button>
                </td>
            </tr>
        `).join('');
    }

    function toggleCheckin(ticketId) {
        const reg = state.registrations.find(r => r.ticketId === ticketId);
        if (reg) {
            reg.checkedIn = !reg.checkedIn;
            saveRegistrations();
            renderAttendeeRosterTable();
            renderMyTickets();
            showToast(`${reg.name} check-in marked as ${reg.checkedIn ? 'Checked-In' : 'Pending'}.`, 'info');
        }
    }

    function exportRosterToCSV() {
        if (!currentRosterEventId) return;
        const ev = state.events.find(e => e.id === currentRosterEventId);
        const regs = getEventRegistrations(currentRosterEventId);

        if (regs.length === 0) {
            showToast('No registrations to export for this event.', 'warning');
            return;
        }

        const headers = ['Ticket ID', 'Student Name', 'Roll Number', 'Email', 'Phone', 'Department', 'Year', 'Ticket Type', 'Checked In', 'Registered Date'];
        const rows = regs.map(r => [
            r.ticketId,
            `"${r.name.replace(/"/g, '""')}"`,
            r.rollNo,
            r.email,
            r.phone,
            `"${r.department.replace(/"/g, '""')}"`,
            r.year,
            r.ticketType,
            r.checkedIn ? 'YES' : 'NO',
            new Date(r.registeredAt).toLocaleString()
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        const filename = `${ev.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_attendees.csv`;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast(`Downloaded ${filename}`, 'success');
    }

    // ===================================================================
    // 8. Event Creation & Editing
    // ===================================================================

    function openCreateEventModal(eventId = null) {
        const form = document.getElementById('formEventCreate');
        form.reset();
        document.getElementById('editEventId').value = '';
        document.querySelectorAll('#formEventCreate .form-group').forEach(fg => fg.classList.remove('has-error'));

        const titleEl = document.getElementById('createEventModalTitle');

        if (eventId) {
            const ev = state.events.find(e => e.id === eventId);
            if (!ev) return;
            titleEl.textContent = 'Edit Event Details';
            document.getElementById('editEventId').value = ev.id;
            document.getElementById('eventTitle').value = ev.title;
            document.getElementById('eventCategory').value = ev.category;
            document.getElementById('eventDate').value = ev.date;
            document.getElementById('eventStartTime').value = ev.startTime;
            document.getElementById('eventEndTime').value = ev.endTime;
            document.getElementById('eventVenue').value = ev.venue;
            document.getElementById('eventOrganizer').value = ev.organizer;
            document.getElementById('eventCapacity').value = ev.capacity;
            document.getElementById('eventPriceType').value = ev.priceType;
            document.getElementById('eventPrice').value = ev.price || 0;
            document.getElementById('eventImageUrl').value = ev.imageUrl;
            document.getElementById('eventDescription').value = ev.description;
            document.getElementById('eventAgenda').value = ev.agenda || '';
            document.getElementById('eventTags').value = ev.tags ? ev.tags.join(', ') : '';
        } else {
            titleEl.textContent = 'Host a Campus Event';
            // Default tomorrow date
            document.getElementById('eventDate').value = getDateOffset(1);
            document.getElementById('eventStartTime').value = '10:00';
            document.getElementById('eventEndTime').value = '16:00';
            document.getElementById('eventCapacity').value = '100';
            document.getElementById('eventPriceType').value = 'free';
            document.getElementById('eventPrice').value = '0';
        }

        openModal('modalCreateEvent');
    }

    function handleEventSubmit(e) {
        e.preventDefault();
        const editId = document.getElementById('editEventId').value;

        const title = document.getElementById('eventTitle').value.trim();
        const category = document.getElementById('eventCategory').value;
        const date = document.getElementById('eventDate').value;
        const startTime = document.getElementById('eventStartTime').value;
        const endTime = document.getElementById('eventEndTime').value;
        const venue = document.getElementById('eventVenue').value.trim();
        const organizer = document.getElementById('eventOrganizer').value.trim();
        const capacity = parseInt(document.getElementById('eventCapacity').value, 10);
        const priceType = document.getElementById('eventPriceType').value;
        const price = priceType === 'free' ? 0 : parseFloat(document.getElementById('eventPrice').value) || 0;
        let imageUrl = document.getElementById('eventImageUrl').value.trim();
        const description = document.getElementById('eventDescription').value.trim();
        const agenda = document.getElementById('eventAgenda').value.trim();
        const tagsInput = document.getElementById('eventTags').value.trim();
        const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];

        // Validation
        let isValid = true;
        function checkField(id, condition) {
            const input = document.getElementById(id);
            const parent = input.closest('.form-group');
            if (!condition) {
                parent.classList.add('has-error');
                isValid = false;
            } else {
                parent.classList.remove('has-error');
            }
        }

        checkField('eventTitle', title.length >= 3);
        checkField('eventCategory', category !== '');
        checkField('eventDate', date !== '');
        checkField('eventStartTime', startTime !== '');
        checkField('eventEndTime', endTime !== '');
        checkField('eventVenue', venue.length >= 2);
        checkField('eventOrganizer', organizer.length >= 2);
        checkField('eventCapacity', capacity >= 1);
        checkField('eventDescription', description.length >= 10);

        if (!isValid) {
            showToast('Please fill in all mandatory event details.', 'danger');
            return;
        }

        // Default banner image by category if none provided
        if (!imageUrl) {
            const fallbackMap = {
                Technical: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
                Cultural: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
                Workshop: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
                Sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
                Social: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
            };
            imageUrl = fallbackMap[category] || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';
        }

        if (editId) {
            // Edit existing
            const ev = state.events.find(e => e.id === editId);
            if (ev) {
                Object.assign(ev, {
                    title, category, date, startTime, endTime, venue, organizer,
                    capacity, priceType, price, imageUrl, description, agenda, tags
                });
                showToast(`Event "${title}" has been updated.`, 'success');
            }
        } else {
            // New event
            const newId = `ev-${Date.now().toString().slice(-4)}`;
            const newEvent = {
                id: newId,
                title, category, date, startTime, endTime, venue, organizer,
                capacity, priceType, price, imageUrl, description, agenda, tags
            };
            state.events.unshift(newEvent);
            showToast(`Event "${title}" is published and live!`, 'success');
        }

        saveEvents();
        closeModal('modalCreateEvent');
        renderAll();
    }

    function confirmDeleteEvent(eventId) {
        const ev = state.events.find(e => e.id === eventId);
        if (!ev) return;

        const regCount = getEventRegistrations(eventId).length;
        document.getElementById('confirmTitle').textContent = 'Delete Event';
        document.getElementById('confirmMessage').innerHTML = `
            Are you sure you want to permanently delete <strong>"${escapeHTML(ev.title)}"</strong>?
            ${regCount > 0 ? `<br><br><span class="text-danger">Warning: ${regCount} student registration(s) will also be deleted!</span>` : ''}
        `;

        const confirmBtn = document.getElementById('btnConfirmAction');
        confirmBtn.onclick = () => {
            deleteEvent(eventId);
            closeModal('modalConfirm');
        };

        openModal('modalConfirm');
    }

    function deleteEvent(eventId) {
        state.events = state.events.filter(e => e.id !== eventId);
        state.registrations = state.registrations.filter(r => r.eventId !== eventId);
        saveEvents();
        saveRegistrations();
        showToast('Event removed successfully.', 'info');
        renderAll();
    }

    function confirmCancelTicket(ticketId) {
        document.getElementById('confirmTitle').textContent = 'Cancel Registration';
        document.getElementById('confirmMessage').textContent = 'Are you sure you want to cancel this event pass? Your seat will be returned to the available pool.';

        const confirmBtn = document.getElementById('btnConfirmAction');
        confirmBtn.onclick = () => {
            cancelTicket(ticketId);
            closeModal('modalConfirm');
        };

        openModal('modalConfirm');
    }

    // ===================================================================
    // 9. Theme & Role Toggling
    // ===================================================================

    function applyTheme(theme) {
        state.currentTheme = theme;
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY_THEME, theme);

        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.className = theme === 'dark' ? 'fa-solid fa-sun text-warning' : 'fa-solid fa-moon';
        }
    }

    function toggleTheme() {
        const nextTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        showToast(`Theme changed to ${nextTheme} mode`, 'info');
    }

    function applyRole(role) {
        state.currentRole = role;
        localStorage.setItem(STORAGE_KEY_ROLE, role);

        const roleText = document.getElementById('currentRoleText');
        const roleBtn = document.getElementById('btnRoleSwitch');

        if (role === 'organizer') {
            roleText.textContent = 'Organizer Mode';
            roleBtn.classList.add('btn-primary');
            roleBtn.classList.remove('btn-outline');
        } else {
            roleText.textContent = 'Student View';
            roleBtn.classList.add('btn-outline');
            roleBtn.classList.remove('btn-primary');
        }
    }

    function toggleRole() {
        const nextRole = state.currentRole === 'organizer' ? 'student' : 'organizer';
        applyRole(nextRole);
        showToast(`Switched to ${nextRole === 'organizer' ? 'Organizer / Faculty' : 'Student'} mode`, 'info');
        if (nextRole === 'organizer') {
            window.location.hash = '#organizer';
        }
    }

    // ===================================================================
    // 10. Backup / JSON Export
    // ===================================================================

    function exportAllDataBackup() {
        const backupData = {
            exportedAt: new Date().toISOString(),
            version: '1.0',
            events: state.events,
            registrations: state.registrations
        };

        const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
        const link = document.createElement('a');
        link.setAttribute('href', jsonStr);
        link.setAttribute('download', `iem_events_backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('JSON backup exported successfully!', 'success');
    }

    // ===================================================================
    // 10.5. Digital Clock & Nearest Event Live Countdown Engine
    // ===================================================================

    let clockIntervalId = null;

    function getEventStartDateTime(ev) {
        if (!ev || !ev.date) return null;
        const timeStr = ev.startTime ? ev.startTime.trim() : '00:00';
        return new Date(`${ev.date}T${timeStr.padStart(5, '0')}:00`);
    }

    function getEventEndDateTime(ev) {
        if (!ev || !ev.date) return null;
        const start = getEventStartDateTime(ev);
        if (!start) return null;
        if (ev.endTime) {
            const [h, m] = ev.endTime.split(':').map(Number);
            const end = new Date(start);
            end.setHours(h, m, 0, 0);
            return end;
        }
        // Default: 2 hours duration
        return new Date(start.getTime() + 2 * 60 * 60 * 1000);
    }

    function findNearestEvent() {
        const now = new Date();
        if (!state.events || state.events.length === 0) return null;

        // Active events whose end time is still in the future
        const activeEvents = state.events.filter(ev => {
            const end = getEventEndDateTime(ev);
            return end && end > now;
        });

        if (activeEvents.length === 0) return null;

        // Sort by start date & time ascending
        activeEvents.sort((a, b) => {
            const startA = getEventStartDateTime(a);
            const startB = getEventStartDateTime(b);
            return startA - startB;
        });

        return activeEvents[0];
    }

    function updateDigitalClocks() {
        const now = new Date();

        // 1. Update live campus digital clock (e.g. 03:45:12 PM)
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const formattedLiveTime = now.toLocaleTimeString('en-US', timeOptions);

        const liveClockEl = document.getElementById('liveCurrentClock');
        if (liveClockEl) {
            liveClockEl.textContent = formattedLiveTime;
        }

        const navLiveClockEl = document.getElementById('navLiveClock');
        if (navLiveClockEl) {
            navLiveClockEl.textContent = formattedLiveTime;
        }

        // 2. Nearest event countdown
        const nearest = findNearestEvent();
        const cntDays = document.getElementById('cntDays');
        const cntHours = document.getElementById('cntHours');
        const cntMins = document.getElementById('cntMins');
        const cntSecs = document.getElementById('cntSecs');
        const statusLabel = document.getElementById('countdownStatusLabel');
        const titleEl = document.getElementById('nearestEventTitle');
        const venueTextEl = document.getElementById('nearestEventVenueText');
        const dateTextEl = document.getElementById('nearestEventDateText');
        const categoryBadge = document.getElementById('nearestEventCategory');
        const regBtn = document.getElementById('btnNearestRegister');
        const detailsBtn = document.getElementById('btnNearestDetails');
        const hintEl = document.getElementById('nearestEventHint');

        if (!nearest) {
            if (titleEl) titleEl.textContent = 'No Upcoming Events Scheduled';
            if (venueTextEl) venueTextEl.textContent = 'Stay tuned or host the next campus event!';
            if (dateTextEl) dateTextEl.textContent = 'Academic Year 2026';
            if (categoryBadge) categoryBadge.textContent = 'Campus Life';
            if (statusLabel) statusLabel.textContent = 'COUNTDOWN IDLE';
            if (cntDays) cntDays.textContent = '00';
            if (cntHours) cntHours.textContent = '00';
            if (cntMins) cntMins.textContent = '00';
            if (cntSecs) cntSecs.textContent = '00';

            if (regBtn) {
                regBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Host Event';
                regBtn.onclick = () => openCreateEventModal();
                regBtn.disabled = false;
            }
            if (detailsBtn) {
                detailsBtn.innerHTML = '<i class="fa-solid fa-compass"></i> Explore All';
                detailsBtn.onclick = () => {
                    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
                };
            }
            if (hintEl) {
                hintEl.innerHTML = '<i class="fa-solid fa-info-circle text-info"></i> No active event found. Create one from the Organizer Hub.';
            }
            return;
        }

        // Populate nearest event details
        if (titleEl) {
            titleEl.textContent = nearest.title;
            titleEl.onclick = () => renderEventDetailsModal(nearest.id);
        }
        if (categoryBadge) {
            categoryBadge.textContent = nearest.category;
        }
        if (dateTextEl) {
            dateTextEl.textContent = `${formatDate(nearest.date)} • ${formatTime(nearest.startTime)}`;
        }
        if (venueTextEl) {
            venueTextEl.textContent = nearest.venue;
        }

        // Buttons
        const regCount = (state.registrations || []).filter(r => r.eventId === nearest.id).length;
        const isSoldOut = regCount >= nearest.capacity;

        if (regBtn) {
            if (isSoldOut) {
                regBtn.innerHTML = '<i class="fa-solid fa-ban"></i> Sold Out';
                regBtn.disabled = true;
                regBtn.onclick = null;
            } else {
                regBtn.innerHTML = '<i class="fa-solid fa-ticket"></i> Register Now';
                regBtn.disabled = false;
                regBtn.onclick = () => openRegistrationModal(nearest.id);
            }
        }

        if (detailsBtn) {
            detailsBtn.innerHTML = '<i class="fa-solid fa-circle-info"></i> Event Details';
            detailsBtn.onclick = () => renderEventDetailsModal(nearest.id);
        }

        // Countdown calculation
        const start = getEventStartDateTime(nearest);
        const end = getEventEndDateTime(nearest);

        let diffMs = start - now;
        let isHappeningNow = false;

        if (diffMs <= 0 && end > now) {
            isHappeningNow = true;
            diffMs = end - now;
        } else if (diffMs < 0) {
            diffMs = 0;
        }

        if (statusLabel) {
            if (isHappeningNow) {
                statusLabel.innerHTML = '<i class="fa-solid fa-fire text-warning"></i> HAPPENING NOW &bull; CLOSES IN';
            } else {
                statusLabel.innerHTML = '<i class="fa-solid fa-stopwatch"></i> EVENT STARTS IN';
            }
        }

        const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        if (cntDays) cntDays.textContent = String(days).padStart(2, '0');
        if (cntHours) cntHours.textContent = String(hours).padStart(2, '0');
        if (cntMins) cntMins.textContent = String(mins).padStart(2, '0');
        if (cntSecs) cntSecs.textContent = String(secs).padStart(2, '0');

        if (hintEl) {
            if (isHappeningNow) {
                hintEl.innerHTML = '<i class="fa-solid fa-satellite-dish text-success"></i> Live session in progress at ' + escapeHTML(nearest.venue);
            } else {
                hintEl.innerHTML = `<i class="fa-solid fa-bolt text-warning"></i> Syncing with IEM Campus Schedule (${nearest.capacity - regCount} spots left)`;
            }
        }
    }

    function startClockTimer() {
        if (clockIntervalId) {
            clearInterval(clockIntervalId);
        }
        updateDigitalClocks();
        clockIntervalId = setInterval(updateDigitalClocks, 1000);
    }

    // ===================================================================
    // 11. Master Render & Event Listeners
    // ===================================================================

    function renderAll() {
        renderHeroStats();
        renderEvents();
        renderCalendar();
        renderMyTickets();
        renderOrganizerHub();
        updateDigitalClocks();
    }

    function setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);

        // Role switch
        document.getElementById('btnRoleSwitch')?.addEventListener('click', toggleRole);

        // Reset demo buttons
        document.getElementById('btnSeedDemo')?.addEventListener('click', resetToDemoData);
        document.getElementById('footerResetBtn')?.addEventListener('click', resetToDemoData);
        document.getElementById('btnEmptyReset')?.addEventListener('click', () => {
            state.searchTerm = '';
            state.activeCategory = 'all';
            state.statusFilter = 'all';
            state.priceFilter = 'all';
            document.getElementById('searchInput').value = '';
            document.getElementById('filterCategory').value = 'all';
            document.getElementById('filterStatus').value = 'all';
            document.getElementById('filterPrice').value = 'all';
            document.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));
            renderEvents();
        });

        // Search Input
        const searchInput = document.getElementById('searchInput');
        const clearSearchBtn = document.getElementById('clearSearchBtn');

        searchInput?.addEventListener('input', (e) => {
            state.searchTerm = e.target.value;
            clearSearchBtn.style.display = e.target.value ? 'block' : 'none';
            renderEvents();
        });

        clearSearchBtn?.addEventListener('click', () => {
            searchInput.value = '';
            state.searchTerm = '';
            clearSearchBtn.style.display = 'none';
            renderEvents();
            searchInput.focus();
        });

        // Category pills
        document.getElementById('categoryPillList')?.addEventListener('click', (e) => {
            const pill = e.target.closest('.cat-pill');
            if (!pill) return;

            document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const cat = pill.dataset.category;
            state.activeCategory = cat;
            document.getElementById('filterCategory').value = cat;
            renderEvents();
        });

        // Filter dropdowns
        document.getElementById('filterCategory')?.addEventListener('change', (e) => {
            state.activeCategory = e.target.value;
            document.querySelectorAll('.cat-pill').forEach(p => {
                p.classList.toggle('active', p.dataset.category === e.target.value);
            });
            renderEvents();
        });

        document.getElementById('filterStatus')?.addEventListener('change', (e) => {
            state.statusFilter = e.target.value;
            renderEvents();
        });

        document.getElementById('filterPrice')?.addEventListener('change', (e) => {
            state.priceFilter = e.target.value;
            renderEvents();
        });

        document.getElementById('sortBy')?.addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            renderEvents();
        });

        document.getElementById('btnResetFilters')?.addEventListener('click', () => {
            state.searchTerm = '';
            state.activeCategory = 'all';
            state.statusFilter = 'upcoming';
            state.priceFilter = 'all';
            state.sortBy = 'date-asc';

            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            document.getElementById('filterCategory').value = 'all';
            document.getElementById('filterStatus').value = 'upcoming';
            document.getElementById('filterPrice').value = 'all';
            document.getElementById('sortBy').value = 'date-asc';
            document.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));

            renderEvents();
            showToast('Filters reset to default', 'info');
        });

        // View Toggles (Grid / List)
        const gridBtn = document.getElementById('viewGridBtn');
        const listBtn = document.getElementById('viewListBtn');

        gridBtn?.addEventListener('click', () => {
            state.viewMode = 'grid';
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
            renderEvents();
        });

        listBtn?.addEventListener('click', () => {
            state.viewMode = 'list';
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            renderEvents();
        });

        // Host Event Buttons
        document.getElementById('btnOpenCreateEvent')?.addEventListener('click', () => openCreateEventModal());
        document.getElementById('btnHeroHost')?.addEventListener('click', () => openCreateEventModal());
        document.getElementById('btnHubCreateEvent')?.addEventListener('click', () => openCreateEventModal());

        // Preset Image Buttons in Create Modal
        document.querySelectorAll('.btn-preset-img').forEach(btn => {
            btn.addEventListener('click', () => {
                const imgUrl = btn.dataset.img;
                document.getElementById('eventImageUrl').value = imgUrl;
            });
        });

        // Forms
        document.getElementById('formRegister')?.addEventListener('submit', handleRegistrationSubmit);
        document.getElementById('formEventCreate')?.addEventListener('submit', handleEventSubmit);

        // Price Type toggle in Create Event Form
        document.getElementById('eventPriceType')?.addEventListener('change', (e) => {
            const priceInput = document.getElementById('eventPrice');
            if (e.target.value === 'free') {
                priceInput.value = 0;
                priceInput.disabled = true;
            } else {
                priceInput.disabled = false;
                if (priceInput.value === '0') priceInput.value = 100;
            }
        });

        // Print ticket pass
        document.getElementById('btnPrintTicket')?.addEventListener('click', () => {
            window.print();
        });

        // Export Roster CSV & Print Roster
        document.getElementById('btnExportCSV')?.addEventListener('click', exportRosterToCSV);
        document.getElementById('btnPrintRoster')?.addEventListener('click', () => {
            window.print();
        });

        // Backup all data
        document.getElementById('btnExportAllData')?.addEventListener('click', exportAllDataBackup);

        // Organizer search in table
        document.getElementById('organizerSearchInput')?.addEventListener('input', renderOrganizerHub);
        document.getElementById('rosterSearchInput')?.addEventListener('input', renderAttendeeRosterTable);

        // Calendar Nav
        document.getElementById('calPrevMonth')?.addEventListener('click', () => {
            state.calendarDate.setMonth(state.calendarDate.getMonth() - 1);
            state.selectedCalendarDay = 1;
            renderCalendar();
        });

        document.getElementById('calNextMonth')?.addEventListener('click', () => {
            state.calendarDate.setMonth(state.calendarDate.getMonth() + 1);
            state.selectedCalendarDay = 1;
            renderCalendar();
        });

        // Calendar Day Click Delegation
        document.getElementById('calendarDaysGrid')?.addEventListener('click', (e) => {
            const dayEl = e.target.closest('.cal-day:not(.empty)');
            if (dayEl) {
                const day = parseInt(dayEl.dataset.day, 10);
                selectCalendarDay(day);
            }
        });

        // Modal Close handlers (all elements with data-close-modal or overlay clicks)
        document.querySelectorAll('[data-close-modal]').forEach(btn => {
            btn.addEventListener('click', () => {
                const overlay = btn.closest('.modal-overlay');
                closeModal(overlay);
            });
        });

        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closeModal(overlay);
                }
            });
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllModals();
            }
        });

        // Mobile Hamburger menu toggle
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const navMenu = document.getElementById('navMenu');
        hamburgerBtn?.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        // Close mobile nav on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                // Active link highlight
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Footer category quick links
        document.querySelectorAll('[data-quick-cat]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const cat = link.dataset.quickCat;
                state.activeCategory = cat;
                document.getElementById('filterCategory').value = cat;
                document.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p.dataset.category === cat));
                renderEvents();
                document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // ===================================================================
    // 12. Global API for inline HTML onclick attributes
    // ===================================================================

    window.CampusApp = {
        openDetails: (id) => renderEventDetailsModal(id),
        openRegister: (id) => openRegistrationModal(id),
        editEvent: (id) => openCreateEventModal(id),
        confirmDeleteEvent: (id) => confirmDeleteEvent(id),
        openAttendees: (id) => openAttendeeRoster(id),
        toggleCheckin: (ticketId) => toggleCheckin(ticketId),
        viewTicket: (ticketId) => {
            const reg = state.registrations.find(r => r.ticketId === ticketId);
            if (reg) {
                const ev = state.events.find(e => e.id === reg.eventId);
                showTicketModal(reg, ev);
            }
        },
        confirmCancelTicket: (ticketId) => confirmCancelTicket(ticketId),
        updateClock: () => updateDigitalClocks()
    };

    window.IEMApp = window.CampusApp;

    // ===================================================================
    // 13. App Bootstrap
    // ===================================================================

    document.addEventListener('DOMContentLoaded', () => {
        loadState();
        applyTheme(state.currentTheme);
        applyRole(state.currentRole);
        setupEventListeners();
        renderAll();
        startClockTimer();
    });

})();

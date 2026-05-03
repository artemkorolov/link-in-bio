document.addEventListener("DOMContentLoaded", function () {
	renderSocialLinks();
	renderPromotions();
	renderFaq();
	updateDynamicStatus();
	initAccordion();
	initTheme();

});

function initAccordion() {
	const faqSection = document.querySelector('.faq');
	if (!faqSection) return;

	faqSection.addEventListener('click', (event) => {
		if (!(event.target instanceof Element)) return;

		const btn = event.target.closest('.faq-question');
		if (!btn) return;

		const faqItem = btn.closest('.faq-item');
		if (!faqItem) return;

		const answer = faqItem.querySelector('.faq-answer');
		if (!answer) return;

		const isOpen = answer.classList.contains('show');

		const allItems = faqSection.querySelectorAll('.faq-item');

		allItems.forEach((item) => {
			if (item !== faqItem) {
				const otherBtn = item.querySelector('.faq-question');
				const otherAnswer = item.querySelector('.faq-answer');

				if (otherAnswer) otherAnswer.classList.remove('show');
				if (otherBtn) {
					otherBtn.classList.remove('active');
					otherBtn.setAttribute('aria-expanded', 'false');
				}
			}
		});

		answer.classList.toggle('show');
		btn.classList.toggle('active');
		btn.setAttribute('aria-expanded', String(!isOpen));

	});
}

function initTheme() {
	const themeToggle = document.getElementById('theme-toggle');
	if (!themeToggle) return;

	const savedTheme = localStorage.getItem('theme');

	if (savedTheme) {
		document.documentElement.setAttribute('data-theme', savedTheme);
		themeToggle.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
	}

	themeToggle.addEventListener('click', () => {
		const currentTheme = document.documentElement.getAttribute('data-theme');
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

		document.documentElement.setAttribute('data-theme', newTheme);

		localStorage.setItem('theme', newTheme);

		themeToggle.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
	});
}

function updateDynamicStatus() {
	const statusDot = document.getElementById('status-dot');
	const statusText = document.getElementById('status-text');

	if (!statusDot || !statusText) return;

	const now = new Date();
	const currentHour = now.getHours();
	const currentDay = now.getDay();

	const isWeekend = (currentDay === 0 || currentDay === 6);
	const isWorkHours = currentHour >= 9 && currentHour < 21;

	if (isWeekend) {
		statusDot.className = 'dot away';
		statusText.textContent = 'Weekend Mode (Resting)';
	} else if (isWorkHours) {
		statusDot.className = 'dot online';
		statusText.textContent = 'Available for work';
	} else {
		statusDot.className = 'dot away';
		statusText.textContent = 'Away (Probably coding)';
	}

}

const socialLinks = [
	{
		name: "Instagram",
		url: "https://instagram.com/",
		icon: "img/instagram.svg",
	},
	{
		name: "LinkedIn",
		url: "https://linkedin.com/",
		icon: "img/linkedin.svg",
	},
	{
		name: "YouTube",
		url: "https://youtube.com/",
		icon: "img/youtube.svg",
	},
	{
		name: "Telegram",
		url: "https://t.me/",
		icon: "img/telegram.svg",
	},
]

function renderSocialLinks() {
	const container = document.querySelector('.social-links');
	if (!container) return;

	container.textContent = '';

	socialLinks.forEach(link => {
		const anchor = document.createElement('a');
		anchor.href = link.url;
		anchor.className = 'social-btn';
		anchor.target = '_blank';
		anchor.rel = 'noopener noreferrer';

		const img = document.createElement('img');
		img.src = link.icon;
		img.alt = `${link.name} Logo`;

		const text = document.createTextNode(link.name);

		anchor.appendChild(img);
		anchor.appendChild(text);

		container.appendChild(anchor);
	});

}

const promotionsData = [
	{
		title: "20% OFF – FAST HOSTING",
		description: "Get reliable, fast, and secure hosting for your website. Automatically get 20% off with the link below!",
		image: "img/server.jpg",
		link: "#",
	},
	{
		title: "10% OFF – WEBSITE DEVELOPMENT",
		description: "Order a custom website with me and get a 10% discount. Speed, security, and design included!",
		image: "img/promo.jpg",
		link: "#",
	},
]

function renderPromotions() {
	const container = document.querySelector('.promo-container');
	if (!container) return;

	container.textContent = '';

	promotionsData.forEach(promo => {
		const card = document.createElement('div');
		card.className = 'promo-card';

		const img = document.createElement('img');
		img.src = promo.image;
		img.alt = promo.title;

		const title = document.createElement('h3');
		title.textContent = promo.title;

		const p = document.createElement('p');
		p.textContent = promo.description;

		const btn = document.createElement('a');
		btn.href = promo.link;
		btn.className = 'promo-btn';
		btn.textContent = 'Chek it Out';

		card.append(img, title, p, btn);

		container.appendChild(card);
	});
}

const faqData = [
	{
		question: "How long have you been programming?",
		answer: "I started programming in 2021 and have worked on both freelance and team projects since then"
	},
	{
		question: "Can I contact you for help or advice?",
		answer: ">Absolutely! Feel free to reach out via any of the social platforms above or by email"
	},
	{
		question: "What technologies do you specialize in?",
		answer: "My focus is on front-end and back-end web development using WordPress, PHP, React, and custom solutions"
	},
]

function renderFaq() {
	const faqContainer = document.querySelector('.faq');
	if (!faqContainer) return;

	const title = document.createElement('h2');
	title.textContent = 'FAQ';

	faqContainer.appendChild(title);

	faqData.forEach(item => {
		const faqItem = document.createElement('div');
		faqItem.className = 'faq-item';

		const button = document.createElement('button');
		button.className = 'faq-question';
		button.textContent = item.question;
		button.setAttribute('aria-expanded', 'false');

		const answer = document.createElement('p');
		answer.className = 'faq-answer';
		answer.textContent = item.answer;

		faqItem.appendChild(button);
		faqItem.appendChild(answer);
		faqContainer.appendChild(faqItem);
	});

}
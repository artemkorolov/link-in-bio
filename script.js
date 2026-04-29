document.addEventListener("DOMContentLoaded", function () {
	initAccordion();
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

		answer.classList.toggle('show');
		btn.classList.toggle('active');
		btn.setAttribute('aria-expanded', String(!isOpen));

	});
}


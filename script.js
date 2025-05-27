document.addEventListener("DOMContentLoaded", function () {
	const questions = document.querySelectorAll(".faq-question");

	questions.forEach((question) => {
		question.addEventListener("click", function () {
			const answer = this.nextElementSibling;
			const isExpanded = this.getAttribute("aria-expanded") === "true";

			document.querySelectorAll(".faq-answer").forEach((item) => {
				if (item !== answer) {
					item.classList.remove("show");
					if (item.previousElementSibling) {
						item.previousElementSibling.classList.remove("active");
						item.previousElementSibling.setAttribute("aria-expanded", "false");
					}
				}
			});

			answer.classList.toggle("show");
			this.classList.toggle("active");
			this.setAttribute("aria-expanded", !isExpanded);
		});
	});
});

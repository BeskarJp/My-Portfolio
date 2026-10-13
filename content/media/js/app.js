async function fetchJson(filePath) {
	const response = await fetch(filePath);

	if (!response.ok) {
		throw new Error(`Unable to load ${filePath}`);
	}
	return response.json();
}

function buildImagePath(imageName) {
	return imageName ? `media/img/career/${imageName}` : 'media/img/project-1.svg';
}

function isExternalLink(link) {
	return typeof link === 'string' && /^https?:\/\//i.test(link);
}

function createProjectCard(project) {
	const card = document.createElement('a');
	const image = document.createElement('img');
	const content = document.createElement('div');
	const title = document.createElement('h3');
	const description = document.createElement('p');
	const footer = document.createElement('div');
	const label = document.createElement('span');
	const arrow = document.createElement('strong');

	card.className = 'project-card';
	card.href = project.link || '#';
	card.target = isExternalLink(project.link) ? '_blank' : '_self';
	card.rel = isExternalLink(project.link) ? 'noreferrer' : '';

	image.src = `media/img/projects/${project.image}`;
	image.alt = project.title;

	content.className = 'project-card-content';
	title.textContent = project.title;
	description.textContent = project.description;

	footer.className = 'project-card-footer';
	label.textContent = 'Explore';
	arrow.textContent = '→';

	footer.appendChild(label);
	footer.appendChild(arrow);
	content.appendChild(title);
	content.appendChild(description);
	content.appendChild(footer);

	card.appendChild(image);
	card.appendChild(content);

	return card;
}

function createSkillCard(skill) {
	const card = document.createElement('article');
	const icon = document.createElement('img');
	const title = document.createElement('h3');
	const description = document.createElement('p');

	card.className = 'skill-card';

	icon.src = `media/img/skills/${skill.icon}`;
	icon.alt = `${skill.name} icon`;

	title.textContent = skill.name;
	description.textContent = skill.description;

	card.appendChild(icon);
	card.appendChild(title);
	card.appendChild(description);

	return card;
}

function createTimelineItem(item) {
	const timelineItem = document.createElement('div');
	const period = document.createElement('div');
	const card = document.createElement('div');
	const visual = document.createElement('div');
	const image = document.createElement('img');
	const content = document.createElement('div');
	const label = document.createElement('span');
	const title = document.createElement('h3');
	const description = document.createElement('p');
	const company = document.createElement('span');

	timelineItem.className = 'career-item';
	period.className = 'career-period';
	period.textContent = item.period;

	card.className = 'career-card';

	visual.className = 'career-visual';
	image.src = buildImagePath(item.image);
	image.alt = item.title;

	content.className = 'career-content';
	label.className = 'career-tag';
	label.textContent = item.tag || item.company || 'Experience';

	title.textContent = item.title;
	description.textContent = item.description;
	company.className = 'career-company';
	company.textContent = item.company;

	content.appendChild(label);
	content.appendChild(title);
	content.appendChild(description);
	content.appendChild(company);

	visual.appendChild(image);
	card.appendChild(visual);
	card.appendChild(content);

	timelineItem.appendChild(period);
	timelineItem.appendChild(card);

	return timelineItem;
}

function renderProjects(projects, container, limit) {
	if (!container) {
		return;
	}

	const items = typeof limit === 'number' ? projects.slice(0, limit) : projects;

	items.forEach((project) => {
		container.appendChild(createProjectCard(project));
	});
}

function renderSkills(skills, container) {
	if (!container) {
		return;
	}

	const groupedSkills = {};

	skills.forEach((skill) => {
		const category = skill.category || 'Technos';

		if (!groupedSkills[category]) {
			groupedSkills[category] = [];
		}
		groupedSkills[category].push(skill);
	});

	Object.entries(groupedSkills).forEach(([category, items]) => {
		const group = document.createElement('div');
		const label = document.createElement('div');
		const grid = document.createElement('div');

		group.className = 'skills-group';
		label.className = 'skills-group-label';
		label.textContent = category;
		grid.className = 'skills-list';
		items.forEach((skill) => {
			grid.appendChild(createSkillCard(skill));
		});
		group.appendChild(label);
		group.appendChild(grid);
		container.appendChild(group);
	});
}

function renderTimeline(items, container) {
	if (!container) {
		return;
	}

	items.forEach((item) => {
		container.appendChild(createTimelineItem(item));
	});
}

function renderFallback(container) {
	if (!container) {
		return;
	}

	const fallback = document.createElement('p');

	fallback.textContent = 'Content not loaded.';
	fallback.style.color = '#c0c0c0';
	container.appendChild(fallback);
}

window.addEventListener('DOMContentLoaded', async () => {
	const previewContainer = document.querySelector('#project-preview');
	const allProjectsContainer = document.querySelector('#all-projects');
	const skillsContainer = document.querySelector('#skills-grid');
	const careerContainer = document.querySelector('#career-timeline');

	try {
		const projects = await fetchJson('media/data/projects.json');
		const skills = await fetchJson('media/data/skills.json');
		const careerData = await fetchJson('media/data/career.json');

		renderProjects(projects, previewContainer, 3);
		renderProjects(projects, allProjectsContainer);
		renderSkills(skills, skillsContainer);
		renderTimeline(careerData, careerContainer);
	} catch (error) {
		console.error(error);
		renderFallback(previewContainer);
		renderFallback(allProjectsContainer);
		renderFallback(skillsContainer);
		renderFallback(careerContainer);
	}
});

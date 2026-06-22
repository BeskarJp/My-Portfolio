const PROJECTS_DATA = window.location.pathname.includes('/pages/') 
    ? '../data/projects.json' 
    : 'data/projects.json';

let currentLanguage = 'fr';

/**
 * Function for fetch and display projects' data
 */
async function loadProjects() {

    try {
        const response = await fetch(PROJECTS_DATA);

        if (!response.ok) {
            throw new Error(`HTTP Error : ${response.status}`);
        }

        const projectsData = await response.json();
        renderProjects(projectsData);

    } catch (error) {
        console.error("The data about projects is unavailable :", error);
        const grid = document.getElementById('projects-grid') || document.getElementById('recent-projects-grid');
        if (grid) {
            grid.innerHTML = `<p style="text-align: center; color: red;">The data about projects is unavailable.</p>`;
        }
    }
}

/**
 * Create a HTML card for one project
 *
 * @param {Object} project - Data from projects.json
 * @param {Boolean} isIndexPage - True si on est sur index.html
 *
 * @returns {HTMLElement} HTML tag <article> for the card
 */
function createProjectCard(project, isIndexPage = false) {

    const cardElement = document.createElement('article');
    cardElement.classList.add('card');

    const title = project.name[currentLanguage] || project.name['fr'];
    const context = project.context[currentLanguage] || project.context['fr'];
    const description = project.description[currentLanguage] || project.description['fr'];

    const skillsHtml = project.skills
        .map(skill => `<span class="skill-tag">${skill}</span>`)
        .join('');

    const imageHtml = (!isIndexPage && project.image) 
        ? `<img src="${project.image}" alt="Image du projet ${title}" class="project-img">` 
        : '';

    if (isIndexPage) {
        cardElement.innerHTML = `
            <h3>${title}</h3>
            <span class="context">${context} - ${project.year}</span>
            <p>${description}</p>
            <div class="skills">
                ${skillsHtml}
            </div>
            <a href="${project.github_link}" target="_blank" rel="noopener noreferrer" class="github-btn">See project to GitHub</a>
        `;
    } else {
        cardElement.innerHTML = `
            ${imageHtml}
            <h3>${title}</h3>
            <span class="context">${context} - ${project.year}</span>
            <p>${description}</p>
            <div class="skills">
                ${skillsHtml}
            </div>
            <div class="card-actions">
                <a href="${project.github_link}" target="_blank" rel="noopener noreferrer" class="github-btn">GitHub</a>
            </div>
        `;
    }

    return cardElement;
}

/**
 * Give cards to the HTML page
 *
 * @param {Array} projects - Cards to the board
 */
function renderProjects(projects) {

    const recentGrid = document.getElementById('recent-projects-grid');
    const olderGrid = document.getElementById('older-projects-grid');
    const mainGrid = document.getElementById('projects-grid');

    if (recentGrid)
        recentGrid.innerHTML = '';
    if (olderGrid)
        olderGrid.innerHTML = '';
    if (mainGrid)
        mainGrid.innerHTML = '';

    const isIndexPage = !!mainGrid;

    projects.forEach(project => {
        if (isIndexPage && mainGrid) {
            const projectCard = createProjectCard(project, true);
            mainGrid.appendChild(projectCard);
        } else {
            const projectCard = createProjectCard(project, false);
            if (project.year >= "2026") {
                if (recentGrid) recentGrid.appendChild(projectCard);
            } else {
                if (olderGrid) olderGrid.appendChild(projectCard);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', loadProjects);

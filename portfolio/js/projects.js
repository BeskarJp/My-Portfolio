const PROJECTS_DATA = 'data/projects.json';

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
        document.getElementById('projects-grid').innerHTML = 
            `<p style="text-align: center; color: red;">The data about projects is unavailable.</p>`;
    }
}

/**
 * Create a HTML card for one project
 *
 * @param {Object} project - Data from projects.json
 * @returns {HTMLElement} HTML tag <article> for the card
 */
function createProjectCard(project) {

    const cardElement = document.createElement('article');
    cardElement.classList.add('card');

    const title = project.name[currentLanguage] || project.name['fr'];
    const context = project.context[currentLanguage] || project.context['fr'];
    const description = project.description[currentLanguage] || project.description['fr'];

    const skillsHtml = project.skills
        .map(skill => `<span class="skill-tag">${skill}</span>`)
        .join('');

    cardElement.innerHTML = `
        <h3>${title}</h3>
        <span class="context">${context} - ${project.year}</span>
        <p>${description}</p>
        <div class="skills">
            ${skillsHtml}
        </div>
        <a href="${project.github_link}" target="_blank" rel="noopener noreferrer" class="github-btn">See project to GitHub</a>
    `;

    return cardElement;
}

/**
 * Give cards to the HTML page
 *
 * @param {Array} projects - Cards to the board
 */
function renderProjects(projects) {

    const gridContainer = document.getElementById('projects-grid');
    gridContainer.innerHTML = '';

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        gridContainer.appendChild(projectCard);
    });
}

document.addEventListener('DOMContentLoaded', loadProjects);

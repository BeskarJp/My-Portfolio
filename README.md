## BeskarJp Portfolio

Portfolio built with HTML, CSS and JavaScript. The project uses GitHub Pages and JSON data files for the projects, skills, and career timeline sections.

### Project structure

- `.github/workflows/deploy.yml` — GitHub Pages deployment workflow.
- `content/` — Files served to GitHub Pages.
- `content/media/data/` — JSON content for projects, skills, and career.
- `content/media/` — Files in interaction with HTML.

### How does it works

Some content is generated from JSON files. The content can be updated easily without editing website struct. The `app.js` file fetches:

- `media/data/projects.json`
- `media/data/skills.json`
- `media/data/career.json`

This makes the portfolio easy to personalize.

### GitHub Pages deployment

This repository includes a Pages workflow in `.github/workflows/deploy.yml`. Which publish the `content/` folder automatically as a static site.

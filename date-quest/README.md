# date_planner.exe 💌

A retro-terminal "date-planning questionnaire": 12 coding-themed questions with witty replies,
a fake build step, and a result card with her "date profile" plus 3 matched date ideas.

## Personalize
Edit the `CONFIG` block at the top of `script.js`:
- `herName`: she gets a special welcome when she logs in with it
- `myPhone`: the "text it to me" button opens a message to this number with her results filled in
- `city`: shown next to the date ideas

Questions, replies, and date ideas are plain lists in `script.js` (`QUESTIONS`, `IDEAS`), so they're easy to edit.

## Run locally
Open `index.html` in a browser. Nothing to install.

## Share it
GitHub repo → Settings → Pages → Deploy from branch → pick the branch and `/ (root)`.
The site will be at `https://<user>.github.io/<repo>/date-quest/`.

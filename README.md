# Happiest Birthday — Premium Scrapbook Experience

## Folder Structure

```
birthday-website/
├── index.html
├── style.css
├── script.js
├── images/
│   ├── photo1.jpg   ← main / hero portrait (best photo)
│   ├── photo2.jpg
│   ├── photo3.jpg
│   ├── photo4.jpg
│   ├── photo5.jpg
│   └── photo6.jpg
└── music/
    └── birthday.mp3
```

## 1. Put your photos

Replace the 6 files inside the `images/` folder with her real photos.  
Keep the exact names: `photo1.jpg` … `photo6.jpg`.

- **photo1.jpg** → Hero portrait + finale + secret modal (choose her best photo)
- photo2–6 → gallery, timeline, reveal frames

Recommended: portrait orientation, good lighting, faces clearly visible.  
The site uses `object-fit: cover` with smart positioning so faces stay intact.

## 2. Put the music

Place any soft birthday / romantic instrumental as:

```
music/birthday.mp3
```

Volume is set to ~0.4 and loops. Music only starts after she taps “Open Your Birthday Surprise”.

## 3. How to open locally

Simply open `index.html` in any modern browser  
(or use a local server):

```bash
# Python
python -m http.server 8000

# or VS Code Live Server
```

Then visit `http://localhost:8000`

## 4. Free deployment

### GitHub Pages
1. Create a new repository
2. Upload the whole `birthday-website` folder contents
3. Settings → Pages → Deploy from main branch
4. Share the link: `https://yourusername.github.io/repo-name/`

### Netlify (drag & drop)
1. Go to [netlify.com](https://netlify.com)
2. Drag the entire `birthday-website` folder onto the deploy area
3. Get an instant live link

### Vercel
1. Install Vercel CLI or use the web dashboard
2. Import the folder / GitHub repo
3. Deploy

## Tips

- Test on mobile first (WhatsApp / Instagram open links on phones).
- If music doesn’t play on some phones, the floating ♫ button still works.
- All photos are easy to swap later — just replace the files, no code changes needed.
- The opening screen prevents autoplay issues (browsers require a user click).

Made with care. Enjoy the reaction ❤️

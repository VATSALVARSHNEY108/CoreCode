# CoreCode — Dynamic EdTech Platform

A modern learning platform where **folders are topics** and **files are lessons**. No configuration needed.

## Architecture

```
content/
└── dsa/                          ← Subject (auto-detected)
    ├── arrays/                   ← Topic (auto-detected)
    │   ├── traversal.tsx         ← Lesson (auto-detected)
    │   └── two-pointer.tsx       ← Lesson (auto-detected)
    ├── linked-list/              ← Topic (auto-detected)
    └── ...
```

## Adding Content

### New Subject
```bash
mkdir content/web-dev
```

### New Topic
```bash
mkdir content/dsa/graphs
```

### New Lesson
Create `content/dsa/graphs/bfs.tsx`:
```tsx
export default function BFSLesson() {
  return <div>BFS content here</div>;
}
```

**That's it.** CoreCode detects and routes it automatically.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/curriculum` | All subjects |
| `/dashboard` | Learning dashboard |
| `/learn/[subject]` | Subject page (topics) |
| `/learn/[subject]/[topic]` | Topic page (lessons) |
| `/learn/[subject]/[topic]/[lesson]` | Lesson view |

## Running

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
```

## How It Works

1. `lib/content-registry.ts` reads `content/` via Node `fs` at request time
2. Each page receives subjects/topics/lessons as props
3. `LessonLoader.tsx` uses dynamic `import()` to load lesson components
4. No central registry, no hardcoding — pure filesystem

---

For a deeper dive into the architecture, design system, and development guidelines, see [DOCUMENTATION.md](./DOCUMENTATION.md).


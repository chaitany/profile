# Chaitanya Reddy Vaddula — Portfolio

React 18 + TypeScript + Vite. A block robot walks visitors through About (living room),
Experience (office, via a commute) and Projects (home office).

## Run

Requires Node.js 20.19+ or 22.12+ (Vite 8).


```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks with tsc, then builds to dist/
npm run preview    # serves the production build
```

## Structure

```
index.html                 SEO + Open Graph tags (replace chaitanyavaddula.dev with your domain)
public/                    sketched scenes (room, office, door, house, home) and og-image.png
src/
  main.tsx                 entry point
  App.tsx                  layout + scene state machine (living -> office -> home)
  styles.css               all styling and robot pose animations
  types.ts                 shared types (PageId, Place, Pose, Job, Project, ...)
  data/content.ts          resume content, projects and the robot's highlight lines
  lib/motion.ts            reduced-motion flag, hash routing, timers, seeded random
  components/
    Robot.tsx              the block robot SVG (poses are CSS classes)
    RoamingRobot.tsx       walks around a scene and says highlights
    Commute.tsx            hand-drawn road + walking to a door
    Intro.tsx              peek, duck out, pull the living room in
    Nav.tsx                sliding pill navigation
    Contacts.tsx           email / LinkedIn / GitHub pill
  pages/
    About.tsx  Experience.tsx  Projects.tsx
```

To change text, edit `src/data/content.ts`; everything else reads from it.

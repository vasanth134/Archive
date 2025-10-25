# Task Management Dashboard - Interview Project

A sophisticated React application built with Redux and Redux Saga for interviewing senior developers (5+ years experience).

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Read the requirements:**
   - Check `INTERVIEW_REQUIREMENTS.md` for detailed task description
   - Review `EVALUATION_RUBRIC.md` for scoring criteria

## Project Structure

```
src/
├── api/
│   └── mockApi.js           # Mock API with realistic delays
├── store/
│   ├── index.js             # Redux store configuration (TODO)
│   ├── actions/             # Action creators (TODO)
│   ├── reducers/            # Redux reducers (TODO)
│   ├── sagas/               # Redux sagas (TODO)
│   └── selectors/           # Reselect selectors (TODO)
├── components/
│   ├── TaskDashboard.jsx    # Main container (TODO)
│   ├── TaskForm.jsx         # Dynamic form with React Hook Form (TODO)
│   ├── TaskList.jsx         # Task list display (TODO)
│   ├── TaskCard.jsx         # Individual task card (TODO)
│   └── FilterBar.jsx        # Advanced filtering (TODO)
└── App.jsx                  # Root component with Redux Provider
```

## Interview Challenge

**Time Limit:** 30 minutes  
**Target:** Senior React Developer (5+ years)

### What You Need to Build

A task management dashboard featuring:

1. **Complex Redux Architecture**
   - Normalized state structure
   - Optimistic updates
   - Advanced saga patterns

2. **Dynamic Forms with React Hook Form**
   - Conditional fields based on task type
   - Field arrays for subtasks
   - Complex validation rules

3. **Advanced UX Features**
   - Real-time filtering and search
   - Loading states and error handling
   - Auto-save functionality

### Technical Requirements

- **Redux:** Traditional Redux (not RTK) with normalized state
- **Redux Saga:** Handle async operations, optimistic updates
- **React Hook Form:** Dynamic forms with validation
- **Performance:** Proper memoization and re-render optimization

### Mock API Available

The `mockApi` provides realistic endpoints with:
- Simulated network delays (300-1500ms)
- 10% random failure rate for testing error handling
- Complete CRUD operations for tasks
- User and project management

### Getting Started Tips

1. Start with Redux store setup in `src/store/index.js`
# Task Management Dashboard

Lightweight task management app built with React. This repository includes a mock API and example UI components used for an interview assignment.

## Quick start

Prerequisite: Node.js 20+ is recommended. If you use nvm, install and use Node 20:

```bash
# install nvm (if needed) and use node 20
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm install 20
nvm use 20

# then install deps and run dev server
npm install
npm run dev
```

The app will be available at http://localhost:5173/

## What's included

- `src/api/mockApi.js` - mock backend (CRUD, delays, failure simulation)
- `src/components` - TaskDashboard, TaskList, TaskCard, TaskForm, FilterBar
- `src/store` - skeleton Redux/Saga files (optional — current UI uses local state)

## Notes about this fork

- I implemented a working Create Task modal and wired the dashboard to `mockApi` so you can create, edit, and delete tasks without configuring Redux.
- Updated font to `Poppins` to match the UI mock.
- If you want Redux + Saga wired instead of local state, I can convert the current local handlers into actions/sagas.

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - build for production
- `npm run lint` - run linter

## Contact / Next steps

If you'd like additional polish (pixel-perfect styles), Redux Saga integration, or tests added, tell me which and I'll continue.

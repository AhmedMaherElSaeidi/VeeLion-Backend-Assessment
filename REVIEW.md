# Changes made

Review of the existing Tasks API and Activity Log API, I stated most of the issues in the **Modified Files** section.

## New files

- `REVIEW.md` — full code review (bugs, performance, maintainability, security, code quality).
- `src/modules/activity/utils/activityValidator.js` — validates `POST /activity` bodies.
- `src/modules/reports/routes/reports.routes.js` — `GET /reports/tasks-summary` route.
- `src/modules/reports/controllers/reports.controller.js` — parses optional `?hours=&minutes=&seconds=` query param, calls the service.
- `src/modules/reports/services/reports.service.js` — aggregates `data/tasks.json` + `data/activity.json` into `{ total, byStatus, recentActivityCount }`.
- `src/modules/reports/utils/reportsValidator.js` — validates query params `?hours=&minutes=&seconds=` passed to api.

## Modified Files

### New Feature

**`src/modules/activity/controllers/activity.controller.js`**

- Added `removeActivity` function to handle activity deletion

**`src/modules/activity/controllers/activity.service.js`**

- Added `deleteActivity` function to handle activity deletion

**`src/modules/activity/controllers/activity.routes.js`**

- Added `activityRouter.delete('/:id', asyncHandler(activityController.removeActivity));` function to handle activity deletion

### Maintability

**`src/modules/tasks/controllers/tasks.controller.js`**

- Removed inline validation.
- Used `taskValidator.js` (previously written but never imported) for both create and update.

**`src/modules/activity/controllers/activity.controller.js`**

- Renamed (`aSvc`, `c`, `x`, `b`, `one`, `get_activity`) to clean, consistent names (`activityService`, `getActivity`, `createNewActivity`).
- Added validation via the new `activityValidator.js`.

### Code Quality

**`src/modules/tasks/utils/taskValidator.js`**

- Added a 2-character minimum length check on `title` to ensure consistency.

### Bugs

**`src/modules/tasks/services/tasks.service.js`**

- Fixed mass-assignment bug in `updateTask` function used to spread the _entire_ request body onto the stored record, letting a client overwrite `id`/`createdAt` or inject arbitrary fields. Now only whitelisted fields [`title`, `completed`] are merged.
- Removed duplicate validation logic, as the controller handles it.

**`src/modules/activity/services/activity.service.js`**

- Switched ID generation from `Date.now()` as it's collision-prone to `createId()`, same as Tasks module.
- Removed two duplicate loader functions (`loadDataA`/`loadDataB`) in favor of one.

**`src/app.js`**

- Applied CORS globally to all routes, so that requests get accepted by the server through UI.

### Performance

**`src/modules/activity/services/activity.service.js`**

- Replaced synchronous `fs.readFileSync`/`writeFileSync` with the shared async `jsonStore.js` to stop blocking the event loop on every activity request.

**Note: Whole-file read/write on every operation**
Every read and write loads the _entire_ JSON array into memory and rewrites the whole file, even
for a single-record change. Given the constraint of "JSON files only,".

### Design

**Note: Reports `byStatus` vs. the current Task schema**
The assessment's expected response for `GET /reports/tasks-summary` groups tasks into
`todo` / `in-progress` / `done`, but the existing Task schema only stores a boolean `completed`
field, there's no way to distinguish "todo" from "in-progress" in current data. To Solve the Reports service
derives status per task: it uses an explicit `status` field if a task happens to carry one
(forward-compatible), otherwise falls back to `completed ? 'done' : 'todo'`. `in-progress`.

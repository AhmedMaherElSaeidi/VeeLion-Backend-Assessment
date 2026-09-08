# Changes made

## Modified Files

### Maintability

**`src/modules/tasks/controllers/tasks.controller.js`**

- Removed inline validation.
- Used `taskValidator.js` (previously written but never imported) for both create and update.

### Code Quality

**`src/modules/tasks/utils/taskValidator.js`**

- Added a 2-character minimum length check on `title` to ensure consistency.

**`src/modules/tasks/services/tasks.service.js`**

- Removed duplicate validation logic, as the controller handles it.

### Bugs

**`src/modules/tasks/services/tasks.service.js`**

- Fixed mass-assignment bug in `updateTask` function used to spread the _entire_ request body onto the stored record, letting a client overwrite `id`/`createdAt` or inject arbitrary fields. Now only whitelisted fields [`title`, `completed`] are merged.

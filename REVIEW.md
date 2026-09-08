# Changes made

## Modified Files

### Maintability

**`src/modules/tasks/controllers/tasks.controller.js`**

- Removed inline validation.
- Used `taskValidator.js` (previously written but never imported) for both create and update.

### Code Quality

**`src/modules/tasks/utils/taskValidator.js`**

- Added a 2-character minimum length check on `title` to ensure consistency.

# Google Sheets webhook for course events

The course system can post every registration, module quiz submission, and
final evaluation to a Google Sheet so you have a real spreadsheet for
analytics on top of (or instead of) the Web3Forms email pipeline.

**One-time setup, ~10 minutes.** No paid services. Free for normal portfolio
volumes.

---

## 1. Create the spreadsheet

1. Go to <https://sheets.google.com> → blank spreadsheet.
2. Rename it to e.g. **Course Events**.
3. Add three tabs (rename `Sheet1` and use the `+` button at the bottom):

   | Tab name | Header row (row 1) |
   |----------|--------------------|
   | `registrations` | `timestamp`, `language`, `courseSlug`, `courseTitleEn`, `name`, `email`, `university`, `major`, `level`, `agreed` |
   | `module_quizzes` | `timestamp`, `language`, `courseSlug`, `courseTitleEn`, `email`, `moduleId`, `moduleTitleEn`, `q1_question`, `q1_answer`, `q2_question`, `q2_answer`, `q3_question`, `q3_answer` |
   | `final_evaluations` | `timestamp`, `language`, `courseSlug`, `courseTitleEn`, `email`, `q1_question`, `q1_answer`, `q2_question`, `q2_answer`, `q3_question`, `q3_answer`, `q4_question`, `q4_answer` |

   Tab names must match exactly (lowercase, with underscores).

## 2. Add the Apps Script

1. From the spreadsheet: **Extensions → Apps Script**.
2. Delete any existing code in `Code.gs` and paste this:

   ```javascript
   function doPost(e) {
     try {
       const event = JSON.parse(e.postData.contents);
       const ss = SpreadsheetApp.getActive();
       const ts = event.timestamp || new Date().toISOString();
       const lang = event.language || '';

       if (event.type === 'registration') {
         ss.getSheetByName('registrations').appendRow([
           ts,
           lang,
           event.courseSlug,
           event.courseTitleEn,
           event.name || '',
           event.email || '',
           event.university || '',
           event.major || '',
           event.level || '',
           event.agreed ? 'yes' : 'no',
         ]);
       } else if (event.type === 'module_quiz') {
         const a = event.answers || [];
         ss.getSheetByName('module_quizzes').appendRow([
           ts,
           lang,
           event.courseSlug,
           event.courseTitleEn,
           event.email || '',
           event.moduleId || '',
           event.moduleTitleEn || '',
           a[0] && a[0].question || '',
           a[0] && a[0].answer || '',
           a[1] && a[1].question || '',
           a[1] && a[1].answer || '',
           a[2] && a[2].question || '',
           a[2] && a[2].answer || '',
         ]);
       } else if (event.type === 'final_evaluation') {
         const a = event.answers || [];
         ss.getSheetByName('final_evaluations').appendRow([
           ts,
           lang,
           event.courseSlug,
           event.courseTitleEn,
           event.email || '',
           a[0] && a[0].question || '',
           a[0] && a[0].answer || '',
           a[1] && a[1].question || '',
           a[1] && a[1].answer || '',
           a[2] && a[2].question || '',
           a[2] && a[2].answer || '',
           a[3] && a[3].question || '',
           a[3] && a[3].answer || '',
         ]);
       }

       return ContentService
         .createTextOutput(JSON.stringify({ ok: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService
         .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```

3. **File → Save**.

## 3. Deploy as a Web App

1. Top right: **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Settings:
   - **Description:** any name (e.g. "Course events v1")
   - **Execute as:** *Me*
   - **Who has access:** **Anyone** (this is what allows the portfolio to POST to it)
4. Click **Deploy**. You'll be asked to authorize — accept the Google permissions.
5. Copy the **Web app URL** (it ends with `/exec`).

## 4. Wire it into the portfolio

Add the URL to `.env.local` (create the file if it doesn't exist):

```
NEXT_PUBLIC_COURSES_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbx.../exec
```

Restart the dev server (`npm run dev`) or trigger a Vercel redeploy. From now
on every registration / quiz / final evaluation will append a row to the
sheet **in addition to** firing the Web3Forms email.

## 5. Verify

1. On the live site, open `/courses/drone-360`.
2. Fill the registration form with a fake test entry → submit.
3. Open the spreadsheet → the `registrations` tab should have a new row within
   a few seconds.

If rows aren't appearing:

- Open Apps Script → **Executions** (clock icon left side) → look at recent runs
  for errors.
- Verify the Web app URL is correct in `.env.local`.
- Confirm the deployment is set to **Anyone** under access.

## Updating the Apps Script later

If you change the `Code.gs` script later, you must **re-deploy** to a new version:

- **Deploy → Manage deployments → ✎ pencil icon → Version: New version → Deploy.**

The URL stays the same. (If you create a brand new deployment instead of updating
the existing one, the URL changes and you'll need to update `.env.local`.)

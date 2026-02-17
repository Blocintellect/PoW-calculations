# Please read before upload 

Worker Performance Dashboard – JSON Upload Guide

This repository is used to track weekly worker performance using JSON files.

Each worker has their own GitHub branch and is responsible for uploading one JSON file per week.
These files are later combined to calculate total performance, total pay, ownership share, and performance charts.

---

IMPORTANT RULES (PLEASE READ)

• Do NOT upload files to the `main` branch
• Upload files ONLY to your own branch
• Upload ONE JSON file per week
• Do NOT edit or delete any existing files
• The file must be valid JSON

Failure to follow these rules may result in incorrect calculations.

---

WHERE TO UPLOAD FILES

Upload your JSON file inside the following folder:

/data/

If the folder does not exist in your branch, create it.

---

JSON FILE FORMAT (MANDATORY)

Your JSON file must follow this exact structure:

{
"You": 2,
"Alex": 0,
"Joshua": 0,
"Eska": 0
}

Rules for the JSON file:

• Numbers represent weekly performance percentages
• Use numbers only (no text, symbols, or comments)
• Include all workers, even if the value is 0
• Do NOT add extra fields
• Worker names must be written exactly as shown

---

FILE NAMING RULE (MANDATORY)

Name your file using this format:

YYYY-WeekXX.json

Examples:

2025-Week01.json
2025-Week02.json
2025-Week03.json

This allows the dashboard to read files in the correct order.

---

HOW TO UPLOAD YOUR FILE (STEP-BY-STEP)

1. Open the GitHub repository
2. Switch to your own branch
3. Open the /data folder
4. Click “Add file” → “Upload files”
5. Upload your JSON file
6. Scroll down and click “Commit changes”

Commit message can be simple, for example:
“Add weekly performance”

Before committing, confirm:
• You are on the correct branch
• You are uploading only your JSON file

---

WHAT NOT TO DO

• Do NOT upload ZIP files
• Do NOT rename worker keys
• Do NOT upload multiple weeks in one file
• Do NOT upload to another worker’s branch
• Do NOT modify dashboard code

---

HOW YOUR DATA IS USED

All JSON files from all branches are combined.

Performance is summed over time for each worker.

Ownership share is calculated as:

Your total performance
divided by
Total team performance

This directly affects:
• Your total pay
• Your ownership share in the company

---

NEED HELP?

If you:
• Are unsure about the JSON format
• Uploaded a file incorrectly
• Encounter a GitHub error

Contact the project owner immediately.
Do not attempt to fix issues on your own.

---

SUMMARY

• One branch per worker
• One JSON file per week
• Simple, fixed format
• Transparent and fair system

This process ensures accurate performance tracking and fair ownership calculation for everyone.

---
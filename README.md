## Instruction for running the webApp:
  1. Clone the repo
  2. Navigate inside the folder in the terminal
  3. Run npm install to install all the required librabries and dependencies.
  4. Run npm run dev.
  5. View port 5173 for viewing the live webApp.

## Deployment Link : https://communication-calender.vercel.app/


## Application Functionality

  1. Admin Module:
    Allows admins to set up companies.
    Admins can configure communication parameters such as frequency and method.
    Admins have tools for managing data related to companies and communication tasks.
  
  2. User Module:
    Users can visualize, manage, and log communication tasks.
    Provides two views:
    Past Communications: Displays all completed communications sorted by date.
    Upcoming Communications: Lists all planned communications that are scheduled for future dates.
  
  3. Includes a Notification System:
    Overdue communications are flagged.
    Communications due today are highlighted.
    Users can log communication events through a dedicated form.
  
  4. Communication Logging:
    Supports logging communication for single or multiple companies at once.
    Includes fields for date, method, and optional notes.
    Automatically associates logged communications with the selected companies.
  
  5. Dark Mode Support:
    Enhanced user interface for dark mode compatibility.
    Ensures proper contrast and visibility of all form elements.
    Dynamic Filtering and Sorting:
  
  6. Filters communications based on time (past vs. upcoming).
    Sorts communications in descending order for past and ascending for upcoming tasks.

## Known Limitations:

  1. Notification Accuracy:
    The notification system relies on computed properties from data. If there are data inaccuracies (e.g., missing periodicity or incorrect communication logs), the notifications might not reflect the correct status.
  
  2. Limited Admin/User Separation:
    Current implementation does not differentiate between admin and user modes at the authentication level.
    Both admin and user functionalities are accessible within the same UI, separated by tabs or sections.
    Future implementations might require proper role-based access control.
  
  3. Limited Data Validation:
    Dependencies between communication methods, companies, and communications are not strictly enforced.
    Deleting a company or communication method could leave orphaned records.

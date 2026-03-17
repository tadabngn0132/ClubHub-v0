import React from "react";

const ActivitiesCalendarView = () => {
  return (
    <div>
      {/* Google Calendar Embed */}
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FHo_Chi_Minh&showPrint=0&title=GDC%20Calendar&hl=en&src=Z2RjLmZwdDIwMjJAZ21haWwuY29t&src=ZW4udmlldG5hbWVzZSNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=dmkudmlldG5hbWVzZSNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23039be5&color=%230b8043&color=%230b8043"
        style="border:solid 1px #777"
        width="800"
        height="600"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default ActivitiesCalendarView;

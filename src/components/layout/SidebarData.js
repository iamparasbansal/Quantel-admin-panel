import React from 'react';
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export const items = [

{ 
    name: "home", 
    label: "Home", 
    Icon: HomeIcon, 
    path: "/"
},
  "divider",
{
    name: "booking",
    label: "Bookings",
    Icon: ReceiptIcon,
    path:"/Bookings"
},
 "divider",
{
    name: "add booking",
    label: "Add Booking",
    Icon: AddCircleOutlineIcon,
    path:"/Bookings/add"
},
"divider",
{
    name: "consultant",
    label: "Consultant",
    Icon: PersonIcon,
    path:"/consultants"
},
"divider",
{
    name: "add consultant",
    label: "Add Consultant",
    Icon: PersonAddIcon,
    path:"/consultants/add"
},

  "divider",
  {
    name: "settings",
    label: "Settings",
    Icon: SettingsIcon,
    items: [
      { name: "profile", label: "Profile" },
      { name: "insurance", label: "Insurance"},
      "divider",
      {
        name: "notifications",
        label: "Notifications",
        Icon: NotificationsIcon,
        items: [
          { name: "email", label: "Email"},
          {
            name: "desktop",
            label: "Desktop",
            Icon: DesktopWindowsIcon,
            items: [
              { name: "schedule", label: "Schedule" },
              { name: "frequency", label: "Frequency" }
            ]
          },
          { name: "sms", label: "SMS" }
        ]
      }
    ]
  }
];
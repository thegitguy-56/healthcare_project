# Healthcare Analytics Platform - Developer Quick Reference

## 📁 Project Structure

```
healthcare-frontend/
├── src/
│   ├── pages/                    # Page components
│   │   ├── Dashboard.js          # Main dashboard with charts
│   │   ├── Patients.js           # Patient management table
│   │   ├── PatientProfile.js     # Patient detail view
│   │   ├── Analytics.js          # Advanced analytics
│   │   ├── Admin.js              # Admin panel
│   │   └── LoginPage.js          # Login screen
│   ├── components/               # Reusable components
│   │   ├── DashboardCards.js     # KPI cards
│   │   ├── PatientSearch.js      # Search component
│   │   ├── PatientList.js        # Patient list
│   │   ├── TreatmentHistory.js   # Treatment history
│   │   ├── TreatmentTimeline.js  # Timeline view
│   │   ├── DiseaseAnalytics.js   # Disease charts
│   │   └── AccessLogs.js         # Access logs
│   ├── layout/
│   │   └── DashboardLayout.js    # Main layout wrapper
│   ├── App.js                    # Root component
│   ├── theme.js                  # MUI theme config
│   ├── index.js                  # Entry point
│   ├── index.css                 # Global styles
│   └── theme.js                  # Theme configuration
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── package.json
├── DESIGN_SYSTEM.md              # Design documentation
└── README.md
```

---

## 🎨 Design Tokens

### CSS Variables (in `index.css`)

```css
--primary: #1976d2
--secondary: #00acc1
--bg-primary: #f5f7fb
--text-primary: #1a1a2e
--text-secondary: #4a5568
--success: #2e7d32
--warning: #f57c00
--danger: #c62828
```

### MUI Theme (in `theme.js`)

Access via: `theme.palette.primary.main`, `theme.palette.success.main`, etc.

---

## 🎯 Key Components

### DashboardCards
```jsx
<DashboardCards />
// Displays 4 KPI cards: Patients, Treatments, Doctors, Diagnoses
```

### Dashboard Charts
- Bar Chart: Disease frequency
- Line Chart: Monthly admissions
- Doughnut Chart: Treatment status

### PatientTable
- Searchable patient list
- Status badges
- Link to patient profile
- Pagination support

### TimelineComponent
- Visual treatment timeline
- Status indicators
- Date ranges
- Color coding

---

## 🔌 API Endpoints Used

```
POST /login                    # User authentication
GET  /dashboard/stats          # KPI statistics
GET  /dashboard/charts         # Dashboard chart data
GET  /patients                 # List all patients
GET  /patients/:id             # Get patient details
GET  /treatments/:id           # Get patient treatments
GET  /analytics                # Analytics data
GET  /admin/users              # User list
GET  /admin/access-logs        # Access logs
```

### Demo Data
If API calls fail, components use demo data automatically.

---

## 🎬 Adding a New Feature

### Example: Add a New Page

1. **Create page file** (`src/pages/NewPage.js`)
```jsx
import React from "react"
import { Box, Typography } from "@mui/material"

function NewPage() {
  return (
    <Box sx={{ pb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        New Feature
      </Typography>
      {/* Content here */}
    </Box>
  )
}
export default NewPage
```

2. **Add route** in `App.js`
```jsx
<Route path="/new-page" element={<NewPage />} />
```

3. **Add navigation item** in `DashboardLayout.js`
```jsx
{ path: "/new-page", label: "New Page", icon: <IconComponent /> }
```

---

## 📊 Working with Charts

### Using Chart.js with React

```jsx
import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ["Jan", "Feb", "Mar"],
  datasets: [
    {
      label: "Sales",
      data: [65, 75, 85],
      backgroundColor: "rgba(25, 118, 210, 0.8)",
    },
  ],
}

<Bar data={data} options={chartOptions} />
```

---

## 🎨 Common Styling Patterns

### Card with Hover Effect
```jsx
<Card
  sx={{
    borderRadius: "12px",
    border: "1px solid #e0e4e8",
    transition: "all var(--transition-base)",
    "&:hover": {
      boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)",
      transform: "translateY(-4px)",
    },
  }}
>
```

### Gradient Button
```jsx
<Button
  variant="contained"
  sx={{
    background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
    textTransform: "none",
    borderRadius: "8px",
    "&:hover": {
      boxShadow: "0 8px 24px rgba(25, 118, 210, 0.4)",
    },
  }}
>
```

### Status Badge
```jsx
<Chip
  label="Active"
  color="success"
  variant="outlined"
  sx={{ fontSize: "12px", fontWeight: 600 }}
/>
```

### Table Header Styling
```jsx
<TableHead sx={{ backgroundColor: "rgba(25, 118, 210, 0.05)" }}>
  <TableRow>
    <TableCell
      sx={{
        fontWeight: 600,
        color: "var(--text-primary)",
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
    >
```

---

## 🔐 Authentication

### Login Flow
1. User enters credentials
2. POST request to `/login`
3. Server returns `role` (admin, doctor, nurse)
4. Role stored in localStorage
5. Redirect to Dashboard

### Logout
```jsx
const handleLogout = () => {
  setRole(null)
  localStorage.removeItem("userRole")
}
```

---

## 📦 Dependencies

```json
{
  "@mui/material": "^7.3.9",
  "@mui/icons-material": "^7.3.9",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^7.13.1",
  "chart.js": "^4.5.1",
  "react-chartjs-2": "^5.3.1",
  "axios": "^1.x"
}
```

---

## 🚀 Performance Tips

1. **Memoization**: Use `React.memo()` for expensive components
2. **Lazy Loading**: Load pages with `React.lazy()` for code splitting
3. **Image Optimization**: Use Gravatar for avatars
4. **Chart Optimization**: Limit data points for large datasets
5. **Pagination**: Implement pagination for large tables

---

## 🐛 Common Issues & Solutions

### Chart Not Displaying
- Ensure Chart.js is registered: `ChartJS.register(...)`
- Check data format (labels and datasets)
- Verify height/width constraints

### Styling Not Applied
- Check CSS specificity
- Use `!important` only as last resort
- Verify class names match

### Navigation Not Working
- Ensure routes are defined in `App.js`
- Check component imports
- Verify Link paths match routes

### API Calls Failing
- Check backend is running
- Verify API endpoints match
- Check CORS settings
- Use mock data in fallback

---

## 📞 Component Props Reference

### DashboardCards
No props - uses API data

### DashboardLayout
```jsx
<DashboardLayout onLogout={handleLogout} userRole="admin">
```

### PatientProfile
Uses URL param: `/patient/:id`

### Admin
No props - fetches own data

---

## 🎓 Best Practices

1. **Always use semantic HTML**
2. **Include proper ARIA labels**
3. **Use MUI components for consistency**
4. **Follow the design system colors**
5. **Test responsive design**
6. **Use error boundaries**
7. **Handle loading states**
8. **Provide empty states**
9. **Use proper typography hierarchy**
10. **Optimize for performance**

---

## 📝 Code Style

- Use functional components with hooks
- Prefix event handlers with `handle`: `handleClick`
- Use descriptive variable names
- Comment complex logic
- Keep files under 300 lines
- Import components at top
- Export component as default

---

## 🔄 Git Workflow

```bash
git add .
git commit -m "feat: Add feature description"
git push origin main
```

Commit types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `perf`: Performance improvement

---

## 📚 Learn More

- [MUI Documentation](https://mui.com/)
- [React Documentation](https://react.dev/)
- [Chart.js Guide](https://www.chartjs.org/)
- [React Router Guide](https://reactrouter.com/)

---

**Last Updated**: March 2026  
**Version**: 1.0

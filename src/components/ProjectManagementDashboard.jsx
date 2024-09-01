import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../App.css";

// Helper functions

// Define gitlabBaseUrl here
const gitlabBaseUrl = "https://gitlab.com"; // Replace with your GitLab instance base URL

const getDateNDaysFromNow = (n) => {
  const date = new Date();
  date.setDate(date.getDate() + n);
  return date.toISOString().split("T")[0];
};

const getStartOfWeek = () => {
  const now = new Date();
  const firstDay = now.getDate() - now.getDay();
  const startOfWeek = new Date(now.setDate(firstDay));
  return startOfWeek.toISOString().split("T")[0];
};

const getEndOfWeek = () => {
  const now = new Date();
  const lastDay = now.getDate() - now.getDay() + 6;
  const endOfWeek = new Date(now.setDate(lastDay));
  return endOfWeek.toISOString().split("T")[0];
};

// Data definitions
const allProjects = [
  { id: 1, name: "PetCo Website", inProgress: 10, notStarted: 5 },
  { id: 2, name: "TruckMan Portal", inProgress: 5, notStarted: 2 },
  { id: 3, name: "College Website", inProgress: 5, notStarted: 20 },
  { id: 4, name: "Ecomm Enhancements", inProgress: 8, notStarted: 15 },
  { id: 5, name: "Charity Marketing Site", inProgress: 12, notStarted: 3 },
];

const teamData = [
  {
    id: 1,
    name: "Alice",
    username: "alice",
    issues: [
      {
        id: 101,
        projectId: 1,
        title: "Fix login bug",
        blocked: false,
        dueDate: getDateNDaysFromNow(2),
        timeEstimate: "2h",
      },
      {
        id: 102,
        projectId: 2,
        title: "Implement new feature",
        blocked: false,
        dueDate: getDateNDaysFromNow(7),
        timeEstimate: "9h",
      },
    ],
  },
  {
    id: 2,
    name: "Brad",
    username: "bodell",
    issues: [
      {
        id: 201,
        projectId: 3,
        title: "Implement Typsense",
        blocked: false,
        dueDate: getDateNDaysFromNow(7),
        timeEstimate: "4h",
      },
      {
        id: 202,
        projectId: 4,
        title: "Build search index page",
        blocked: false,
        dueDate: getDateNDaysFromNow(12),
        timeEstimate: "12h",
      },
      {
        id: 203,
        projectId: 1,
        title: "Build blog index page",
        blocked: true,
        dueDate: getDateNDaysFromNow(6),
        timeEstimate: "10h",
      },
      {
        id: 204,
        projectId: 1,
        title: "Build contact form",
        blocked: false,
        dueDate: getDateNDaysFromNow(9),
        timeEstimate: "2h",
      },
    ],
  },
  {
    id: 3,
    name: "Kristoph",
    username: "kriskris",
    issues: [
      {
        id: 301,
        projectId: 1,
        title: "Style mega menu",
        blocked: false,
        dueDate: getDateNDaysFromNow(8),
        timeEstimate: "3h",
      },
      {
        id: 302,
        projectId: 2,
        title: "Create Hubspot integration",
        blocked: false,
        dueDate: getDateNDaysFromNow(12),
        timeEstimate: "8h",
      },
      {
        id: 303,
        projectId: 5,
        title: "Update homepage design",
        blocked: true,
        dueDate: getDateNDaysFromNow(2),
        timeEstimate: "5h",
      },
      {
        id: 304,
        projectId: 5,
        title: "Fix footer links",
        blocked: false,
        dueDate: getDateNDaysFromNow(24),
        timeEstimate: "2h",
      },
    ],
  },
  {
    id: 4,
    name: "Diana",
    username: "dianad",
    issues: [
      {
        id: 401,
        projectId: 2,
        title: "Refactor login module",
        blocked: true,
        dueDate: getDateNDaysFromNow(1),
        timeEstimate: "6h",
      },
      {
        id: 402,
        projectId: 4,
        title: "Create user journey map",
        blocked: false,
        dueDate: getDateNDaysFromNow(9),
        timeEstimate: "10h",
      },
      {
        id: 403,
        projectId: 4,
        title: "Prototype new app for login",
        blocked: false,
        dueDate: getDateNDaysFromNow(3),
        timeEstimate: "6h",
      },
    ],
  },
  {
    id: 5,
    name: "Eve",
    username: "evee",
    issues: [
      {
        id: 501,
        projectId: 3,
        title: "Deploy to production",
        blocked: false,
        dueDate: getDateNDaysFromNow(26),
        timeEstimate: "4h",
      },
    ],
  },
  {
    id: 6,
    name: "Frank",
    username: "frankf",
    issues: [
      {
        id: 601,
        projectId: 5,
        title: "Fix CSS issues",
        blocked: false,
        dueDate: getDateNDaysFromNow(4),
        timeEstimate: "3h",
      },
      {
        id: 602,
        projectId: 4,
        title: "Setup CI/CD pipeline",
        blocked: false,
        dueDate: getDateNDaysFromNow(30),
        timeEstimate: "10h",
      },
      {
        id: 603,
        projectId: 3,
        title: "Investigate WYSIWYG",
        blocked: false,
        dueDate: getDateNDaysFromNow(5),
        timeEstimate: "5h",
      },
      {
        id: 604,
        projectId: 4,
        title: "Investigate DB errors",
        blocked: false,
        dueDate: getDateNDaysFromNow(8),
        timeEstimate: "4h",
      },
    ],
  },
  {
    id: 7,
    name: "Grace",
    username: "graceg",
    issues: [
      {
        id: 701,
        projectId: 1,
        title: "Improve performance",
        blocked: false,
        dueDate: getDateNDaysFromNow(6),
        timeEstimate: "5h",
      },
      {
        id: 702,
        projectId: 2,
        title: "Optimize database",
        blocked: false,
        dueDate: getDateNDaysFromNow(32),
        timeEstimate: "7h",
      },
    ],
  },
  {
    id: 8,
    name: "Heidi",
    username: "heidih",
    issues: [
      {
        id: 801,
        projectId: 3,
        title: "Fix API bugs",
        blocked: false,
        dueDate: getDateNDaysFromNow(14),
        timeEstimate: "4h",
      },
      {
        id: 802,
        projectId: 5,
        title: "Redesign landing page",
        blocked: false,
        dueDate: getDateNDaysFromNow(36),
        timeEstimate: "12h",
      },
    ],
  },
  {
    id: 9,
    name: "Ivan",
    username: "ivanv",
    issues: [
      {
        id: 901,
        projectId: 2,
        title: "Integrate third-party API",
        blocked: false,
        dueDate: getDateNDaysFromNow(7),
        timeEstimate: "6h",
      },
      {
        id: 902,
        projectId: 4,
        title: "Build analytics dashboard",
        blocked: true,
        dueDate: getDateNDaysFromNow(10),
        timeEstimate: "15h",
      },
      {
        id: 903,
        projectId: 4,
        title: "Fix LookerStudio connection",
        blocked: false,
        dueDate: getDateNDaysFromNow(20),
        timeEstimate: "5h",
      },
    ],
  },
];

// Components
const DateRangeSelector = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(getStartOfWeek());
  const [endDate, setEndDate] = useState(getEndOfWeek());

  const handleApply = () => {
    if (startDate && endDate) {
      onDateRangeChange(startDate, endDate);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="mr-2 p-2 border rounded"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="mr-2 p-2 border rounded"
      />
      <button
        onClick={handleApply}
        className="button bg-blue-500 hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded"
      >
        Apply Filter
      </button>
    </div>
  );
};

const ProjectSelectionModal = ({
  projects,
  selectedProjects,
  onSelect,
  onSelectAll,
  onClose,
}) => (
  <div className="modal-overlay fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
    <div className="modal bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h3 className="text-lg font-bold mb-4">Select Projects</h3>
      <div className="mb-4">
        <button
          className="button bg-blue-500 hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded mb-4"
          onClick={onSelectAll}
        >
          View All Projects
        </button>
      </div>
      <div className="overflow-y-auto max-h-60">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedProjects.includes(project.id)}
              onChange={() => onSelect(project.id)}
              className="mr-2"
            />
            <label>{project.name}</label>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const Settings = ({ gitlabSettings, setGitlabSettings }) => {
  const [apiKey, setApiKey] = useState(gitlabSettings.apiKey || "");
  const [orgName, setOrgName] = useState(gitlabSettings.orgName || "");

  const handleSave = () => {
    setGitlabSettings({ apiKey, orgName });
    alert("Settings Saved!");
  };

  return (
    <div className="settings-container p-4">
      <h2 className="text-2xl font-bold mb-4">GitLab Integration Settings</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          GitLab API Key:
        </label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Gitlab Organization or Username:
        </label>
        <input
          type="text"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <button
        onClick={handleSave}
        className="button bg-blue-500 hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded"
      >
        Save Settings
      </button>
    </div>
  );
};

// Main component
const ProjectManagementDashboard = () => {
  const [gitlabSettings, setGitlabSettings] = useState({
    apiKey: "",
    orgName: "",
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProjects, setSelectedProjects] = useState(
    allProjects.map((p) => p.id),
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const handleProjectSelection = (projectId) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId],
    );
  };

  const handleSelectAll = () => {
    setSelectedProjects(allProjects.map((p) => p.id));
  };

  const handleDateRangeChange = (start, end) => {
    setDateRange({ start, end });
  };

  const filterIssuesByDateRange = (issues) => {
    if (!dateRange.start || !dateRange.end) return issues;
    return issues.filter((issue) => {
      const dueDate = new Date(issue.dueDate);
      return (
        dueDate >= new Date(dateRange.start) &&
        dueDate <= new Date(dateRange.end)
      );
    });
  };

  const renderOverview = () => {
    const filteredProjects = allProjects.filter((p) =>
      selectedProjects.includes(p.id),
    );

    return (
      <div className="card bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-2">Project Status Overview</h2>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="button bg-blue-500 hover:bg-[var(--primary-color)] text-white font-bold py-2 px-4 rounded mb-4"
        >
          Select Projects
        </button>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={filteredProjects}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="inProgress"
                name="In Progress"
                stackId="a"
                fill="var(--primary-color)"
              />
              <Bar
                dataKey="notStarted"
                name="Not Started"
                stackId="a"
                fill="var(--secondary-color)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <p>
            This chart shows the total remaining work for each selected project,
            with a breakdown of in-progress and not-started tasks.
          </p>
        </div>
      </div>
    );
  };

  const getProjectNameById = (projectId) => {
    const project = allProjects.find((p) => p.id === projectId);
    return project ? project.name : "Unknown Project";
  };

  const renderTeamChart = (filteredTeamData) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">
        GitLab Issues Due per Team Member (Filtered)
      </h3>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={filteredTeamData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="filteredIssues"
              fill="var(--primary-color)"
              name="Issues Due"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderTeamMemberCard = (member, filteredIssues) => (
    <div
      key={member.id}
      className="card bg-white shadow-md rounded-lg p-6 mb-6"
    >
      <h4 className="text-xl font-semibold mb-4">
        {member.name} (@{member.username})
      </h4>
      <p className="mb-4">
        Issues Due in Selected Range: {filteredIssues.length}
      </p>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Issue</th>
            <th className="text-left p-2">Project</th>
            <th className="text-center p-2">Blocked</th>
            <th className="text-right p-2">Due Date</th>
            <th className="text-right p-2">Time Estimate</th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.map((issue) => (
            <tr key={issue.id} className="odd:bg-white even:bg-gray-50">
              <td className="p-2">
                <a
                  href={`${gitlabBaseUrl}/${issue.projectId}/-/issues/${issue.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    issue.blocked ? "text-red-600 font-bold" : "text-blue-500"
                  } hover:underline`}
                >
                  {issue.title}
                </a>
              </td>
              <td className="p-2">{getProjectNameById(issue.projectId)}</td>
              <td
                className={`text-center p-2 ${issue.blocked ? "text-red-600 font-bold" : ""}`}
              >
                {issue.blocked ? "⚠️ Yes" : "No"}
              </td>
              <td className="text-right p-2">{issue.dueDate}</td>
              <td className="text-right p-2">{issue.timeEstimate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTeam = () => {
    const filteredTeamData = teamData.map((member) => ({
      ...member,
      filteredIssues: filterIssuesByDateRange(member.issues).length,
    }));

    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Team Overview</h2>
        <DateRangeSelector onDateRangeChange={handleDateRangeChange} />
        {renderTeamChart(filteredTeamData)}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTeamData.map((member) =>
            renderTeamMemberCard(
              member,
              filterIssuesByDateRange(member.issues),
            ),
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">Project Management Dashboard</h1>

      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 tab ${
            activeTab === "overview" ? "active" : ""
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`mr-2 px-4 py-2 tab ${
            activeTab === "team" ? "active" : ""
          }`}
          onClick={() => setActiveTab("team")}
        >
          Team
        </button>
        <button
          className={`mr-2 px-4 py-2 tab ${
            activeTab === "settings" ? "active" : ""
          }`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      {activeTab === "overview" && renderOverview()}
      {activeTab === "team" && renderTeam()}
      {activeTab === "settings" && (
        <Settings
          gitlabSettings={gitlabSettings}
          setGitlabSettings={setGitlabSettings}
        />
      )}

      {isPopupOpen && (
        <ProjectSelectionModal
          projects={allProjects}
          selectedProjects={selectedProjects}
          onSelect={handleProjectSelection}
          onSelectAll={handleSelectAll}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectManagementDashboard;
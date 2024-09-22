/* src/components/ActivityTable.js */
import React from "react";
import "../css/ActivityTable.css";

const ActivityTable = ({ activities }) => {
  return (
    <div className="activity-table">
      <h2>Recent Activity</h2>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.description}</td>
              <td>{activity.date}</td>
              <td>{activity.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;

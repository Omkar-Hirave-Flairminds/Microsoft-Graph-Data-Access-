const { excelDateToJSDate } = require('../utils/dateConverter.js');

const getStrdData = (inputArray) => {
  const columnNamesToSelect = [
    'Activity / task',
    'Primary \nOwner',
    'Active task update dt',
    'Added on dt',
    'Planned effort (hours)',
    'Efforts\n(hours)',
    'Start dt.',
    'Status',
    'Dependency \nowner',
    'Due date',
    'Start dt. \n(Actual )',
    'End dt. \n(Actual )',
    'End dt. \n(Month )',
    'Status update - for daily customer report (to be filled in first thing in the morning before customer report)',
    'Status',
    'Dependency / blocker / status description or update'
  ];

  const headerRow = inputArray[0];
  const selectedColumnsIndices = columnNamesToSelect.map((columnName) => headerRow.indexOf(columnName));

  const resultsArr = inputArray.map((task) =>
    selectedColumnsIndices.map((index) => {
      const value = task[index];
      return typeof value === "number" && value >= 10000 && value <= 99999
        ? excelDateToJSDate(value)
        : value;
    })
  );
  return resultsArr;
};


const getWeeklyData = async (inputArray) => {
  const columnsToSelect = [
    'Primary \nOwner',
    'Planned effort (hours)',
    'Efforts\n(hours)'
  ];
  const headerRow = inputArray[0]; 
  const selectedColumnsIndices = columnsToSelect.map((columnName) => headerRow.indexOf(columnName));

  const resultsArr = inputArray.map((task) =>
      selectedColumnsIndices.map((index) => (task[index] === 0 ? 0 : task[index]))
  );

  const dataRows = resultsArr.slice(1);

  const sums = {};
  let totalEfforts = 0;

  dataRows.forEach((row) => {
      const owner = row[0];
      const plannedEffort = row[1];
      const completedHours = row[2];

      if (!sums[owner]) {
          sums[owner] = { completed: 0, open: 0 };
      }

      sums[owner].completed += completedHours;
      sums[owner].open += plannedEffort - completedHours;
      totalEfforts += completedHours;
  });

  const weeklyReportTableData = Object.keys(sums).map((owner) => ({
      owner,
      completed_hours: Number(sums[owner].completed),
      open_hours: sums[owner].open,
  }));

  const totalCompletedHours = weeklyReportTableData.reduce(
      (total, entry) => total + entry.completed_hours,
      0
  );
  const totalOpenHours = weeklyReportTableData.reduce(
      (total, entry) => total + entry.open_hours,
      0
  );

  return {
      project_name: "BMPD",
      date: "16/01/2024",
      total_efforts: totalEfforts,
      weekly_report_table_data: weeklyReportTableData,
      total_completed_hours: totalCompletedHours,
      total_open_hours: totalOpenHours,
  };
};
const getDailyData = async (inputArray) => {
    const columnsToSelect = [
        'Activity / task',
        'Primary \nOwner',
        'Status',
        'Due date',
        'End dt. \n(Actual )',
        'Dependency \nowner',
        `Status update - for daily customer report (to be filled in first thing in the morning before customer report)`,
        'Dependency / blocker / status description or update',
        'Added on dt',
    ];

    const headerRow = inputArray[0];
    const selectedColumnsIndices = columnsToSelect.map((columnName) => headerRow.indexOf(columnName)); 
    const date = inputArray[1][2]; 
    const currentDate = new Date().toISOString().split('T')[0];
    const todaysTasksData = inputArray.slice(1).map((task) => ({
        tasks: task[0],
        owner: task[1],
        due_date: task[6],
        actual_end_date: task[9],
        status: task[7],
        todayDate: task[3]
    }));
    const todayTasks = todaysTasksData.filter(task => task.todayDate === '2023-11-1');
    const backlogTasksData = inputArray.slice(1).map((task) => ({
        tasks: task[0],
        owner: task[1],
        due_date: task[6],
        status: task[7],
        statusUpdate: task[13]
    }));
    const backlogTasks = backlogTasksData.filter(task => task.due_date < '4/11/2023');
    const dependencyBlockerData = inputArray.slice(1).map((task) => {
        const dependencyOwner = task[8];
        if (dependencyOwner) {
            return {
                tasks: task[0],
                owner: task[1],
                due_date: task[6],
                status: task[7],
                statusUpdate: task[13],
                dependency_owner: dependencyOwner
            };
        }
        return null; 
    }).filter(Boolean);
    console.log("the results are---> ", dependencyBlockerData);
    return {
        project_name: 'BMPD',
        date: '16/01/2024',
        todays_tasks_data : todayTasks, 
        backlog_data : backlogTasks,
        blockers_data : dependencyBlockerData
    }
}

module.exports = { getWeeklyData, getStrdData , getDailyData } 
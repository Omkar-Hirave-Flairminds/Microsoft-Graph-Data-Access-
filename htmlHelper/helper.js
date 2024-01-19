const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const weeklyTemplateData = {
    project_name: 'BMPD',
    date: '16/01/2024',
    total_efforts: '434.58813488143224',
    weekly_report_table_data: [
      {
        owner: 'Punit Suman',
        completed_hours: '254.513414322',
        open_hours: 13
      },
      { owner: 'Omkar Hirave', completed_hours: 214, open_hours: 14 },
      { owner: 'Kunal Danole', completed_hours: 2, open_hours: 0 }
    ],
    total_completed_hours: '0254.5134143222142',
    total_open_hours: 27
}
const dailyTemplateData = {
    project_name: 'BMPD',
    date: '16/01/2024',
    todays_tasks_data: [
     {tasks: 'Task Description', owner: 'Ajay', due_date: '16/01/2024', actual_end_date: '17/01/2024', status: 'Completed'},
     {tasks: 'Task Description', owner: 'Rohan', due_date: '16/01/2024', actual_end_date: '17/01/2024', status: 'Completed'},
     {tasks: 'Task Description', owner: 'Jay', due_date: '16/01/2024', actual_end_date: '17/01/2024', status: 'Completed'},
     {tasks: 'Task Description', owner: 'Arjun', due_date: '16/01/2024', actual_end_date: '17/01/2024', status: 'Completed'},
     {tasks: 'Task Description', owner: 'Rakesh', due_date: '16/01/2024', actual_end_date: '17/01/2024', status: 'Completed'},
    ],
    backlog_data: [
     {tasks: 'Task Description', owner: 'Ajay', due_date: '16/01/2024', status: 'Completed', status_update: 'Status Update Text'},
     {tasks: 'Task Description', owner: 'Rohan', due_date: '16/01/2024', status: 'Completed', status_update: 'Status Update Text'},
     {tasks: 'Task Description', owner: 'Jay', due_date: '16/01/2024', status: 'Completed', status_update: 'Status Update Text'},
     {tasks: 'Task Description', owner: 'Arjun', due_date: '16/01/2024', status: 'Completed', status_update: 'Status Update Text'},
     {tasks: 'Task Description', owner: 'Rakesh', due_date: '16/01/2024', status: 'Completed', status_update: 'Status Update Text'},
    ],
    blockers_data: [
     {tasks: 'Task Description', owner: 'Ajay', due_date: '16/01/2024', status: 'Completed', dependency: 'Dependency Text', dependency_owner: 'Owner Name', status_update: 'Status Update Text'},
     {tasks: 'Task Description', owner: 'Rohan', due_date: '16/01/2024', status: 'Completed', dependency: 'Dependency Text', dependency_owner: 'Owner Name', status_update: 'Status Update Text'},
     {tasks: 'Task Description', owner: 'Jay', due_date: '16/01/2024', status: 'Completed', dependency: 'Dependency Text', dependency_owner: 'Owner Name', status_update: 'Status Update Text'},
     {tasks: 'Task Description', owner: 'Arjun', due_date: '16/01/2024', status: 'Completed', dependency: 'Dependency Text', dependency_owner: 'Owner Name', status_update: 'Status Update Text'},
     {tasks: 'Task Description', owner: 'Rakesh', due_date: '16/01/2024', status: 'Completed', dependency: 'Dependency Text', dependency_owner: 'Owner Name', status_update: 'Status Update Text'},
    ]
}

const getEmailData = (templateData, reportType) => {
    handlebars.registerHelper('even', index => index % 2 === 0);
    const templateType = (reportType === 'daily') ? 'daily_report.hbs' : 'weekly_report.hbs';
    try {
        const emailTemplatePath = path.join(__dirname, templateType);
        const emailTemplateSource = fs.readFileSync(emailTemplatePath, 'utf-8');
        const emailTemplate = handlebars.compile(emailTemplateSource);
        const personalizedTemplate = emailTemplate(templateData);

        const emailSubject = `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Tasks Report for ${templateType} project`;

        return {
            emailSubject: emailSubject,
            emailHtml: personalizedTemplate,
        };
    } catch (error) {
        console.error(`Error reading or compiling template: ${error.message}`);
        return null;
    }
};

module.exports = { getEmailData };



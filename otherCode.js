const readline = require('readline-sync');
const config = require('./config.js');
const graphHelper = require('./graphHelper');

async function main() {
  console.log('JavaScript Graph Tutorial');
  let choice = 0;

  initializeGraph(settings);

  await greetUserAsync();

  const choices = [
    'Display access token',
    'List my inbox',
    'Send mail',
    'Make a Graph call'
  ];

  while (choice != -1) {
    choice = readline.keyInSelect(choices, 'Select an option', { cancel: 'Exit' });

    switch (choice) {
      case -1:
        console.log('Goodbye...');
        break;
      case 0:
        await displayAccessTokenAsync();
        break;
      case 1:
        await listInboxAsync();
        break;
      case 2:
        await sendMailAsync();
        break;
      case 3:
        await makeGraphCallAsync();
        break;
      default:
        console.log('Invalid choice! Please try again.');
    }
  }
}

main();

function initializeGraph(settings) {
  graphHelper.initializeGraphForUserAuth(settings, (info) => {
    console.log(info.message);
  });
}

async function greetUserAsync() {
  try {
    const user = await graphHelper.getUserAsync();
    console.log(`Hello, ${user?.displayName}!`);
    console.log(`Email: ${user?.mail ?? user?.userPrincipalName ?? ''}`);
  } catch (err) {
    console.log(`Error getting user: ${err}`);
  }
}

async function displayAccessTokenAsync() {
  try {
    const userToken = await graphHelper.getUserTokenAsync();
    console.log(`User token: ${userToken}`);
  } catch (err) {
    console.log(`Error getting user access token: ${err}`);
  }
}

async function listInboxAsync() {
  try {
    const messagePage = await graphHelper.getInboxAsync();
    const messages = messagePage.value;

    for (const message of messages) {
      console.log(`Message: ${message.subject ?? 'NO SUBJECT'}`);
      console.log(`  From: ${message.from?.emailAddress?.name ?? 'UNKNOWN'}`);
      console.log(`  Status: ${message.isRead ? 'Read' : 'Unread'}`);
      console.log(`  Received: ${message.receivedDateTime}`);
    }

    const moreAvailable = messagePage['@odata.nextLink'] != undefined;
    console.log(`\nMore messages available? ${moreAvailable}`);
  } catch (err) {
    console.log(`Error getting user's inbox: ${err}`);
  }
}

async function sendMailAsync() {
  try {
    const user = await graphHelper.getUserAsync();
    const userEmail = user?.mail ?? user?.userPrincipalName;

    if (!userEmail) {
      console.log('Couldn\'t get your email address, canceling...');
      return;
    }

    await graphHelper.sendMailAsync('Testing Microsoft Graph', 'Hello world!', userEmail);
    console.log('Mail sent.');
  } catch (err) {
    console.log(`Error sending mail: ${err}`);
  }
}

async function makeGraphCallAsync() {
  try {
    await graphHelper.makeGraphCallAsync();
  } catch (err) {
    console.log(`Error making Graph call: ${err}`);
  }
}


 // const htmlContent = generateEmailBody(body);
      // const attachment = saveSheet(htmlContent);
      // console.log("The attachment is---> ",attachment);
      // console.log("The HTML content is ---> ",)

      async function sendMailAsync(subject, body, recipient, authSettings) {
        try { 
            if (!authSettings._userClient) {
              throw new Error('Graph has not been initialized for user auth');
            }
            // const htmlContent = generateEmailBody(body);
            // const attachment = saveSheet(htmlContent);
            // console.log("The attachment is---> ",attachment);
            // console.log("The HTML content is ---> ",)
            const sourceUrl = path.join('C:/Users/sunil/Desktop/MS Access/Microsoft-Graph-Data-Access', 'WakaTech.csv');
            const csvContent = await fs.readFile(sourceUrl, 'utf-8');
            const csvContentBytes = Buffer.from(csvContent).toString('base64');
            const message = {
              subject: subject,
              body: {
                content: "Hi",
                contentType: 'html'
              },
              attachments: [{
                '@odata.type': '#microsoft.graph.fileAttachment',
                name: 'WakaTech.csv',
                sourceUrl: sourceUrl, 
                contentBytes: csvContentBytes,
              } ],
              toRecipients: [
                {
                  emailAddress: {
                    address: recipient
                  }
                }
              ]
            };
            return await authSettings._userClient.api('/me/sendMail')
              .post({
                message: message
              });
        } catch (error) {
          console.log(error);
        }
      }

// index.js file 
const express = require('express');
const {getWeeklyData} = require('./service/getWeeklyTemplate.js')
const settings = require('./appSettings.js');
const { makeGraphCallAsync } = require('./sheets.js');
const { initializeGraphForUserAuth } = require('./graphAuth.js');
const { automateVerification } = require('./automateSignin.js');
const { sendMailAsync } = require('./mail.js');

const app = express();
app.get('/', async (req, res) => {
  try {
    const results = await getWeeklyData();
    const email = await sendMailAsync(results.emailSubject, results.emailHtml, '', )
    console.log("The results are---> ",results);
    return res.status(200).json(results);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const port = process.env.PORT || 9091;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// This is changes made by Punit Sir
// const processWeeklyReport = async(project) => {
//   const results = await makeGraphCallAsync(authSettings);
//   const csvData = await getWeeklyReportCSV()
//   const emailData = await getEmailData()
//   // send mail -> csvData, emailData
// }

// const getWeeklyReportCSV = () => {

// }

// const generateWeeklyReport = () => {
//   const projects = ['Wakatech']
//   projects.forEach(() => {
//     processWeeklyReport(project)
//   })
// }

// scheduler -> 7pm on Fri
// generateWeeklyReport()

main();

// helper.js file 
// const getDailyData = async(inputArray) =>{
//   const selectedColumnsIndices = [0, 1, 7,9]; 
//     const date = inputArray[1][2]; 
//     const todaysTasksData = inputArray.slice(1).map((task) => ({
//       tasks: task[0],
//       owner: task[1],
//       due_date: task[6],
//       actual_end_date: task[9],
//       status: task[7],
//     }));
  
//     const backlogData = inputArray.slice(1).map((task) => ({
//       tasks: task[0],
//       owner: task[1],
//       due_date: task[7],
//       status: task[6],
//       status_update: 'Status Update Text', 
//     }));
  
//     const blockersData = inputArray.slice(1).map((task) => ({
//       tasks: task[0],
//       owner: task[1],
//       due_date: task[6],
//       status: task[7],
//       dependency: 'Dependency Text', 
//       dependency_owner: 'Owner Name', 
//       status_update: 'Status Update Text', 
//     }));
  
//     const dailyTemplateData = {
//       project_name: 'BMPD',
//       date: date,
//       todays_tasks_data: todaysTasksData,
//       backlog_data: backlogData,
//       blockers_data: blockersData,
//     };
  
//     return dailyTemplateData;
//   };

// The weekly template data is 
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

// Punit Sir made this changes in index.js file

// const processWeeklyReport = async(project) => {
//   const results = await makeGraphCallAsync(authSettings);
//   const csvData = await getWeeklyReportCSV()
//   const emailData = await getEmailData()
//   // send mail -> csvData, emailData
// }

// const getWeeklyReportCSV = () => {

// }

// const generateWeeklyReport = () => {
//   const projects = ['Wakatech']
//   projects.forEach(() => {
//     processWeeklyReport(project)
//   })
// }

// scheduler -> 7pm on Fri
// generateWeeklyReport()




// This is index.js file
const { initializeGraphForUserAuth } = require('./graphAuth.js');
const { automateVerification } = require('./automateSignin.js');
const { settings } = require('./appSettings.js');
const { getWeeklyData, getDailyData, getStrdData} = require('./service/dataFormat.js')
const { getEmailData } = require('./htmlHelper/helper.js');
const {sendMailAsync} = require('./mailService/mail.js');
const { saveSheet } = require('./service/saveSheet.js');
const { wakatech } = require('./config/index.js') 
async function getUser() {
    const authSettings = await initializeGraphForUserAuth(settings, (info) => {
        automateVerification(info);
        console.log("Authenticated successfully to MS SharePoint");
    });
    return authSettings;
}

async function makeGraphCallAsync(authSettings) {
    try {
        const graphResults = await authSettings._userClient.api(`https://graph.microsoft.com/v1.0/sites/flairmindssoftwarepvtltd623.sharepoint.com/drives/b!KB42YsZcDk2UBdG4WeB2bVyG8uzAoDBInJfIeLJO78VJMz8M3j-yRJHdFGFGmuWc/items/${wakatech}/workbook/worksheets('Work Plan')/range(address='a2:z17')?$select=values`).get()
        const results = graphResults.values;
        const strdData = getStrdData(results);
        saveSheet(strdData);
        return strdData;
    } catch (err) {
        console.log(`Error making Graph call: ${err}`);
    }
}




async function main() {
  try {
        const authSettings = await getUser();
        const results = await makeGraphCallAsync(authSettings);

        const weekly_report = await getWeeklyData(results);
        const daily_report = await getDailyData(results);

        const emailData = getEmailData(daily_report, 'daily')
        const sendMail = await sendMailAsync(emailData.emailSubject, emailData.emailHtml ,["omkar.hirave@flairminds.com","omkarhirve05@gmail.com","omkarhirave005@gmail.com"],authSettings);
        console.log("The mail is sent ",sendMail);
    } catch (error) {
        console.error("Error:", error);
    }
}
main();


const express = require('express');
const bodyParser = require('body-parser');
const { initializeGraphForUserAuth } = require('./graphAuth.js');
const { automateVerification } = require('./automateSignin.js');
const { settings } = require('./appSettings.js');
const { getWeeklyData, getDailyData, getStrdData } = require('./service/dataFormat.js');
const { getEmailData } = require('./htmlHelper/helper.js');
const { sendMailAsync } = require('./mailService/mail.js');
const { saveSheet } = require('./service/saveSheet.js');
const { wakatech } = require('./config/index.js');

const app = express();
const port = 3000; // or any other port you prefer

app.use(bodyParser.json());

async function getUser() {
  const authSettings = await initializeGraphForUserAuth(settings, (info) => {
    automateVerification(info);
    console.log("Authenticated successfully to MS SharePoint");
  });
  return authSettings;
}

async function makeGraphCallAsync(authSettings) {
  try {
    const graphResults = await authSettings._userClient.api(`https://graph.microsoft.com/v1.0/sites/flairmindssoftwarepvtltd623.sharepoint.com/drives/b!KB42YsZcDk2UBdG4WeB2bVyG8uzAoDBInJfIeLJO78VJMz8M3j-yRJHdFGFGmuWc/items/${wakatech}/workbook/worksheets('Work Plan')/range(address='a2:z17')?$select=values`).get()
    const results = graphResults.values;
    const strdData = getStrdData(results);
    saveSheet(strdData);
    return strdData;
  } catch (err) {
    console.log(`Error making Graph call: ${err}`);
  }
}

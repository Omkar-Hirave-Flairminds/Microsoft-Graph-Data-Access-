const express = require('express');
const { initializeGraphForUserAuth } = require('./graphAuth.js');
const { automateVerification } = require('./automateSignin.js');
const { settings } = require('./appSettings.js');
const { getWeeklyData, getDailyData, getStrdData } = require('./service/dataFormat.js');
const { getEmailData } = require('./htmlHelper/helper.js');
const { sendMailAsync } = require('./mailService/mail.js');
const { saveSheet } = require('./service/saveSheet.js');
const { wakatech } = require('./config/index.js');

const app = express();
const port = 9091;


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

app.get('/getData', async (req, res) => {
  try {
    const authSettings = await getUser();
    const results = await makeGraphCallAsync(authSettings);

    const weekly_report = await getWeeklyData(results);
    const daily_report = await getDailyData(results);

    const emailData = getEmailData(daily_report, 'daily');
    const sendMail = await sendMailAsync(emailData.emailSubject, emailData.emailHtml, ["omkar.hirave@flairminds.com", "omkarhirve05@gmail.com", "omkarhirave005@gmail.com"], authSettings);

    console.log("The mail is sent ", sendMail);
    res.json({ success: true, message: 'Data fetched and processed successfully.' });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

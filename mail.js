const { saveSheet } = require('./service/saveSheet.js');
const {authSettings} = 
const fs = require('fs').promises;
const path = require('path');
async function getInboxAsync() {
  if (!_userClient) {
    throw new Error('Graph has not been initialized for user auth');
  }

  return _userClient.api('/me/mailFolders/inbox/messages')
    .select(['from', 'isRead', 'receivedDateTime', 'subject'])
    .top(25)
    .orderby('receivedDateTime DESC')
    .get();
}
async function sendMailAsync(subject, body, recipient, authSettings) {
  try {
      const savedData = saveSheet(body);
      if (!authSettings._userClient) {
        throw new Error('Graph has not been initialized for user auth');
      }
      const filePath = 'C:/Users/sunil/Desktop/MS Access/Microsoft-Graph-Data-Access-/WakaTech.csv';
      const csvContent = await fs.readFile(filePath, 'utf-8');
      const message = {
        subject: subject,
        body: {
          content: "<h1>Weekly status update</h1>",
          contentType: 'html'
        },
        toRecipients: [
          {
            emailAddress: {
              address: recipient
            }
          }
        ],attachments: [{
          '@odata.type': '#microsoft.graph.fileAttachment',
          name: 'WakaTech.csv',
          sourceUrl: savedData, 
          contentBytes: Buffer.from(csvContent).toString('base64'),
        } ],
      };
      return await authSettings._userClient.api('/me/sendMail')
        .post({
          message: message
        });
  } catch (error) {
    console.log(error);
  }
}
module.exports = { getInboxAsync, sendMailAsync }
// const util = require('util');
const fs = require('fs/promises'); 
const path = require('path');
const {saveSheet} = require('../service/saveSheet.js');

async function sendMailAsync(_subject, _body, recipients, authSettings, attachment = false) {
    try {
        if (!authSettings._userClient) {
            throw new Error('Graph has not been initialized for user auth');
        }
        const toRecipients = recipients.map(recipient => ({
            emailAddress: {
                address: recipient
            }
        }));
        const message = {
            subject: _subject,
            body: {
                content: _body,
                contentType: 'html'
            },
            toRecipients: toRecipients,
        };

        if (attachment) {
            const filePath = path.join(__dirname, '..', 'WakaTech.csv');
            const csvContent = await fs.readFile(filePath, 'utf-8');

            message.attachments = [{
                '@odata.type': '#microsoft.graph.fileAttachment',
                name: 'WakaTech.csv',
                contentBytes: Buffer.from(csvContent).toString('base64'),
            }];
        }

        return await authSettings._userClient.api('/me/sendMail')
            .post({
                message: message
            });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { sendMailAsync }



    

const {excelDateToJSDate} = require('../utils/dateConverter.js');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
// const taskArray = [
//   [
//     'Activity / task',
//     'Primary \nOwner',
//     'Support (name)',
//     'Focussed?',
//     'Priority',
//     'Status',
//     'Dependency \nowner',
//     'Dependency / blocker / status description or update',
//     'Active task update dt',
//     'Status update - for daily customer report (to be filled in first thing in the morning before customer report)',
//     'Added by',
//     'Added on dt',
//     'Effort (various)',
//     'Planned effort (hours)',
//     'Start dt.',
//     'Due date',
//     'Due dt.\n(Month)',
//     'Efforts (various)',
//     'Efforts\n(hours)',
//     'Start dt. \n(Actual )',
//     'End dt. \n(Actual )',
//     'End dt. \n(Month )',
//     'Task Type',
//     'Project / Internal',
//     'Efforts-post check\n(hours)',
//     'SLA\ncompliance'
//   ],
//   [
//     'Carrier booking issue fixes in edit carrier booking - for multiple containers not able to save dates properly',
//     'Punit Suman',
//     'Punit Suman',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Punit Suman',
//     45261,
//     '',
//     3,
//     45261,
//     45261,
//     12,
//     '',
//     3,
//     45261,
//     45261,
//     12,
//     'Task discussion',
//     'Customer',
//     '',
//     0
//   ],
//   [
//     'Carrier booking other issue checks and fixes',
//     'Punit Suman',
//     'Punit Suman',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Punit Suman',
//     45261,
//     '',
//     2,
//     45261,
//     45261,
//     12,
//     '',
//     2,
//     45261,
//     45261,
//     12,
//     'Task discussion',
//     'Customer',
//     '',
//     0
//   ],
//   [
//     'Code understanding - knowing the intricacies in carrierBookingModel model - understood getCbrHistory , getFFCarrierAllocation , getCBStatus etc functions',
//     'Omkar Hirave',
//     'Omkar Hirave',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Omkar Hirave',
//     45261,
//     '',
//     8,
//     45261,
//     45261,
//     12,
//     '',
//     8,
//     45261,
//     45261,
//     12,
//     'Task discussion',
//     'Internal',
//     '',
//     0
//   ],
//   [
//     'Daily standup meetings',
//     'Kunal Danole',
//     'Kunal Danole',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Kunal Danole',
//     45261,
//     '',
//     1,
//     45261,
//     45261,
//     12,
//     '',
//     1,
//     45261,
//     45261,
//     12,
//     'Task discussion',
//     'Internal',
//     '',
//     0
//   ],
//   [
//     'Daily standup meetings',
//     'Punit Suman',
//     'Punit Suman',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Punit Suman',
//     45261,
//     '',
//     1,
//     45261,
//     45261,
//     12,
//     '',
//     1,
//     45261,
//     45261,
//     12,
//     'Task discussion',
//     'Customer',
//     '',
//     0
//   ],
//   [
//     'Discussion with Dhanesh on container details coming from inttra',
//     'Punit Suman',
//     'Punit Suman',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Punit Suman',
//     45261,
//     '',
//     1,
//     45261,
//     45261,
//     12,
//     '',
//     1,
//     45261,
//     45261,
//     12,
//     'Task discussion',
//     'Customer',
//     '',
//     0
//   ],
//   [
//     'Setting up basic structure for Bomisco',
//     'Kunal Danole',
//     'Kunal Danole',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Kunal Danole',
//     45261,
//     '',
//     1,
//     45261,
//     45261,
//     12,
//     '',
//     1,
//     45261,
//     45261,
//     12,
//     'Task / Request',
//     'Internal',
//     '',
//     0
//   ],
//   [
//     'Check the carrier booking issues in qam monitor',
//     'Punit Suman',
//     'Punit Suman',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Punit Suman',
//     45264,
//     '',
//     1,
//     45264,
//     45264,
//     12,
//     '',
//     1,
//     45264,
//     45264,
//     12,
//     'Task discussion',
//     'Customer',
//     '',
//     0
//   ],
//   [
//     'Code Understanding - Shipping concepts such as voyage , cbr_haulage , difference between carrier_booking_request and vessel_voyage , getSavedCargoMapping API and generateManifest API , other tables such as shipment_consolidation , carrier_booking_request , shipment_consolidation_details , shipment_booking , carrier_booking_responses',
//     'Omkar Hirave',
//     'Omkar Hirave',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Omkar Hirave',
//     45264,
//     '',
//     8,
//     45264,
//     45264,
//     12,
//     '',
//     8,
//     45264,
//     45264,
//     12,
//     'Task discussion',
//     'Internal',
//     '',
//     0
//   ],
//   [
//     'Daily standup meetings',
//     'Punit Suman',
//     'Punit Suman',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Punit Suman',
//     45264,
//     '',
//     0.5,
//     45264,
//     45264,
//     12,
//     '',
//     0.5,
//     45264,
//     45264,
//     12,
//     'Task discussion',
//     'Customer',
//     '',
//     0
//   ],
//   [
//     'Make changes in getting carrier booking details api for pagination',
//     'Punit Suman',
//     'Punit Suman',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Punit Suman',
//     45264,
//     '',
//     0.5,
//     45264,
//     45264,
//     12,
//     '',
//     0.5,
//     45264,
//     45264,
//     12,
//     'Task discussion',
//     'Customer',
//     '',
//     0
//   ],
//   [
//     'Make changes in getting shipment consolidation api for carrier booking for filtering and pagination',
//     'Punit Suman',
//     'Punit Suman',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Punit Suman',
//     45264,
//     '',
//     3,
//     45264,
//     45264,
//     12,
//     '',
//     3,
//     45264,
//     45264,
//     12,
//     'Task discussion',
//     'Customer',
//     '',
//     0
//   ],
//   [
//     'Daily standup meetings',
//     'Punit Suman',
//     'Punit Suman',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Punit Suman',
//     45265,
//     '',
//     1,
//     45265,
//     45265,
//     12,
//     '',
//     1,
//     45265,
//     45265,
//     12,
//     'Task discussion',
//     'Customer',
//     '',
//     0
//   ],
//   [
//     'Discuss and make changes in create manual carrier booking api according to new changes in vessel_voyage table',        
//     'Punit Suman',
//     'Punit Suman',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Punit Suman',
//     45264,
//     '',
//     2,
//     45265,
//     45265,
//     12,
//     '',
//     2,
//     45265,
//     45265,
//     12,
//     'Task discussion',
//     'Customer',
//     '',
//     0
//   ],
//   [
//     'Implement restriction in editing carrier booking after cargo mapping is done - as discussed this restriction is not required',
//     'Punit Suman',
//     'Punit Suman',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Punit Suman',
//     45265,
//     '',
//     0.5,
//     45265,
//     45265,
//     12,
//     '',
//     0.5,
//     45265,
//     45265,
//     12,
//     'Task discussion',
//     'Customer',
//     '',
//     0
//   ],
//   [
//     'Implement roles in manual carrier booking apis for cancel, delete and edit',
//     'Punit Suman',
//     'Punit Suman',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Punit Suman',
//     45265,
//     '',
//     2,
//     45265,
//     45265,
//     12,
//     '',
//     2,
//     45265,
//     45265,
//     12,
//     'Task discussion',
//     'Customer',
//     '',
//     0
//   ],
//   [
//     'PC setup for waka project',
//     'Omkar Hirave',
//     'Omkar Hirave',
//     '',
//     'Medium',
//     'Completed',
//     '',
//     '',
//     '',
//     '',
//     'Omkar Hirave',
//     45265,
//     '',
//     2,
//     45265,
//     45265,
//     12,
//     '',
//     2,
//     45265,
//     45265,
//     12,
//     'Task discussion',
//     'Internal',
//     '',
//     0
//   ],
// ]
// const saveSheet = (taskArray)=>{ 
//     const selectedColumnsIndices = [0, 1, 11, 14, 5, 15, 19, 20, 21]; 
//       const selectedColumns = taskArray.map(task =>
//         selectedColumnsIndices.map(index => {
//           const value = task[index];
//           return typeof value === 'number' && value >= 10000 && value <= 99999
//             ? excelDateToJSDate(value)
//             : value;
//         })
//       );
//       const csvWriter = createCsvWriter({
//         path: 'WakaTech.csv',
//         header: selectedColumns[0].map((header) => ({ id: header, title: header })),
//       });
      
//       csvWriter.writeRecords(selectedColumns.slice(1).map(row => {
//         return selectedColumns[0].reduce((acc, key, index) => {
//           acc[key] = row[index];
//           return acc;
//         }, {});
//       }))
//         .then(() => console.log('CSV file written successfully'))
//         .catch((err) => console.error(err));
// }

const saveSheet = (taskArray) => {
  const csvWriter = createCsvWriter({
    path: 'WakaTech.csv',
    header: taskArray[0].map((header) => ({ id: header, title: header })),
  });

  csvWriter
    .writeRecords(
      taskArray.slice(1).map((row) => {
        return taskArray[0].reduce((acc, key, index) => {
          const value = row[index];
          acc[key] = typeof value === 'number' && value >= 10000 && value <= 99999
            ? excelDateToJSDate(value)
            : value;
          return acc;
        }, {});
      })
    )
    .then(() => console.log('CSV file written successfully'))
    .catch((err) => console.error(err));
};
module.exports = { saveSheet }
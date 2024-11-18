// const fs = require('fs').promises;

// const data = 'Hello, this is a test message.';

// fs.writeFile('example.txt', data)
//   .then(() => {
//     console.log('Data has been written to the file.');
//   })
//   .catch((err) => {
//     console.error('An error occurred:', err);
//   });

const fs = require('fs')

// Initial schedule
const schedule = [
    { time: '07:00', task: 'Wake up' },
    { time: '07:30', task: 'Exercise' },
    { time: '08:00', task: 'Breakfast' },
    { time: '08:30', task: 'Shower' },
    { time: '09:00', task: 'Start work' },
]

// Function to save schedule to a file
const saveSchedule = (filename, data) => {
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFile(filename, jsonData, (err) => {
        if (err) throw err
        console.log('Schedule has been saved.')
    })
}

// Function to read and update schedule from a file
const readAndUpdateSchedule = (filename, newTask) => {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) throw err
        const schedule = JSON.parse(data)
        schedule.push(newTask)

        const updatedJsonData = JSON.stringify(schedule, null, 2)
        fs.writeFile(filename, updatedJsonData, (err) => {
            if (err) throw err
            console.log('Schedule has been updated.')
        })
    })
}

// File name
const filename = 'morning_schedule.json'

// Save the initial schedule
saveSchedule(filename, schedule)

// New task to add
const newTask = { time: '10:00', task: 'Check emails' }

// Read and update the schedule
readAndUpdateSchedule(filename, newTask)

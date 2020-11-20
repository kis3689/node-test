// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START gae_node_request_example]
const express = require('express');
const https = require('https');
// const cronByhours = require('node-schedule');
// const cronByDays = require('node-schedule');

const option = {
  hostname: 'hasura.neonesia.net',
  path: '/v1/query',
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
    'x-hasura-admin-secret': 'neoN2si@Adm1n'
  }
}

const dataByHours = JSON.stringify({
  args: {
      sql: "SELECT bank.transaction_report_by_hours();SELECT ticket.ticket_report_by_hours();"
  },
  type: "run_sql"
});

const dataByDays = JSON.stringify({
  args: {
    sql: "SELECT bank.transaction_report_by_days();SELECT ticket.ticket_report_by_days();"
  },
  type: "run_sql"
});
const app = express();

app.get('/', (req2, res) => {
  res.status(200).send('node test test test').end();
  const req = https.request(option, (res) => {
    console.log(new Date(), `statusCode: ${res.statusCode}`);
    res.on('dataByHours', (d)=>{
      process.stdout.write(d);
    })
  });
  req.on('error', (error) => {
    console.error(new Date(), error)
  });
  req.write(dataByHours)
  req.end();
});

// cronByhours.scheduleJob('35 * * * *', function(){
//   const req = https.request(option, (res) => {
//     console.log(new Date(), `statusCode: ${res.statusCode}`);
//     res.on('dataByHours', (d)=>{
//       process.stdout.write(d);
//     })
//   });
//   req.on('error', (error) => {
//     console.error(new Date(), error)
//   });
//   req.write(dataByHours)
//   req.end();
// });

// cronByDays.scheduleJob('10 1 * * *', function(){
//   const req = https.request(option, (res) => {
//     console.log(new Date(), `statusCode: ${res.statusCode}`);
//     res.on('dataByDays', (d)=>{
//       process.stdout.write(d);
//     })
//   });
//   req.on('error', (error) => {
//     console.error(new Date(), error)
//   });
//   req.write(dataByDays)
//   req.end();
// });


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT);
// [END gae_node_request_example]

module.exports = app;
import React from 'react'
import "./Dashboard.css"
import Base from '../Base/Base'

const Dashboard = () => {
  return (
        <Base title="Dashboard">
          <div className='dashboard-content'>
            <h1 className='dash-head'>Welcome to Your Mailer</h1>
            <div className='dash-note'>
            <h3>Note:</h3>
            <ol>
              <li>For <b>to,cc and bcc</b> you can maually enter email 
              address with comma separated and also you can upload a csv file.
              </li>
              <li>In the csv file the column title should must be <b>(email for to),
                (cc for cc), (bcc for bcc)
              </b>
              </li>
              <li>For <b>Subject and Message</b> you should maually enter the subject
              and message.You can also send a mail without subject and message
              </li>
              <li>You can also use <b>Delay</b> for delay your mail.Delay value should 
                be in seconds.
              </li>
            </ol>
            </div>
          </div>
        </Base>
    
  )
}

export default Dashboard

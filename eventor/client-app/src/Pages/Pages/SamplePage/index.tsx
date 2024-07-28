import React from 'react'
import SamplePageContainer from '../../../Component/Pages/SamplePage/UserDashboard'
import UserDashboard from '../../../Component/Pages/SamplePage/UserDashboard'
import { ScrollableDropDownMenuHeading } from '../../../utils/Constant'
import MainDashboard from '../../../Component/Pages/SamplePage/MainDashboard'

export default function SamplePage() {
  return (
    <div className='page-body'>
        <UserDashboard/>
    </div>
  )
}

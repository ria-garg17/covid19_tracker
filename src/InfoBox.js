import React from 'react'
import './InfoBox.css'
import { Card, CardContent, Typography } from '@mui/material';

function InfoBox({ title, cases, total }) {
  return (
    <Card className='infoBox'>
        <CardContent>
            {/* TITLE */}
            <Typography className='infoBox__title' color="TextSecondary">
                {title}
            </Typography>

            {/* Number of cases */}
            <h2 className='infoBox__cases'>{cases}</h2>

            {/* TOTAL */}
            <Typography className='infoBox__total' color="TextSecondary">
                {total} Total
            </Typography>
        </CardContent>
    </Card>
  )
}

export default InfoBox
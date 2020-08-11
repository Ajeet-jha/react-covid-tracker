import React from 'react'
import {Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InputBox({title,cases,total}) {
    return (
        <Card className="infoBox">
           <CardContent>
           <Typography className="infoBox__title" color="textSecondry">
                   {title}
                   <h2 className="infoBox__cases">{cases}</h2>
                </Typography >
                <Typography className="infoBox__total" color="textSecondry">
                   {total} total
                </Typography >
            </CardContent> 
        </Card>
    )
}

export default InputBox

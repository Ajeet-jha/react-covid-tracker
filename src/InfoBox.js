import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InputBox({ title, cases, active,isRed, total, ...props }) {
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && "infoBox--selected"} ${
                isRed && "infoBox--red"
                }`}
        >
            <CardContent>
                <Typography className="infoBox__title" color="textSecondry">
                    {title}
                    <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
                </Typography >
                <Typography className="infoBox__total" color="textSecondry">
                    {total} total
                </Typography >
            </CardContent>
        </Card>
    )
}

export default InputBox

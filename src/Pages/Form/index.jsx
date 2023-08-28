import { Grid, ListItem } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

function Form() {
    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid>
                    <ListItem>
                        <label></label>
                    </ListItem>
                </Grid>
            </Grid>
        </>
    )
}

export default Form
import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

function Form () {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // You can perform actions like sending the data to a server here
    };
    return (
        <>
            <Container maxWidth="sm">
                <h1>Student Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="sName"
                        control={control}                        
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />

                    <Controller
                        name="sFatherName"
                        control={control}                        
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="FatherName"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />

                    <Controller
                        name="sMotherName"
                        control={control}                        
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="MotherName"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />

                    <Controller
                        name="rollNo"
                        control={control}                        
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="RollNo"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />  
                    <Controller
                    name='standard'                    
                    control={control}
                    render={({field})=>(
                        <TextField 
                        {...field}
                        label="standard"
                        variant='outlined'
                        fullWidth
                        margin="normal"
                        />
                    )}
                    />

                    <Controller
                    name='sPhoneNo'
                    control={control}                    
                    render={({field})=>(
                        <TextField
                        {...field}
                        label="Parent's Contact Number"
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        />
                    )}

                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<SendIcon />}
                    >
                        Submit
                    </Button>
                </form>
            </Container>
        </>
    )
}

export default Form
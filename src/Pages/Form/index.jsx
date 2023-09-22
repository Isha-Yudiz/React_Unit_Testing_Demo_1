import React, { useState } from 'react'
import { TextField, Button, Container } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { DataGrid } from '@mui/x-data-grid';

function Form () {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    const [searchedData, setSearchedData] = useState([])
    const [formData, setFormData] = useState([])
    const [search, setSearch] = useState('')

    const rules = {
        global: (value = 'This field is required') => ({ required: value }),
        phone: (value = 'This field is required') => ({
            required: value,
            maxLength: {
                value: 10,
                message: 'Phone number must be 10 digits',
            },
        }),
    };



    const columns = [
        { field: 'id', headerName: 'ID', width: 100, },
        { field: 'sName', headerName: 'Student name', width: 150 },
        { field: 'sFatherName', headerName: 'Father name', width: 170 },
        { field: 'sMotherName', headerName: 'Mother name', width: 170 },
        { field: 'rollNo', headerName: 'Roll No', width: 130 },
        { field: 'standard', headerName: 'Standard', width: 120 },
        { field: 'sPhoneNo', headerName: 'Phone No', width: 160 },

    ];

    function handleSearchData (e) {
        e.preventDefault()
        setSearch(e.target.value)
        const searchedData = formData?.filter((item) => item?.sName.toLowerCase().includes(search))
        setSearchedData(searchedData)
    }

    function handleClear () {
        reset({
            sName: '',
            sFatherName: '',
            sMotherName: '',
            rollNo: '',
            standard: '',
            sPhoneNo: ''
        })
    }

    const onSubmit = (data) => {
        const submitData = { ...data, id: formData?.length + 1 }
        setFormData((prev) => [...prev, submitData])
        handleClear()
    };


    return (
        <>
            <Container maxWidth="sm" data-testid='form-render'>
                <h1>Student Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="sName"
                        control={control}
                        rules={rules.global()}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Name"
                                inputProps={{ "data-testid": "sName" }}
                                // data-testid="sName"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.sName}
                                helperText={errors.sName && errors.sName.message}
                            />
                        )}
                    />

                    <Controller
                        name="sFatherName"
                        control={control}
                        rules={rules.global()}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="FatherName"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.sFatherName}
                                helperText={errors.sFatherName && errors.sFatherName.message}
                            />
                        )}
                    />

                    <Controller
                        name="sMotherName"
                        control={control}
                        rules={rules.global()}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="MotherName"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.sMotherName}
                                helperText={errors.sMotherName && errors.sMotherName.message}

                            />
                        )}
                    />

                    <Controller
                        name="rollNo"
                        control={control}
                        rules={rules.global()}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="RollNo"
                                inputProps={{ "data-testid": "nRollNo" }}
                                // data-testid="nRollNo"
                                title='Student Roll Number'
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type='number'
                                error={!!errors.rollNo}
                                helperText={errors.rollNo && errors.rollNo.message}
                            />
                        )}
                    />

                    <Controller
                        name='standard'
                        control={control}
                        rules={rules.global()}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="standard"
                                // data-testid="nStandard"
                                inputProps={{ "data-testid": "nStandard" }}
                                variant='outlined'
                                fullWidth
                                margin="normal"
                                type='number'
                                error={!!errors.standard}
                                helperText={errors.standard && errors.standard.message}
                            />
                        )}
                    />

                    <Controller
                        name='sPhoneNo'
                        control={control}
                        rules={rules.phone()}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                inputProps={{ "data-testid": "sContactNo" }}
                                // data-testid="sContactNo"
                                label="Parent's Contact Number"
                                fullWidth
                                margin='normal'
                                variant='outlined'
                                type='text'
                                error={!!errors.sPhoneNo}
                                helperText={errors.sPhoneNo && errors.sPhoneNo.message}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        data-testid="submit-button"
                        variant="contained"
                        color="primary"
                        startIcon={<SendIcon />}
                    >
                        Submit
                    </Button>

                    <Button
                        sx={{ ml: 2 }}
                        data-testid="clear-button"
                        variant="contained"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>

                </form>
            </Container>

            <Container style={{ marginTop: '20px' }}>

                <div>
                    <input
                        style={{ width: '200px', height: '30px' }}
                        value={search}
                        type='search'
                        placeholder='Search Student Name..'
                        onChange={(e) => handleSearchData(e)}
                    />
                </div>

                <div style={{ height: 400, width: '100%', marginTop: '10px' }}>
                    <DataGrid
                        rows={search ? searchedData : formData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}

                    />
                </div>
            </Container>
        </>
    )
}

export default Form
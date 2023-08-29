import React, { useState } from 'react'
import { TextField, Button, Container } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { DataGrid } from '@mui/x-data-grid';

function Form() {
    const { control, handleSubmit, reset } = useForm();

    const [searchedData, setSearchedData] = useState([])
    const [formData, setFormData] = useState([])
    const [search, setSearch] = useState('')

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'sName', headerName: 'Student name', width: 130 },
        { field: 'sFatherName', headerName: 'Father name', width: 130 },
        { field: 'sMotherName', headerName: 'Mother name', width: 130 },
        { field: 'rollNo', headerName: 'Roll No', type: 'number', width: 90 },
        { field: 'standard', headerName: 'Standard', type: 'number', width: 90 },
        { field: 'sPhoneNo', headerName: 'Phone No', type: 'number', width: 90 },

    ];

    function handleSearchData(e) {
        e.preventDefault()
        setSearch(e.target.value)
        const searchedData = formData?.filter((item) => item?.sName.toLowerCase().includes(search))
        setSearchedData(searchedData)
    }

    const onSubmit = (data) => {
        const submitData = { ...data, id: formData?.length + 1 }
        setFormData((prev) => [...prev, submitData])
        reset({
            sName: '',
            sFatherName: '',
            sMotherName: '',
            rollNo: '',
            standard: '',
            sPhoneNo: ''
        })
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
                        render={({ field }) => (
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
                        render={({ field }) => (
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

            <Container style={{ marginTop: '20px' }}>

                <div>
                    <input
                        style={{ width: '200px', height: '30px' }}
                        value={search}
                        type='search'
                        placeholder='search..'
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
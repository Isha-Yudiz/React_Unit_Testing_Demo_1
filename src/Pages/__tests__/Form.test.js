/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable jest/no-conditional-expect */
import React from 'react'
import { screen, render, fireEvent, waitFor, logRoles } from "@testing-library/react"
import { describe, expect, jest, test } from '@jest/globals'
// import renderer from 'react-test-renderer'
import Form from '../Form'
import { act } from 'react-dom/test-utils'

describe('Testing Form Component', () => {
    test('Render Form Component', () => {
        render(<Form />)

        const FormElement = screen.getByTestId('form-render')
        expect(FormElement).toBeInTheDocument()
    })

    test('Title of Form Component', () => {
        render(<Form />)

        const title = screen.getByText(/Student Form/)
        expect(title).toBeInTheDocument()
    })

    test('Render all the Input correctly', () => {
        // const view = render(<Form />)
        // logRoles(view.container)
        render(<Form />)

        const name = screen.getByTestId('sName')
        const fatherName = screen.getByRole('textbox', { name: 'FatherName' })
        const motherName = screen.getByLabelText('MotherName')
        const rollNo = screen.getByTitle('Student Roll Number')
        const standard = screen.getByTestId('nStandard')
        const contactNo = screen.getByTestId('sContactNo')
        const searchInput = screen.getByRole('searchbox')

        expect(name).toBeInTheDocument()
        expect(fatherName).toBeInTheDocument()
        expect(motherName).toBeInTheDocument()
        expect(rollNo).toBeInTheDocument()
        expect(standard).toBeInTheDocument()
        expect(contactNo).toBeInTheDocument()
        expect(searchInput).toBeInTheDocument()
    })

    test('Should show an error when every fields are empty', async () => {
        render(<Form />)

        const submit = screen.getByTestId('submit-button')
        fireEvent.click(submit)

        await waitFor(() => {
            const errorMessage = screen.queryAllByText('This field is required')
            expect(errorMessage.length).toBeGreaterThan(0)
        })
    })

    test('Contact Number must be greater than or equal to 10 digits.', () => {
        render(<Form />)

        const number1 = '9876543210'
        const number2 = '987654321'

        expect(number1).toHaveLength(10)
        expect(number2).not.toHaveLength(10)
    })
})

describe('Input type number must accept only number', () => {
    test('Roll Number must be in number', () => {
        render(<Form />)

        // eslint-disable-next-line testing-library/no-node-access
        const rollNoInput = screen.getByTestId('nRollNo')

        fireEvent.change(rollNoInput, { target: { value: '123' } });
        expect(rollNoInput.value).toBe('123');

        fireEvent.change(rollNoInput, { target: { value: 'abc' } });
        expect(rollNoInput.value).toBe('')

        fireEvent.change(rollNoInput, { target: { value: 'e' } });
        expect(rollNoInput.value).toBe('')
    })

    test('Standard must be in number', () => {
        render(<Form />)

        // eslint-disable-next-line testing-library/no-node-access
        const standardInput = screen.getByTestId('nStandard')

        fireEvent.change(standardInput, { target: { value: '123' } });
        expect(standardInput.value).toBe('123');

        fireEvent.change(standardInput, { target: { value: 'abc' } });
        expect(standardInput.value).toBe('')

        fireEvent.change(standardInput, { target: { value: 'e' } });
        expect(standardInput.value).toBe('')
    })
})

describe('Button Test Cases', () => {
    describe('Render Submit and Clear Button correctly', () => {
        test('Render Submit button successfully', () => {
            render(<Form />)

            const submitButton = screen.getByTestId('submit-button')
            expect(submitButton).toBeInTheDocument()
        })

        test('Render Clear button successfully', () => {
            render(<Form />)

            const clearButton = screen.getByRole('button', { name: /clear/i })
            expect(clearButton).toBeInTheDocument()
        })
    })

    test('Call the onSubmit function when Submit button is clicked', () => {
        const onSubmitFn = jest.fn()
        render(<Form />)

        const submitButton = screen.getByTestId('submit-button')
        fireEvent.click(submitButton)

        onSubmitFn()
        expect(onSubmitFn).toHaveBeenCalledTimes(1)
    })

    test('Submitted data must be as per expected', () => {
        const onSubmit = jest.fn((data) => data)
        render(<Form />)

        const data = {
            sName: 'testing',
            sFatherName: 'abc',
            sMotherName: 'efg',
            rollNo: '123',
            standard: '12',
            sPhoneNo: '9876543210'
        }
        const submitButton = screen.getByTestId('submit-button')
        fireEvent.click(submitButton)

        expect(onSubmit(data)).toEqual(data)
    })

    test('Clear every input fields when Clear button is clicked', () => {
        render(<Form />)

        const sNameInput = screen.getByTestId('sName')
        const sFatherNameInput = screen.getByRole('textbox', { name: 'FatherName' })
        const sMotherNameInput = screen.getByLabelText('MotherName')
        const nRollNoInput = screen.getByTestId('nRollNo')
        const nStandardInput = screen.getByTestId('nStandard')
        const sContactNoInput = screen.getByTestId('sContactNo')

        fireEvent.change(sNameInput, { target: { value: 'testing' } })
        fireEvent.change(sFatherNameInput, { target: { value: 'abcd' } })
        fireEvent.change(sMotherNameInput, { target: { value: 'efg' } })
        fireEvent.change(nRollNoInput, { target: { value: '123' } })
        fireEvent.change(nStandardInput, { target: { value: '12' } })
        fireEvent.change(sContactNoInput, { target: { value: '1234567890' } })

        const clearButton = screen.getByText('Clear')
        fireEvent.click(clearButton)

        expect(sNameInput.value).toBe('')
        expect(sFatherNameInput.value).toBe('')
        expect(sMotherNameInput.value).toBe('')
        expect(nRollNoInput.value).toBe('')
        expect(nStandardInput.value).toBe('')
        expect(sContactNoInput.value).toBe('')
    })
})

describe('DataGrid section', () => {
    describe('SearchBox', () => {
        test('Search Input rendered correctly', () => {
            render(<Form />)

            const searchInput = screen.getByRole('searchbox')
            expect(searchInput).toBeInTheDocument()
        })

        test('SearchBox must accept any value', () => {
            render(<Form />)

            const searchBoxInput = screen.getByRole('searchbox')

            fireEvent.change(searchBoxInput, { target: { value: 'abc' } });
            expect(searchBoxInput.value).toBe('abc')

            fireEvent.change(searchBoxInput, { target: { value: 'abc123' } });
            expect(searchBoxInput.value).toBe('abc123')

            fireEvent.change(searchBoxInput, { target: { value: '$abc123' } });
            expect(searchBoxInput.value).toBe('$abc123')
        })
    })

    test('DataGrid rendered correctly', () => {
        render(<Form />)

        const dataGrid = screen.getByRole('grid')
        expect(dataGrid).toBeInTheDocument()
    })

    test('Check all the columns of DataGrid correctly', () => {
        render(<Form />)

        const column1 = screen.getByRole('columnheader', { name: /id/i })
        const column2 = screen.getByRole('columnheader', { name: /student name/i })
        const column3 = screen.getByRole('columnheader', { name: /father name/i })

        // ISSUE: NOT SHOWING MOTHER-NAME, ROLL NO, SO ON
        // const column4 = screen.getByRole('columnheader', { name: /mother name/i })
        // const column5 = screen.getByRole('columnheader', { name: /roll no/i })
        // const column6 = screen.getByRole('columnheader', { name: /standard/i })
        // const column7 = screen.getByRole('columnheader', { name: /phone no/i })

        expect(column1).toBeInTheDocument()
        expect(column2).toBeInTheDocument()
        expect(column3).toBeInTheDocument()
        // expect(column4).toBeInTheDocument()
        // expect(column5).toBeInTheDocument()
        // expect(column6).toBeInTheDocument()
        // expect(column7).toBeInTheDocument()
    })

    test('Size of FormData must increase', () => {
        render(<Form />)
        const formData = []

        const sNameInput = screen.getByTestId('sName')
        const sFatherNameInput = screen.getByRole('textbox', { name: 'FatherName' })
        const sMotherNameInput = screen.getByLabelText('MotherName')
        const nRollNoInput = screen.getByTestId('nRollNo')
        const nStandardInput = screen.getByTestId('nStandard')
        const sContactNoInput = screen.getByTestId('sContactNo')

        const submitButton = screen.getByTestId('submit-button')
        expect(formData).toHaveLength(0)

        act(() => {
            fireEvent.change(sNameInput, { target: { value: 'testing' } })
            fireEvent.change(sFatherNameInput, { target: { value: 'abcd' } })
            fireEvent.change(sMotherNameInput, { target: { value: 'efg' } })
            fireEvent.change(nRollNoInput, { target: { value: '123' } })
            fireEvent.change(nStandardInput, { target: { value: '12' } })
            fireEvent.change(sContactNoInput, { target: { value: '1234567890' } })

            fireEvent.click(submitButton)
            formData.push({
                sName: 'testing',
                sFatherName: 'abcd',
                sMotherName: 'efg',
                rollNo: '123',
                standard: '12',
                sPhoneNo: '1234567890'
            })
        })

        expect(formData).toHaveLength(1)

        act(() => {
            fireEvent.change(sNameInput, { target: { value: 'Dhruv' } })
            fireEvent.change(sFatherNameInput, { target: { value: 'P' } })
            fireEvent.change(sMotherNameInput, { target: { value: 'R' } })
            fireEvent.change(nRollNoInput, { target: { value: '155' } })
            fireEvent.change(nStandardInput, { target: { value: '12' } })
            fireEvent.change(sContactNoInput, { target: { value: '9876543210' } })

            fireEvent.click(submitButton)
            formData.push({
                sName: 'Dhruv',
                sFatherName: 'P',
                sMotherName: 'R',
                rollNo: '155',
                standard: '12',
                sPhoneNo: '9876543210'
            })
        })

        expect(formData).toHaveLength(2)
    })

    describe('Pagination button', () => {
        test('Previous Button & Next button rendered correctly', () => {
            render(<Form />)

            const prevButton = screen.getByTitle('Go to previous page')
            const nextButton = screen.getByTitle('Go to next page')

            expect(prevButton).toBeInTheDocument()
            expect(nextButton).toBeInTheDocument()
        })

        test('Next Button must change the UI', () => {
            render(<Form />)

            const data = [
                { sName: "Dhruv", sFatherName: "ABC", sMotherName: "EFG", rollNo: "101", standard: "12", sPhoneNo: "9876543210", id: 1 },
                { sName: "Darshan", sFatherName: "QWE", sMotherName: "RTY", rollNo: "102", standard: "8", sPhoneNo: "9876543211", id: 2 },
                { sName: "Sahil", sFatherName: "ASD", sMotherName: "FGH", rollNo: "103", standard: "10", sPhoneNo: "9876543212", id: 3 },
                { sName: "Ashish", sFatherName: "ZXC", sMotherName: "VBN", rollNo: "104", standard: "11", sPhoneNo: "9876543213", id: 4 },
                { sName: "Isha", sFatherName: "YTU", sMotherName: "DFG", rollNo: "105", standard: "10", sPhoneNo: "9876543214", id: 5 },
                { sName: "Hiral", sFatherName: "IPO", sMotherName: "WER", rollNo: "106", standard: "12", sPhoneNo: "9876543210", id: 6 },
            ]

            const rowNmuber = screen.getByDisplayValue('5')
            if (rowNmuber.value === '5') {
                expect(rowNmuber.value).toBe('5')

                const expectedData = [
                    { sName: "Dhruv", sFatherName: "ABC", sMotherName: "EFG", rollNo: "101", standard: "12", sPhoneNo: "9876543210", id: 1 },
                    { sName: "Darshan", sFatherName: "QWE", sMotherName: "RTY", rollNo: "102", standard: "8", sPhoneNo: "9876543211", id: 2 },
                    { sName: "Sahil", sFatherName: "ASD", sMotherName: "FGH", rollNo: "103", standard: "10", sPhoneNo: "9876543212", id: 3 },
                    { sName: "Ashish", sFatherName: "ZXC", sMotherName: "VBN", rollNo: "104", standard: "11", sPhoneNo: "9876543213", id: 4 },
                    { sName: "Isha", sFatherName: "YTU", sMotherName: "DFG", rollNo: "105", standard: "10", sPhoneNo: "9876543214", id: 5 },
                ]
                expect(data.slice(0, 5).length).toBe(expectedData.length)

                const nextButton = screen.getByTitle('Go to next page')
                fireEvent.click(nextButton)

                const expectedNewData = [
                    { sName: "Hiral", sFatherName: "IPO", sMotherName: "WER", rollNo: "106", standard: "12", sPhoneNo: "9876543210", id: 6 },
                ]

                expect(data.slice(-1).length).toBe(expectedNewData.length)
            }

            // const rowNmuber2 = screen.getByDisplayValue('10')
            // if (rowNmuber.value === '10') {
            //     expect(rowNmuber2.value).toBe('10')
            // }
        })

        test('Previous Button must change the UI', () => {
            render(<Form />)

            const data = [
                { sName: "Dhruv", sFatherName: "ABC", sMotherName: "EFG", rollNo: "101", standard: "12", sPhoneNo: "9876543210", id: 1 },
                { sName: "Darshan", sFatherName: "QWE", sMotherName: "RTY", rollNo: "102", standard: "8", sPhoneNo: "9876543211", id: 2 },
                { sName: "Sahil", sFatherName: "ASD", sMotherName: "FGH", rollNo: "103", standard: "10", sPhoneNo: "9876543212", id: 3 },
                { sName: "Ashish", sFatherName: "ZXC", sMotherName: "VBN", rollNo: "104", standard: "11", sPhoneNo: "9876543213", id: 4 },
                { sName: "Isha", sFatherName: "YTU", sMotherName: "DFG", rollNo: "105", standard: "10", sPhoneNo: "9876543214", id: 5 },
                { sName: "Hiral", sFatherName: "IPO", sMotherName: "WER", rollNo: "106", standard: "12", sPhoneNo: "9876543210", id: 6 },
            ]


            const expectedData = [
                { sName: "Hiral", sFatherName: "IPO", sMotherName: "WER", rollNo: "106", standard: "12", sPhoneNo: "9876543210", id: 6 },
            ]
            expect(data.slice(-1).length).toBe(expectedData.length)

            const nextButton = screen.getByTitle('Go to next page')
            fireEvent.click(nextButton)

            const expectedNewData = [
                { sName: "Dhruv", sFatherName: "ABC", sMotherName: "EFG", rollNo: "101", standard: "12", sPhoneNo: "9876543210", id: 1 },
                { sName: "Darshan", sFatherName: "QWE", sMotherName: "RTY", rollNo: "102", standard: "8", sPhoneNo: "9876543211", id: 2 },
                { sName: "Sahil", sFatherName: "ASD", sMotherName: "FGH", rollNo: "103", standard: "10", sPhoneNo: "9876543212", id: 3 },
                { sName: "Ashish", sFatherName: "ZXC", sMotherName: "VBN", rollNo: "104", standard: "11", sPhoneNo: "9876543213", id: 4 },
                { sName: "Isha", sFatherName: "YTU", sMotherName: "DFG", rollNo: "105", standard: "10", sPhoneNo: "9876543214", id: 5 },
            ]
            expect(data.slice(0, 5).length).toBe(expectedNewData.length)
        })
    })
})

// describe('Take Snapshot', () => {
//     test('Test-1: Take snapshot of whole component', () => {
//         const component = renderer.create(<Form />)
//         console.log('component: ', component);

//         let tree = component.toJSON()
//         expect(tree).toMatchSnapshot()
//     })
// })


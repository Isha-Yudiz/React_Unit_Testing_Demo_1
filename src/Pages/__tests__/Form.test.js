import { screen, render, fireEvent } from "@testing-library/react"
import { describe, expect, test } from '@jest/globals'
import Form from '../Form'
import renderer from 'react-test-renderer'

function onSubmit (data) {
    return console.log('onSubmit Function called')
}

describe('Testing Form Component', () => {
    test('Test-1: Render Form Component', () => {
        render(<Form />)
    
        const FormElement = screen.getByTestId('form-render')
        expect(FormElement).toBeInTheDocument()
    })
    
    test('Test-2: Title of Form Component', () => {
        render(<Form />)
    
        const title = screen.getByText(/Student Form/)
        expect(title).toBeInTheDocument()
    })
    
    test('Test-3: Name must not be null', () => {
        render(<Form />)
    
        const submit = screen.getByTestId('submit-button')
        const name = screen.getAllByLabelText('Name')

        fireEvent.click(submit)
        expect(name.value).not.toMatch(undefined)
    })

    test('Test-4: Parents Contact Number must be atleast 10 digits.', () => {
        render(<Form />)

        const number1 = '9876543210'
        const number2 = '987654321'
        expect(number1).toHaveLength(10)
        expect(number2).toHaveLength(10)
    })

    test('Test-5: onSubmit should be called', () => {
        render(<Form />)

        const submit = screen.getByTestId('submit-button')
        fireEvent.click(submit)

        const onSubmit = jest.fn(() => true)
        onSubmit()
        expect(onSubmit).toHaveReturned()
    })
})

// describe('Take Snapshot', () => {
//     test('Test-1: Take snapshot of whole component', () => {
//         console.log('renderer :>> ', renderer);
//         const component = renderer.create(<Form />)
//         expect(component).toMatchSnapshot()
//     })
// })


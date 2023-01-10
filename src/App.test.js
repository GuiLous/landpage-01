import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
	render(<App />)
	const linkElement = screen.getByText(/learn react/i)
	expect(linkElement).toBeInTheDocument()
})

test('renders logo', () => {
	render(<App />)
	const logo = screen.getByRole('img')
	expect(logo).toHaveAttribute('src', 'logo.svg')
	expect(logo).toHaveAttribute('alt', 'logo')
})

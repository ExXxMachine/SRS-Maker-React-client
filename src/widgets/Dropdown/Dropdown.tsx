import React, { useState } from 'react'
import classesDropdown from './Dropdown.module.css'

interface DropdownProps {
	handleExportPdf: () => void
	handleExportWord: () => void
}

const Dropdown: React.FC<DropdownProps> = ({
	handleExportPdf,
	handleExportWord,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className={classesDropdown.dropdown}>
			<button className={classesDropdown.dropdownButton} onClick={handleToggle}>
				Экспорт
			</button>
			<div
				className={`${classesDropdown.dropdownMenu} ${
					isOpen ? classesDropdown.show : ''
				}`}
			>
				<button onClick={handleExportPdf}>PDF</button>
				<button onClick={handleExportWord}>WORD</button>
			</div>
		</div>
	)
}

export { Dropdown }

import React, { useState } from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor'
import classesMyEditor from './MyEditor.module.css'

interface MyEditorProps {
	fieldIndex: number
	chapterIndex: number
	field: {
		fieldName: string
		fieldValue: string
	}
	handleFieldChange: (
		chapterIndex: number,
		fieldIndex: number,
		newValue: string
	) => void
}

const MyEditor: React.FC<MyEditorProps> = ({
	fieldIndex,
	chapterIndex,
	field,
	handleFieldChange,
}) => {
	const [code, setCode] = useState(field.fieldValue)

	const handleCodeChange = (evn: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCode(evn.target.value)
		handleFieldChange(chapterIndex, fieldIndex, evn.target.value)
	}

	return (
		<div className={classesMyEditor.editorContainer}>
			<CodeEditor
				value={code}
				onChange={handleCodeChange}
				language='text'
				padding={15}
				className={classesMyEditor.MyEditor}
				style={{
					tabSize: 4, 
					fontFamily: 'monospace',
					fontSize: '14px',
				}}
			/>
		</div>
	)
}

export { MyEditor }

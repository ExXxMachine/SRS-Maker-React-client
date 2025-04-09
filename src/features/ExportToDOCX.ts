import {
	Document,
	Packer,
	Paragraph,
	TextRun,
	HeadingLevel,
	AlignmentType,
} from 'docx'

const replaceSpacesWithTab = text => {
	return text.replace(/  /g, '\t')
}

export const handleExportToDOCX = async (
	projectName: string,
	projectData: any[]
) => {
	const doc = new Document({
		styles: {
			paragraphStyles: [
				{
					id: 'Normal',
					name: 'Normal',
					basedOn: 'Normal',
					next: 'Normal',
					run: {
						font: 'Times New Roman',
						size: 24,
						color: '000000',
					},
				},
			],
		},
		sections: [
			{
				properties: {
					page: {
						margin: {
							top: 700,
							right: 850,
							bottom: 700,
							left: 1700,
						},
					},
				},
				children: [
					// Заголовок проекта
					new Paragraph({
						text: `\t${projectName}`,
						heading: HeadingLevel.TITLE,
						spacing: { after: 400 },
						alignment: AlignmentType.BOTH,
					}),

					...projectData.flatMap((chapter, chapterIndex) => [
						// Заголовок главы
						new Paragraph({
							text: `\t${chapter.chapterName}`,
							heading: HeadingLevel.HEADING_1,
							spacing: { before: 400, after: 200 },
							pageBreakBefore: chapterIndex > 0,
							alignment: AlignmentType.BOTH,
						}),

						// Поля главы
						...chapter.fields.flatMap(field => [
							// Заголовок поля
							new Paragraph({
								children: [
									new TextRun({
										text: `\t${field.fieldName}`,
										bold: true,
										size: 28, // 14pt
										color: '000000',
									}),
								],
								spacing: { after: 50 },
								alignment: AlignmentType.BOTH,
							}),

							// Содержимое поля
							...replaceSpacesWithTab(field.fieldValue)
								.split('\n')
								.map((line, index) => {
									return new Paragraph({
										children: [
											new TextRun({
												text: line,
												size: 24,
												color: '000000',
											}),
										],
										spacing:
											index <
											replaceSpacesWithTab(field.fieldValue).split('\n')
												.length -
												1
												? { after: 0 }
												: { after: 150 },
										alignment: AlignmentType.BOTH,
									})
								}),
						]),
					]),
				],
			},
		],
	})

	try {
		const blob = await Packer.toBlob(doc)
		const link = document.createElement('a')
		link.href = URL.createObjectURL(blob)
		link.download = `${projectName}.docx`
		link.click()
	} catch (error) {
		console.error('Ошибка при экспорте файла:', error)
	}
}

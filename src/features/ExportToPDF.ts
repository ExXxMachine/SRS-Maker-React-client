import jsPDF from 'jspdf'
import timesNewRomanFont from '../app/fonts/TimesNewRoman.ts'

export const handleExportToPDF = (projectName: string, projectData: any[]) => {
	const doc = new jsPDF()

	doc.addFileToVFS('TimesNewRoman.ttf', timesNewRomanFont)
	doc.addFont('TimesNewRoman.ttf', 'TimesNewRoman', 'normal')
	doc.setFont('TimesNewRoman')

	const leftMargin = 30
	const topMargin = 20
	const rightMargin = 15
	const lineHeight = 7
	const headerIndent = 5
	let yPosition = topMargin

	doc.setFontSize(16)
	doc.text(projectName, leftMargin + headerIndent, yPosition)
	yPosition += lineHeight * 2

	projectData.forEach((chapter, index) => {
		if (index > 0) {
			doc.addPage()
			yPosition = topMargin
		}

		doc.setFontSize(16)
		doc.text(chapter.chapterName, leftMargin + headerIndent, yPosition)
		yPosition += lineHeight * 1.5

		chapter.fields.forEach(field => {
			doc.setFontSize(14)
			doc.text(field.fieldName, leftMargin + headerIndent, yPosition)
			yPosition += lineHeight

			doc.setFontSize(12)
			const splitText = doc.splitTextToSize(
				field.fieldValue,
				doc.internal.pageSize.width - leftMargin - rightMargin
			)

			splitText.forEach(line => {
				if (yPosition > 280) {
					doc.addPage()
					yPosition = topMargin
				}
				doc.text(line, leftMargin, yPosition)
				yPosition += lineHeight
			})

			yPosition += lineHeight * 0.5
		})

		yPosition += lineHeight
	})

	doc.save(`${projectName}.pdf`)
}

import chalk from 'chalk'

export default class HelpTable {
	static generateHelpTable(moves: string[]): string[][] {
		return Array.from({ length: moves.length }, (_, i) => {
			const row: string[] = [moves[i]]
			for (let j = 0; j < moves.length; j++) {
				row.push(this.getResultBetween(i, j, moves.length))
			}
			return row
		})
	}

	static getResultBetween(
		move1: number,
		move2: number,
		length: number
	): string {
		const diff = (move1 - move2 + length) % length
		if (diff === 0) {
			return 'DRAW'
		} else if (diff < length / 2) {
			return 'WIN'
		} else {
			return 'LOSE'
		}
	}

	static displayTableLines(maxLength: number) {
		const line = chalk.whiteBright('-'.padEnd(maxLength, '-'))
		console.log(line)
	}

	static showHelpTable(moves: string[]) {
		const helpTable = this.generateHelpTable(moves)
		const maxLength = 15 + moves.length * 12

		console.log(chalk.greenBright('Results from moves: '))
		this.displayTableLines(maxLength)
		console.log(
			`| ${chalk.bold.blueBright(' PC ')}\\${chalk.bold.greenBright(
				' User '
			)}  | ${moves
				.map(move => chalk.greenBright(move.padEnd(9)))
				.join(' | ')}|`
		)
		this.displayTableLines(maxLength)

		for (let i = 0; i < helpTable.length; i++) {
			const row = helpTable[i]
			console.log(
				`| ${chalk.blueBright(row[0].padEnd(13))}| ${row
					.slice(1)
					.map(cell => cell.padEnd(9))
					.join(' | ')}|`
			)

			this.displayTableLines(maxLength)
		}
	}
}

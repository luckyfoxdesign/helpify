import numeral from "numeral"
import err from "./generateErrors"

numeral.register("locale", "US", {
	delimiters: {
		thousands: ",",
		decimal: "."
	},
	abbreviations: {
		thousand: "K",
		million: "M",
		billion: "B",
		trillion: "T"
	},
	ordinal: function(number) {
		return number === 1 ? "er" : "ème"
	},
	currency: {
		symbol: "€"
	}
})

numeral.locale("US")

export default function returnRandomNumbersObject(v, s) {
	return new Promise((res, rej) => {
		let e = err(v)
		if (e != false) rej(e)
		else {
			if (v.mn == 0 || v.mn > 0) {
				res(getRandomTo(v, s))
			} else rej(e)
		}
	})
}

function getRandomTo(v, s) {
	let rna = []
	let ror, rnd, fv
	for (let i = 0; i < s; i++) {
		while (rna.length < s) {
			if (v.mn > 0) rnd = v.mn + Math.random() * (v.mx + 1 - v.mn)
			else if (v.mn == 0) {
				if (!v.fl) rnd = Math.random()
				else rnd = Math.random() * v.mx
			}
			if (!v.fl && v.mx > 1) {
				if (v.mn > 1) fv = Math.floor(rnd)
				else fv = Math.round(rnd * v.mx)
				if (v.ch) ror = numeral(fv).format("0,0a")
				else ror = numeral(fv).format("0,0")
			} else if (!v.fl && v.mx == 1) {
				ror = rnd.toFixed(2)
			} else if (v.fl && v.mx > 1) {
				if (v.mn > 1) fv = (rnd * v.mx).toFixed(v.fl)
				else fv = rnd.toFixed(v.fl)
				if (v.ch) {
					let fl = numeral(fv).format(".[0000]")
					let wd = fl.replace(/\./g, "")
					let nl = wd.replace(/[0-9]/g, "0")
					ror = numeral(fv).format(`0,0.${nl}a`)
				} else ror = numeral(fv).format(`0,0.[0000]`)
			} else if (v.fl && v.mx == 1) {
				ror = rnd.toFixed(v.fl)
			}
			if (s - v.mx <= 2) {
				rna.push({ rni: ror, rnf: rnd })
			} else {
				if (!rna.some(intN => intN.rni === ror))
					rna.push({ rni: ror, rnf: rnd })
			}
		}
	}
	return rna
}

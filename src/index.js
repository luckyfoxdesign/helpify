import sketch from "sketch"
import getRandom from "./utils/getRandomNumber"

export default function() {
	const doc = sketch.getSelectedDocument()
	const sl = doc.selectedLayers
	const ls = sl.layers
	let pt = '{ "mn": 0, "mx": 1000, "fl": false, "ch": false }'

	sketch.UI.getInputFromUser(
		"Generator config",
		{
			initialValue: `${pt}`
		},
		(e, v) => {
			if (e) return
			else {
				try {
					if (v != "") {
						let o = JSON.parse(v)
						if (typeof o == "object") {
							getRandom(o, ls.length)
								.then(r => {
									let i = 0
									ls.map(l => {
										if (l.type == "Text") {
											l.text = r[i].rni
											i++
										}
									})
									console.log(r)
								})
								.catch(e => sketch.UI.message(e))
						} else sketch.UI.message("🙄 use object")
					} else sketch.UI.message("🙄 input can`t be empty")
				} catch (e) {
					sketch.UI.message("🙄 bad string:" + e.name + e.message)
				}
			}
		}
	)
}

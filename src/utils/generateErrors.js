export default function generateError(v) {
	if (typeof v.mx != "number") {
		return "🙄 max value isn't number"
	} else if (typeof v.mn != "number") {
		return "🙄 min value isn't number"
	} else if (typeof v.ch != "boolean") {
		return "🙄 ch can be only boolean"
	} else if (Boolean(v.fl) != false && typeof v.fl != "number") {
		return "🙄 fl value isn't number"
	} else if (v.mn < 0 || v.mx < 0 || v.fl < 0) {
		return "🙄 values must be positive numbers"
	} else if (v.mx < v.mn) {
		return "🙄 max value can't be a less than min value"
	} else if (v.fl > 4) {
		return "🙄 min vale can be less than 4"
	} else if (v.mx - v.mn < 1) {
		return "🙄 max - min < 1"
	} else if (!Number.isInteger(v.mx)) {
		return "🙄 max value can't be float, use int instead"
	} else if (!Number.isInteger(v.mn)) {
		return "🙄 min value can't be float, use int instead"
	} else if (typeof v.mx == "bigint") {
		return "🙄 max value can't be a big int, use int instead"
	} else if (typeof v.mn == "bigint") {
		return "🙄 min value can't be a big int, use int instead"
	} else {
		return false
	}
}

export function urlify(text) {
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	return text?.replace(urlRegex, function (url) {
		return `[${url}](${url})`;
	});
	// or alternatively
	// return text.replace(urlRegex, '<a href="$1">$1</a>')
}

var translate = require('@k3rn31p4nic/google-translate-api');

function translateText(data, inlang, outlang, set, res,cacheServer) {
	translate(data, { from: inlang, to: outlang })
		.then((result) => {
			var output = result.text;
			set(data + outlang, result.text,cacheServer);
			return res.status(200).send({ data: output, cacheUsed: false });
		})
		.catch((err) => {
			console.error(err);
		});
}
module.exports = { translateText };
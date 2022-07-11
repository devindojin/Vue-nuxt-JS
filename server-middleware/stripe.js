//const stripe = require('stripe')('sk_test_SchOIr8YXMavEETQn24Sm7kG');
export default async function (req, res, next) {
  //console.log(req.url)
  //console.log(res)
  /*const session = await stripe.checkout.sessions.retrieve(
  'cs_test_b1DdmY9Fzu3e3lL8E7cF7eUpxqw7bmAXXxF6tSFHx8qqQe2V5C6SO49Tyd'
	);
	console.log(session)*/
	//res.send(`<html><body><h1>Thanks for your order, ${req.url}!</h1></body></html>`);
  next()
}
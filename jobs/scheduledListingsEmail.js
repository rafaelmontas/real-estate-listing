// const cron = require('node-cron')
// const db =  require('../models')
// const Sequelize = require('sequelize')
// const sgMail = require('@sendgrid/mail')
// const numeral = require('numeral')
// const Property = db.property
// const PropertyPictures = db.PropertyPictures
// const ListingEmail = db.ListingEmail
// const ScheduledListingEmail = db.ScheduledListingEmail
// const User = db.user
// const Agent = db.agent

// // Schedule tasks to be run on the server.
// const scheduledEmail = cron.schedule('00 12 * * 1,4', async () => {
// 	console.log('Running Twice a week (Tuesday and Thursday)')

// 	try {
// 		// const sentListings = await ScheduledListingEmail.findAll({ attributes: ['listing_id'], raw: true })
// 		// const sentIds = await Promise.all(sentListings.map(a => a.listing_id))
// 		const listings = await Property.findAll({
// 			// where: {id: {[Sequelize.Op.notIn]: sentIds}, listing_active: true},
// 			where: {listing_active: true},
// 			attributes: ['id', 'listing_price', 'bedrooms', 'bathrooms', 'parking_spaces', 'square_meters', 'sector'],
// 			limit: 4,
// 			order: [Sequelize.fn( 'RANDOM' )],
// 			include: [{model: PropertyPictures, limit: 1, attributes: ['location']}],
// 			raw: false
// 		})

// 		const newListings = listings.map(listing => ({
// 			id: listing.id,
// 			listing_price: numeral(listing.listing_price).format('0,0'),
// 			bedrooms: listing.bedrooms,
// 			bathrooms: listing.bathrooms,
// 			parking_spaces: listing.parking_spaces,
// 			square_meters: listing.square_meters,
// 			sector: listing.sector,
// 			'PropertyPictures': listing.PropertyPictures[0].location,
// 			link: `https://www.hauzzy.com/properties/${listing.id}`
// 		}))
// 		// console.log(JSON.stringify(newListings))

// 		// Get all recipients
// 		const users = await User.findAll({attributes: ['email'], raw: true})
// 		const agents = await Agent.findAll({attributes: ['email'], raw: true})
// 		const recipients = users.concat(agents)
// 		const finalRecipients = await Promise.all(recipients.map(a => (
// 			{
// 				to: a.email,
// 				dynamic_template_data: {listings: newListings}
// 			}
// 		)))
// 		// console.log(finalRecipients)

		
// 		// Send Email
// 		let sgKey;
// 		if(process.env.NODE_ENV === 'production') {
// 			sgKey = process.env.SENDGRID_PROD_EMAIL_API_KEY
// 		} else {
// 			sgKey = process.env.SENDGRID_DEV_EMAIL_API_KEY
// 		}
// 		sgMail.setApiKey(sgKey)

// 		const msg = {
// 			from: {email: 'noreply@hauzzy.com', name: 'Hauzzy'},
// 			reply_to: 'noreply@hauzzy.com',
// 			template_id: 'd-ae8e9d65c5054a2387e596390ec90bfc',
// 			personalizations: finalRecipients
// 		}
// 		await sgMail.sendMultiple(msg)
// 		console.log('emails sent')


// 		// Save listings sent
// 		// const sentIdss = await Promise.all(newListings.map(a => a.id))
// 		// const email = await ListingEmail.create({raw: true})
// 		// const listingEmail = await ScheduledListingEmail.bulkCreate([
// 		// 	{email_id: email.id, listing_id: sentIdss[0]},
// 		// 	{email_id: email.id, listing_id: sentIdss[1]},
// 		// 	{email_id: email.id, listing_id: sentIdss[2]},
// 		// 	{email_id: email.id, listing_id: sentIdss[3]},
// 		// ])
		
// 		// console.log(sentIds)
// 		// console.log(listings, sentIdss)
// 		// console.log(JSON.stringify(newListings), sentIdss)
// 		// const table = await Property.findAll({where: {id: {[Sequelize.Op.in]: sentIds}}, include: ListingEmail, raw: true})
// 		// console.log(table)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }, {
// 	scheduled: true,
// 	timezone: 'America/Santo_Domingo'
// })


// module.exports = scheduledEmail
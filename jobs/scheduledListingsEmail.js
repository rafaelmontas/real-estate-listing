const cron = require('node-cron')
const db =  require('../models')
const Sequelize = require('sequelize')
const sgMail = require('@sendgrid/mail')
const client = require('@sendgrid/client')
const Property = db.property
const PropertyPictures = db.PropertyPictures
const ListingEmail = db.ListingEmail
const ScheduledListingEmail = db.ScheduledListingEmail

// Schedule tasks to be run on the server.
const scheduledEmail = cron.schedule('*/10 * * * * *', async () => {
	console.log('running a task every minute')

	try {
		const sentListings = await ScheduledListingEmail.findAll({ attributes: ['listing_id'], raw: true })
		const sentIds = await Promise.all(sentListings.map(a => a.listing_id))
		// const sentIds = ['2fb7b630-2b2d-4c9d-98de-d2e2bc3a4dd1', '8708ae17-7b94-426b-9056-cc5d717ee035']
		const listings = await Property.findAll({
			where: {id: {[Sequelize.Op.notIn]: sentIds}},
			attributes: ['id', 'listing_price', 'bedrooms', 'bathrooms', 'parking_spaces', 'square_meters', 'sector'],
			limit: 2,
			order: [Sequelize.fn( 'RANDOM' )],
			include: [{model: PropertyPictures, attributes: ['location']}],
			raw: true
		})

		// Get all recipients
		// Send Email
		let sgKey;
		let sgKeyClient;
		if(process.env.NODE_ENV === 'production') {
			sgKey = process.env.SENDGRID_PROD_EMAIL_API_KEY
			sgKeyClient = process.env.SENDGRID_PROD_EMAIL_API_KEY
		} else {
			sgKey = process.env.SENDGRID_DEV_EMAIL_API_KEY
			sgKeyClient = process.env.SENDGRID_DEV_EMAIL_API_KEY
		}
		sgMail.setApiKey(sgKey)
		client.setApiKey(sgKeyClient)

		// const recipients = await client.request({
		// 	url: `https://api.sendgrid.com/v3/contactdb/recipients`,
		// 	method: 'GET',
		// 	headers: {'Authorization': `Bearer ${sgKeyClient}`}
		// })
		// console.log(recipients)

		const msg = {
			from: {email: 'noreply@hauzzy.com', name: 'Hauzzy'},
			reply_to: 'noreply@hauzzy.com',
			template_id: 'd-ae8e9d65c5054a2387e596390ec90bfc',
			personalizations: [
				{
				to: [{email: 'rafaelmontas1@gmail.com'}, {email: 'arlettgm@gmail.com'}],
				dynamic_template_data: {
					listings: listings
				}
				}
			]
			}
			// await sgMail.send(msg)
			console.log('emails sent')


		// Save listings sent
		const sentIdss = await Promise.all(listings.map(a => a.id))
		// const email = await ListingEmail.create({raw: true})
		// const listingEmail = await ScheduledListingEmail.bulkCreate([
		// 	{email_id: email.id, listing_id: sentIdss[0]},
		// 	{email_id: email.id, listing_id: sentIdss[1]},
		// ])
		// email.addProperties(listings)
		// console.log(email.getProperties())
		console.log(sentIds)
		console.log(listings, sentIdss)
		// const table = await Property.findAll({where: {id: {[Sequelize.Op.in]: sentIds}}, include: ListingEmail, raw: true})
		// console.log(table)
	} catch (error) {
		console.log(error)
	}
})


module.exports = scheduledEmail
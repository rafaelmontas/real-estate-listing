const cron = require('node-cron')
const db =  require('../models')
const Property = db.property
const ListingEmail = db.ListingEmail
const ScheduledListingEmail = db.ScheduledListingEmail
const Sequelize = require('sequelize');

// Schedule tasks to be run on the server.
const scheduledEmail = cron.schedule('*/10 * * * * *', async () => {
	console.log('running a task every minute')

	try {
		// const sentListings = await ScheduledListingEmail.findAll({ attributes: ['listing_id'], raw: true })
		// const sentIds = await Promise.all(sentListings.map(a => a.listings_id))
		const sentIds = ['2fb7b630-2b2d-4c9d-98de-d2e2bc3a4dd1', '8708ae17-7b94-426b-9056-cc5d717ee035']
		const listings = await Property.findAll({
			where: {id: {[Sequelize.Op.notIn]: sentIds}},
			// attributes: ['id', 'sector', 'listing_price'],
			limit: 2,
			order: [Sequelize.fn( 'RANDOM' )],
			raw: true
		})
		const sentIdss = await Promise.all(listings.map(a => a.id))
		const email = await ListingEmail.create({raw: true})
		const mix = await ScheduledListingEmail.bulkCreate([
			{email_id: email.id, listing_id: sentIdss[0]},
			{email_id: email.id, listing_id: sentIdss[1]},
		])
		// email.addProperties(listings)
		// console.log(email.getProperties())
		console.log(sentIds)
		console.log(sentIdss)
		// console.log(listings)
		console.log(email.id)
		const table = await ScheduledListingEmail.findAll({raw: true})
		console.log(table)
	} catch (error) {
		console.log(error)
	}
})


module.exports = scheduledEmail
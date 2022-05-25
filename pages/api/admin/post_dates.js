const faunadb = require('faunadb')
const q = faunadb.query




export default  async (req, res)=>{

    // const{ id, name, price } = req.body

    const client = new faunadb.Client({ secret:process.env.SECRET })

    try {
        await client.query(q.Create(q.Collection('villa'), { data:{ id:id, name:name , price:price } }))

        res.status(200).end()
        
    } catch (e) {

        res.status(500).json({ error:e.message })
        
    }
}
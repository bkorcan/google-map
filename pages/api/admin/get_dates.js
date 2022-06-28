const faunadb = require('faunadb')
const q = faunadb.query

export default async (req, res) => {
    const { v } = req.query
    // console.log(v)

    try {

        const client = new faunadb.Client(
            { secret: process.env.SECRET }
        )
        const data = await client.query(
            q.Select(
                "date",
                q.Select("data", q.Get(q.Ref(q.Collection("kas"), v)))
              )
        )

        res.status(200).json(data)

    } catch (e) {
         res.status(500).json({error:e.message})
    }
}
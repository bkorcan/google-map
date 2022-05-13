const faunadb = require('faunadb')
const q = faunadb.query

export default async (req, res) => {
   const take = Number(req.query.t)
   const drop = Number(req.query.d)
    // console.log(take)
    
    try {
        const client = new faunadb.Client(
            { secret: process.env.SECRET }
        )
        const data = await client.query(
            q.Take(take,q.Drop(drop,q.Map(q.Select("data",
            q.Paginate(q.Match('all_ref_ids_gocek'),{size:2000})),q.Lambda('x',  q.Select("data", q.Get(q.Ref(q.Collection("gocek"), q.Var('x')))) ))))
            
        )

        res.status(200).json(data)

    } catch (e) {
         res.status(500).json({error:e.message})
    }
}